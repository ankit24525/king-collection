"use client";

import { useEffect, useState } from "react";
import API from "@/app/lib/api";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const { data } = await API.get("/api/admin/orders");

        setOrders(data);

      } catch (error) {

        console.error("Orders error:", error);

      }

    };

    fetchOrders();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Orders
      </h1>

      <div className="bg-white p-6 shadow rounded">

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (

          orders.map((order) => (

            <div
              key={order._id}
              className="border-b py-3 flex justify-between"
            >
              <span>Order ID: {order._id}</span>
              <span>Total: ₹{order.totalPrice}</span>
            </div>

          ))

        )}

      </div>

    </div>

  );
}