
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    db = require('./models'),
    request = require('request'),
    ctrl = require('./controllers'),
    jwt = require('jwt-simple');

app.set('view engine', 'ejs');

app.use("/public", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//TEST ENDPOINT
app.get('/hw', ctrl.testF);

app.get('/', function(req, res){
  if(req.cookies.jwt){
    res.render('index', {test: "hello world"});
  }else{
    res.sendStatus(401);
  }
  
});

app.post('/', function(req, res){ 
  var encodedJWT = req.body.jwt;
  console.log(encodedJWT);
  var secret = process.env.SECRET;
  var decodedJWT = jwt.decode(encodedJWT, secret);
  if(decodedJWT){
    res.cookie('token', req.body.jwt)
    res.render('index', {test: JSON.stringify(decodedJWT)});
  }else{
    res.sendStatus(401);
  }
});

http.listen(process.env.PORT || 3000, function(){
  console.log("Application listening on port: " + (process.env.PORT || 3000));
});