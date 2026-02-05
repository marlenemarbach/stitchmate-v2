import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
// import { connection } from "next/server";
import * as jose from "jose";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { users } from "@/db/schema";

type JWTPayload = {
  userId: string;
  [key: string]: string | number | boolean | null | undefined;
};

const secretValue = process.env.JWT_SECRET;

const JWT_SECRET = new TextEncoder().encode(secretValue);
const JWT_EXPIRATION = "7d";
const REFRESH_THRESHOLD = 24 * 60 * 60; // 24 hours in seconds

export async function hashPassword(password: string) {
  return Bun.password.hash(password, {
    algorithm: "bcrypt",
  });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return Bun.password.verify(password, hashedPassword);
}

export async function createUser(
  email: string,
  password: string,
): Promise<{ userId: string } | null> {
  const hashedPassword = await hashPassword(password);
  const id = nanoid();

  const result = await db
    .insert(users)
    .values({
      id,
      email,
      password: hashedPassword,
    })
    .returning({ userId: users.id });
  return result[0];
}

export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

    return payload as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15,
    });

    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);

    return exp - now < REFRESH_THRESHOLD;
  } catch {
    return false;
  }
}

export async function createSession(userId: string): Promise<boolean> {
  try {
    const token = await generateJWT({ userId: userId });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });
    return true;
  } catch (error) {
    console.error("Error creating session", error);
    return false;
  }
}

export const getSession = cache(async () => {
  // await connection();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;
  const payload = await verifyJWT(token);

  return payload ? { userId: payload.userId } : null;
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
