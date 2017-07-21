const app = require('./app');
const express = require('express');
const path = require('path');

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const db = require('./config/db');
const Guest = require('./Model/Guest');
const sendMail = require('./utils/Mailer');

router.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/list', function (request, pageResponse) {
    buildHtml(pageResponse);
});

router.post('/rsvp', function (request, response) {
    const data = request.body;
    const { name, rsvp, meal } = data;

    const guest = new Guest({
        name: name,
        rsvp: rsvp,
        meal: meal,
        created_at: new Date()
    });

    sendMail(name, rsvp, meal)
        .then(resp => {
            console.log('mail sent!');
            console.log(resp);
            response.json({ status: 200 })
        })
        .catch(error => {
            throw error;
        });

    guest.save()
        .then(resp => {
            console.log(resp, 'guest saved');
        })
        .catch(error => {
            throw error
        });
});

function buildHtml(pageResponse) {
    const title = 'Guest List';
    let guestList = '';
    let yes = 0;
    let no = 0;

    Guest.find(function (err, users) {
        users.forEach(function (arrayItem) {
            const name = arrayItem.name || '';
            const rsvp = arrayItem.rsvp || '';
            const meal = arrayItem.meal || '';
            guestList += '<tr><td>' + name + '</td><td>' + rsvp + '</td><td>' + meal + '</td></tr>';
            if (arrayItem.rsvp === "Yes") {
                yes++;
            }
            if (arrayItem.rsvp === "No") {
                no++;
            }
        });

        const totalCount = '<div><h4>Yes: ' + yes + '</h4><h4>No: ' + no + '</h4></div>';

        const html = '<!DOCTYPE html>' +
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
