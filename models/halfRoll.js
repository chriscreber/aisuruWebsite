var mongoose = require("mongoose");
 
var halfRollSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   price: [Number],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("HalfRoll", halfRollSchema);