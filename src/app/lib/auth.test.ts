import { setupTestDb } from "@/db/testSetup";
import { describe, expect, test } from "bun:test";
import { createUser } from "./auth";

setupTestDb();

describe("createUser", () => {
  test("it should create users", async () => {
    const result = await createUser("test@mail.com", "password");
    expect(result).toHaveProperty("userId");
  });
});
