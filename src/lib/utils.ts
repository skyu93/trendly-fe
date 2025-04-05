import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiPath } from '@/constants/apiPath';
import { template } from 'es-toolkit/compat';
import { StaticImageData } from 'next/image';
import ProfileImage1 from '@/assets/profile/image-1.webp';
import ProfileImage2 from '@/assets/profile/image-2.webp';
import ProfileImage3 from '@/assets/profile/image-3.webp';
import ProfileImage4 from '@/assets/profile/image-4.webp';
import ProfileImage5 from '@/assets/profile/image-5.webp';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPathParams = (path: ApiPath, params: Record<string, string | number>): string => {
  // lodash 템플릿 함수를 사용하여 경로 내 변수 대체
  const compiled = template(path, { interpolate: /\{([\s\S]+?)\}/g });
  return compiled(params);
};

const PROFILE_IMAGES: StaticImageData[] = [ProfileImage1, ProfileImage2, ProfileImage3, ProfileImage4, ProfileImage5];
export const getRandomImage = (): StaticImageData => {
  const randomIndex = Math.floor(Math.random() * PROFILE_IMAGES.length);
  return PROFILE_IMAGES[randomIndex];
};
