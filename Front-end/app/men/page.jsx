"use client";

import { useEffect,useState } from "react";
import API from "../lib/api";
import ProductCard from "../components/Productcard";

export default function MenPage(){

const [products,setProducts] = useState([])
const [price,setPrice] = useState(10000)

useEffect(()=>{

const fetchProducts = async()=>{

const {data} = await API.get("/api/products?category=men")

setProducts(data)

}

fetchProducts()

},[])

const filteredProducts = products.filter(
p => p?.sizes?.[0]?.price <= price
)

return(

<div className="container mx-auto px-4 py-10">

<h1 className="text-3xl font-bold mb-6">

Men's Fashion

</h1>

<input
type="range"
min="0"
max="10000"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="w-full mb-6"
/>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

{filteredProducts.map(product=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</div>

)

}