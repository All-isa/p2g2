var fs = require("fs");
module.exports = function (sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        img: {
            type: DataTypes.BLOB
        },
        file_name: {
            type: DataTypes.STRING
        }

    });
return Image;
};

var Ariza = {
    img: fs.readFileSync("./models/Ariza.jpg"),
    file_name: 'Ariza'
};

