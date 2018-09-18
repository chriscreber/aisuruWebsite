var express = require("express");
var router = express.Router({mergeParams:true});
var Sushi = require("../../models/sushi");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find sushi by id
    Sushi.findById(req.params.id, function(err, sushi){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: sushi, baseUrl: "/index/menu/sushi"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Sushi.findById(req.params.id, function(err, sushi){
       if(err){
           console.log(err);
           res.redirect("/index/menu/sushi");
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
                  sushi.comments.push(comment);
                  sushi.save();
                  req.flash("success", "Successfully Added Comment");
                  res.redirect("/index/menu/sushi/" + sushi._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Sushi.findById(req.params.id, function(err, foundSushi){
        if(err || !foundSushi){
            req.flash("error", "Cannot find sushi");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find sushi");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/menu/sushi"});
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
            res.redirect("/index/menu/sushi/" + req.params.id);
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
           res.redirect("/index/menu/sushi/" + req.params.id);
       }
   });
});

module.exports = router;