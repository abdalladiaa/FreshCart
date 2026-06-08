import React from "react";
import AccountDetails from "../AccountDetails/AccountDetails";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";

export default function SettingsLayout() {
  return (
    <main className="flex-1 min-w-0">
      <div className="space-y-6">
        {/* Title Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your profile information and change your password
          </p>
        </div>

        {/* Profile Card Block */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <AccountDetails />
        </div>

        {/* Security / Password Block */}
        <ChangePasswordForm />
      </div>
    </main>
  );
}