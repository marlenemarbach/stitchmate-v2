"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import {
  createGuestUser,
  createSession,
  createUser,
  deleteSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import { type ActionResponse } from "./types";

const AuthSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(12, { error: "Be at least 12 characters long" })
    .trim(),
});

export async function signUp(formData: FormData): Promise<ActionResponse> {
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
      error: "failed",
      message: "Failed to create user",
    };
  }

  await createSession(user.userId);

  return {
    success: true,
    message: "Account created successfully",
  };
}

export async function signIn(formData: FormData): Promise<ActionResponse> {
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
    const fakeHash = await hashPassword("different fake");
    await verifyPassword("fake", fakeHash);
    return {
      success: false,
      message: "Invalid email or password",
      error: "Invalid email or password",
    };
  }

  if (user.role === "guest") {
    return {
      success: false,
      message:
        "Guest accounts cannot log in. Please sign up for a full account.",
      error: "Guest login rejected",
    };
  }

  const verifiedPassword = await verifyPassword(password, user.password);
  if (!verifiedPassword) {
    return {
      success: false,
      message: "Invalid email or password",
      error: "Invalid email or password",
    };
  }

  const success = await createSession(user.id);
  if (success) {
    return { success: true, message: "signed in successfully" };
  }

  return {
    success: false,
    message: "Failed to login",
    error: "failed",
  };
}

export async function signInAsGuest(): Promise<ActionResponse> {
  const guestUser = await createGuestUser();
  if (!guestUser) {
    return {
      success: false,
      message: "Failed to create guest account",
      error: "failed",
    };
  }

  const success = await createSession(guestUser.userId);
  if (success) {
    return { success: true, message: "Signed in as guest" };
  }
  return {
    success: false,
    message: "Failed to create session",
    error: "failed",
  };
}

export async function signOut(): Promise<void> {
  try {
    await deleteSession();
  } finally {
    redirect("/login");
  }
}
