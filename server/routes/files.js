const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const {
  addFile,
  getFile,
  getSpace,
  getFileList,
  deleteFile,
} = require("../controllers/files");

router.put("/addFile", upload.any(), addFile);
router.post("/getFile", getFile);
router.post("/getFileList", getFileList);
router.post("/getSpace", getSpace);
router.delete("/deleteFile", deleteFile);

module.exports = router;
