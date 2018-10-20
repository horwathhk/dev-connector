const express = require("express"),
  app = express(),
  port = 5000 || process.env.PORT,
  users = require("./routes/api/users"),
  profile = require("./routes/api/profile"),
  posts = require("./routes/api/posts"),
  bodyParser = require("body-parser");
passport = require("passport");
path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Database
const mongoose = require("mongoose");
// URI = Uniform Resource Identifier, URL = UR Locator, URN = UR Name
const db = require("./config/keys").mongoURI;
//MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Social Dev Started on port ${port}!!`);
});
