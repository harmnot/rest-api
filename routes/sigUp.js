const express = require("express");
const router = express.Router();
const { authAsAdmin, authAsUniversal } = require("../middleware/auth.js");

const { User } = require("../models/index.js");
const UserService = require("../controller/userService.js");

router.post("/", UserService.create);

router.use((err, req, res, next) => {
  res.status(500).json({ database: "something error with database" });
});

module.exports = router;
