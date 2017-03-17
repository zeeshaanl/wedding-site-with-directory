var express = require('express');
var app = express();
var appController = require('./appController');

module.exports = app;

app.set('port', (process.env.PORT || 5000));

app.use(appController);
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});