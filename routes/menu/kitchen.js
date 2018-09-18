var express = require("express");
var router = express.Router();
var KitchenEntree = require("../../models/kitchenEntree");
var Ricebowl = require("../../models/riceBowl");
var Noodle = require("../../models/noodle");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all lunch items from DB
    KitchenEntree.find({}, function(err, allKitchenEntrees){
        if(err) {
            console.log(err);
        } else {
            
            Ricebowl.find({}, function(err, allRicebowls){
                if(err) {
                    console.log(err);
                } else {
                    
                    Noodle.find({}, function(err, allNoodles){
                        if(err) {
                            console.log(err);
                        } else {
                            
                            res.render("menu/kitchen/index", {kitchenEntrees: allKitchenEntrees, ricebowls: allRicebowls, noodles: allNoodles});
                            
                        }
                    });
                    
                }
            });
            
        }
    });
    
});

//KITCHEN ENTREE ROUTES
//NEW
router.get("/kitchenEntree/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/kitchen/new", {baseUrl: "/index/menu/kitchen/kitchenEntree"});
});

//CREATE
router.post("/kitchenEntree", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    KitchenEntree.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/kitchen");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/kitchenEntree/:id", function(req,res){
    //find campground with provided ID
    KitchenEntree.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/kitchen/show", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/kitchenEntree"});
        }
    });
});

//EDIT
router.get("/kitchenEntree/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    KitchenEntree.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/kitchenEntree"});
        }
    });
});

//UPDATE
router.put("/kitchenEntree/:id", middleware.isAdminLoggedIn, function(req, res){
    KitchenEntree.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/kitchen/kitchenEntree/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/kitchenEntree/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   KitchenEntree.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/kitchen");
       }
   });
});

//RICEBOWL ROUTES
//NEW
router.get("/ricebowl/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/kitchen/new", {baseUrl: "/index/menu/kitchen/ricebowl"});
});

//CREATE
router.post("/ricebowl", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Ricebowl.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/kitchen");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/ricebowl/:id", function(req,res){
    //find campground with provided ID
    Ricebowl.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/kitchen/show", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/ricebowl"});
        }
    });
});

//EDIT
router.get("/ricebowl/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Ricebowl.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/ricebowl"});
        }
    });
});

//UPDATE
router.put("/ricebowl/:id", middleware.isAdminLoggedIn, function(req, res){
    Ricebowl.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/kitchen/ricebowl/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/ricebowl/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Ricebowl.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/kitchen");
       }
   });
});

//NOODLE ROUTES
//NEW
router.get("/noodle/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/kitchen/new", {baseUrl: "/index/menu/kitchen/noodle"});
});

//CREATE
router.post("/noodle", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Noodle.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/kitchen");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/noodle/:id", function(req,res){
    //find campground with provided ID
    Noodle.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/kitchen/show", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/noodle"});
        }
    });
});

//EDIT
router.get("/noodle/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Noodle.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/noodle"});
        }
    });
});

//UPDATE
router.put("/noodle/:id", middleware.isAdminLoggedIn, function(req, res){
    Noodle.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/kitchen/noodle/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/noodle/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Noodle.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/kitchen");
       }
   });
});




module.exports = router;