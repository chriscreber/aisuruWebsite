var express = require("express");
var router = express.Router();
var SpecialtyRoll = require("../../models/specialtyRoll");
var HalfRoll = require("../../models/halfRoll");
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    //Get all lunch items from DB
    SpecialtyRoll.find({}, function(err, allSpecialtyRolls){
        if(err) {
            console.log(err);
        } else {
            
            HalfRoll.find({}, function(err, allHalfRolls){
                if(err) {
                    console.log(err);
                } else {
                    
                    res.render("menu/sushiRolls/index", {specialtyRolls: allSpecialtyRolls, halfRolls: allHalfRolls});
                    
                }
            });
            
        }
    });
    
});

//SPECIALTY ROLL ROUTES
//NEW
router.get("/specialtyRoll/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/specialtyRolls/new", {baseUrl: "/index/menu/sushiRolls/specialtyRoll"});
});

//CREATE
router.post("/specialtyRoll", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    SpecialtyRoll.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/sushiRolls");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/specialtyRoll/:id", function(req,res){
    //find campground with provided ID
    SpecialtyRoll.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/sushiRolls/specialtyRolls/show", {menuItem: foundItem, baseUrl: "/index/menu/sushiRolls/specialtyRoll"});
        }
    });
});

//EDIT
router.get("/specialtyRoll/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    SpecialtyRoll.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/specialtyRolls/edit", {menuItem: foundItem, baseUrl: "/index/menu/sushiRolls/specialtyRoll"});
        }
    });
});

//UPDATE
router.put("/specialtyRoll/:id", middleware.isAdminLoggedIn, function(req, res){
    SpecialtyRoll.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/sushiRolls/specialtyRoll/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/specialtyRoll/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   SpecialtyRoll.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/sushiRolls");
       }
   });
});

//HALF PRICE ROLL ROUTES
//NEW
router.get("/halfRoll/new", middleware.isAdminLoggedIn, function(req, res) {
    res.render("admin/generic/new", {baseUrl: "/index/menu/sushiRolls/halfRoll"});
});

//CREATE
router.post("/halfRoll", middleware.isAdminLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    HalfRoll.create(req.body.menuItem, function(err, item){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Menu item created");
            res.redirect("/index/menu/sushiRolls");
        }
    });
});

// SHOW - shows more info about appetizer
router.get("/halfRoll/:id", function(req,res){
    //find campground with provided ID
    HalfRoll.findById(req.params.id).populate("comments").exec(function(err, foundItem){
        if(err || !foundItem) {
            console.log(err);
            req.flash("error", "Item not found")
            res.redirect("back");
        } else {
            //render show template with that lunch
            res.render("menu/sushiRolls/halfRolls/show", {menuItem: foundItem, baseUrl: "/index/menu/sushiRolls/halfRoll"});
        }
    });
});

//EDIT
router.get("/halfRoll/:id/edit", middleware.isAdminLoggedIn, function(req,res){
    HalfRoll.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            res.redirect("back");
        } else {
            res.render("admin/generic/edit", {menuItem: foundItem, baseUrl: "/index/menu/sushiRolls/halfRoll"});
        }
    });
});

//UPDATE
router.put("/halfRoll/:id", middleware.isAdminLoggedIn, function(req, res){
    HalfRoll.findByIdAndUpdate(req.params.id, req.body.menuItem, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/sushiRolls/halfRoll/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/halfRoll/:id", middleware.isAdminLoggedIn, function(req, res){
   //findByIdAndRemove
   HalfRoll.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Menu Item Deleted");
           res.redirect("/index/menu/sushiRolls");
       }
   });
});


module.exports = router;