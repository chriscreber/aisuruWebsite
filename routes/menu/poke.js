var express = require("express");
var router = express.Router();
var Poke = require("../../models/poke")
var middleware = require("../../middleware");

// INDEX
router.get("/", function(req, res){
    Poke.findOne(function(err, poke){
        if(err){
            console.log(err);
        } else{
            res.render("menu/poke/index", {poke: poke});
        }
    });
});

module.exports = router;