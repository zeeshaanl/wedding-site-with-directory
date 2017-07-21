const app = require('./app');
const express = require('express');
const path = require('path');

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const db = require('./config/db');
const Guest = require('./Model/Guest');
const listAction = require('./Controller/ListController');
const rsvpAction = require('./Controller/RsvpController');

router.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/index.html'));
});

router.all('/list', function (request, response) {
    listAction(request, response);
});

router.post('/rsvp', function (request, response) {
    rsvpAction(request, response);
});

module.exports = router;
