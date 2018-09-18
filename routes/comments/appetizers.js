var express = require("express");
var router = express.Router({mergeParams:true});
var Appetizer = require("../../models/appetizer");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find a la carte by id
    Appetizer.findById(req.params.id, function(err, appetizer){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: appetizer, baseUrl: "/index/menu/appetizers/appetizer"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup alacarte using ID
    Appetizer.findById(req.params.id, function(err, appetizer){
       if(err){
           console.log(err);
           res.redirect("/index/menu/appetizers/appetizer");
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
                  appetizer.comments.push(comment);
                  appetizer.save();
                  req.flash("success", "Successfully Added Comment");
                  res.redirect("/index/menu/appetizers/appetizer/" + appetizer._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Appetizer.findById(req.params.id, function(err, foundAppetizer){
        if(err || !foundAppetizer){
            req.flash("error", "Cannot find appetizer");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find appetizer");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/menu/appetizers/appetizer"});
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
            res.redirect("/index/menu/appetizers/appetizer/" + req.params.id);
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
           res.redirect("/index/menu/appetizers/appetizer/" + req.params.id);
       }
   });
});

module.exports = router;