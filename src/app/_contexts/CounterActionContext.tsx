"use client";
import { createContext } from "react";
import { CounterAction } from "./counterReducer";

const CounterActionContext =
  createContext<React.Dispatch<CounterAction> | null>(null);

export default CounterActionContext;
