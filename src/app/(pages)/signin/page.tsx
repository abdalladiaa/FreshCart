"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signinSchema, SigninSchemaType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaClock,
  FaShieldAlt,
  FaSpinner,
  FaStar,
  FaTruck,
  FaUserPlus,
} from "react-icons/fa";
import signinImage from "../../../../public/assets/2e5810ff3e-e750761ebcd4ae5907db.png";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: SigninSchemaType) {
    try {
      setLoading(true);

      const data = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (data?.ok) {
        toast.success("Signin Successfully");
        
        router.push("/");
      } else {
        toast.error(data?.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="py-10 bg-gray-50/30 min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 items-center">
        {/* Left Side: Content & Features */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={signinImage.src}
                alt="FreshCart Illustration"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              {/* Quick Info Icons */}
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-primary-600" /> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-primary-600" /> Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary-600" /> 24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10 border border-gray-50">
          <h2 className="text-center text-3xl font-semibold mb-2 text-gray-900">
            <span className="font-bold">
              <span className=" text-primary-600">Fresh</span>Cart
            </span>
            <br />
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-5">
            Sign in to continue your fresh shopping experience
          </p>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-6"
          >
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id={field.name}
                    placeholder="ali@example.com"
                    className="rounded-xl h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password Field with Strength Bar */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between">
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                    <Link
                      href={"/forget-password"}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      placeholder="create a strong password"
                      className="rounded-xl h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className=" cursor-pointer absolute top-4.5 right-4.5"
                    >
                      {showPassword ? <LuEye /> : <LuEyeClosed />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-7 cursor-pointer text-lg bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-100 flex gap-2 transition-all active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                {loading ? (
                  <>
                    {" "}
                    <FaSpinner className="animate-spin" /> Signing In...{" "}
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
            </Button>
          </form>

          <p className="border-t pt-8 border-gray-100 mt-8 text-center text-gray-600">
            New to FreshCart?{" "}
            <Link
              href="/signup"
              className="text-primary-600 hover:underline font-bold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
