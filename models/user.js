// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    shopName: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "images/profileDefault-230.png)"
    },
    short_bio: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.BOOLEAN
    },
    strengths: {
      type: DataTypes.STRING
    },
    portfolio_1: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_2: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_3: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_4: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_5: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_6: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_7: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_8: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_9: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    },
    portfolio_10: {
      type: DataTypes.STRING,
      defaultValue: "http://via.placeholder.com/550x350"
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};