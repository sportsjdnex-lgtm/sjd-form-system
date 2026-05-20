"use client";

import { useEffect, useState } from "react";

import { db } from "../../lib/firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const orderData: any[] = [];

      querySnapshot.forEach((docItem) => {
        orderData.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setOrders(orderData);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // UPDATE STATUS
  const updateStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      const orderRef = doc(db, "orders", orderId);

      await updateDoc(orderRef, {
        status: newStatus,
      });

      fetchOrders();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-950 to-blue-900 rounded-3xl p-8 text-white shadow-2xl mb-8">
        
        <h1 className="text-4xl font-black">
          SJD Admin Dashboard
        </h1>

        <p className="text-slate-300 mt-2">
          Manage all jersey orders professionally.
        </p>

      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

        {/* TOP BAR */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">

          <h2 className="text-2xl font-black text-slate-900">
            All Orders
          </h2>

          <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-xl font-bold">
            Total Orders: {orders.length}
          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="p-10 text-center text-xl font-bold">
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="p-10 text-center text-xl font-bold text-slate-500">
            No Orders Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1400px]">

              {/* TABLE HEADER */}
              <thead className="bg-slate-950 text-white">

                <tr>
                  <th className="text-left px-6 py-4">
                    Order Type
                  </th>

                  <th className="text-left px-6 py-4">
                    Fabric
                  </th>

                  <th className="text-left px-6 py-4">
                    Sleeves
                  </th>

                  <th className="text-left px-6 py-4">
                    Collar
                  </th>

                  <th className="text-left px-6 py-4">
                    Sleeves Bottom
                  </th>

                  <th className="text-left px-6 py-4">
                    Dispatch Date
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-left px-6 py-4">
                    Notes
                  </th>

                  <th className="text-left px-6 py-4">
                    File
                  </th>
                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {orders.map((order, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >

                    {/* ORDER TYPE */}
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {order.orderType}
                    </td>

                    {/* FABRIC */}
                    <td className="px-6 py-4">
                      {order.fabric}
                    </td>

                    {/* SLEEVES */}
                    <td className="px-6 py-4">
                      {order.sleevesType}
                    </td>

                    {/* COLLAR */}
                    <td className="px-6 py-4">
                      {order.collarType}
                    </td>

                    {/* SLEEVES BOTTOM */}
                    <td className="px-6 py-4">
                      {order.sleevesBottomType}
                    </td>

                    {/* DISPATCH */}
                    <td className="px-6 py-4">
                      {order.dispatchDate}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                        className="border border-slate-300 rounded-xl px-3 py-2 font-semibold bg-white"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Printing">
                          Printing
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Dispatched">
                          Dispatched
                        </option>

                      </select>

                    </td>

                    {/* NOTES */}
                    <td className="px-6 py-4 max-w-[250px]">
                      <div className="truncate">
                        {order.notes || "No Notes"}
                      </div>
                    </td>

                    {/* FILE */}
                    <td className="px-6 py-4">

                      {order.fileUrl ? (

                        <a
                          href={order.fileUrl}
                          target="_blank"
                          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-xl font-semibold transition"
                        >
                          View File
                        </a>

                      ) : (

                        <span className="text-slate-500">
                          No File
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}