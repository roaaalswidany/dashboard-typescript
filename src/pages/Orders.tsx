import { useEffect, useState } from "react";

interface Order {
  id: number;
  productName: string;
  quantity: number;
  status: string;
  date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);
  }, []);

  if (orders.length === 0)
    return (
      <div className="text-black dark:text-white text-center mt-20">
        <h2 className="text-2xl font-semibold">No orders placed yet.</h2>
        <p>Place some orders and they will appear here.</p>
      </div>
    );

  return (
    <div className="text-black dark:text-white container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Your Orders</h1>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Order ID</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Product</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Quantity</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Status</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.id}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.productName}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.quantity}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.status}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;