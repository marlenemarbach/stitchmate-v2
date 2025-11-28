"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword,
} from "../lib/auth";
import { getUserByEmail } from "../lib/dal";

const AuthSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(12, { error: "Be at least 12 characters long" })
    .trim(),
});

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    const validatedFields = AuthSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: "A User with this email already exists",
        errors: { email: ["A user with this email already exists"] },
      };
    }

    const user = await createUser(email, password);
    if (!user) {
      return {
        success: false,
        error: "Failed to create user",
        message: "Failed to create user",
      };
    }

    await createSession(user.userId);

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      message: "An error occurred while signing up",
      error: "Failed to sign up",
    };
  }
}

export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    const validatedFields = AuthSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validatedFields.success)
      return {
        success: false,
        message: "Invalid email or password",
        errors: z.flattenError(validatedFields.error).fieldErrors,
      };

    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);
    if (!user) {
      // Prevent timing attack by verifying a fake hash
      await verifyPassword("fake", "different fake");
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    const verifiedPassword = await verifyPassword(user.password, password);
    if (!verifiedPassword) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: "An error occurred while signing in",
      error: "Failed to sign in",
    };
  }
}

export async function signOut(): Promise<void> {
  try {
    await deleteSession();
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out");
  } finally {
    redirect("/signin");
  }
}
