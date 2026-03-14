"use client";

import { useEffect,useState } from "react";
import API from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function AdminProducts(){

const [products,setProducts] = useState([])

useEffect(()=>{

const fetchProducts = async()=>{

const {data} = await API.get("/api/products")

setProducts(data)

}

fetchProducts()

},[])


const deleteProduct = async(id)=>{

if(!confirm("Delete this product?")) return

await API.delete(`/api/products/${id}`)

setProducts(products.filter(p=>p._id!==id))

}

return(

<div className="p-10">

{/* HEADER */}

<div className="flex justify-between items-center mb-6">

<h1 className="text-2xl font-bold">
Admin Products
</h1>

<Link
href="/admin/products/add"
className="bg-black text-white px-4 py-2 rounded"
>
Add Product
</Link>

</div>

{/* TABLE */}

<table className="w-full border">

<thead>

<tr className="border bg-gray-100">

<th className="p-2">Image</th>
<th>Title</th>
<th>Category</th>
<th>Section</th>
<th>Price</th>
<th>Stock</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{products.map(product=>(

<tr key={product._id} className="border text-center">

<td className="p-2">

<Image
src={product?.sizes?.[0]?.images?.[0] || "/placeholder.png"}
width={60}
height={60}
alt="product"
/>

</td>

<td>{product.title}</td>

<td>{product.category}</td>

<td>{product.section}</td>

<td>₹{product?.sizes?.[0]?.price || 0}</td>

<td>{product?.sizes?.[0]?.stock || 0}</td>

<td className="flex justify-center gap-3 py-2">

<Link
href={`/admin/products/edit/${product._id}`}
className="bg-blue-500 text-white px-3 py-1 rounded"
>
Edit
</Link>

<button
onClick={()=>deleteProduct(product._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}