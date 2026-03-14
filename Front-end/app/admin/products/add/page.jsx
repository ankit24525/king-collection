"use client";

import { useState } from "react";
import API from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Plus,
  Trash2,
  Upload,
  Package
} from "lucide-react";

export default function AddProduct(){

const router = useRouter()

const [form,setForm] = useState({
title:"",
description:"",
brand:"",
category:"men",
section:"featured"
})

const [sizes,setSizes] = useState([
{size:"",color:"",price:"",stock:"",images:[]}
])

const submitHandler = async(e)=>{

e.preventDefault()

const formData = new FormData()

Object.keys(form).forEach(key=>{
formData.append(key,form[key])
})

formData.append("sizes",JSON.stringify(sizes))

sizes.forEach(size=>{
if(size.images){
size.images.forEach(img=>{
formData.append("images",img)
})
}
})

await API.post("/api/products",formData,{
headers:{
"Content-Type":"multipart/form-data"
}
})

alert("Product Added Successfully")

router.push("/admin/products")

}

return(

<div className="p-10 max-w-4xl">

<h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
<Package size={28}/>
Add Product
</h1>

<form onSubmit={submitHandler} className="flex flex-col gap-4">

{/* TITLE */}

<input
placeholder="Product Title"
className="border p-3 rounded"
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

{/* BRAND */}

<input
placeholder="Brand"
className="border p-3 rounded"
onChange={(e)=>setForm({...form,brand:e.target.value})}
/>

{/* DESCRIPTION */}

<textarea
placeholder="Description"
className="border p-3 rounded"
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

{/* CATEGORY */}

<select
className="border p-3 rounded"
onChange={(e)=>setForm({...form,category:e.target.value})}
>

<option value="men">Men</option>
<option value="women">Women</option>
<option value="kids">Kids</option>

</select>

{/* SECTION */}

<select
className="border p-3 rounded"
onChange={(e)=>setForm({...form,section:e.target.value})}
>

<option value="featured">Featured</option>
<option value="trending">Trending</option>
<option value="new">New</option>
<option value="bestseller">Best Seller</option>

</select>

{/* VARIANTS */}

<h2 className="font-semibold mt-6 text-lg">
Variants
</h2>

{sizes.map((s,i)=>(

<div key={i} className="border p-5 rounded-lg flex flex-col gap-3 bg-gray-50">

<input
placeholder="Size"
value={s.size || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].size=e.target.value
setSizes(newSizes)
}}
/>

<input
placeholder="Color"
value={s.color || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].color=e.target.value
setSizes(newSizes)
}}
/>

<input
placeholder="Price"
value={s.price || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].price=e.target.value
setSizes(newSizes)
}}
/>

<input
placeholder="Stock"
value={s.stock || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].stock=e.target.value
setSizes(newSizes)
}}
/>

{/* IMAGE UPLOAD */}

<label className="border p-3 rounded cursor-pointer flex items-center justify-center gap-2">

<Upload size={18}/>

Upload Variant Images

<input
type="file"
multiple
hidden
onChange={(e)=>{

const files = [...e.target.files]

setSizes(prev => {

const updated = [...prev]

updated[i] = {
 ...updated[i],
 images: files
}

return updated

alert(files.length + " image(s) selected")
})

}}
/>

</label>

{/* IMAGE PREVIEW */}

{s.images && s.images.length>0 &&(

<div className="flex gap-2 flex-wrap">

{s.images?.map((img,index)=>{

const src =
typeof img === "string"
? img
: URL.createObjectURL(img)

return (
<Image
key={index}
src={src}
width={70}
height={70}
alt="variant"
className="rounded"
/>
)

})}

</div>

)}

{/* DELETE VARIANT */}

<button
type="button"
className="text-red-500 flex items-center gap-2"
onClick={()=>{

const newSizes=[...sizes]
newSizes.splice(i,1)
setSizes(newSizes)

}}
>

<Trash2 size={16}/>
Delete Variant

</button>

</div>

))}

{/* ADD VARIANT */}

<button
type="button"
className="border p-3 rounded flex items-center justify-center gap-2"
onClick={()=>setSizes([
...sizes,
{size:"",color:"",price:"",stock:"",images:[]}
])}
>

<Plus size={18}/>

Add Variant

</button>

{/* SUBMIT */}

<button className="bg-black text-white p-3 rounded mt-4">

Add Product

</button>

</form>

</div>

)

}