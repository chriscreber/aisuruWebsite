var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var User = require("../models/user");

// INDEX ROUTE
router.get("/", function(req, res){
    res.render("menu/index");
});

module.exports = router;