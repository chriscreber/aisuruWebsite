var mongoose = require("mongoose");
 
var specialtyRollSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: {
      pieces: Number,
      inside: String,
      outside: String,
      sauce: String
   },
   price: [Number],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("SpecialtyRoll", specialtyRollSchema);