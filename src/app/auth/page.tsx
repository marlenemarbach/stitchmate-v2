"use client";

import { useState } from "react";
import { wrap } from "motion/react";
import { Button } from "@/app/components/ui/Button";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { Slide, SlideDirection, Slider } from "../components/ui/Slide";

export default function Login() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [direction, setDirection] = useState<SlideDirection>(1);

  function setSlide(newDirection: SlideDirection) {
    const nextSlide = wrap(0, 2, activeSlide + newDirection);
    setActiveSlide(nextSlide);
    setDirection(newDirection);
  }

  const slides = [
    <Slide
      key="register-form"
      className="flex w-[calc(100vw_-_2rem)] max-w-sm flex-col gap-6 overflow-hidden rounded-xl bg-popup p-6 text-popup-foreground shadow-popup"
    >
      <h2 className="mb-3 text-center text-xl font-medium tracking-wide">
        Login to your Account
      </h2>
      <LoginForm />
      <div className="mt-3 border-t border-border/50">
        <p className="mx-auto -mt-3 w-fit bg-popup px-3 text-sm tracking-widest text-muted-foreground uppercase">
          or
        </p>
      </div>
      <Button
        onClick={() => setSlide(1)}
        variant="secondary"
        className="h-10 border-accent/70 text-sm text-accent ease-out hover:bg-pink-400/5"
      >
        Create Account
      </Button>
      <p className="text-center text-xs text-muted-foreground/50">
        Privacy information
      </p>
    </Slide>,
    <Slide
      key="login-form"
      className="flex w-[calc(100vw_-_2rem)] max-w-sm flex-col gap-6 overflow-hidden rounded-xl bg-popup p-6 text-popup-foreground shadow-popup"
    >
      <h2 className="mb-3 text-center text-xl font-medium tracking-wide">
        Create Account
      </h2>
      <SignupForm />
      <div className="flex items-center justify-center gap-2">
        Have an account?
        <button
          className="cursor-pointer text-accent/90 transition-colors duration-250 ease-out hover:text-accent"
          onClick={() => setSlide(-1)}
        >
          Login Here
        </button>
      </div>
    </Slide>,
  ];

  return <Slider direction={direction}>{slides[activeSlide]}</Slider>;
}
