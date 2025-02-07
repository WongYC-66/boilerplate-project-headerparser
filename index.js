// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// body-parser
let bodyParser = require('body-parser');
// Mount body parser before other uses it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function(req, res) {
  const headers = req.headers
  console.log(headers)
  const userSoftware = headers['user-agent']
  const userLanguage = headers['accept-language']
  const userIpAddress = headers['x-forwarded-for']

  // print to browser
  res.json({
    ipaddress: userIpAddress,
    language: userLanguage,
    software: userSoftware
  });
  // res.json({ greeting: 'whoami' });

});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
