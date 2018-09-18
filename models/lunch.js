var mongoose = require("mongoose");
 
var lunchSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comesWidth: String,
   genre: Number,
   price: [Number],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Lunch", lunchSchema);