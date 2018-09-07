var cheerio = require("cheerio");
var request = require("request");
var db = require("../models");
var mongoose = require("mongoose");
var mongojs = require("mongojs");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index")
    })
    app.get("/scrape", function (req, res) {
        request("https://www.bonappetit.com/recipes", function (error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);

            // An empty array to save the data that we'll scrape
            var results = [];

            // Select each element in the HTML body from which you want information.
            // NOTE: Cheerio selectors function similarly to jQuery's selectors,
            // but be sure to visit the package's npm page to see how it works
            $("h1.card-hed").each(function (i, element) {

                var link = "https://www.bonappetit.com/" + $(element).children().attr("href");
                var title = $(element).children().text();

                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                    title: title,
                    URL: link
                });
                
            });


            db.Recipe.create(results).then(function (data) {
                
                res.json(data);
         
            })
               
           

        })
       
    })
    app.post("/save", function(req,res){
        console.log(req.body);
        var id = req.body.id ;
        console.log(id);
        db.Recipe.updateOne({_id: (mongojs.ObjectId(id))},{$set:{saved:true}}, function(data){
            console.log(data);
        })
        });

app.get("/article", function (req,res){
    db.Recipe.find({saved:true}).then(function(data){
        console.log(data);
        var hbsObject = {
            recipe:data
        }
    res.render("saved", hbsObject);
        
    })
})
   

}