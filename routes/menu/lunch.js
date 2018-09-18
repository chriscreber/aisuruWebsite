var express = require("express");
var router = express.Router();
var Lunch = require("../../models/lunch")
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all lunch items from DB
    Lunch.find({}, function(err, allLunches){
        if(err) {
            console.log(err);
        } else {
            res.render("menu/lunch/index", {lunches:allLunches});
        }
    });
});

//NEW
router.get("/new/:genre", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/lunch/" + req.params.genre + "/new", {baseUrl: "/index/menu/lunch"});
});

//CREATE
router.post("/", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Lunch.create(req.body.menuItem, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/lunch");
        }
    });
});

//SHOW - shows more info about lunch
router.get("/:id", function(req,res){
    //find campground with provided ID
    Lunch.findById(req.params.id).populate("comments").exec(function(err, foundLunch){
        if(err || !foundLunch) {
            console.log(err);
            req.flash("error", "Lunch not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/lunch/show", {menuItem: foundLunch, baseUrl: "/index/menu/lunch"});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Lunch.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            if(foundItem.genre === 0){
                res.render("admin/lunch/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/lunch"});
            } else{
                res.render("admin/lunch/boxes/edit", {menuItem: foundItem, baseUrl: "/index/menu/lunch"});
            }
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAdminLoggedIn, function(req, res){
    Lunch.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/lunch/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Lunch.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/lunch");
       }
   });
});

module.exports = router;