"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaSpinner, FaStar } from "react-icons/fa";
import { FaShieldHalved, FaTruckFast, FaUserPlus } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "@/schema/auth.schema";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleSignup(values: SignupSchemaType) {
    console.log(values);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.message === "success") {
        toast.success("Register Successfully");
        const signInResponse = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (signInResponse?.error) {
          console.error(signInResponse.error);
          router.push("/signin")
        } else {
          router.push("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // !=================PASSWORD STRENGTH LOGIC======================
  const calculateStrength = (pass: string) => {
    if (!pass) return 0;
    let points = 0;
    if (pass.length >= 8) points += 20;
    if (/[0-9]/.test(pass)) points += 20;
    if (/[a-z]/.test(pass)) points += 20;
    if (/[A-Z]/.test(pass)) points += 20;
    if (/[^A-Za-z0-9]/.test(pass)) points += 20;
    return points;
  };

  const passwordValue = form.watch("password", "");
  const strength = calculateStrength(passwordValue);

  console.log(strength);

  const getBarColor = (s: number) => {
    if (s <= 40) return "bg-red-500";
    if (s <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusLabel = (s: number) => {
    if (s === 0) return "";
    if (s <= 40) return "Weak";
    if (s <= 80) return "Medium";
    return "Strong";
  };

  return (
    <main className="py-10 bg-gray-50/30 min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 items-center">
        {/* Left Side: Content & Features */}
        <div className="  space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Welcome to <span className="text-primary-600">FreshCart</span>
            </h1>
            <p className="text-xl text-gray-600 mt-4 max-w-lg">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          {/* Features List - Inline Style */}
          <ul className="space-y-6 my-8">
            <li className="flex items-start gap-4">
              <div className="shrink-0 size-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl shadow-sm shadow-primary-50">
                <FaStar />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  Premium Quality
                </h2>
                <p className="text-gray-500 mt-1">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="shrink-0 size-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl shadow-sm shadow-primary-50">
                <FaTruckFast />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  Fast Delivery
                </h2>
                <p className="text-gray-500 mt-1">
                  Same-day delivery available in most areas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="shrink-0 size-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl shadow-sm shadow-primary-50">
                <FaShieldHalved />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  Secure Shopping
                </h2>
                <p className="text-gray-500 mt-1">
                  Your data and payments are completely secure.
                </p>
              </div>
            </li>
          </ul>

          {/* Testimonial Section */}
          <div className="review bg-white shadow-sm p-6 rounded-2xl border border-gray-100 max-w-md">
            <div className="author flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                SJ
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Sarah Johnson</h3>
                <div className="rating flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="italic text-gray-600 leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of
              the products is outstanding."
            </blockquote>
          </div>
        </div>

        {/* Right Side: Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10 border border-gray-50">
          <h2 className="text-center text-3xl font-semibold mb-2 text-gray-900">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500">
            Start your fresh journey with us today
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="space-y-6"
          >
            {/* Name Field */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Your Name"
                    className="rounded-xl h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                    placeholder="name@example.com"
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
                  <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
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

                  {/* Password Strength Bar UI */}
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      {/* الشريط الخارجي */}
                      <div className="grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        {/* الجزء المتحرك - هنا اللوجيك الفعلي */}
                        <div
                          className={`h-full transition-all duration-500 ease-out ${getBarColor(strength)}`}
                          style={{ width: `${strength}%` }}
                        ></div>
                      </div>

                      {/* نص الحالة (Weak/Medium/Strong) */}
                      {passwordValue && (
                        <span
                          className={`text-[11px] font-bold min-w-[45px] transition-colors duration-500 ${
                            strength <= 40
                              ? "text-red-500"
                              : strength <= 80
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {getStatusLabel(strength)}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-[11px] mt-1">
                      Must be at least 8 characters with numbers and symbols
                    </p>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Confirm Password*
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showRePassword ? "text" : "password"}
                      id={field.name}
                      placeholder="confirm your password"
                      className="rounded-xl h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className=" cursor-pointer absolute top-4.5 right-4.5"
                    >
                      {showRePassword ? <LuEye /> : <LuEyeClosed />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone Field */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                  <Input
                    {...field}
                    type="tel"
                    id={field.name}
                    placeholder="+1 234 567 8900"
                    className="rounded-xl h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-7 cursor-pointer text-lg bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-100 flex gap-2 transition-all active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating
                    Account...{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <FaUserPlus /> Create My Account
                  </>
                )}
              </span>
            </Button>
          </form>

          <p className="border-t pt-8 border-gray-100 mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary-600 hover:underline font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
