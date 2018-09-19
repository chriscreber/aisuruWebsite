var express = require("express"), 
    app = express(), 
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    GoogleStrategy = require('passport-google-oauth').OAuthStrategy,
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    session = require('express-session'),
    seedDB = require("./seeds2");
    

    

//requiring routes --- not done yet
// COMMENT ROUTES
var sushiCommentRoutes = require("./routes/comments/sushi"),
    lunchCommentRoutes = require("./routes/comments/lunch"),
    aLaCarteCommentRoutes = require("./routes/comments/aLaCarte"),
    appetizerCommentRoutes = require("./routes/comments/appetizers"),
    saladCommentRoutes = require("./routes/comments/salads"),
    sideCommentRoutes = require("./routes/comments/sides"),
    kitchenEntreeCommentRoutes = require("./routes/comments/kitchenEntree"),
    ricebowlCommentRoutes = require("./routes/comments/ricebowl"),
    noodleCommentRoutes = require("./routes/comments/noodle"),
    specialtyRollCommentRoutes = require("./routes/comments/specialtyRolls"),
    halfRollCommentRoutes = require("./routes/comments/halfRolls"),
    specialsCommentRoutes = require("./routes/comments/specials"),
    eventsCommentRoutes = require("./routes/comments/events"),
    
    beverageCommentRoutes = require("./routes/comments/beverage"),

// INDEX ROUTES
    indexRoutes = require("./routes/index"),
    menuIndexRoutes = require("./routes/menu/index"),
    specialsIndexRoutes = require("./routes/specials/index"),
    eventsIndexRoutes = require("./routes/events/index"),
    
// MENU ROUTES
    appetizerRoutes = require("./routes/menu/appetizers"),
    beverageRoutes = require("./routes/menu/beverages"),
    kitchenRoutes = require("./routes/menu/kitchen"),
    lunchRoutes = require("./routes/menu/lunch"),
    pokeRoutes = require("./routes/menu/poke"),
    sushiRoutes = require("./routes/menu/sushi"),
    sushiRollRoutes = require("./routes/menu/sushiRolls");

//app setup
// mongoose.connect("mongodb://localhost/aisuru_v9");
mongoose.connect("mongodb://chris:YijPyofvirreyf3@ds161062.mlab.com:61062/aisuru");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Seed DB
// seedDB();


//PASSPORT CONFIGURATION --- maybe add google/facebook/yelp?
//changed from udemy using http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
app.use(session({
    secret: "Sushi is good!",
    // http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PASSPORT CONFIGURATION --- google --- NEED TO MAKE AN ACCOUNT AND FIGURE OUT A FEW THINGS
// passport.use(new GoogleStrategy({
//     consumerKey: GOOGLE_CONSUMER_KEY,
//     consumerSecret: GOOGLE_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));


// Auto Use
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


// ROUTES SECTION
// INDEX ROUTES
app.use("/", indexRoutes);
app.use("/index/menu", menuIndexRoutes);

// MENU ROUTES
app.use("/index/menu/appetizers", appetizerRoutes);
app.use("/index/menu/beverages", beverageRoutes);
app.use("/index/menu/kitchen", kitchenRoutes);
app.use("/index/menu/lunch", lunchRoutes);
app.use("/index/menu/poke", pokeRoutes);
app.use("/index/menu/sushi", sushiRoutes);
app.use("/index/menu/sushiRolls", sushiRollRoutes);

// SPECIAL ROUTES
app.use("/index/specials", specialsIndexRoutes);

// EVENTS ROUTES
app.use("/index/events", eventsIndexRoutes);

// COMMENT ROUTES
app.use("/index/menu/sushi/:id/comments", sushiCommentRoutes);
app.use("/index/menu/lunch/:id/comments", lunchCommentRoutes);
app.use("/index/menu/appetizers/alacarte/:id/comments", aLaCarteCommentRoutes);
app.use("/index/menu/appetizers/appetizer/:id/comments", appetizerCommentRoutes);
app.use("/index/menu/appetizers/salad/:id/comments", saladCommentRoutes);
app.use("/index/menu/appetizers/side/:id/comments", sideCommentRoutes);
app.use("/index/menu/kitchen/kitchenEntree/:id/comments", kitchenEntreeCommentRoutes);
app.use("/index/menu/kitchen/ricebowl/:id/comments", ricebowlCommentRoutes);
app.use("/index/menu/kitchen/noodle/:id/comments", noodleCommentRoutes);
app.use("/index/menu/sushiRolls/specialtyRoll/:id/comments", specialtyRollCommentRoutes);
app.use("/index/menu/sushiRolls/halfRoll/:id/comments", halfRollCommentRoutes);
app.use("/index/specials/:id/comments", specialsCommentRoutes);
app.use("/index/events/:id/comments", eventsCommentRoutes);

app.use("/index/menu/beverages/:id/comments", beverageCommentRoutes);



// Listening for connection
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});
