const Order = require("../models/Order")

exports.createOrder = async(req,res)=>{

const order = await Order.create({
user:req.user._id,
items:req.body.items,
totalPrice:req.body.totalPrice
})

res.status(201).json(order)

}