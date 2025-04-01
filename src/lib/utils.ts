import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiPath } from '@/constants/apiPath';
import { template } from 'es-toolkit/compat';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPathParams = (path: ApiPath, params: Record<string, string | number>): string => {
  // lodash 템플릿 함수를 사용하여 경로 내 변수 대체
  const compiled = template(path, { interpolate: /\{([\s\S]+?)\}/g });
  return compiled(params);
};
