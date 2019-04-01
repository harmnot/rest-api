require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
