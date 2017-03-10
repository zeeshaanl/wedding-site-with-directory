var express = require('express');
var app = express();
var path = require('path');
var DB = require('nosql');
var nosql = DB.load('model/guests.nosql');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));

// console.log(__dirname);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/list', function(request, pageResponse) {
   buildHtml(pageResponse);
});

app.post('/rsvp', function(request, response) {
  var data = request.body;
  //console.log(request.data)
//   var data = request.query.data;
  //nosql.insert({ id: 3499, age: 55, name: 'Peter' })
  nosql.insert({name: data.name, rsvp: data.rsvp, meal: data.meal});
  response.json({status : 200});
});

function buildHtml(pageResponse) {
  var title = 'Guest List';
  var guestList = '';
  
  nosql.find().make(function(builder) {
    var yes = 0;
    var no = 0;
    builder.callback(function(err, response) {
      response.forEach( function (arrayItem) {
        guestList += '<tr><td>'+arrayItem.name+'</td><td>'+ arrayItem.rsvp +'</td><td>'+ arrayItem.meal +'</td></tr>';
        if(arrayItem.rsvp == "Yes") {
          yes++;
        }
        if(arrayItem.rsvp == "No") {
          no++;
        }
      });
      
      var totalCount='<div><h4>Yes: ' + yes + '</h4><h4>No: ' + no + '</h4></div>';
      
      var html = '<!DOCTYPE html>' + 
          '<html><header><link rel="stylesheet" href="assets/css/main.css" /><title>' + title + 
          '</title></header><body class="list"><h2>Guest List</h2><table><tr><th>Name</th><th>RSVP</th><th>Meal Preference</th></tr>' + guestList + '</table>' + totalCount +'</body></html>';
      
      pageResponse.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
      });
      
      pageResponse.end(html);
    });
  });
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});