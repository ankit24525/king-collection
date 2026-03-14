// "use client";

// import Image from "next/image";
// import { useCart } from "@/context/CartContext";
// import { Trash2 } from "lucide-react";
// import Link from "next/link";

// export default function CartPage() {

//   const { cart = [], removeFromCart, updateQty } = useCart();

//   console.log(cart);

//   // TOTAL PRICE
//   const total = cart.reduce(
//     (acc, item) => acc + (item.product?.price || 0) * item.qty,
//     0
//   );

//   // EMPTY CART
//   if (!cart.length) {
//     return (
//       <div className="container mx-auto p-10 text-center">
//         <h2 className="text-2xl font-bold">Your cart is empty</h2>

//         <Link href="/" className="text-[#F8D6A4]">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen py-8">

//       <div className="container mx-auto grid lg:grid-cols-3 gap-6">

//         {/* CART ITEMS */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-lg">

//           <h2 className="text-2xl font-bold mb-6">
//             Shopping Cart
//           </h2>

//           {cart.map((item,index) => {

//             const productId = item.product;

//             const imageSrc =
//               item.product?.image && item.product.image.trim() !== ""
//                 ? item.product.image
//                 : "/placeholder.png";

//             return (
//               <div
//                 key={item._id}
//                 className="flex gap-4 border-b py-4"
//               >

//                 {/* PRODUCT IMAGE */}
//                 <div className="relative w-28 h-32">
//                   <Image
//                     src={imageSrc}
//                     fill
//                     alt={item.product?.title || "Product"}
//                     className="object-cover rounded"
//                   />
//                 </div>

//                 {/* PRODUCT INFO */}
//                 <div className="flex-1">

//                   <h3 className="font-semibold">
//                     {item.product?.title}
//                   </h3>

//                   <p className="text-green-600 text-sm">
//                     In Stock
//                   </p>

//                   {/* QUANTITY */}
//                   <div className="flex items-center gap-2 mt-3">

//                     <button
//                       onClick={() => updateQty(productId, "dec")}
//                       disabled={item.qty <= 1}
//                       className="border px-3 py-1 disabled:opacity-50"
//                     >
//                       -
//                     </button>

//                     <span>{item.qty}</span>

//                     <button
//                       onClick={() => updateQty(productId, "inc")}
//                       className="border px-3 py-1"
//                     >
//                       +
//                     </button>

//                   </div>

//                   {/* REMOVE */}
//                   <button
//                     onClick={() => removeFromCart(productId)}
//                     className="flex items-center gap-1 text-red-500 mt-3"
//                   >
//                     <Trash2 size={16} />
//                     Remove
//                   </button>

//                 </div>

//                 {/* PRICE */}
//                 <div className="font-bold text-lg">
//                   ₹{(item.product?.price || 0) * item.qty}
//                 </div>

//               </div>
//             );
//           })}

//         </div>

//         {/* ORDER SUMMARY */}
//         <div className="bg-white p-6 rounded-lg h-fit">

//           <h3 className="text-xl font-bold mb-4">
//             Order Summary
//           </h3>

//           <div className="flex justify-between mb-2">
//             <span>Total</span>
//             <span className="font-bold">
//               ₹{total}
//             </span>
//           </div>

//           <Link href="/checkout">
//             <button className="w-full mt-4 bg-[#F8D6A4] hover:bg-[#D4A574] py-3 rounded font-semibold">
//               Proceed to Checkout
//             </button>
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// }


"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {

  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 px-4">

        {/* LEFT SIDE CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">

          <h2 className="text-2xl font-bold">
            Shopping Bag ({cart.length})
          </h2>

          {cart.map((item, index) => {

            const product = item.product;

            const image =
              product?.image || "/placeholder.png";

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg flex gap-4 border"
              >

                {/* IMAGE */}
                <div className="relative w-28 h-32">
              <Image
  src={image}
  fill
  alt={product?.title || "product image"}
  className="object-cover"
/>
                </div>

                {/* PRODUCT INFO */}
                <div className="flex-1">

                  <h3 className="font-semibold">
                    {product?.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize || "M"}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-2 mt-3">

                    <button
                      onClick={() =>
                        updateQty(product._id, "dec")
                      }
                      className="border px-3 py-1"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(product._id, "inc")
                      }
                      className="border px-3 py-1"
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>

                </div>

                {/* PRICE */}
                <div className="font-bold">
                  ₹{product?.price * item.qty}
                </div>

              </div>
            );
          })}

        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white p-6 rounded-lg h-fit sticky top-24">

          <h3 className="font-bold text-lg mb-4">
            Price Details
          </h3>

          <div className="flex justify-between mb-2">
            <span>Total MRP</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹0</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full mt-4 bg-pink-500 text-white py-3 rounded">
            PLACE ORDER
          </button>

        </div>

      </div>

    </div>
  );
}