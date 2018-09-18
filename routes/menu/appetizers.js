var express = require("express");
var router = express.Router();
var ALaCarte = require("../../models/aLaCarte");
var Appetizer = require("../../models/appetizer");
var Salad = require("../../models/salad");
var Side = require("../../models/side");
var middleware = require("../../middleware")

// INDEX
router.get("/", function(req, res){
    //Get all lunch items from DB
    ALaCarte.find({}, function(err, allALaCartes){
        if(err) {
            console.log(err);
        } else {
            
            Appetizer.find({}, function(err, allAppetizers){
                if(err) {
                    console.log(err);
                } else {
                    
                    Salad.find({}, function(err, allSalads){
                        if(err) {
                            console.log(err);
                        } else {
                            
                            Side.find({}, function(err, allSides){
                                if(err) {
                                    console.log(err);
                                } else {
                                    res.render("menu/appetizers/index", {aLaCartes:allALaCartes, appetizers:allAppetizers, salads:allSalads, sides:allSides});
                                }
                            });
                            
                        }
                    });
                    
                }
            });
            
        }
    });
    
});

//APPETIZER ROUTES
//NEW
router.get("/appetizer/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/appetizers/new", {baseUrl: "/index/menu/appetizers/appetizer"});
});

//CREATE
router.post("/appetizer", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Appetizer.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/appetizers");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/appetizer/:id", function(req,res){
    //find campground with provided ID
    Appetizer.findById(req.params.id).populate("comments").exec(function(err, foundAppetizer){
        if(err || !foundAppetizer) {
            console.log(err);
            req.flash("error", "Appetizer not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/appetizers/show", {menuItem: foundAppetizer, baseUrl: "/index/menu/appetizers/appetizer"});
        }
    });
});

//EDIT
router.get("/appetizer/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Appetizer.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/appetizers/appetizer"});
        }
    });
});

//UPDATE
router.put("/appetizer/:id", middleware.isAdminLoggedIn, function(req, res){
    Appetizer.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/appetizers/appetizer/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/appetizer/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Appetizer.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/appetizers");
       }
   });
});

//SIDE ROUTES
//NEW
router.get("/side/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/appetizers/new", {baseUrl: "/index/menu/appetizers/side"});
});

//CREATE
router.post("/side", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Side.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/appetizers");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/side/:id", function(req,res){
    //find campground with provided ID
    Side.findById(req.params.id).populate("comments").exec(function(err, foundSide){
        if(err || !foundSide) {
            console.log(err);
            req.flash("error", "Side not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/appetizers/show", {menuItem: foundSide, baseUrl: "/index/menu/appetizers/side"});
        }
    });
});

//EDIT
router.get("/side/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Side.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/appetizers/side"});
        }
    });
});

//UPDATE
router.put("/side/:id", middleware.isAdminLoggedIn, function(req, res){
    Side.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/appetizers/side/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/side/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Side.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/appetizers");
       }
   });
});

//SALAD ROUTES
//NEW
router.get("/salad/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/appetizers/new", {baseUrl: "/index/menu/appetizers/salad"});
});

//CREATE
router.post("/salad", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Salad.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/appetizers");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/salad/:id", function(req,res){
    //find campground with provided ID
    Salad.findById(req.params.id).populate("comments").exec(function(err, foundSalad){
        if(err || !foundSalad) {
            console.log(err);
            req.flash("error", "Salad not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/appetizers/show", {menuItem: foundSalad, baseUrl: "/index/menu/appetizers/salad"});
        }
    });
});

//EDIT
router.get("/salad/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Salad.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/appetizers/salad"});
        }
    });
});

//UPDATE
router.put("/salad/:id", middleware.isAdminLoggedIn, function(req, res){
    Salad.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/appetizers/salad/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/salad/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Salad.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/appetizers");
       }
   });
});

//A LA CARTE ROUTES
//NEW
router.get("/alacarte/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/alacartes/new", {baseUrl: "/index/menu/appetizers/alacarte"});
});

//CREATE
router.post("/alacarte", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    ALaCarte.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/appetizers");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/alacarte/:id", function(req,res){
    //find campground with provided ID
    ALaCarte.findById(req.params.id).populate("comments").exec(function(err, foundALaCarte){
        if(err || !foundALaCarte) {
            console.log(err);
            req.flash("error", "A La Carte not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/appetizers/show", {menuItem: foundALaCarte, baseUrl: "/index/menu/appetizers/alacarte"});
        }
    });
});

//EDIT
router.get("/alacarte/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    ALaCarte.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/alacartes/edit", {menuItem: foundItem, baseUrl: "/index/menu/appetizers/alacarte"});
        }
    });
});

//UPDATE
router.put("/alacarte/:id", middleware.isAdminLoggedIn, function(req, res){
    ALaCarte.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/appetizers/alacarte/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/alacarte/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   ALaCarte.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/appetizers");
       }
   });
});



module.exports = router;