// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami",function(req,res){
  console.log(req.headers);
  let userAgent=req.headers["user-agent"];
  let remoteAddress=req.headers["x-forwarded-for"];
  remoteAddress=remoteAddress.split(",")[0];
  let userLanguage=req.headers["accept-language"];
  console.log(userAgent,remoteAddress,userLanguage);
  res.json({ipaddress:remoteAddress,language:userLanguage,software:userAgent});
  // res.send(req.connection.remoteAddress);
  console.log(JSON.stringify(req.headers));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
