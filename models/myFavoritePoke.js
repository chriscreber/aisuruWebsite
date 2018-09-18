var mongoose = require("mongoose");

// var pokeSchema = new mongoose.Schema({
//     size: [
//             {
//                 name: String,
//                 price: Number
//             }
//         ],
//         base: [
//             {
//                 name: String,
//                 price: Number
//             }
//         ],
//         meat: [
//             {
//                 name: String,
//                 price: Number
//             }
//         ],
//         toppings: [
//             {
//                 name: String,
//                 price: Number
//             }
//     ],
//     sauce: [String]
// });
 
var myFavoritePokeSchema = new mongoose.Schema({
    items: [
            {
            size: [String],
            base: [String],
            meat: [String],
            toppings: [String],
            sauce: [String],
            price: Number
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
 
module.exports = mongoose.model("MyFavoritePoke", myFavoritePokeSchema);