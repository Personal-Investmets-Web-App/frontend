import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tw(strings: TemplateStringsArray, ...values: any []) {
  const classString = strings.reduce((result, str, i) => {
    return result + str + (values[i] ? values [i] : '');
  }, '');
  return classString.trim();
}
