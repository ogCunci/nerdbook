import * as z from "zod";

export const signupValidation = z
  .object({
    name: z.string().min(2, { message: "Too short" }),
    username: z.string().min(2, { message: "Too short" }).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/.*[0-9].*/, {
        message: "Password must contain at least one number. ",
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const signinValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
