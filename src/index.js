const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collectin = require("./config");
const collectin2 = require("./productsdb");
const multer = require("multer");
const collectin3 = require("./message");

const app = express();
//convert data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("imag");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.static("static"));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/single", (req, res) => {
  res.render("single");
});

app.get("/onsale", (req, res) => {
  res.render("onsale");
});

app.get("/contactus", (req, res) => {
  res.render("contactus");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/home", (req, res) => {
  res.render("home");
});

//register user
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  //check if user already exist
  const existingUser = await collectin.findOne({ name: data.name });

  if (existingUser) {
    res.send("user already exist. please choose a different username");
  } else {
    //hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword; //replace the hash password with the original password

    const userdata = await collectin.insertMany(data);
    console.log(userdata);
  }
});
//login user
app.post("/login", async (req, res) => {
  try {
    const check = await collectin.findOne({ name: req.body.username });
    if (!check) {
      res.send("user name cannot found");
    }
    //compare the hash password with database
    const ispasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (ispasswordMatch) {
      res.render("home");
    } else {
      req.send("Wrong password");
    }
  } catch {
    res.send("wrong Details");
  }
});

//add product
app.post("/add", upload, async (req, res) => {
  const data2 = {
    name: req.body.productname,
    kind: req.body.cate,
    address: req.body.addre,
    phone: req.body.phonenumber,
    descrip: req.body.details,
    // images: req.file.filename,
  };
  const productdata = await collectin2.insertMany(data2);
  console.log(productdata);
  res.render("add");
});

//send message
app.post("/contactus", async (req, res) => {
  const data3 = {
    name: req.body.username,
    Email: req.body.email,
    address: req.body.addre,
    phone: req.body.phonenumber,
    Message: req.body.msg,
  };
  const messageData = await collectin3.insertMany(data3);
  console.log(messageData);
  res.render("contactus");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
