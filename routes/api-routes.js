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
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (dbartist) {
      req.session.passport.user.portfolio_1 = req.body.portfolio_1;
      req.session.passport.user.portfolio_2 = req.body.portfolio_2;
      req.session.passport.user.portfolio_3 = req.body.portfolio_3;
      req.session.passport.user.portfolio_4 = req.body.portfolio_4;
      req.session.passport.user.portfolio_5 = req.body.portfolio_5;
      req.session.passport.user.portfolio_6 = req.body.portfolio_6;
      req.session.passport.user.portfolio_7 = req.body.portfolio_7;
      req.session.passport.user.portfolio_8 = req.body.portfolio_8;
      req.session.passport.user.portfolio_9 = req.body.portfolio_9;
      req.session.passport.user.portfolio_10 = req.body.portfolio_10;
      req.session.save(function (err) {
        console.log(err);
      });
      res.sendStatus(200);
      console.log("success");
    }).catch(function (err) {
      console.log(err);
    });
  });

  app.put("/api/bio/:id", function (req, res) {

    db.User.update({
      short_bio: req.body.short_bio
    }, {
      where: {
        id: req.params.id
      }
    }).then(function () {
      console.log("success");
      req.session.passport.user.short_bio = req.body.short_bio;
      req.session.save(function (err) {
        console.log(err);
      });
      res.sendStatus(200);
    }).catch(function (err) {
      console.log(err);
      // res.redirect("/members");
    });
  });

  app.put("/api/profilePic/:id", function (req, res) {

    db.User.update({
      profilePicture: req.body.profilePicture,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function () {
      console.log("profile picture saved successfully");

      // location.replace(data);
      req.session.passport.user.profilePicture = req.body.profilePicture;
      req.session.save(function (err) {
        console.log(err);
      });
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
    } else {
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

  app.get("/api/artist/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.full_name,
        short_bio: req.body.short_bio,
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

  app.put("/api/strengths/:id", function (req, res) {
    console.log("strengths passed");
    var cat = req.body.categories;

    db.User.update({
      strengths: JSON.stringify(req.body.categories),
      color: req.body.radio
    }, {
      where: {
        id: req.params.id
      },
    }).then(function (dbartist) {
      console.log("strengths");
      res.sendStatus(200);
    }).catch(function (err) {
      console.log(err);
    });
  });

  // app.put("/api/color/:id", function (req, res) {
  //   console.log("colors passed");
  //   db.User.update({
  //     color: req.body.color,
  //   },
  //     {
  //       where: {
  //         id: req.params.id
  //       },
  //     }).then(function (dbartist) {
  //       console.log("strengths");
  //       res.sendStatus(200);
  //     }).catch(function (err) {
  //       console.log(err);
  //     });
  // });


  app.get("/api/search/:color/:category", function (req, res) {
    // console.log(req.body);

    if (req.params.color == 2) { //if user choose "either", color does not matter
      db.User.findAll({
        where: {
          // color: req.params.color,
          strengths: {
            like: '%' + req.params.category + '%'
          }
        }
      }).then(function (users) {
        console.log(users);
        console.log(JSON.parse(users[0].dataValues.strengths));
        var userArr = [];
        for (var i = 0; i < users.length; i++) {
          users[i].dataValues.strengths = JSON.parse(users[i].dataValues.strengths);
          userArr.push(users[i].dataValues);
        }
        console.log(userArr);
        res.render("index", {
          users: userArr
        });
        // console.log(users.dataValues.strengths);
        // var str = user.dataValues.strengths;
        // JSON.parse(str);
        // console.log(str);

        // res.render("index", {
        //   users: userArr
        // });
      });
    } else {
      db.User.findAll({
        where: {
          color: req.params.color,
          strengths: {
            like: '%' + req.params.category + '%'
          }
        }
      }).then(function (users) {
        // console.log(users.strengths);
        console.log(users);
        console.log(JSON.parse(users[0].dataValues.strengths));
        var userArr = [];
        for (var i = 0; i < users.length; i++) {
          users[i].dataValues.strengths = JSON.parse(users[i].dataValues.strengths);
          userArr.push(users[i].dataValues);
        }
        console.log(userArr);
        res.render("index", {
          users: userArr
        });
        // var str = users.strengths;
        // JSON.parse({str});
        // console.log(str);
      }).catch(function (err) {
        console.log(err);
        res.render("index");
      });
    }
  });

  app.get("/artist/:id", function (req, res) {
    console.log("Artist API result is " + req.user);
    db.User.findOne({
      where: {
        id: req.params.id,
      }
    }).then(function (data) {
      // console.log(data);
      console.log(data.dataValues);
      console.log(JSON.parse(data.dataValues.strengths));
      // var dataArr = [];
      //   for (var i = 0; i < data.length; i++) {
          data.dataValues.strengths = JSON.parse(data.dataValues.strengths);
      //     dataArr.push(data[i].dataValues);
      //   }
      //   console.log(dataArr);
    // }
      res.render("artist", {
        artist: data.dataValues
      });
    });
    // res.render("artist", { user: req.user });
  });
};