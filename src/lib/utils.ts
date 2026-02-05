import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateTimeSince(date: string) {
  const projectDate = new Date(date);
  const today = new Date();

  // Reset time to midnight
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const startOfGivenDate = new Date(
    projectDate.getFullYear(),
    projectDate.getMonth(),
    projectDate.getDate(),
  );

  const diffInMs = startOfToday.getTime() - startOfGivenDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(diffInDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}
