"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/schema/auth.schema";
import { changePassword } from "@/services/changePassword/changePassword";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  async function handleChangePassword(values: ChangePasswordSchemaType) {
    try {
      setIsLoading(true);
      const response = await changePassword(values);
      console.log(response);

      if (response.message == "success") {
        toast.success("Password Changed Successfully");
        reset()
      } else if (response.errors) {
        toast.error(response.errors.msg);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error updating password:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-6 sm:p-8">
        {/* Card Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100/50 shrink-0">
            <Lock size={22} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Change Password</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              Update your account password
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-6 max-w-2xl"
        >
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative group">
              <input
                {...register("currentPassword")}
                type={showCurrent ? "text" : "password"}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs font-medium mt-1.5 pl-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative group">
              <input
                {...register("password")}
                type={showNew ? "text" : "password"}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password ? (
              <p className="text-red-500 text-xs font-medium mt-1.5 pl-1">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1 font-medium pl-1">
                • Must be 8-20 characters and include uppercase, lowercase,
                number, and symbol
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative group">
              <input
                {...register("rePassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.rePassword && (
              <p className="text-red-500 text-xs font-medium mt-1.5 pl-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-600/20 cursor-pointer text-sm min-w-[160px] justify-center"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Lock size={16} />
              )}
              <span>{isLoading ? "Saving..." : "Change Password"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
