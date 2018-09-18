var express = require("express");
var router = express.Router();
var Special = require("../../models/specials");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all specials items from DB
    Special.find({}, function(err, allItems){
        if(err) {
            console.log(err);
        } else {
            res.render("specials/index", {specialItems:allItems});
        }
    });
});

//NEW
router.get("/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/generic/new", {baseUrl: "/index/specials"});
});

//CREATE
router.post("/", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Special.create(req.body.menuItem, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Specials created");
            res.redirect("/index/specials");
        }
    });
});

//SHOW - shows more info about sushi
router.get("/:id", function(req,res){
    //find sushi with provided ID
    Special.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("specials/show", {menuItem: foundItem, baseUrl: "/index/specials"});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Special.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/specials"});
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAdminLoggedIn, function(req, res){
    Special.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/specials/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Special.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/specials");
       }
   });
});

module.exports = router;