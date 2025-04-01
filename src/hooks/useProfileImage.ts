import ProfileImage1 from '@/assets/profile/image-1.webp';
import ProfileImage2 from '@/assets/profile/image-2.webp';
import ProfileImage3 from '@/assets/profile/image-3.webp';
import ProfileImage4 from '@/assets/profile/image-4.webp';
import ProfileImage5 from '@/assets/profile/image-5.webp';
import { StaticImageData } from 'next/image';
import { useCallback } from 'react';

// 프로필 이미지 배열
const PROFILE_IMAGES: StaticImageData[] = [ProfileImage1, ProfileImage2, ProfileImage3, ProfileImage4, ProfileImage5];

export default function useProfileImage() {
  const getRandomImage = useCallback((): StaticImageData => {
    const randomIndex = Math.floor(Math.random() * PROFILE_IMAGES.length);
    return PROFILE_IMAGES[randomIndex];
  }, []);

  return {
    getRandomImage,
  };
}
