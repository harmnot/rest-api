const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authAsAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      // add user from payload
      if (decoded.role !== "Admin") {
        res.status(423).json({ msg: "only admin can do anything" });
      } else {
        req.user = decoded;
        next();
      }
    } catch (err) {
      res.status(400).json({ msg: "token is not valid" });
    }
  }
};

const authAsUniversal = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  } else {
    try {
      // add user from payload
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: "token is not valid" });
    }
  }
};

module.exports = { authAsAdmin, authAsUniversal };
