var mongoose = require("mongoose");
var User = require("./models/user");
var ALaCarte = require("./models/aLaCarte");
var Appetizer = require("./models/appetizer");
var Beverage = require("./models/beverage");
var HalfRoll = require("./models/halfRoll");
var KitchenEntree = require("./models/kitchenEntree");
var Lunch = require("./models/lunch");
var Noodle = require("./models/noodle");
var RiceBowl = require("./models/riceBowl");
var Salad = require("./models/salad");
var Side = require("./models/side");
var SpecialtyRoll = require("./models/specialtyRoll");
var Sushi = require("./models/sushi");
var SushiSet = require("./models/sushiSet");
var Comment   = require("./models/comment");
var Poke   = require("./models/poke");
var Event   = require("./models/events");
var MyFavoritePoke   = require("./models/myFavoritePoke");
var MyFavorite   = require("./models/myFavorites");
var Special   = require("./models/specials");
var passport = require("passport");

var events = [
    {
        name: "Sunday Night Trivia",
        image: "https://i.imgur.com/xCk82MH.png?2",
        description: "Come in Sunday night at 7:15 for trivia. Winning team gets a $20 gift certificate. Don't forget to thank your MC Jake Scott."
    }
];

var specials = [
    {
        name: "Monday Ninja Rolls",
        image: "https://i.imgur.com/66MMEBo.jpg",
        description: "$2.50 ninja rolls on Mondays",
        price: 2.50
    },
    {
        name: "Tuesday California Rolls",
        image: "https://i.imgur.com/XkTOEOS.jpg",
        description: "$2.00 california rolls on Tuesdays",
        price: 2.00
    },
    {
        name: "Wednesday Spicy Tuna Rolls",
        // image:
        description: "$3.00 spicy tuna rolls on Wednesdays",
        price: 3.00
    },
    {
        name: "Thursday House Specials",
        image: "https://i.imgur.com/Y5Map4E.jpg",
        description: "$2.50 house specials on Thursdays",
        price: 2.50
    },
    {
        name: "Sunday Tuna Poke Bowls",
        image: "https://i.imgur.com/79VuD36.jpg",
        description: "$6.00 tuna poke bowls on Sundays",
        price: 6.00
    },
    {
        name: "Hite Special",
        // image:
        description: "$10.00 for a large Hite beer and large hot sake",
        price: 10.00
    }
];

var aLaCartes = [
    {
        name: "Aisuru Special",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Baked assorted fish with white sauce over rice",
        price: [null, 5.99, 8.99]
    },
    {
        name: "Yellowtail Fusion",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Yellowtail, chopped jalapeño, red onion, garlic ponzu, olive oil",
        price: [16.99]
    },
    {
        name: "Albacore Tataki",
        image: "https://i.imgur.com/l98iw9R.jpg",
        description: "Albacore, cucumber, and garlic ponzu",
        price: [12.99]
    },
    {
        name: "Blackened Tuna Sashimi",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Pepper seared tuna, radish sprout, green onion, masago, and sesame sauce",
        price: [16.99]
    },
    {
        name: "Poki Ball",
        image: "https://i.imgur.com/yg9TGdy.jpg",
        description: "Poki tuna and avocado",
        price: [16.99]
    },
    {
        name: "Shooters",
        image: "https://i.imgur.com/vGYtjnS.jpg",
        description: "Available with sake or virgin",
        price: [null, null, null, 3.99, 3.99, 4.99, 8.99]
    }
    
];

var appetizers = [
    {
        name: "Edamame",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [3.99]
    },
    {
        name: "Garlic Edamame",
        image: "https://i.imgur.com/TZP5l6l.jpg",
        description: "Edamame with garlic sauce",
        price: [5.99]
    },
    {
        name: "Shrimp Tempura",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "5 pieces",
        price: [7.99]
    },
    {
        name: "Vegetable Tempura",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Broccoli, carrot, mushroom, onion, squash, sweet potato, zucchini",
        price: [7.99]
    },
    {
        name: "Mixed Tempura",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "2 pieces shrimp, 7 pieces vegetable",
        price: [8.99]
    },
    {
        name: "Gyoza",
        image: "https://i.imgur.com/5Z1wtlO.jpg",
        description: "Pork and chicken dumplings. Served pan fried or deep fried",
        price: [7.99]
    },
    {
        name: "Harumaki",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Japanese style vegetable egg rolls",
        price: [6.99]
    },
    {
        name: "Baked Green Mussel",
        image: "https://i.imgur.com/tW3ol6i.jpg",
        description: "Japanese style vegetable egg rolls",
        price: [6.99]
    },
    {
        name: "Oysters On Half Shell",
        image: "https://i.imgur.com/SAm1Har.jpg",
        description: "Japanese style vegetable egg rolls",
        price: [8.99]
    },
    {
        name: "Appetizer Sampler",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "3 pieces gyoza, 2 pieces harumaki, 2 pieces shrimp tempura",
        price: [11.99]
    }
];

var beverages = [
    {
        name: "Hite",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
    },
    {
        name: "Asahi",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
    },
    {
        name: "Sapporo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
    },
    {
        name: "Kirin",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
    },
    {
        name: "Coors Light",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 1,
        price: [3, 10]
    },
    {
        name: "Mirror Pond",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 1,
        price: [5, 15]
    },
    {
        name: "Lagunitas IPA",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 1,
        price: [6, 15]
    },
    {
        name: "Fat Tire",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 1,
        price: [6, 15]
    },
    {
        name: "Seasonal Rotators",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 1,
        price: [6, 15]
    },
    {
        name: "Ozeki Dry",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [5.50]
    },
    {
        name: "Hakutsuru Draft",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [5.99]
    },
    {
        name: "Tanrei Junmai",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [8.99]
    },
    {
        name: "Hana Awaka",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [10.99]
    },
    {
        name: "Hakutsuru Superior Junmai Ginjo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [15.99]
    },
    {
        name: "Nigori",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [9.99]
    },
    {
        name: "Soju",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [11.99]
    },
    {
        name: "Hot Sake",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 2,
        price: [4.99, 6.99]
    },
    {
        name: "K.J. Chardonnay",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [7.99]
    },
    {
        name: "K.J. Cabernet Sauvignon",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [8.99]
    },
    {
        name: "F.P. Pinot Noir",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [7.99]
    },
    {
        name: "F.P. Merlot",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [6.99]
    },
    {
        name: "House Red",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [3.99]
    },
    {
        name: "House White",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 3,
        price: [3.99]
    },
    {
        name: "Pepsi",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Diet Pepsi",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Sierra Mist",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Orange Crush",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Dr. Pepper",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Mug Root Beer",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Tropicana Pink Lemonade",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Nestea Raspberry Iced Tea",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Tropical Iced Tea",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Green Iced Tea",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.50]
    },
    {
        name: "Ramune",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 4,
        price: [2.99]
    },
    {
        name: "3 Scoop Ice Cream",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Your choice of greentea, plum wine, or vanilla",
        genre: 5,
        price: [3.99]
    },
    {
        name: "Tempura Ice Cream",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Your choice of greentea, plum wine, or vanilla",
        genre: 5,
        price: [3.99]
    },
    {
        name: "Mochi Platter",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Your choice of 3: strawberry, greentea, chocolate, coffee, vanilla, red bean, mango, cookies n' cream",
        genre: 5,
        price: [3.99]
    }
];

var halfRolls = [
    {
        name: "California Special",
        image: "https://i.imgur.com/CNG34h3.jpg",
        description: "4 pieces. Tuna, salmon, yellowtail on california roll",
        price: [5.50]
    },
    {
        name: "Philadelphia",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "8 pieces. Salmon and cream cheese",
        price: [4.50]
    },
    {
        name: "Eel Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "8 pieces. Fresh water eel, avocado",
        price: [4.50]
    },
    {
        name: "Spicy Tuna Roll",
        image: "https://i.imgur.com/eQr7Onb.jpg",
        description: "8 pieces. Red spicy tuna",
        price: [4.50]
    },
    {
        name: "California Roll",
        image: "https://i.imgur.com/XkTOEOS.jpg",
        description: "8 pieces. Crabmeat and avocado",
        price: [4.25]
    },
    {
        name: "Salmon Skin Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "8 pieces. Crispy salmon skin, gobo, green onion, itokaki",
        price: [4.50]
    },
    {
        name: "Ninja Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. 2 tempura shrimp, crabmeat, and avocado",
        price: [4.50]
    },
    {
        name: "Banzai Roll",
        image: "https://i.imgur.com/66MMEBo.jpg",
        description: "6 pieces. Tempura soft shell crab, crabmeat, and avocado",
        price: [4.50]
    },
    {
        name: "House Special",
        image: "https://i.imgur.com/Y5Map4E.jpg",
        description: "6 pieces. Deep fried salmon and avocado",
        price: [4.50]
    },
    {
        name: "Vegetable Tempura Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. Zucchini, carrot, broccoli, onion, sweet potato",
        price: [4.99]
    },
    {
        name: "Vegetable Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. Lettuce, avocado, gobo, cucumber, radish sprout",
        price: [4.25]
    },
    {
        name: "Tuna Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. Tuna",
        price: [4.50]
    },
    {
        name: "Salmon Roll",
        image: "https://i.imgur.com/s9htcRQ.jpg",
        description: "6 pieces. Salmon, green onion",
        price: [4.50]
    },
    {
        name: "Salmon Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. Yellowtail, green onion",
        price: [4.50]
    },
    {
        name: "Avocado Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "6 pieces. Avocado",
        price: [3.25]
    },
    {
        name: "Cucumber Roll",
        image: "https://i.imgur.com/63Bcmwe.jpg",
        description: "6 pieces. Cucumber",
        price: [3.25]
    },
    {
        name: "Caligirl Hand Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Spicy scallop, crabmeat, avocado",
        price: [4.99]
    },
    {
        name: "Three Amigos Hand Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Tuna, yellowtail, salmon, green onion",
        price: [4.99]
    },
    {
        name: "Unatamavo Hand Roll",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Egg, unagi, avocado",
        price: [4.50]
    },
    {
        name: "Crunchy Spicy Tuna Hand Roll",
        image: "https://i.imgur.com/S5ZEl9h.jpg",
        description: "Red spicy tuna, tempura flake",
        price: [4.50]
    }
];

var kitchenEntrees = [
    {
        name: "Tempura Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "4 pieces shrimp, 2 pieces fish, 7 pieces vegetable tempura",
        price: [17.99]
    },
    {
        name: "Vegetable Tempura Dinner",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "14 pieces vegetable tempura",
        price: [15.99]
    },
    {
        name: "Chicken Teriyaki Entree",
        image: "https://i.imgur.com/47OmFAX.jpg",
        description: "Served on skillet with grilled onion",
        price: [17.99]
    },
    {
        name: "Fish Teriyaki Entree",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Your choice of salmon or escolar",
        price: [26.99]
    },
    {
        name: "Chicken Tonkatsu",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Panko fried chicken cutlet with side of thin sliced cabbage",
        price: [17.99]
    },
    {
        name: "Chicken Tonkatsu",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Panko fried pork cutlet with side of thin sliced cabbage",
        price: [17.99]
    }
];

var lunches = [
    {
        name: "Tempura Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "2 pieces shrimp, 2 pieces fish, 7 pieces vegetable tempura",
        comesWidth: "Miso, Sunomono, Rice",
        genre: 0,
        price: [11.99]
    },
    {
        name: "Cutlet",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Panko fried chicken or pork, served with thin sliced cabbage",
        comesWidth: "Miso, Sunomono, Rice",
        genre: 0,
        price: [13.99]
    },
    {
        name: "Fish Teriyaki",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Salmon or escolar",
        comesWidth: "Miso, Sunomono, Rice",
        genre: 0,
        price: [15.99]
    },
    {
        name: "Chicken Teriyaki Entree",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Served over grilled onion and skillet",
        comesWidth: "Miso, Sunomono, Rice",
        genre: 0,
        price: [14.99]
    },
    {
        name: "Oyako-don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Boiled chicken and egg over rice",
        comesWidth: "Miso, Sunomono",
        genre: 0,
        price: [11.99]
    },
    {
        name: "Katsu-don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Chicken or pork cutlets boiled with katsu sauce and egg over rice",
        comesWidth: "Miso, Sunomono",
        genre: 0,
        price: [12.99]
    },
    {
        name: "Seafood Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Assorted sashimi over spring mix salad",
        comesWidth: "Miso",
        genre: 0,
        price: [16.99]
    },
    {
        name: "Lunch Sushi Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Cheff's choice of 7 pieces nigiri and 4 pieces california roll",
        comesWidth: "Miso",
        genre: 0,
        price: [15.99]
    },
    {
        name: "Lunch Sashimi Combo",
        image: "https://i.imgur.com/evgJbJc.jpg",
        description: "Cheff's choice of 3 pieces of 3 types of sashimi",
        comesWidth: "Miso",
        genre: 0,
        price: [15.99]
    },
    {
        name: "Roll Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "California roll and your choice of tuna or spicy tuna roll",
        comesWidth: "Miso, Sunomono",
        genre: 0,
        price: [12.99]
    },
    {
        name: "Sushi and Tempura Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Cheff's choice of 7 pieces nigiri and 7 pieces vegetable tempura",
        comesWidth: "Miso, Sunomono, Rice",
        genre: 0,
        price: [16.99]
    },
    {
        name: "Shrimp Tempura Box",
        image: "https://i.imgur.com/WeaSakw.jpg",
        description: "Served on rice with steamed vegetables",
        genre: 1,
        price: [7.99]
    },
    {
        name: "Chicken Box",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Served on rice with steamed vegetables",
        genre: 1,
        price: [6.99]
    },
    {
        name: "Beef Box",
        image: "https://i.imgur.com/LVu6EYY.jpg",
        description: "Served on rice with steamed vegetables",
        genre: 1,
        price: [8.99]
    },
    {
        name: "Pork Box",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Served on rice with steamed vegetables",
        genre: 1,
        price: [6.99]
    }
];

var noodles = [
    {
        name: "Udon",
        image: "https://i.imgur.com/kum7th7.jpg",
        description: "Japanese style thick noodle soup",
        price: [8.99]
    },
    {
        name: "Udon w/ Tempura",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Japanese style thick noodle soup w/ 1 piece shrimp and 2 pieces vegetable tempura",
        price: [9.99]
    },
    {
        name: "Udon Nabeyaki",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Japanese style thick noodle soup w/ chicken, vegetable, and egg",
        price: [13.99]
    },
    {
        name: "Galbi Ramen",
        image: "https://i.imgur.com/itSNT2w.jpg",
        description: "Korean style beef bbq",
        price: [9.99]
    },
    {
        name: "Ginger Pork Ramen",
        image: "https://i.imgur.com/uyhD5TP.jpg",
        description: "Pork marinated in ginger sauce",
        price: [9.99]
    },
    {
        name: "Miso Ramen",
        image: "https://i.imgur.com/jlUsMg1.jpg",
        description: "Pork marinated in ginger sauce",
        price: [8.99]
    }
];
//skip poke for now
var riceBowls = [
    {
        name: "Chicken Teriyaki Bowl",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [11.99]
    },
    {
        name: "Beef Teriyaki Bowl",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [13.99]
    },
    {
        name: "Pork Teriyaki Bowl",
        image: "https://i.imgur.com/KlYdteC.jpg",
        price: [12.99]
    },
    {
        name: "Shrimp Tempura Teriyaki Bowl",
        image: "https://i.imgur.com/A37TN3G.jpg",
        price: [12.99]
    },
    {
        name: "Vegetable Teriyaki Bowl",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [12.99]
    },
    {
        name: "Chicken Kat-su Don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Panko fried chicken cutlet boiled with katsu sauce and egg",
        price: [14.99]
    },
    {
        name: "Pork Kat-su Don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Panko fried pork cutlet boiled with katsu sauce and egg",
        price: [14.99]
    },
    {
        name: "Oyako Don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Boiled chicken and egg",
        price: [13.99]
    },
    {
        name: "Ten Don",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "2 pieces shrimp, 7 pieces vegetable tempura on rice bowl",
        price: [11.99]
    }
];

var salads = [
    {
        name: "Garden Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Iceberg lettuce, carrot, and cabbage",
        price: [4.99]
    },
    {
        name: "Garden Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [6.99]
    },
    {
        name: "Salmon Skin Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Crispy salmon skin on spring mix salad",
        price: [11.99]
    },
    {
        name: "Tofu Salad",
        image: "https://i.imgur.com/uMwblmj.jpg",
        description: "Deep fried or boiled tofu on spring mix salad",
        price: [8.99]
    },
    {
        name: "Chicken Teriyaki Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Grilled chicken on spring mix salad",
        price: [11.99]
    },
    {
        name: "Seafood Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Assorted sashimi on spring mix salad",
        price: [22.99]
    },
    {
        name: "Seared Tuna Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Assorted sashimi on spring mix salad",
        price: [16.99]
    },
    {
        name: "Ocean Salad",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Assorted sashimi on spring mix salad",
        price: [5.99]
    },
    {
        name: "Sunomuno",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Assorted sashimi on spring mix salad",
        price: [2.99]
    }
];

var sides = [
    {
        name: "Miso",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Japanese bean paste soup",
        price: [1.99]
    },
    {
        name: "Seafood Sunomono",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Octopus, sushi ebi, and crabmeat on cucumber salad",
        price: [7.99]
    },
    {
        name: "White Rice",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [1.99]
    },
    {
        name: "Brown Rice",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        price: [2.99]
    },
    {
        name: "Steamed Vegetable",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Cabbage, broccoli, carrot, zucchini",
        price: [7.99]
    }
];

var specialtyRolls = [
    {
        name: "Albacore Delight",
        image: "https://i.imgur.com/Nvi4Y6k.jpg",
        description: {
                pieces: 8,
                inside: "Crunchy alba",
                outside: "Albacore, avocado",
                sauce: "Ponzu"
            },
        price: [12.99]
    },
    {
        name: "Alaskan",
        image: "https://i.imgur.com/etM6qqo.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Soy wrap, salmon, crispy salmon skin, green onion, bonito flakes",
            },
        price: [13.99]
    },
    {
        name: "Backdraft",
        image: "https://i.imgur.com/39DEpJ7.jpg",
        description: {
                pieces: 8,
                inside: "Pink spicy tuna, avocado",
                outside: "Deep fried, green onion",
                sauce: "Crunch sauce, sriracha"
            },
        price: [9.99]
    },
    {
        name: "BSCR",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Scallop $11.99, shrimp $12.99, mushroom $10.99, langostino $15.99, green onion, masago",
                sauce: "Baked shins sauce"
            },
        price: [11.99]
    },
    {
        name: "Cabo",
        image: "https://i.imgur.com/yfDVjBh.jpg",
        description: {
                pieces: 8,
                inside: "Zuke salmon, pickled jalapeño",
                outside: "Furekake, fried onion, red onion, green onion, masago",
            },
        price: [11.99]
    },
    {
        name: "Cabo Reef",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Zuke salmon, pickled jalapeño",
                outside: "Fried oysters, red onion, green onion, masago",
                sauce: "Spicy shins, crunch sauce"
            },
        price: [14.99]
    },
    {
        name: "California Garden",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Red spicy tuna, spring mix",
                sauce: "Ginger dressing"
            },
        price: [12.99]
    },
    {
        name: "Golden California",
        image: "https://i.imgur.com/jFu8t7O.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Deep fried",
                sauce: "Crunch sauce"
            },
        price: [7.50]
    },
    {
        name: "Cheesy Golden California",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado, cream cheese",
                outside: "Deep fried",
                sauce: "Crunch sauce"
            },
        price: [8.99]
    },
    {
        name: "Crunch",
        image: "https://i.imgur.com/MsaE7zh.jpg",
        description: {
                pieces: 8,
                inside: "Shrimp tempura, avocado",
                outside: "Crabmeat, tempura flakes",
                sauce: "Crunch sauce"
            },
        price: [9.99]
    },
    {
        name: "Cucumber Special",
        image: "https://i.imgur.com/L2JE2ea.jpg",
        description: {
                pieces: 6,
                inside: "Tuna, salmon, yellowtail, red snapper, avocado",
                outside: "Cucumber wrap",
            },
        price: [9.99]
    },
    {
        name: "Dragon",
        image: "https://i.imgur.com/4vovXHI.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Fresh water eel, avocado, bonito flakes",
                sauce: "Eel sauce"
            },
        price: [13.99]
    },
    {
        name: "Extasea",
        image: "https://i.imgur.com/0Ijj2KW.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Pink spicy tuna, green onion",
                sauce: "Baked shins, crunch"
            },
        price: [12.99]
    },
    {
        name: "Fireball",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Pink spicy tuna",
                outside: "Pink spicy tuna, crabmeat, avocado, masago",
            },
        price: [13.99]
    },
    {
        name: "Flower",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 2,
                inside: "Red spicy tuna, avocado",
                outside: "Rice wrap, spring mix salad, furekake",
                sauce: "Sesame soy sauce"
            },
        price: [7.50]
    },
    {
        name: "Fuji",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Red spicy tuna",
                outside: "Escolar, avocado",
                sauce: "Ponzu, sriracha"
            },
        price: [12.99]
    },
    {
        name: "Grover Beach",
        image: "https://i.imgur.com/9uGYKXY.jpg",
        description: {
                pieces: 2,
                inside: "Crabmeat, tempura shrimp, avocado, rice",
                outside: "Lettuce wrap",
                sauce: "Shins sauce"
            },
        price: [7.50]
    },
    {
        name: "Heart Attack",
        image: "https://i.imgur.com/b3gH535.jpg",
        description: {
                pieces: 5,
                inside: "Pink spicy tuna, jalapeño, cream cheese",
                outside: "Deep fried, green onion, masago",
                sauce: "Spicy shins, crunch, sriracha"
            },
        price: [7.99]
    },
    {
        name: "Hot Grover Beach Night",
        image: "https://i.imgur.com/iQ4eOsw.jpg",
        description: {
                pieces: 8,
                inside: "Tempura shrimp, avocado",
                outside: "Pink spicy tuna, tempura flakes",
                sauce: "Spicy shins, crunch"
            },
        price: [12.99]
    },
    {
        name: "Lobster",
        image: "https://i.imgur.com/2NYcwbw.jpg",
        description: {
                pieces: 8,
                inside: "Langustino, mango",
                outside: "Avocado, furekake, masago",
                sauce: "Spicy shins"
            },
        price: [14.99]
    },
    {
        name: "Rainbow",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Tuna, yellowtail, salmon, red snapper, avocado",
            },
        price: [13.99]
    },
    {
        name: "Rock n' Roll",
        image: "https://i.imgur.com/YBakVqe.jpg",
        description: {
                pieces: 8,
                inside: "Salmon, crabmeat, avocado",
                outside: "Deep fried",
                sauce: "Crunch"
            },
        price: [9.99]
    },
    {
        name: "Salmon in Heaven",
        image: "https://i.imgur.com/s3z4WI1.jpg",
        description: {
                pieces: 8,
                inside: "Crabmeat, avocado",
                outside: "Salmon, wakame, bonito flakes",
                sauce: "Sesame dressing"
            },
        price: [13.99]
    },
    {
        name: "S.L.O.",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Sweet potato",
                outside: "Red spicy tuna, avocado, fresh water eel",
                sauce: "Eel sauce"
            },
        price: [14.99]
    },
    {
        name: "Sunshine",
        image: "https://i.imgur.com/ucsQaPP.jpg",
        description: {
                pieces: 8,
                inside: "Jalapeño, mango, avocado",
                outside: "Cream cheese, salmon",
                sauce: "Baked spicy shins"
            },
        price: [13.99]
    },
    {
        name: "Surf",
        image: "https://i.imgur.com/EQQPWJa.jpg",
        description: {
                pieces: 4,
                inside: "Pink spicy tuna, red onion, pickled jalapeño, furekake",
                outside: "Deep fried rice on seaweed",
            },
        price: [7.99]
    },
    {
        name: "Tiger",
        image: "https://i.imgur.com/3SHS2PG.jpg",
        description: {
                pieces: 8,
                inside: "Tempura shrimp, avocado",
                outside: "Sushi ebi, avocado",
                sauce: "Spicy shins, sriracha"
            },
        price: [12.99]
    },
    {
        name: "Torchika",
        image: "https://i.imgur.com/RuG5QOD.jpg",
        description: {
                pieces: 8,
                inside: "Calamari tempura, gobo, avocado",
                outside: "Escolar, green onion, masago",
                sauce: "Garlic ponzu, crunch"
            },
        price: [13.99]
    },
    {
        name: "Ursla",
        image: "https://i.imgur.com/8mBZ7Ag.jpg",
        description: {
                pieces: 6,
                inside: "Yellowtail tempura, mango, avocado, pink spicy tuna, masago",
                sauce: "Spicy shins"
            },
        price: [9.99]
    },
    {
        name: "Yellow Rin",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                pieces: 8,
                inside: "Spicy yellowtail, green onion, masago",
                outside: "Yellowtail, avocado",
            },
        price: [13.99]
    }
];

var sushis = [
    {
        name: "Yellowtail",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",,
        genre: 0,
        price: [4.99, 12.99]
    },
    {
        name: "Salmon",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",,
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Albacore",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",,
        genre: 0,
        price: [4.50, 12.99]
    },
    {
        name: "Tuna",
        image: "https://i.imgur.com/Gd7iWRD.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Escolar",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Sweet Scallop",
        image: "https://i.imgur.com/hw2RtHj.jpg",
        genre: 0,
        price: [3.99, 9.99]
    },
    {
        name: "Red Snapper",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Shrimp",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [3.99, 9.99]
    },
    {
        name: "Octopus",
        image: "https://i.imgur.com/vbXzt0b.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Squid",
        image: "https://i.imgur.com/xz3fBiH.jpg",
        genre: 0,
        price: [3.99, 9.99]
    },
    {
        name: "Mackerel",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Surf Clam",
        image: "https://i.imgur.com/3iEod1F.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Fresh Water Eel",
        image: "https://i.imgur.com/azrDVR0.jpg",
        genre: 0,
        price: [4.99, 12.99]
    },
    {
        name: "Salt Water Eel",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [4.99, 12.99]
    },
    {
        name: "Sea Bass",
        image: "https://i.imgur.com/EeHskyH.jpg",
        genre: 0,
        price: [4.50, 10.99]
    },
    {
        name: "Smelt Egg",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [3.99]
    },
    {
        name: "Bay Scallop",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [3.99]
    },
    {
        name: "Sea Urchin",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [10.99]
    },
    {
        name: "Salmon Egg",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [5.99]
    },
    {
        name: "Bean Curd",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [3.99]
    },
    {
        name: "BBQ Black Snapper",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        price: [4.50]
    },
    {
        name: "Nin-Ni-Ku Ono",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        genre: 0,
        description: "Garlic, pepper seared ono",
        price: [4.50]
    },
    {
        name: "Sushi Combo A",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Chef's choice 10 pieces nigiri, your choice of half price cut roll",
        genre: 1,
        price: [24.99]
    },
    {
        name: "Sushi Combo B",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Chef's choice 7 pieces nigiri, your choice of half price cut roll",
        genre: 1,
        price: [21.99]
    },
    {
        name: "Sashimi Combo",
        image: "https://i.imgur.com/54NX3eT.jpg",
        description: "Chef's choice 3 pieces of 5 types sashimi",
        genre: 1,
        price: [24.99]
    },
    {
        name: "Sushi and Sashimi Combo",
        image: "https://i.imgur.com/tTcncCb.jpg?1",
        description: "Chef's choice 3 pieces of 2 types sashimi, 7 pieces nigiri, and your choice of half price cut roll",
        genre: 1,
        price: [26.99]
    },
    {
        name: "Sushi and Sashimi Combo For 2",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Mixed tempura appetizer. Chef's choice 3 pieces of 4 types sashimi, 10 pieces nigiri, and your choice of half price cut roll",
        genre: 1,
        price: [26.99]
    },
    {
        name: "All-in Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "3 pieces tuna sashimi. Tuna, ono, salmon nigiri. 4 pieces california or spicy tuna roll. Chicken, pork, or beef teriyaki. 1 piece shrimp and 2 pieces vegetable tempura",
        genre: 1,
        price: [22.99]
    }
];

var sushiSets = [
    {
        name: "Sushi Combo A",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Chef's choice 10 pieces nigiri, your choice of half price cut roll",
        genre: 1,
        price: [24.99]
    },
    {
        name: "Sushi Combo B",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Chef's choice 7 pieces nigiri, your choice of half price cut roll",
        genre: 1,
        price: [21.99]
    },
    {
        name: "Sashimi Combo",
        image: "https://i.imgur.com/54NX3eT.jpg",
        description: "Chef's choice 3 pieces of 5 types sashimi",
        genre: 1,
        price: [24.99]
    },
    {
        name: "Sushi and Sashimi Combo",
        image: "https://i.imgur.com/tTcncCb.jpg?1",
        description: "Chef's choice 3 pieces of 2 types sashimi, 7 pieces nigiri, and your choice of half price cut roll",
        genre: 1,
        price: [26.99]
    },
    {
        name: "Sushi and Sashimi Combo For 2",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "Mixed tempura appetizer. Chef's choice 3 pieces of 4 types sashimi, 10 pieces nigiri, and your choice of half price cut roll",
        genre: 1,
        price: [26.99]
    },
    {
        name: "All-in Combo",
        // image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "3 pieces tuna sashimi. Tuna, ono, salmon nigiri. 4 pieces california or spicy tuna roll. Chicken, pork, or beef teriyaki. 1 piece shrimp and 2 pieces vegetable tempura",
        genre: 1,
        price: [22.99]
    }
];

var pokeList = {
    size: [
        {
            name: "Regular",
            price: "9.99"
        },
        {
            name: "Large",
            price: "11.99"
        }
        ],
    base: [
        {
            name: "White Rice",
            price: 0
        },
        {
            name: "Brown Rice",
            price: 0
        },
        {
            name: "Garden Salad",
            price: 0
        },
        {
            name: "Spring Mix",
            price: 2.00
        },
        ],
    meat: [
        {
            name: "Tuna",
            price: 0
        },
        {
            name: "Salmon",
            price: 0
        },
        {
            name: "Yellowtail",
            price: 0
        },
        {
            name: "Albacore",
            price: 0
        },
        {
            name: "Escolar",
            price: 0
        },
        {
            name: "Red Snapper",
            price: 0
        },
        {
            name: "Octopus",
            price: 2.00
        },
        {
            name: "Spicy Tuna",
            price: 0
        },
        {
            name: "Langustino",
            price: 2.00
        },
        {
            name: "Chicken",
            price: 0
        },
        {
            name: "Beef",
            price: 2.00
        }
        ],
    toppings: [
        {
            name: "Pickeled Jalapeno",
            price: 0
        },
        {
            name: "Raw Jalapeno",
            price: 0
        },
        {
            name: "Tempura Flakes",
            price: 0
        },
        {
            name: "Bonito Flakes",
            price: 0
        },
        {
            name: "Radish Sprout",
            price: 0
        },
        {
            name: "Green Onion",
            price: 0
        },
        {
            name: "Sweet Onion",
            price: 0
        },
        {
            name: "Fried Onion",
            price: 0
        },
        {
            name: "Cucumber",
            price: 0
        },
        {
            name: "Cilantro",
            price: 0
        },
        {
            name: "Shichimi",
            price: 0
        },
        {
            name: "Furekake",
            price: 0
        },
        {
            name: "Gobo",
            price: 0
        },
        {
            name: "Avocado",
            price: 2.00
        },
        {
            name: "Seaweed Salad",
            price: 2.00
        },
        {
            name: "Masago",
            price: 2.00
        },
        {
            name: "Crabmeat",
            price: 2.00
        },
        {
            name: "Salmon Skin",
            price: 2.00
        },
        {
            name: "Mango",
            price: 2.00
        }
        ],
    sauce: [
            "Shins",
            "Spicy Shins",
            "Crunch",
            "Teriyaki",
            "Spicy Teriyaki",
            "Ponzu",
            "Yuzu",
            "Sesame",
            "Sesame Soy",
            "Sriracha",
            "Sambal"
        ]
};

// var users = [
//     {
//         username: "admin",
//         email: "bs",
//         password: "pass"
//     }
// ];

function seedDB(){
    //Remove all users
    User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
        var newUser = new User({username: "admin"});
        User.register(newUser, "1023MontereySushi", function(err, user){
            if(err){
                console.log(err);
            } else {
                passport.authenticate("local");
            }
            
        });
    });
    
    //Remove all lunch items
    ALaCarte.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed aLaCarte!");
        aLaCartes.forEach(function(aLaCarte){
            ALaCarte.create(aLaCarte, function(err, aLaCarte){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an aLaCarte");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Appetizer.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed appetizer!");
        appetizers.forEach(function(appetizer){
            Appetizer.create(appetizer, function(err, appetizer){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an appetizer");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Beverage.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed beverage!");
        beverages.forEach(function(beverage){
            Beverage.create(beverage, function(err, beverage){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an beverage");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    HalfRoll.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed halfRoll!");
        halfRolls.forEach(function(halfRoll){
            HalfRoll.create(halfRoll, function(err, halfRoll){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an halfRoll");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    KitchenEntree.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed kitchenEntree!");
        kitchenEntrees.forEach(function(kitchenEntree){
            KitchenEntree.create(kitchenEntree, function(err, kitchenEntree){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an kitchenEntree");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Lunch.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed lunch!");
        lunches.forEach(function(lunch){
            Lunch.create(lunch, function(err, lunch){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a lunch");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Noodle.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed noodle!");
        noodles.forEach(function(noodle){
            Noodle.create(noodle, function(err, noodle){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an noodle");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    RiceBowl.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed riceBowl!");
        riceBowls.forEach(function(riceBowl){
            RiceBowl.create(riceBowl, function(err, riceBowl){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an riceBowl");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Salad.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed salad!");
        salads.forEach(function(salad){
            Salad.create(salad, function(err, salad){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an salad");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Side.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed side!");
        sides.forEach(function(side){
            Side.create(side, function(err, side){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an side");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    SpecialtyRoll.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed specialtyRoll!");
        specialtyRolls.forEach(function(specialtyRoll){
            SpecialtyRoll.create(specialtyRoll, function(err, specialtyRoll){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an specialtyRoll");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    Sushi.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed sushi!");
        sushis.forEach(function(sushi){
            Sushi.create(sushi, function(err, sushi){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an sushi");
                }
            });
        });
    }); 
    //add a few comments
    
    //Remove all lunch items
    SushiSet.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        sushiSets.forEach(function(sushiSet){
            SushiSet.create(sushiSet, function(err, sushiSet){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an sushiSet");
                }
            });
        });
    });
    
    Event.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        events.forEach(function(event){
            Event.create(event, function(err, event){
                if(err){
                    console.log(err);
                } else {
                    console.log("added an event");
                }
            });
        });
    });
    
    Special.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        specials.forEach(function(special){
            Special.create(special, function(err, special){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an special");
                }
            });
        });
    });
    
    //Remove all lunch items
    Poke.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed poke!");
        Poke.create(pokeList, function(err, poke){
            if(err){
                console.log(err)
            } else {
                console.log("added poke");
            }
        });
    }); 
}
 
module.exports = seedDB;