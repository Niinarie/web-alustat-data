//tehtävä 1, kaverit

var fs = require('fs');
var path = require('path');


function parseHTML(html){
    var friends = {};
    // poimi Friends-osan jälkeen tuleva teksti
    var htmlEndPart = html.split('<h2>Kaverit</h2><ul><li>')[1];
    // poista loppuosa
    var listItems = htmlEndPart.split('</li></ul>')[0];
    // käy läpi tekstipätkät joiden erottimina lista-elementit
    var friendsList = {'Friends': []};
    for(var row of listItems.split('</li><li>')) {
        var friend = {'Nimi': '', 'Date': {'Day':'', 'Month':'', 'Year':''}};
        //Jäsentele rivi ryhmiksi
        const regex = /(.*)\s\[?.*?\]?\s?\((\d*)\.\s([a-zA-ZäÄöÖ]*)\s?(\d*)?\)/g;
        let match = regex.exec(row);

        //Poista email nimestä jos sellainen on
        const namex = /(.*)\s\[.*\]/g;
        if(match[1].match(namex)) {
            let name = namex.exec(match[1]);
            friend.Nimi = name[1];
        } else {
            friend.Nimi= match[1];
        };
        friend.Date.Day = parseInt(match[2]);
        friend.Date.Month = match[3];
        //Joistain puuttui vuosi, joten tsekkaa se vain jos löytyy
        if (match[4]) {
            friend.Date.Year = parseInt(match[4]);
        }
        friendsList.Friends.push(friend);
        console.log(friend);
    }

//console.log(friendsList);
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
parseFile('friends.htm');

