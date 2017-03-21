//All controllers interacting with the DB must include this line
db = require('../models');

//Define controller functions using a variable 
var testF = function (req, res){
  res.sendFile( process.cwd() + "/views/hw.html");
}

module.exports = testF;