
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    db = require('./models'),
    request = require('request'),
    ctrl = require('./controllers');

/*********|| I haven't included a view engine ||*************
*******|| to use EJS first npm install -s ejs ||*************
*************|| then uncomment below ||*********************/
var jwt = require('jwt-simple');

app.set('view engine', 'ejs');

app.use("/public", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));

//TEST ENDPOINT
app.get('/hw', ctrl.testF);

app.get('/', function(req, res){
  res.cookie('test', 'test cookie');
  res.render('index', {test: "hello world"});
});

app.post('/', function(req, res){
  console.log(req.body);
  
  var encodedJWT = req.body.jwt;
  var secret = "va7UXl8Zgfc2PfSNYDLgJ08Z";
  var decodedJWT = jwt.decode(encodedJWT, secret); 
  res.send(decodedJWT);
});

http.listen(process.env.PORT || 3000, function(){
  console.log("Application listening on port: " + (process.env.PORT || 3000));
});