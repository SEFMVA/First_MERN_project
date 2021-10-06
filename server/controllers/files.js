const _ = require("lodash");

//TODO authorisation middleware

const Token = require("../models/Token");
const File = require("../models/File");

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

    _.forEach(_.keysIn(files), (key) => {
      let sendFile = files[key];

      console.log(sendFile);

      const newFile = new File({
        name: name,
        owner: userId,
        path: "../file_upload/",
        size: size,
      });
      const nameOnServer = newFile._id;
      console.log(nameOnServer);
      newFile.save();
      sendFile.mv("../file_upload/" + nameOnServer);
    });
    res.status(200).json({
      success: true,
      message: "files succesfully added",
    });
  } catch (err) {
    res.status(500).json({
      erros: err,
    });
  }
};
exports.getFile = (req, res) => {
  try {
    res.send({});
  } catch (err) {
    res.status(500).json({
      erros: err,
    });
  }
};
exports.getSpace = (req, res) => {};
exports.getFileList = (req, res) => {};
exports.deleteFile = (req, res) => {};
