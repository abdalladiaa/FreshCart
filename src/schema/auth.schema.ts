

import z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(15, { message: "Name must be at most 15 characters" })
    .nonempty({ message: "Name is required" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, symbol and be 8-20 characters long",
      },
    ),

  rePassword: z.string().nonempty({ message: "Confirm Password is required" }),

  phone: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^01[0-2,5][0-9]{8}$/, {
      message: "Invalid phone number, e.g., 01012345678",
    }),
}).refine((obj)=> obj.password == obj.rePassword , {
    path:["rePassword"],
    message:"Passwords do not match"
});

export type SignupSchemaType = z.infer< typeof signupSchema>

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, symbol and be 8-20 characters long",
      },
    ),
})

export type SigninSchemaType = z.infer< typeof signinSchema>