var express = require("express");
var router = express.Router({mergeParams:true});
var Lunch = require("../../models/lunch");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find lunch by id
    Lunch.findById(req.params.id, function(err, lunch){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: lunch, baseUrl: "/index/menu/lunch"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Lunch.findById(req.params.id, function(err, lunch){
       if(err){
           console.log(err);
           res.redirect("/index/menu/lunch");
       } else {
           //create new comment
           Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  lunch.comments.push(comment);
                  lunch.save();
                  req.flash("success", "Successfully Added Comment");
                  res.redirect("/index/menu/lunch/" + lunch._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Lunch.findById(req.params.id, function(err, foundLunch){
        if(err || !foundLunch){
            req.flash("error", "Cannot find lunch");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find lunch");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/menu/lunch"});
            }
        });
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/index/menu/lunch/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment Deleted");
           res.redirect("/index/menu/lunch/" + req.params.id);
       }
   });
});

module.exports = router;