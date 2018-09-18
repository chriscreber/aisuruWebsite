var mongoose = require("mongoose");
//needs to be changed
var pokeSchema = new mongoose.Schema({
   size: [
      {
         name: String,
         price: Number
      }
      ],
   base: [
      {
         name: String,
         price: Number
      }
      ],
   meat: [
      {
         name: String,
         price: Number
      }
      ],
   toppings: [
      {
         name: String,
         price: Number
      }
      ],
   sauce: [String]
});
 
module.exports = mongoose.model("Poke", pokeSchema);