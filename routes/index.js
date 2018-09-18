var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var MyFavorites = require("../models/myFavorites");
var MyFavoritePoke = require("../models/myFavoritePoke");
var middleware = require("../middleware");

const crypto = require('crypto');

const secret = 'abcdefg';

const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey("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");

sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

const MY_TEMPLATE_ID = "d-c1caf229080f4ba99838e57870193f8e";

//root route
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/index", function(req, res){
   res.render("index"); 
});

// show register form
router.get("/register", function(req, res) {
    res.render("user/register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    if(req.body.email !== req.body.cemail){
        return res.render("user/register", {"error": "Email and Confirm Email do not match"});
    }
    if(req.body.password !== req.body.cpassword){
        return res.render("user/register", {"error": "Password and Confirm Password do not match"});
    }
    //Checks if email has already been taken
    var lowerEmail = req.body.email.toLowerCase();
    User.findOne({email: lowerEmail}, function(err, foundUser) {
        if(err){
            console.log(err);
            return res.render("user/register", {"error": "Something went wrong"});
        } else if(foundUser){
            return res.render("user/register", {"error": "User with that email already exists"});
        } else {
         //If email is not taken then it creates the user  
         var newUser = new User({username: req.body.username});
            //User.register adds user to db with its username and password
            //Checks to see if username is taken
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    //Flash message if username is taken
                    return res.render("user/register", {"error": err.message});
                }
                passport.authenticate("local")(req, res, function(){
                    //Adds email to user
                    User.findByIdAndUpdate(user._id, {email: lowerEmail}, function(err, foundUser){
                        if(err){
                            console.log(err);
                        }
                    });
                    req.flash("success", "Welcome to Aisuru " + user.username);
                    // SET UP MY FAVORITES SCHEMA FOR NEW USER
                    // General Favorites Set Up
                    MyFavorites.create({items: []}, function(err, myFavorite){
                        if(err){
                            console.log(err);
                        } else {
                            //add name + id
                            myFavorite.author.id = req.user._id;
                            myFavorite.author.username = req.user.username;
                            //save
                            myFavorite.save();
                        }
                    });
                    // Poke Favorites Set Up
                    MyFavoritePoke.create({items: []}, function(err, myFavoritePoke){
                        if(err){
                            console.log(err);
                        } else {
                            //add name + id
                            myFavoritePoke.author.id = req.user._id;
                            myFavoritePoke.author.username = req.user.username;
                            //save
                            myFavoritePoke.save();
                        }
                    });
                    res.redirect("/index"); 
                });
            });
        }
    });
    
});

//change password if user forgets
//GET ROUTE --- Allows user to provide email
router.get("/forgot", function(req, res){
    res.render("user/forgot");
});

//POST ROUTE --- Sends email to user if user exists
router.post("/forgot", function(req, res){
    var lowerEmail = req.body.email.toLowerCase();
    User.findOne({email: lowerEmail}, function(err, foundUser) {
        if(err || !foundUser){
            console.log(err);
            req.flash("error", "Could not find " + req.body.email + " in our database");
            res.redirect("/forgot");
        } else {
            console.log(foundUser);
            
            //creates a hash value to be used as token
            var current_date = (new Date()).valueOf().toString();
            var random = Math.random().toString();
            const hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
            
            //applying a hash token value and expiration time to the foundUser
            foundUser.resetPasswordToken = hash;
            foundUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            
            //saves changes in db
            foundUser.save();
            
            var msg = {
                from: "aisurusushislo@aisuru.com",
                templateId: MY_TEMPLATE_ID,
                personalizations: [
                    {
                    to: [
                        {
                        email: foundUser.email
                        }
                    ],
                    dynamic_template_data: {
                                username: foundUser.username,
                                base_url: req.protocol + '://' + req.get('host') + "/change_password",
                                token: foundUser.resetPasswordToken,
                                subject: "Forgotten Username/Password"
                            }
                        }
                    ]
            };
            sgMail.send(msg);
            req.flash("success", "Email has been sent to " + req.body.email);
            res.redirect("/index");
        }
    });
});

//GET ROUTE --- Displays users personal link to change password (link should be provided in email)
router.get("/change_password/:reset_token", function(req, res){
    User.findOne({resetPasswordToken: req.params.reset_token, resetPasswordExpires: {$gt: Date.now()}}, function(err, foundUser) {
        if(err || !foundUser) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            res.redirect('/forgot');
        } else{
            res.render("user/changePassword", {user: foundUser, reset_token: req.params.reset_token});
        }
    });
});

// PASSWORD UPDATE --- Updates users password
router.put("/change_password/:reset_token", function(req, res){
   User.findOne({resetPasswordToken: req.params.reset_token, resetPasswordExpires: {$gt: Date.now()}}, function(err, foundUser) {
        if(err || !foundUser) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            res.redirect('/forgot');
        } else{
            //Change password for foundUser and reset token/expiration
            console.log(req.body.password);
            foundUser.setPassword(req.body.password, function(err){
                if(err){
                    console.log(err);
                } else {
                    foundUser.resetPasswordToken = undefined;
                    foundUser.resetPasswordExpires = undefined; 
                    //save changes to foundUser
                    foundUser.save();
                }
            });
            
            //Send flash message and return to home
            req.flash('success', 'Password has been reset.');
            res.redirect("/index");
        }
    });
});
    
//show login form
router.get("/login", function(req, res){
    res.render("user/login");
});

//handlin login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/index",
        failureRedirect: "/login",
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Successfully Logged Out");
   res.redirect("/index");
});

// My Account routes
// GET ROUTE
router.get("/myAccount", middleware.isLoggedIn, function(req, res){
    MyFavorites.findOne({"author.id": req.user._id}, function(err, myFavorites){
        if(err) {
            console.log(err);
        } else {
            MyFavoritePoke.findOne({"author.id": req.user._id}, function(err, myFavoritePoke){
                if(err) {
                    console.log(err);
                } else {
                    res.render("user/myAccount", {myFavorites: myFavorites, myFavoritePoke: myFavoritePoke});
                }
            });
        }
    });
});

// MYFAVORITES UPDATE --- ADDS NEW ITEMS TO USER'S MyFavorites
router.put("/myFavorites/:menuItem", middleware.isLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    MyFavorites.findOne({"author.id": req.user._id}, function(err, myFavorites){
        if(err) {
            console.log(err);
        } else {
            if(myFavorites.items.map(function(item) { return item.name; }).indexOf(req.body.menuItem.name) === -1){
                myFavorites.items.push(req.body.menuItem);
                myFavorites.save();
                req.flash("success", "Added " + req.body.menuItem.name + " to My Favorites");
                res.redirect("back");
            } else {
                req.flash("error", req.body.menuItem.name + " is already in My Favorites");
                res.redirect("back");
            }
        }
    });
});

// router.post("/myFavoritePoke", function(req, res){
//   console.log("hi"); 
// });

router.put("/myFavoritePoke", middleware.isLoggedIn, function(req, res){
    console.log(req.body.menuItem);
    MyFavoritePoke.findOne({"author.id": req.user._id}, function(err, myFavoritePoke){
        if(err) {
            console.log("Problems with MyFavoritePoke: --- Finding User");
            console.log(err);
        } else {
            myFavoritePoke.items.push(req.body.menuItem);
            myFavoritePoke.save();
            req.flash("success", "Added poke to My Favorites");
            res.redirect("back");
        }
    });
});

// MYFAVORITES DESTROY --- DESTROYS CHOSEN ITEM IN USER'S MyFavorites
router.delete("/myFavorites/:menuItem", middleware.isLoggedIn, function(req, res){
    MyFavorites.findOne({"author.id": req.user._id}, function(err, myFavorites){
        if(err) {
            console.log(err);
        } else {
            var index = -1;
            for(var i = 0; i < myFavorites.items.length; i++){
                if(myFavorites.items[i].name === req.params.menuItem){
                    index = i;
                }
            }
            if(index !== -1){
                myFavorites.items.splice(index, 1);
            }
            
            myFavorites.save();
            req.flash("success", "Removed " + req.params.menuItem.name + " from My Favorites");
            res.redirect("back");
        }
    });
});

// MYFAVORITEPOKE DESTROY --- DESTROYS CHOSEN ITEM IN USER'S MyFavorites
router.delete("/myFavoritePoke/:pokeID", middleware.isLoggedIn, function(req, res){
    MyFavoritePoke.findOne({"author.id": req.user._id}, function(err, myFavorites){
        if(err) {
            console.log(err);
        } else {
            var index = -1;
            for(var i = 0; i < myFavorites.items.length; i++){
                if(myFavorites.items[i]._id == req.params.pokeID){
                    index = i;
                }
            }
            if(index !== -1){
                myFavorites.items.splice(index, 1);
            }
            
            myFavorites.save();
            req.flash("success", "Removed Poke Bowl from My Favorites");
            res.redirect("back");
        }
    });
});


module.exports = router;