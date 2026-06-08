"use client";
import React, { useState } from "react";
import { User, Save } from "lucide-react";

export default function ProfileInfoForm() {
  const [name, setName] = useState("abdalla diaa");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile info:", { name, email, phone });
  };

  return (
    <div className="p-6 sm:p-8 border-b border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Profile Information</h3>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
