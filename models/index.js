
var mongoose = require("mongoose");

//if using MONGOLAB
mongoose.connect( process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          //******************************
          // REPLACE WITH LOCAL APP NAME *
          "mongodb://localhost/REPLACE_ME");
          //******************************
          //******************************

//module.exports.EXAMPLE = require('./EXAMPLE.js');