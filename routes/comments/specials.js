var express = require("express");
var router = express.Router({mergeParams:true});
var Special = require("../../models/specials");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find lunch by id
    Special.findById(req.params.id, function(err, special){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: special, baseUrl: "/index/specials"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Special.findById(req.params.id, function(err, special){
       if(err){
           console.log(err);
           res.redirect("/index/specials");
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
                  res.redirect("/index/specials/" + special._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Special.findById(req.params.id, function(err, foundSpecial){
        if(err || !foundSpecial){
            req.flash("error", "Cannot find special");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find special");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/specials"});
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
            res.redirect("/index/specials/" + req.params.id);
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
           res.redirect("/index/specials/" + req.params.id);
       }
   });
});

module.exports = router;