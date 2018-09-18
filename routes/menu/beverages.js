var express = require("express");
var router = express.Router();
var Beverage = require("../../models/beverage");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all sushi items from DB
    Beverage.find({}, function(err, allItems){
        if(err) {
            console.log(err);
        } else {
            res.render("menu/beverages/index", {menuItems:allItems});
        }
    });
});

//NEW
router.get("/new/:genre", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/beverages/" + req.params.genre + "/new", {baseUrl: "/index/menu/beverages"});
});

//CREATE
router.post("/", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Beverage.create(req.body.menuItem, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/beverages");
        }
    });
});

//SHOW - shows more info about sushi
router.get("/:id", function(req,res){
    //find sushi with provided ID
    Beverage.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/beverages/show", {menuItem: foundItem, baseUrl: "/index/menu/beverages"});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Beverage.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/beverages/edit", {menuItem: foundItem, baseUrl: "/index/menu/beverages"});
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAdminLoggedIn, function(req, res){
    Beverage.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/beverages/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Beverage.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/beverages");
       }
   });
});

module.exports = router;