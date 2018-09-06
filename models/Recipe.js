var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema ({

    title: {
        type: String,
        required: true},
    URL: {
        type: String,
        required: true},
        // note: {type:Schema.Type.ObjectID,
        //     ref: "note"},
            saved:{
                type: Boolean,
                default:false
            }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;