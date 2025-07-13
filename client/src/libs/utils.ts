import { twMerge, type ClassNameValue } from "tailwind-merge";

export function cn(...classNames: Array<ClassNameValue>) {
  return twMerge(classNames);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
