import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  
// 获取关系路径的显示名称函数
export function getRelationshipPathName(path: string[]): string {
  if (path.length === 0) return "";
  
}