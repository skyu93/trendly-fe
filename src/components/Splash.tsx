import logoWithBrandImg from '@/assets/logo-with-brand.png';
import Image from 'next/image';

export function Splash() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background transition-opacity duration-500">
      <div className="animate-pulse">
        <Image src={logoWithBrandImg} alt="로고 이미지" />
      </div>
      <div className="mt-8">
        <span className="font-bold">당신의 생각이 트렌드가 되는 순간</span>
      </div>
    </div>
  );
}
