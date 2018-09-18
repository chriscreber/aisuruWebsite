var express = require("express");
var router = express.Router();
var Sushi = require("../../models/sushi");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all sushi items from DB
    Sushi.find({}, function(err, allItems){
        if(err) {
            console.log(err);
        } else {
            res.render("menu/sushi/index", {menuItems:allItems});
        }
    });
});

//NEW
router.get("/new/:genre", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/sushi/" + req.params.genre + "/new", {baseUrl: "/index/menu/sushi"});
});

//CREATE
router.post("/", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Sushi.create(req.body.menuItem, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/sushi");
        }
    });
});

//SHOW - shows more info about sushi
router.get("/:id", function(req,res){
    //find sushi with provided ID
    Sushi.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/sushi/show", {menuItem: foundItem, baseUrl: "/index/menu/sushi"});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Sushi.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            if(foundItem.genre === 0){
                res.render("admin/sushi/sushi/edit", {menuItem: foundItem, baseUrl: "/index/menu/sushi"});
            } else{
                res.render("admin/sushi/sushiSet/edit", {menuItem: foundItem, baseUrl: "/index/menu/sushi"});
            }
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAdminLoggedIn, function(req, res){
    Sushi.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/sushi/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Sushi.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/sushi");
       }
   });
});

module.exports = router;