const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const routes = require('./routes');
const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
app.use(routes);
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
