import { getUserId } from "@/utils/getUserId";
import { getUserRole } from "@/utils/getUserRole";
import React from "react";

interface AccountDetailsProps {
  userId?: string;
  role?: string;
}

export default async function AccountDetails() {
    const userId = await getUserId()
    const userRole = await getUserRole()
    
  return (
    <div className="p-6 sm:p-8 bg-gray-50">
      <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500 shrink-0">User ID</span>
          <span className="font-mono text-gray-700 break-all select-all">{userId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Role</span>
          <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
            {userRole}
          </span>
        </div>
      </div>
    </div>
  );
}