
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
  res.sendStatus(200);
});

http.listen(process.env.PORT || 3000, function(){
  console.log("Application listening on port: " + (process.env.PORT || 3000));
});