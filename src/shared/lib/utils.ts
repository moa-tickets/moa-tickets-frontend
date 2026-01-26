import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToKoreanDateTime(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const ampm = hours < 12 ? "오전" : "오후"
  const hour12 = hours % 12 || 12

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hour12}시`
}
