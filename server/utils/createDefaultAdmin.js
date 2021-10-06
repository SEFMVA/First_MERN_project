const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.createDefaultAdmin = () => {
  User.findOne({ name: "admin" }).then((user) => {
    if (!user) {
      {
        const password = "admin";

        const user = new User({
          name: "admin",
          email: "example@example.com",
          password: password,
          isAdmin: true,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save().catch((err) => {
              console.error(err);
            });
          });
        });
      }
    }
  });
};
