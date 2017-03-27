//tehtävä 2, profiilitiedot

var fs = require('fs');
var path = require('path');

//annetaan html-data ja lista kohdista, jonka perusteella splitataan
//tuloksena objekti
function splitToArray(data, limiters) {
    let object = {};
    limiters.forEach(function(limiter){
        let part = data.split('<th>' +limiter+'</th><td>')[1];
        let result = part.split('</td>')[0];
        object[limiter] = result.split(", ");
    })
    console.log(object);
}

function parseHTML(html){
    let limiters = ['Elokuvia','Vaatetus','Musiikki', 'PELIT'];
    let object = splitToArray(html,limiters);
    
}

function parseFile(filename) {
    var pathToFile = path.join(__dirname, filename);
    fs.readFile(pathToFile, 'utf8', function(err, txt) {
        if (err) {
            return console.log(err);
        }
        parseHTML(txt);
    });
};

// prints content
parseFile('index.htm');

