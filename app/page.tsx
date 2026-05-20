"use client";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SJDFormManagementSystem() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [orderType, setOrderType] = useState("");
  const [fabric, setFabric] = useState("");
  const [sleevesType, setSleevesType] = useState("");
  const [collarType, setCollarType] = useState("");
  const [sleevesBottomType, setSleevesBottomType] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");

    try {
      let fileUrl = "";

if (selectedFile) {
  const storageRef = ref(
    storage,
    `orders/${Date.now()}-${selectedFile.name}`
  );

  await uploadBytes(storageRef, selectedFile);

  fileUrl = await getDownloadURL(storageRef);
}
      await addDoc(collection(db, "orders"), {
        orderType,
        fabric,
        sleevesType,
        collarType,
        sleevesBottomType,
        dispatchDate,
        notes,
        status: "Pending",
        fileUrl,
fileName: selectedFile?.name || "",
        createdAt: new Date(),
      });

      // Reset Form
      setOrderType("");
      setFabric("");
      setSleevesType("");
      setCollarType("");
      setSleevesBottomType("");
      setDispatchDate("");
      setNotes("");
      setSelectedFile(null);

      setLoading(false);

      // Success Toast
      setSuccessMessage("✅ Order Submitted Successfully!");

      // Auto Remove Toast
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setLoading(false);

      setSuccessMessage("❌ Error submitting order");
    }
  };

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
    "Reebook Net",
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
    "Regular Collar with Buttons",
    "Regular Collar with Zip",
    "Rib collar with buttons",
    "Rib collar with zip",
    "Stand collar with zip",
    "Stand collar with button",
    "Old stand collar",
    "Round neck",
    "Regular Collar V",
    "Regular Collar without buttons",
  ];

  const sleevesBottom = [
    "Half sleeves 1 in patti",
    "piping 1 in up in bottom",
    "Full sleeves 1 in Patti",
    "Full sleeves 2 in rib",
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold animate-bounce">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-950 to-blue-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-black">
              SJD
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-wide">
                SJD Form Management System
              </h1>

              <p className="text-sm text-slate-300">
                Premium Sports Jersey Order Platform
              </p>
            </div>
          </div>

          <button className="bg-white text-slate-900 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition-all">
            Admin Login
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-blue-900 to-slate-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Sports Jersey Order Management
            </h2>

            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Professional mobile-friendly system for jersey order submission,
              design uploads, dispatch management, and admin tracking.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
              >
                Start New Order
              </button>

              <button
                type="button"
                className="border border-white/20 px-6 py-3 rounded-2xl font-semibold hover:bg-white/10 transition-all"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-900">
                New Jersey Order Form
              </h3>

              <p className="text-slate-500 mt-2">
                Fill all required details carefully.
              </p>
            </div>

            <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-xl font-bold">
              Order ID: SJD-2026-0001
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Order Type */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Order Type
              </label>

              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Order Type</option>

                {orderTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Fabric */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Select Fabric
              </label>

              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Fabric</option>

                {fabrics.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sleeves Type */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Sleeves Type
              </label>

              <select
                value={sleevesType}
                onChange={(e) => setSleevesType(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sleeves Type</option>

                {sleevesTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Collar Type */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Collar Type
              </label>

              <select
                value={collarType}
                onChange={(e) => setCollarType(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Collar Type</option>

                {collarTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sleeves Bottom */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Sleeves Bottom
              </label>

              <select
                value={sleevesBottomType}
                onChange={(e) => setSleevesBottomType(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sleeves Bottom</option>

                {sleevesBottom.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Dispatch Date */}
            <div className="space-y-2">
              <label className="font-bold text-slate-800">
                Dispatch Date
              </label>

              <input
                type="date"
                value={dispatchDate}
                onChange={(e) => setDispatchDate(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-bold text-slate-800">
                Required Design Upload
              </label>

              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center bg-slate-50 hover:border-blue-500 transition-all">
                <div className="text-5xl mb-4">📁</div>

                <h4 className="text-xl font-bold text-slate-900">
                  Upload Design Files
                </h4>

                <p className="text-slate-500 mt-2">
                  JPG, PNG, PDF, DOC supported.
                </p>

                <input
  type="file"
  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
  onChange={(e: any) => setSelectedFile(e.target.files[0])}
  className="mt-6 block mx-auto"
/>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-bold text-slate-800">
                Additional Notes
              </label>

              <textarea
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write additional requirements here..."
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-900 to-slate-950 text-white py-5 rounded-2xl text-xl font-black hover:scale-[1.01] transition-all shadow-2xl disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Jersey Order"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}