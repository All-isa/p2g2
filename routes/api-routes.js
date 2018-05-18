// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");



module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phoneNumber: req.body.number,
      shopName: req.body.shopName,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip,
      profilePicture: req.body.profilePicture,
      short_bio: req.body.short_bio,
      portfolio_1: req.body.portfolio_1,
      portfolio_2: req.body.portfolio_2,
      portfolio_3: req.body.portfolio_3,
      portfolio_4: req.body.portfolio_4,
      portfolio_5: req.body.portfolio_5,
      portfolio_6: req.body.portfolio_6,
      portfolio_7: req.body.portfolio_7,
      portfolio_8: req.body.portfolio_8,
      portfolio_9: req.body.portfolio_9,
      portfolio_10: req.body.portfolio_10
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.put("/api/portfolio/:id", function (req, res) {

    db.User.update({
      portfolio_1: req.body.portfolio_1,
      portfolio_2: req.body.portfolio_2,
      portfolio_3: req.body.portfolio_3,
      portfolio_4: req.body.portfolio_4,
      portfolio_5: req.body.portfolio_5,
      portfolio_6: req.body.portfolio_6,
      portfolio_7: req.body.portfolio_7,
      portfolio_8: req.body.portfolio_8,
      portfolio_9: req.body.portfolio_9,
      portfolio_10: req.body.portfolio_10
    },
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbartist) {
        console.log("success");
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);
      });
  });

  app.put("/api/bio/:id", function (req, res) {

    db.User.update({
      short_bio: req.body.short_bio
    },
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbartist) {
        console.log("success");
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);
      });
  });

  app.put("/api/profilePic/:id", function (req, res) {

    db.User.update({
      profilePicture: req.body.profilePicture,
    },
      {
        where: {
          id: req.params.id
        }
      }).then(function (dbartist) {
        console.log("profile picture saved successfully");
        res.sendStatus(200);
      }).catch(function (err) {
        console.log(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.full_name,
        profilePicture: req.body.profilePicture,
        short_bio: req.body.short_bio,
        portfolio_1: req.user.portfolio_1,
        portfolio_2: req.user.portfolio_2,
        portfolio_3: req.user.portfolio_3,
        portfolio_4: req.user.portfolio_4,
        portfolio_5: req.user.portfolio_5,
        portfolio_6: req.user.portfolio_6,
        portfolio_7: req.user.portfolio_7,
        portfolio_8: req.user.portfolio_8,
        portfolio_9: req.user.portfolio_9,
        portfolio_10: req.body.portfolio_10
      });
    }
  });

  app.get("/artist", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.full_name,
        profilePicture: req.body.profilePicture,
        portfolio_1: req.user.portfolio_1,
        portfolio_2: req.user.portfolio_2,
        portfolio_3: req.user.portfolio_3,
        portfolio_4: req.user.portfolio_4,
        portfolio_5: req.user.portfolio_5,
        portfolio_6: req.user.portfolio_6,
        portfolio_7: req.user.portfolio_7,
        portfolio_8: req.user.portfolio_8,
        portfolio_9: req.user.portfolio_9,
        portfolio_10: req.body.portfolio_10
      });
    }
  });


  app.get("/api/search/:category", function (req, res) {
    console.log(req.body);
    db.User.findAll({
      where: {
        category: req.params.category,
        // color: req.params.color
      }
    }).then(function () {
      res.json(users);
    });
  });
};