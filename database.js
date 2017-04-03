const fs = require('fs');
const path = require('path');

//variable for database data once it's been fetched
let database = {};


//search for name and gender
//object is one database object
//data is the  word to search for, field the field to check for the word
function searchParameter(object, field, data) {

    //check if the object has the given field as some objects were lacking certain fields
    if (object[field]) {
        //convert search word to regexp
        let regExp = new RegExp(data,"i");

        //check if the field's value is string or array
        if (typeof object[field] == 'string') {
            if (regExp.test(object[field])) {
                return true; 
            }   
        } else {
            for (let i = 0; i<object[field].length; i++){
                if (regExp.test(object[field][i])) {
                    return true; 
                } 
            }
        }
    }
    return false;
}

//searches for person based on given parameters
function search(name,gender,music,tv,movies,restaurants) {
    let result = [];
    for (let i = 0; i < database.length; i++) {
        //check every given field with function, add database object to results if all requirements are filled
        if (searchParameter(database[i],'name',name) && searchParameter(database[i],'gender',gender) && 
        searchParameter(database[i],'music',music) && searchParameter(database[i],'tv',tv) && 
        searchParameter(database[i],'movies',movies) && searchParameter(database[i],'restaurants',restaurants)) {
            result.push(database[i]);
        }
    }
    console.log('results found: '+result.length);
    return result;
}


//check if person with given name exists in database
//returns true if person was found, otherwise false
function containsPerson(string) {
    //convert search word to regexp
    let regExp = new RegExp(string,"i");
    for (let i = 0; i < database.length; i++) {     
        if (regExp.test(database[i].name)) {
            return true; 
        }   
    }
    return false;
}

//returns the number of objects in JSON array
function size() {
    return database.length;
}

//promise based file-fetch
function openFile(filename) {
    return new Promise(function(resolve, reject) {
        var pathToFile = path.join(__dirname, filename);
        fs.readFile(pathToFile, 'utf8', function(err, data) {
        if (err) {
            reject(err);
        }
            resolve(data);
        });
    })
}

function readDatabase(filename) {
    openFile(filename).then(function(result) {
        database = JSON.parse(result);
    }).catch(function(err){
        console.log(err);
    })
};

readDatabase('data/fb-profile-dump.json');

//size() -function
//setTimeout(function(){ console.log(size()); }, 1000);

//containsPerson() -function
//setTimeout(function(){ console.log(containsPerson('anniina')); }, 1000);

//search()
setTimeout(function(){ console.log(search('','male','','simpsons','','')); }, 1000);


