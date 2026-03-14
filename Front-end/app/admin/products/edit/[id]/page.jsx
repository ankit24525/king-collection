"use client";

import { useEffect,useState } from "react";
import API from "@/app/lib/api";
import { useRouter,useParams } from "next/navigation";
import Image from "next/image";

import {
Plus,
Trash2,
Upload,
Package
} from "lucide-react";

export default function EditProduct(){

const router = useRouter()
const {id}=useParams()

const [form,setForm]=useState({
title:"",
description:"",
brand:"",
category:"men",
section:"featured"
})

const [sizes,setSizes]=useState([])

useEffect(()=>{

const fetchProduct=async()=>{

const {data}=await API.get(`/api/products/${id}`)

setForm({
title:data.title,
description:data.description,
brand:data.brand,
category:data.category,
section:data.section
})

setSizes(data.sizes)

}

fetchProduct()

},[id])

const submitHandler=async(e)=>{

e.preventDefault()

const formData=new FormData()

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

await API.put(`/api/products/${id}`,formData,{
headers:{
"Content-Type":"multipart/form-data"
}
})

alert("Product Updated")

router.push("/admin/products")

}

return(

<div className="p-10 max-w-4xl">

<h1 className="text-3xl font-bold mb-6 flex items-center gap-2">

<Package size={28}/>
Edit Product

</h1>

<form onSubmit={submitHandler} className="flex flex-col gap-4">

<input
value={form.title}
className="border p-3 rounded"
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

<input
value={form.brand}
className="border p-3 rounded"
onChange={(e)=>setForm({...form,brand:e.target.value})}
/>

<textarea
value={form.description}
className="border p-3 rounded"
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<select
value={form.category}
className="border p-3 rounded"
onChange={(e)=>setForm({...form,category:e.target.value})}
>

<option value="men">Men</option>
<option value="women">Women</option>
<option value="kids">Kids</option>

</select>

<select
value={form.section}
className="border p-3 rounded"
onChange={(e)=>setForm({...form,section:e.target.value})}
>

<option value="featured">Featured</option>
<option value="trending">Trending</option>
<option value="new">New</option>
<option value="bestseller">Best Seller</option>

</select>

<h2 className="font-semibold mt-6 text-lg">
Variants
</h2>

{sizes.map((s,i)=>(

<div key={i} className="border p-5 rounded-lg flex flex-col gap-3 bg-gray-50">

<input
value={s.size || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].size=e.target.value
setSizes(newSizes)
}}
/>

<input
value={s.color || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].color=e.target.value
setSizes(newSizes)
}}
/>

<input
value={s.price || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].price=e.target.value
setSizes(newSizes)
}}
/>

<input
value={s.stock || ""}
className="border p-2 rounded"
onChange={(e)=>{
const newSizes=[...sizes]
newSizes[i].stock=e.target.value
setSizes(newSizes)
}}
/>

<label className="border p-3 rounded cursor-pointer flex items-center justify-center gap-2">

<Upload size={18}/>

Upload Images

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

})

}}
/>

</label>

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

<button className="bg-black text-white p-3 mt-4 rounded">

Update Product

</button>

</form>

</div>

)

}