const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  items:[
    {
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
      qty:Number
    }
  ],

  totalPrice:Number,

  status:{
    type:String,
    default:"Pending"
  }

},
{timestamps:true}
)

module.exports =
mongoose.models.Order ||
mongoose.model("Order",orderSchema)