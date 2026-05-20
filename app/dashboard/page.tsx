"use client";

import { useState } from "react";

import { db, storage } from "../lib/firebase";

import { collection, addDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SJDFormManagementSystem() {

  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [orderType, setOrderType] = useState("");
  const [fabric, setFabric] = useState("");
  const [sleevesType, setSleevesType] = useState("");
  const [collarType, setCollarType] = useState("");
  const [sleevesBottomType, setSleevesBottomType] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");

  const [notes, setNotes] = useState("");

  const [designFile, setDesignFile] = useState<any>(null);

  const orderTypes = [
    "Front Sublimation",
    "Front Back Sublimation",
    "Full Back Sleeves Sublimation",
    "Front Back Sleeves and Collar Sublimation",
  ];

  const fabrics = [
    "Dryfit",
    "Advance Net / Dot Net",
    "Nirmal Net",
    "Combo",
    "Mono Stripe 1",
    "Mono Stripe 2",
    "Jaquard",
    "India Jaquard",
    "Zigzag / Lehariya",
    "Reebok Net",
    "Multiple Fabrics",
    "Feelgood",
  ];

  const sleevesTypes = [
    "Full Sleeves",
    "Half Sleeves",
    "Half and Full Mix",
    "Sleeveless",
  ];

  const collarTypes = [
    "Regular Collar with buttons",
    "Regular Collar with zip",
    "Rib collar with buttons",
    "Rib collar with zip",
    "Stand collar with zip",
    "Stand collar with button",
    "Old stand collar",
    "Round neck",
    "Regular Collar V",
    "Regular Collar without buttons",
  ];

  const sleevesBottoms = [
    "Half sleeves 1 in patti",
    "piping 1 in up in bottom",
    "Full sleeves 1 in Patti",
    "Full sleeves 2 in rib",
  ];

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setLoading(true);

    try {

      let fileURL = "";

      if (designFile) {

        const storageRef = ref(
          storage,
          `designs/${Date.now()}-${designFile.name}`
        );

        await uploadBytes(storageRef, designFile);

        fileURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "orders"), {

        orderNumber: `SJD-${Date.now()}`,

        customerName,
        mobileNumber,
        teamName,
        quantity,

        orderType,
        fabric,
        sleevesType,
        collarType,
        sleevesBottomType,
        dispatchDate,

        notes,

        fileURL,

        status: "Pending",

        createdAt: new Date(),
      });

      alert("Order Submitted Successfully 🔥");

      setCustomerName("");
      setMobileNumber("");
      setTeamName("");
      setQuantity("");

      setOrderType("");
      setFabric("");
      setSleevesType("");
      setCollarType("");
      setSleevesBottomType("");
      setDispatchDate("");

      setNotes("");

      setDesignFile(null);

    } catch (error) {

      console.log(error);

      alert("Error submitting order");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="bg-gradient-to-r from-black to-blue-900 rounded-3xl p-10 text-white shadow-2xl mb-10">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Sports Jersey Order Management
              </h1>

              <p className="text-lg text-gray-300">
                Professional mobile-friendly system for jersey order
                submission, design uploads, dispatch management, and admin
                tracking.
              </p>
            </div>

            <a
              href="/dashboard"
              className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl"
            >
              Admin Dashboard
            </a>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

          <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

            <div>

              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                New Jersey Order Form
              </h2>

              <p className="text-gray-500">
                Fill all required details carefully.
              </p>

            </div>

            <div className="bg-blue-100 text-blue-900 px-5 py-3 rounded-2xl font-bold">
              Order ID: SJD-{Date.now()}
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>
                <label className="block font-semibold mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter Customer Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Team Name
                </label>

                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter Team Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block font-semibold mb-2">
                  Order Type
                </label>

                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                >

                  <option value="">Select Order Type</option>

                  {orderTypes.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}

                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Select Fabric
                </label>

                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                >

                  <option value="">Select Fabric</option>

                  {fabrics.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}

                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Sleeves Type
                </label>

                <select
                  value={sleevesType}
                  onChange={(e) => setSleevesType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                >

                  <option value="">Select Sleeves Type</option>

                  {sleevesTypes.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}

                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Collar Type
                </label>

                <select
                  value={collarType}
                  onChange={(e) => setCollarType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                >

                  <option value="">Select Collar Type</option>

                  {collarTypes.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}

                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Sleeves Bottom
                </label>

                <select
                  value={sleevesBottomType}
                  onChange={(e) => setSleevesBottomType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                >

                  <option value="">Select Sleeves Bottom</option>

                  {sleevesBottoms.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}

                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Dispatch Date
                </label>

                <input
                  type="date"
                  value={dispatchDate}
                  onChange={(e) => setDispatchDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-4"
                  required
                />
              </div>

            </div>

            <div className="mt-10">

              <label className="block font-semibold mb-3">
                Required Design Upload
              </label>

              <div className="border-2 border-dashed border-blue-200 rounded-3xl p-10 text-center">

                <div className="text-6xl mb-4">📁</div>

                <h3 className="text-3xl font-bold mb-2">
                  Upload Design Files
                </h3>

                <p className="text-gray-500 mb-6">
                  JPG, PNG, PDF, DOC supported.
                </p>

                <input
                  type="file"
                  onChange={(e: any) =>
                    setDesignFile(e.target.files[0])
                  }
                  className="w-full"
                />

              </div>

            </div>

            <div className="mt-10">

              <label className="block font-semibold mb-2">
                Additional Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Write additional requirements here..."
                className="w-full border border-gray-300 rounded-2xl px-4 py-4"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-10 bg-gradient-to-r from-blue-800 to-black text-white py-5 rounded-2xl text-2xl font-bold hover:opacity-90 transition"
            >

              {loading ? "Submitting..." : "Submit Jersey Order"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}