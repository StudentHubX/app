import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName: string | undefined): string | undefined {
  const nameParts = fullName?.split(" ").filter((part) => part);
  const initials = nameParts?.map((part) => part[0].toUpperCase()).join("");
  return initials?.slice(0, 2);
}