const Category = require("../models/Category")

// create category
exports.createCategory = async(req,res)=>{

try{

const category = await Category.create({
name:req.body.name
})

res.json(category)

}catch(error){

res.status(500).json({msg:error.message})

}

}

// get categories
exports.getCategories = async(req,res)=>{

const categories = await Category.find()

res.json(categories)

}