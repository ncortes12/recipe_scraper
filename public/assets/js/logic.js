var title;
var link;
var id;
var favBtn;
var recipeDiv;
var count = 0;

$("#scrape").on("click", function (event){
    event.preventDefault();
    console.log("button pressed");
    $.ajax("/scrape",{
        type: "GET"
    }).then(function(data){
        console.log(data);
        for (var i = 0; i< data.length; i++){
         title = $("<p> Title: " +  data[i].title + "</p>");
         link = $("<p> Link: " + data[i].URL + "</p>");
         id = data[i]._id;
         favBtn = $("<button>Favorite</button>");
         favBtn.attr("id", id);
        
         favBtn.addClass("saved");
        recipeDiv = $("<div>");
        recipeDiv.append(title);
        recipeDiv.append(link);
        recipeDiv.append(favBtn);
        

        $(".display").append(recipeDiv);
       
      

        }
        
    })
})

$(document).on("click", ".saved" , function (event){
    event.preventDefault();
    var id = $(this).attr("id");
    console.log(id);
    $.ajax("/save",{
        method: "POST",
        data: {id}
    }).then(function(data){

    })
})

$(".save").on("click" , function(event){
    event.preventDefault();
    
    $.ajax("/article", {
        type: "GET"
    }).then(function(data){
        console.log(data)
    })
})

$(document).on("click", ".noted" , function (event){
    event.preventDefault();

    var id = $(this).attr("data-id");
    console.log(id);
    // console.log(id);
    // $.ajax("/note/" + id, {
    //     method: "GET",
        
 
})