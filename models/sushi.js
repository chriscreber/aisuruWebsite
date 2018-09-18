var mongoose = require("mongoose");
 
var sushiSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price: [Number],
   genre: Number,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Sushi", sushiSchema);