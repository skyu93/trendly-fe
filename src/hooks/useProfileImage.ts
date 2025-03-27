import { useCallback, useState } from 'react';
import ProfileImage1 from '@/assets/profile/image-1.webp';
import ProfileImage2 from '@/assets/profile/image-2.webp';
import ProfileImage3 from '@/assets/profile/image-3.webp';
import ProfileImage4 from '@/assets/profile/image-4.webp';
import ProfileImage5 from '@/assets/profile/image-5.webp';
import { StaticImageData } from 'next/image';

// 프로필 이미지 배열
const PROFILE_IMAGES: StaticImageData[] = [ProfileImage1, ProfileImage2, ProfileImage3, ProfileImage4, ProfileImage5];

export default function useProfileImage() {
  const [imageMap, setImageMap] = useState<Map<number, StaticImageData>>(new Map());

  const getImageById = useCallback(
    (id: number): StaticImageData | undefined => {
      return imageMap.get(id);
    },
    [imageMap],
  );

  const getRandomImage = useCallback((): StaticImageData => {
    const randomIndex = Math.floor(Math.random() * PROFILE_IMAGES.length);
    return PROFILE_IMAGES[randomIndex];
  }, []);

  const saveImage = useCallback(
    (id: number, image?: HTMLImageElement): StaticImageData | undefined => {
      // 이미 있는 ID인지 확인
      if (imageMap.has(id)) {
        return;
      }

      // 랜덤 이미지 선택 및 저장
      const img = image || getRandomImage();
      if (img) {
        setImageMap(prev => {
          const newMap = new Map(prev);
          newMap.set(id, img);
          return newMap;
        });
      }

      return img;
    },
    [imageMap, getRandomImage],
  );

  return {
    getImageById,
    getRandomImage,
    saveImage,
  };
}
