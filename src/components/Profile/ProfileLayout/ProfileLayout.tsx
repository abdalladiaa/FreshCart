import React from "react";
import AddressesSidebar from "../AddressesSidebar/AddressesSidebar";
import AddressLayout from "../Address/AddressLayout/AddressLayout";
import { getLoggedUserAddresses } from "@/services/profile/getLoggedUserAddresses/getLoggedUserAddresses";
import Features from "@/components/Features/Features";
import PageDescription from "@/components/PageDescription/PageDescription";
import { FaUser } from "react-icons/fa";
import SettingsLayout from "../Settings/SettingsLayout/SettingsLayout";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface ProfilePageProps {
  params: Promise<{ tab: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { tab } = await params;

  let addresses: Address[] = [];

  if (tab === "addresses") {
    try {
      const response = await getLoggedUserAddresses();
      addresses = response?.data || [];
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  }

return (
  <>
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageDescription description="Manage your addresses and account settings" page="My Account" icon = {<FaUser />} />
      {/* Main Content Area */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <AddressesSidebar />

            {/* Dynamic Tab Content */}
            <div className="flex-1">
              {tab === "addresses" && <AddressLayout addresses={addresses} />}

              {tab === "settings" && (
                <SettingsLayout/>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="border-t border-gray-100 bg-white">
        <Features />
      </div>
    </div>
  </>
  );
}
