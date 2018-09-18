//all middleware goes here
var middlewareObj = {};
// var Campground = require("../models/campground");
var Comment = require("../models/comment");

// middlewareObj.checkCampgroundOwnership = function(req, res, next) {
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err || !foundCampground){
//                 req.flash("error", "Campground Not Found");
//                 res.redirect("back");
//             } else {
//                 //does user own campground?
//                 if(foundCampground.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                      req.flash("error", "You Don't Have Permission To Do That");
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         req.flash("error", "You Have To Be Logged In To Do That");
//         res.redirect("back");
//     }
// }

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err  || !foundComment){
                req.flash("error", "Comment Not Found");
                res.redirect("back");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Don't Have Permission To Do That");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Have To Be Logged In To Do That");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Have To Be Logged In To Do That");
    res.redirect("/login");
}

middlewareObj.isAdminLoggedIn = function(req, res, next){
    if(req.isAuthenticated() && req.user.username === "admin"){
        return next();
    }
    req.flash("error", "You Have To Be The Administrator In To Do That");
    res.redirect("/login");
}

module.exports = middlewareObj;