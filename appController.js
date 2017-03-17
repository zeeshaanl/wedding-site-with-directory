var app = require('./app');
var express = require('express');
var path = require('path');

var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var db = require('./config/db');
var Guest = require('./Model/Guest');

router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/list', function(request, pageResponse) {
    buildHtml(pageResponse);
});

router.post('/rsvp', function(request, response) {
    var data = request.body;

    var guest = new Guest({
        name: data.name,
        rsvp: data.rsvp,
        meal: data.meal,
        created_at: new Date()
    });

    guest.save(function(err) {
        if (err) {
            console.log(err)
        }
        response.json({ status: 200 });
    });
});

function buildHtml(pageResponse) {
    var title = 'Guest List';
    var guestList = '';
    var yes = 0;
    var no = 0;

    Guest.find(function(err, users) {
        users.forEach(function(arrayItem) {
            var name = arrayItem.name || '';
            var rsvp = arrayItem.rsvp || '';
            var meal = arrayItem.meal || '';
            guestList += '<tr><td>' + name + '</td><td>' + rsvp + '</td><td>' + meal + '</td></tr>';
            if (arrayItem.rsvp == "Yes") {
                yes++;
            }
            if (arrayItem.rsvp == "No") {
                no++;
            }
        });

        var totalCount = '<div><h4>Yes: ' + yes + '</h4><h4>No: ' + no + '</h4></div>';

        var html = '<!DOCTYPE html>' +
            '<html><header><link rel="stylesheet" href="assets/css/main.css" /><title>' + title +
            '</title></header><body class="list"><h2>Guest List</h2><table><tr><th>Name</th><th>RSVP</th><th>Meal Preference</th></tr>' + guestList + '</table>' + totalCount + '</body></html>';

        pageResponse.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': html.length,
            'Expires': new Date().toUTCString()
        });

        pageResponse.end(html);
    });
}

module.exports = router;
