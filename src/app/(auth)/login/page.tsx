"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LoginForm } from "@/components/LoginForm";
import { LinkButton } from "@/components/ui/Button";

export default function Login() {
  return (
    <motion.div
      className="flex w-[calc(100vw_-_2rem)] flex-1 flex-col items-center justify-center gap-6 self-center sm:w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="mb-3 text-center text-xl font-medium tracking-wide">
        Log in to Stitchmate
      </h1>
      <LoginForm />
      <div className="mt-3 w-[calc(100%-0.5rem)] border-t border-border/60">
        <p className="mx-auto -mt-3 w-fit bg-background px-3 text-sm tracking-widest text-muted-foreground uppercase">
          or
        </p>
      </div>
      <LinkButton className="h-10 w-full" variant="secondary" href="/signup">
        Create account
      </LinkButton>
      <LinkButton className="h-10 w-full" variant="secondary" href="/demo">
        Continue as guest
      </LinkButton>
      <p className="text-center text-xs text-balance text-muted-foreground/50">
        You can explore stitchmate as a guest but your work won&apos;t be saved.{" "}
        <Link
          className="cursor-default rounded text-foreground/60 underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
          href="/signup"
        >
          Sign up
        </Link>{" "}
        anytime.
      </p>
      <Link
        className="cursor-default text-xs text-foreground/60 underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none"
        href="/privacy"
      >
        Privacy information
      </Link>
    </motion.div>
  );
}
