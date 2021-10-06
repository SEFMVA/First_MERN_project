const _ = require("lodash");
// const fs = require("fs/promises");
const fs = require("fs").promises;
const Token = require("../models/Token");
const File = require("../models/File");
const User = require("../models/User");

exports.addFile = async (req, res) => {
  try {
    console.log("adding file");
    const { token, size, name } = req.body;

    const files = req.files;
    console.log(files);

    if (!files)
      return res.status(400).json({
        errors: [
          {
            file: "No file uploaded",
          },
        ],
      });

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

    const foundFilesForCalculateSpace = await File.find({ owner: userId });

    let usedSpace = 0;

    for (const { size } of foundFilesForCalculateSpace) {
      usedSpace += size;
    }
    if (usedSpace + parseInt(size) >= foundUser.maxSpace) {
      return res.status(400).json({
        errors: [
          {
            space: "out of free space",
          },
        ],
      });
    }

    _.forEach(_.keysIn(files), async (key) => {
      let sendFile = files[key];

      console.log(sendFile);

      const newFile = new File({
        name: name,
        owner: userId,
        path: "./file_upload",
        size: size, //TODO dont use user data
      });
      const nameOnServer = newFile._id;
      await fs.writeFile(`./file_upload/${nameOnServer}`, sendFile.buffer);
      newFile.save();
    });
    res.status(200).json({
      success: true,
      message: "files succesfully added",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      erros: err,
    });
  }
};
exports.getFile = async (req, res) => {
  console.log("trying to get file");

  try {
    const { token, fileID } = req.body;

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

    const foundFile = await File.findOne({ owner: userId, _id: fileID });

    res.sendFile(`${foundFile.path}/${foundFile._id}`, {
      root: `${__dirname}/../`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      erros: err,
    });
  }
};
exports.getSpace = async (req, res) => {
  console.log("trying to get space");
  try {
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

    const foundFiles = await File.find({ owner: userId });

    let usedSpace = 0;

    for (const { size } of foundFiles) {
      usedSpace += size;
    }

    return res.status(200).json({
      success: true,
      message: { maxSpace: foundUser.maxSpace, usedSpace: usedSpace },
    });
  } catch (error) {
    res.status(500).json({
      erros: error,
    });
  }
};

exports.getFileList = async (req, res) => {
  console.log("trying to get file list");
  try {
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

    const foundFiles = await File.find({ owner: userId });

    return res.status(200).json({
      success: true,
      message: foundFiles ? foundFiles : [],
    });
  } catch (error) {
    res.status(500).json({
      erros: error,
    });
  }
};
exports.deleteFile = async (req, res) => {
  console.log("trying to delete file");

  try {
    const { token, fileID } = req.body;

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

    const foundFile = await File.findOne({ owner: userId, _id: fileID });

    await fs.unlink(`${foundFile.path}/${foundFile._id}`);
    await File.deleteOne({ _id: fileID });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      erros: err,
    });
  }
};
