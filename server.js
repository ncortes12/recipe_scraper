var express = require("express");
var exphbs = require("express-handlebars");

var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var axios = require("axios");

// Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/recipes");
 require("./routes/apiRoutes")(app);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
