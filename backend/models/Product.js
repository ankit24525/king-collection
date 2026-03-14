const mongoose = require("mongoose")

const sizeSchema = new mongoose.Schema({

size:String,
price:Number,
stock:Number

})

const colorSchema = new mongoose.Schema({

color:String,

images:[
{
type:String
}
]

})

const productSchema = new mongoose.Schema({

title:String,
description:String,
brand:String,
category:String,
section:String,

colors:[colorSchema],
sizes:[sizeSchema],

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Product",productSchema)