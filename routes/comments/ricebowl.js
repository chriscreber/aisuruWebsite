var express = require("express");
var router = express.Router({mergeParams:true});
var MenuItem = require("../../models/riceBowl");
var Comment = require("../../models/comment");
var middleware = require("../../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find a la carte by id
    MenuItem.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {menuItem: foundItem, baseUrl: "/index/menu/kitchen/ricebowl"});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup alacarte using ID
    MenuItem.findById(req.params.id, function(err, foundItem){
       if(err){
           console.log(err);
           res.redirect("/index/menu/kitchen/ricebowl");
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
                  foundItem.comments.push(comment);
                  foundItem.save();
                  req.flash("success", "Successfully Added Comment");
                  res.redirect("/index/menu/kitchen/ricebowl/" + foundItem._id);
              }
           });
       }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    MenuItem.findById(req.params.id, function(err, foundItem){
        if(err || !foundItem){
            req.flash("error", "Cannot find item");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Cannot find item");
                res.redirect("back");
            } else {
                res.render("comments/edit", {menuItem_id: req.params.id, comment: foundComment, baseUrl: "/index/menu/kitchen/ricebowl"});
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
            res.redirect("/index/menu/kitchen/ricebowl/" + req.params.id);
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
           res.redirect("/index/menu/kitchen/ricebowl/" + req.params.id);
       }
   });
});

module.exports = router;