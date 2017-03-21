
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    db = require('./models'),
    request = require('request'),
    ctrl = require('./controllers'),
    jwt = require('jwt-simple');

app.set('view engine', 'ejs');

app.use("/public", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));

//TEST ENDPOINT
app.get('/hw', ctrl.testF);

app.get('/', function(req, res){
  if(req.cookies.jwt){
    res.render('index', {test: "hello world"});
  }else{
    res.sendStatus(404);
  }
  
});

app.post('/', function(req, res){ 
  var encodedJWT = req.body.jwt;
  console.log(encodedJWT);
  var secret = "frgome21hqhxumhcesuupjnrfz2ban0br0u4eqmnnxgggdkzlod2v4tnz5q2ovbx5wlzayz2smqgtoiqfnk0nn3rqnkrokjqqxw52a4f4dm1ipgjrdi0l3hh1labjzayodcxa55ss0qurvxo4whsecpguu1bcfe2v00cygwicwix035hytiqns0rg43wa5p0ustd1yl1lo0dbo5c5ziwbmcgr5hxaubgd1m1oakr0w4lyqkubiuzykrlzolujam";
  var decodedJWT = jwt.decode(encodedJWT, secret);
  if(decodedJWT){
    res.cookie('token', req.body.jwt)
    res.render('index', {test: JSON.stringify(decodedJWT)});
  }else{
    res.sendStatus(404);
  }
});

http.listen(process.env.PORT || 3000, function(){
  console.log("Application listening on port: " + (process.env.PORT || 3000));
});