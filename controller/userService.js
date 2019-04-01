const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  static getAll(req, res, next) {
    User.findAll()
      .then(getUsers => {
        if (getUsers.length == 0) {
          res.status(404).json({ msg: `none users yet` });
        } else {
          res.status(302).json({ students: getUsers });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static create(req, res, next) {
    User.findOne({ where: { username: req.body.username } })
      .then(getUser => {
        if (getUser) {
          res.status(302).json({ msg: "user already exist" });
        } else {
          return User.create({ ...req.body });
        }
      })
      .then(created => {
        res.status(201).json({ created: `succesfully created user` });
      })
      .catch(err => {
        next(err);
      });
  }

  static getOne(req, res, next) {
    User.findOne({
      where: {
        id: +req.params.id
      }
    })
      .then(oneUser => {
        if (!oneUser) {
          res.status(404).json({ msg: "none such user" });
        } else {
          res.status(200).json({ user: oneUser });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static destroy(req, res, next) {
    User.findByPk(+req.params.id)
      .then(getUser => {
        if (!getUser) {
          res.status(404).json({ msg: `none such user ${req.params.id}` });
        } else {
          return User.destroy({ where: { id: +req.params.id } });
        }
      })
      .then(deleted => {
        res.status(200).json({ msg: `succesfully deleted ` });
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    User.findByPk(+req.params.id)
      .then(getUser => {
        if (!getUser) {
          res.status(404).json({ msg: "none such student" });
        } else {
          return User.update(req.body, { where: { id: +req.params.id } });
        }
      })
      .then(updated => {
        res.status(202).json({ updated: `your profile updated now` });
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { username, password } = req.body;
    User.findOne({
      where: {
        username
      }
    })
      .then(getUser => {
        if (!getUser) {
          res.status(404).json({ msg: "you are not registered yet" });
        } else {
          bcrypt.compare(password, getUser.password, (err, isMatch) => {
            if (err) {
              res
                .status(500)
                .json({ msg: `sorry that we can't handle your request` });
            }

            if (isMatch) {
              jwt.sign(
                {
                  id: getUser.id,
                  username: getUser.username,
                  role: getUser.role
                },
                process.env.SECRET_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) res.status(500).json({ msg: err });
                  res.status(202).json({
                    token,
                    user: { ...getUser.toJSON() }
                  });
                }
              );
            } else {
              res.status(400).json({ msg: "incorrect password" });
            }
          });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserService;
