// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {


  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page, otherwise it loads the search page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("index", {user: req.user});
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members", {user: req.user});
    }
    res.render("login", {user: req.user});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members", {user: req.user});
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {user: req.user});
  });

  app.get("/about", function(req, res) {
    res.render("about", {user: req.user});
  });

  // app.get("/artist/:id", function(req, res) {
  //   console.log("Artist API result is " + req.user);
  //   res.render("artist", {user: req.user});
  // });

};
