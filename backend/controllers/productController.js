const Product = require("../models/Product");



// ======================
// GET PRODUCTS
// ======================

exports.getProducts = async (req,res)=>{

try{

const {category,section} = req.query

let filter = {}

if(category) filter.category = category
if(section) filter.section = section

const products = await Product
.find(filter)
.sort({createdAt:-1})

res.json(products)

}catch(error){

res.status(500).json({msg:error.message})

}

}



// ======================
// GET SINGLE PRODUCT
// ======================

exports.getProductById = async (req,res)=>{

try{

const product = await Product.findById(req.params.id)

if(!product){
return res.status(404).json({msg:"Product not found"})
}

res.json(product)

}catch(error){

res.status(500).json({msg:error.message})

}

}



// ======================
// CREATE PRODUCT
// ======================

exports.createProduct = async(req,res)=>{

try{

const {
title,
description,
brand,
category,
section,
colors,
sizes
} = req.body

const parsedColors = JSON.parse(colors)
const parsedSizes = JSON.parse(sizes)

let uploadedImages = []

if(req.files && req.files.length > 0){
uploadedImages = req.files.map(file => file.path)
}

const finalColors = parsedColors.map(color => ({

color: color.color,
images: uploadedImages

}))

const product = await Product.create({

title,
description,
brand,
category,
section,
colors: finalColors,
sizes: parsedSizes

})

res.status(201).json(product)

}catch(error){

console.log(error)

res.status(500).json({msg:error.message})

}

}



// ======================
// UPDATE PRODUCT
// ======================

exports.updateProduct = async(req,res)=>{

try{

const {
title,
description,
brand,
category,
section,
sizes
} = req.body

const parsedSizes = JSON.parse(sizes)

let uploadedImages=[]

if(req.files && req.files.length>0){
uploadedImages = req.files.map(file=>file.path)
}

const finalSizes = parsedSizes.map(size=>({

size:size.size,
color:size.color,
price:size.price,
stock:size.stock,

images: uploadedImages.length
? uploadedImages
: size.images || []

}))

const product = await Product.findByIdAndUpdate(

req.params.id,

{
title,
description,
brand,
category,
section,
sizes:finalSizes
},

{new:true}

)

res.json(product)

}catch(error){

console.log(error)

res.status(500).json({msg:error.message})

}

}



// ======================
// DELETE PRODUCT
// ======================

exports.deleteProduct = async (req,res)=>{

try{

await Product.findByIdAndDelete(req.params.id)

res.json({msg:"Product deleted"})

}catch(error){

res.status(500).json({msg:error.message})

}

}



// ======================
// SEARCH PRODUCTS
// ======================

exports.searchProducts = async (req,res)=>{

try{

const keyword = req.query.q
? { title:{ $regex:req.query.q,$options:"i"} }
: {}

const products = await Product.find(keyword)

res.json(products)

}catch(error){

res.status(500).json({msg:error.message})

}

}