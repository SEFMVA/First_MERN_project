const express = require("express");
const router = express.Router();
const { getUserList, modifyUser, deleteUser } = require("../controllers/admin");

router.post("/getUserList", getUserList);
router.post("/modifyUser", modifyUser);
router.post("/deleteUser", deleteUser);

module.exports = router;
