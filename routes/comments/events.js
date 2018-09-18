var express = require("express");
var router = express.Router({mergeParams:true});
var Event = require("../../models/events");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find lunch by id
    Event.findById(req.params.id, function(err, special){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: special, baseUrl: "/index/events"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Event.findById(req.params.id, function(err, special){
       if(err){
           console.log(err);
           res.redirect("/index/events");
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
                  special.comments.push(comment);
                  special.save();
                  req.flash("success", "Successfully Added Comment");
                  res.redirect("/index/events/" + special._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Event.findById(req.params.id, function(err, foundSpecial){
        if(err || !foundSpecial){
            req.flash("error", "Cannot find event");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find event");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/events"});
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
            res.redirect("/index/events/" + req.params.id);
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
           res.redirect("/index/events/" + req.params.id);
       }
   });
});

module.exports = router;