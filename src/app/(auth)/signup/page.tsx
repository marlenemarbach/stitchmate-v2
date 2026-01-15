"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SignupForm } from "@/components/SignupForm";

export default function Signup() {
  return (
    <motion.div
      className="flex w-[calc(100vw_-_2rem)] flex-1 flex-col items-center justify-center gap-6 self-center sm:w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="mb-3 text-center text-xl font-medium tracking-wide">
        Create Account
      </h2>
      <SignupForm />
      <div className="flex items-center justify-center gap-2 text-foreground/90">
        Have an account?
        <Link
          href="/login"
          className="cursor-default text-secondary-foreground underline-offset-3 hover:underline"
        >
          Login Here
        </Link>
      </div>
      <Link
        className="cursor-default text-xs text-foreground/60 underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
        href="/privacy"
      >
        Privacy information
      </Link>
    </motion.div>
  );
}
