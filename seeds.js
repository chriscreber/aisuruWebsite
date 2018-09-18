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

var aLaCartes = [
    {
        name: "Albacore Tataki",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Aisuru Special",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var appetizers = [
    {
        name: "Edamame",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Gyoza",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    },
    {
        name: "Garlic Edamame",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Shrimp Tempura",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    },
    {
        name: "Vegetable Tempura",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var beverages = [
    {
        name: "Saporo",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Asahi",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var halfRolls = [
    {
        name: "California Roll",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Salmon Roll",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var kitchenEntrees = [
    {
        name: "Tempura Combo",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Cutlet",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var lunches = [
    {
        name: "Tempura Combo",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Cutlet",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var noodles = [
    {
        name: "Udon",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Galbi Ramen",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];
//skip poke for now
var riceBowls = [
    {
        name: "Chicken Teriyaki",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Pork Katsudon",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var salads = [
    {
        name: "Chicken Teriyaki Salad",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Side Salad",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var sides = [
    {
        name: "Miso",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Sunomuno",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var specialtyRolls = [
    {
        name: "Albacore Delight",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                inside: "Crunchy alba",
                outside: "Albacore",
                sauce: "Ponzu"
            },
        price: [8.99]
    },
    {
        name: "Backdraft",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: {
                inside: "Spicy tuna",
                outside: "Deep fried, green onion, masago",
                sauce: "Sriracha"
            },
        price: [13.99]
    }
];

var sushis = [
    {
        name: "Salmon",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Tuna",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
    }
];

var sushiSets = [
    {
        name: "Sushi Combo A",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get tempura",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [8.99]
    },
    {
        name: "Sushi Combo B",
        image: "https://cdn.pixabay.com/photo/2015/05/10/04/59/tempura-760504_1280.jpg",
        description: "You get cutlet, pork or chicken?",
        comesWidth: "Miso, Sunomuno, Rice",
        price: [13.99]
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

function seedDB(){
    //Remove all users
    User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
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
    //add a few comments
    
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