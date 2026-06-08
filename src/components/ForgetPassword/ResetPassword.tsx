"use client";
import React, { useState } from "react";
import { ForgotStep } from "./ForgetPasswordForm";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPasswordFunc } from "@/services/forgetPassword/resetPasswordFunc";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/schema/auth.schema";
import { useRouter } from "next/navigation";

interface ResetPasswordProps {
  setForm: React.Dispatch<React.SetStateAction<ForgotStep>>;
  email: string;
}

export default function ResetPassword({ setForm, email }: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      newPassword: "",
      rePassword: "",
    },
  });

  async function handleFunction(values: ResetPasswordSchemaType) {
    try {
      setLoading(true);

      const data = await resetPasswordFunc(values.email, values.newPassword);

      if (data) {
        toast.success("Password Reset Successfully");
        router.push("/signin");
        setForm("sendEmail")
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFunction)}>
      <input type="hidden" {...register("email")} />
      {/* New Password */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            {...register("newPassword")}
            className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none transition-all ${
              errors.newPassword
                ? "border-red-500 focus:ring-red-50"
                : "border-gray-200 focus:border-primary-500 focus:ring-primary-50"
            }`}
            placeholder="Enter new password"
            type={showPassword ? "text" : "password"}
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-xs font-medium">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("rePassword")}
            className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none transition-all ${
              errors.rePassword
                ? "border-red-500 focus:ring-red-50"
                : "border-gray-200 focus:border-primary-500 focus:ring-primary-50"
            }`}
            placeholder="Confirm new password"
            type={showConfirmPassword ? "text" : "password"}
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.rePassword && (
          <p className="text-red-500 text-xs font-medium">
            {errors.rePassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
}
