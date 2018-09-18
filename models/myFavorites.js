var mongoose = require("mongoose");
 
var myFavoritesSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            image: String,
            url: String
        }
        ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
 
module.exports = mongoose.model("MyFavorites", myFavoritesSchema);