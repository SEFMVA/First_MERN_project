const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const { createJWT } = require("../utils/auth");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const errors = [];
  if (!name) {
    errors.push({
      name: "required",
    });
  }
  if (!email) {
    errors.push({
      email: "required",
    });
  }
  if (!emailRegexp.test(email)) {
    errors.push({
      email: "invalid",
    });
  }
  if (!password) {
    errors.push({
      password: "required",
    });
  }
  if (errors.length > 0) {
    return res.status(422).json({
      errors,
    });
  }
  User.findOne({
    email,
  })
    .then((user) => {
      if (user) {
        return res.status(422).json({
          errors: [
            {
              user: "email already exists",
            },
          ],
        });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
          isAdmin: isAdmin,
          maxSpace: 10000,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [
                    {
                      error: err,
                    },
                  ],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: err,
          },
        ],
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  let findByMail = true;
  if (!email) {
    errors.push({
      email: "required",
    });
  }
  if (!emailRegexp.test(email)) {
    findByMail = false;
  }
  if (!password) {
    errors.push({
      passowrd: "required",
    });
  }
  if (errors.length > 0) {
    return res.status(422).json({
      errors,
    });
  }

  let finderPromise;
  if (findByMail) {
    finderPromise = User.findOne({
      email: email,
    });
  } else {
    finderPromise = User.findOne({
      name: email,
    });
  }

  finderPromise
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [
            {
              user: "not found",
            },
          ],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              errors: [
                {
                  password: "incorrect",
                },
              ],
            });
          }

          const access_token = createJWT(user.email, user._id, "2 days");
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
              res.status(500).json({
                erros: err,
              });
            }
            if (decoded) {
              const token = new Token({
                token: access_token,
                owner: user._id,
              });
              token.save().catch((err) => {
                console.error(err);
              });
              return res.status(200).json({
                success: true,
                token: access_token,
                message: user,
              });
            }
          });
        })
        .catch((err) => {
          res.status(500).json({
            erros: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        erros: err,
      });
    });
};
