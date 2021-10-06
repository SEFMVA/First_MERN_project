const User = require("../models/User");
const File = require("../models/File");
const Token = require("../models/Token");

const fs = require("fs/promises");

exports.getUserList = async (req, res) => {
  try {
    console.log("admin is getting user list");
    const { token } = req.body;
    const foundToken = await Token.findOne({ token: token });
    if (!foundToken) {
      return res.status(404).json({
        errors: [
          {
            token: "not found",
          },
        ],
      });
    }
    const userId = foundToken.owner;

    const foundUser = await User.findOne({ _id: userId });
    const isAdmin = foundUser.isAdmin;
    if (!isAdmin)
      res.status(401).json({
        erros: "unauthorized",
      });

    const foundUsers = await User.find({});
    // console.log(foundUsers);
    res.status(200).json({
      users: foundUsers,
    });
  } catch (error) {
    res.status(500).json({
      erros: error,
    });
  }
};
exports.modifyUser = async (req, res) => {
  try {
    console.log("admin is moodyfing user");
    const { token, modyfiedUserId, modyfiedProperty, modyfiedPropertyValue } =
      req.body;
    const foundToken = await Token.findOne({ token: token });
    if (!foundToken) {
      return res.status(404).json({
        errors: [
          {
            token: "not found",
          },
        ],
      });
    }
    const userId = foundToken.owner;

    const foundUser = await User.findOne({ _id: userId });
    const isAdmin = foundUser.isAdmin;
    if (!isAdmin || modyfiedProperty === "_id")
      res.status(401).json({
        erros: "unauthorized",
      });
    let modifyerObj = {};
    modifyerObj[modyfiedProperty] = modyfiedPropertyValue;
    const updatedUser = await User.updateOne(
      { _id: modyfiedUserId },
      modifyerObj
    );
    console.log(updatedUser);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      erros: error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    console.log("admin is deleting user");
    const { token, deleteUserId } = req.body;
    const foundToken = await Token.findOne({ token: token });
    if (!foundToken) {
      return res.status(404).json({
        errors: [
          {
            token: "not found",
          },
        ],
      });
    }
    const userId = foundToken.owner;

    const foundUser = await User.findOne({ _id: userId });
    const isAdmin = foundUser.isAdmin;
    if (!isAdmin)
      res.status(401).json({
        erros: "unauthorized",
      });

    await User.deleteOne({ _id: deleteUserId });

    const foundFiles = await File.find({ owner: deleteUserId });

    for (const foundFile of foundFiles) {
      await fs.unlink(`${foundFile.path}/${foundFile._id}`);
      await File.deleteOne({ _id: foundFile._id });
    }
    const foundTokens = await Token.find({ owner: deleteUserId });

    for (const foundToken of foundTokens) {
      await File.deleteOne({ _id: foundToken._id });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      erros: error,
    });
  }
};
