var express = require("express");
var router = express.Router();
var Event = require("../../models/events");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all specials items from DB
    Event.find({}, function(err, allItems){
        if(err) {
            console.log(err);
        } else {
            res.render("events/index", {eventItems:allItems});
        }
    });
});

//NEW
router.get("/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/events/new", {baseUrl: "/index/events"});
});

//CREATE
router.post("/", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    Event.create(req.body.menuItem, function(err){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Events created");
            res.redirect("/index/events");
        }
    });
});

//SHOW - shows more info about sushi
router.get("/:id", function(req,res){
    //find sushi with provided ID
    Event.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found");
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("events/show", {menuItem: foundItem, baseUrl: "/index/events"});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    Event.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/events/edit", {menuItem: foundItem, baseUrl: "/index/events"});
        }
    });
});

//UPDATE
router.put("/:id", middleware.isAdminLoggedIn, function(req, res){
    Event.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/events/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   Event.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/events");
       }
   });
});

module.exports = router;