import { users } from "@/db/schema";
import { setupTestDb } from "@/db/testSetup";
import { describe, expect, mock, test } from "bun:test";
import { eq } from "drizzle-orm";
import { signUp } from "./auth";

const testDb = setupTestDb();

type CookieOptions = {
  name: string;
  value: string;
  [key: string]: string | number | boolean | Date | undefined;
};

const cookieStore: Record<string, string> = {};

mock.module("next/headers", () => ({
  cookies: async () => ({
    set: (cookieOptions: CookieOptions) => {
      cookieStore[cookieOptions.name] = cookieOptions.value;
    },
    get: (key: string): string => cookieStore[key],
    delete: (key: string) => {
      delete cookieStore[key];
    },
  }),
}));

function createFormData(email: string, password: string): FormData {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  return formData;
}

describe("signUp", () => {
  test.each([
    {
      email: "invalid",
      password: "invalid",
      success: false,
      errors: ["email", "password"],
    },
    {
      email: "user@mail.com",
      password: "invalid",
      success: false,
      errors: ["password"],
    },
    {
      email: "invalid",
      password: "validpasswordlength",
      success: false,
      errors: ["email"],
    },
    {
      email: "user@mail.com",
      password: "validpasswordlength",
      success: true,
      errors: [],
    },
  ])(
    "validates user credentials with email=$email and password=$password",
    async ({ email, password, success, errors }) => {
      const formData = createFormData(email, password);
      const result = await signUp(formData);
      expect(result.success).toBe(success);

      if (errors.length) {
        errors?.forEach((error) => expect(result.errors).toHaveProperty(error));
      }
    },
  );

  test("failes when user already exists", async () => {
    await testDb()
      .insert(users)
      .values({ id: "testId", email: "test@mail.com", password: "password" });
    const signUpResult = await signUp(
      createFormData("test@mail.com", "password"),
    );
    expect(signUpResult.success).toBe(false);
  });

  test("signs up new users successfully", async () => {
    const user = {
      email: "user@mail.com",
      password: "secretPassword",
    };
    const result = await signUp(createFormData(user.email, user.password));
    const userInDb = await testDb().query.users.findFirst({
      where: eq(users.email, user.email),
    });
    expect(result.success).toBe(true);
    expect(userInDb?.email).toEqual(user.email);
  });

  test("creates a session on signup", async () => {
    await signUp(createFormData("user@mail.com", "secretPassword"));
    const sessionCookie = cookieStore["auth_token"];
    expect(sessionCookie).toBeDefined();
  });
});
