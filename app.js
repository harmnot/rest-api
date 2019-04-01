require("dotenv").config();
const [flash, express, expressLayouts, ejs, cookiParser] = [
  require("connect-flash"),
  require("express"),
  require("express-ejs-layouts"),
  require("ejs"),
  require("cookie-parser")
];
const app = express();
const [users, sigin, sigup] = [
  require("./routes/user.js"),
  require("./routes/sigIn.js"),
  require("./routes/sigUp.js")
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/images", express.static("public/images"));

app.use("/api/sigin", sigin);
app.use("/api/sigup", sigup);
app.use("/api/users", users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`connected to http://localhost:${PORT}`);
});
