
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/vypaarjagat");

const User=mongoose.model("User",{email:String,password:String,role:String});
const Order=mongoose.model("Order",{productName:String,quantity:Number,role:String});

app.post("/login",async(req,res)=>{
 let user=await User.findOne(req.body);
 res.send(user||{});
});

app.post("/order",async(req,res)=>{
 let o=new Order(req.body);
 await o.save();
 res.send("ok");
});

app.get("/orders",async(req,res)=>{
 let data=await Order.find();
 res.send(data);
});

app.listen(5000,()=>console.log("Server running"));
