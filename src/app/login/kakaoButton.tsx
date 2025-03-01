'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button/Button';

interface Props {
  className?: string;
}

export default function KakaoButton({ className }: Props) {
  const { getAuthUrl } = useAuth();

  const handleLogin = () => {
    window.location.href = getAuthUrl;
  };

  return (
    <Button
      onClick={handleLogin}
      className={`${className} w-full h-12 bg-[#FEE500] text-black font-bold text-[17px] rounded-[4px] transition-colors hover:bg-[#F6E10E] relative flex items-center justify-center`}
    >
      <div className="absolute left-4 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 0C7.1634 0 0 5.40859 0 12.0789C0 16.1784 2.76304 19.7476 7.03434 21.8386L5.25867 28.5043C5.15102 28.906 5.61248 29.2318 5.97714 29.0914L13.6277 23.9776C14.4153 24.064 15.2186 24.1098 16 24.1098C24.8366 24.1098 32 18.7011 32 12.0789C32 5.40859 24.8366 0 16 0Z"
            fill="black"
          />
        </svg>
      </div>
      <span className="text-[#191919]">카카오 로그인</span>
    </Button>
  );
}
