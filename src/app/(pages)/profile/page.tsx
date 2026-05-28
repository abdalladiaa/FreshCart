import PageDescription from "@/components/PageDescription/PageDescription";
import AddressCard from "@/components/Profile/AddressCard/AddressCard";
import AddressesSidebar from "@/components/Profile/AddressesSidebar/AddressesSidebar";
import { getLoggedUserAddresses } from "@/services/profile/getLoggedUserAddresses/getLoggedUserAddresses";
import { Plus } from "lucide-react";
import { FaUser } from "react-icons/fa";

export default async function Profile() {
  const userAddresses = (await getLoggedUserAddresses()).data;
  console.log(userAddresses);

  return (
    <>
      <PageDescription
        icon={<FaUser />}
        page={"My Account"}
        description={"Manage your addresses and account settings"}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <AddressesSidebar />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div>
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    My Addresses
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your saved delivery addresses
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer shrink-0">
                  <Plus size={16} />
                  <span>Add Address</span>
                </button>
              </div>

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAddresses.map((address) => (
                  <AddressCard key={address._id} address={address} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
