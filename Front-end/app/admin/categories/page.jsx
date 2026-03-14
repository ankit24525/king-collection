"use client"

import axios from "axios"
import {useState,useEffect} from "react"

export default function Categories(){

const [name,setName] = useState("")
const [categories,setCategories] = useState([])

const fetchCategories = async()=>{

const res = await axios.get(
"http://localhost:5000/api/categories"
)

setCategories(res.data)

}

useEffect(()=>{
fetchCategories()
},[])

const addCategory = async(e)=>{

e.preventDefault()

await axios.post(
"http://localhost:5000/api/categories",
{name},
{withCredentials:true}
)

setName("")
fetchCategories()

}

return(

<div className="p-10">

<h1 className="text-2xl font-bold mb-6">
Categories
</h1>

<form onSubmit={addCategory} className="flex gap-3">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="New Category"
/>

<button className="bg-black text-white px-4 py-2">
Add
</button>

</form>

<div className="mt-6">

{categories.map((cat)=>(
<p key={cat._id}>{cat.name}</p>
))}

</div>

</div>

)

}