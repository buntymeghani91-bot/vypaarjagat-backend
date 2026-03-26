const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Cloud (Free)
mongoose.connect("mongodb+srv://admin:1234@cluster0.mongodb.net/vypaarjagat");

// Models
const User = mongoose.model("User", {
  email: String,
  password: String,
  role: String
});

const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

const Order = mongoose.model("Order", {
  product: String,
  qty: Number,
  status: String,
  seller: String
});

// LOGIN
app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body);
  res.send(user || {});
});

// PRODUCTS
app.get("/products", async (req, res) => {
  res.send(await Product.find());
});

// ORDER
app.post("/order", async (req, res) => {
  let order = new Order({...req.body, status:"Pending"});
  await order.save();
  res.send("Order Placed");
});

// ADMIN VIEW
app.get("/orders", async (req, res) => {
  res.send(await Order.find());
});

// ASSIGN SELLER
app.post("/assign", async (req, res) => {
  let {id, seller} = req.body;
  await Order.findByIdAndUpdate(id, {seller, status:"Assigned"});
  res.send("Assigned");
});

app.listen(5000);
