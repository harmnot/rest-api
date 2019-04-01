const express = require("express");
const router = express.Router();
const { authAsAdmin, authAsUniversal } = require("../middleware/auth.js");

const { User } = require("../models/index.js");
const UserService = require("../controller/userService.js");

console.log(UserService);
router.get("/", authAsAdmin, UserService.getAll);
router.post("/", authAsAdmin, UserService.create);
router.get("/:id", authAsUniversal, UserService.getOne);
router.delete("/:id", authAsAdmin, UserService.destroy);
router.put("/:id", authAsUniversal);

router.use((err, req, res, next) => {
  console.log(err, "errr di middle");
  if (err.name == "SequelizeValidationError") {
    const theError = [];
    err.errors.forEach(error => {
      theError.push(error.message);
    });
    res.status(400).json({ msg: theError });
  } else {
    res.status(500).json({ databaseProblem: "something eror with database" });
  }
});

module.exports = router;
