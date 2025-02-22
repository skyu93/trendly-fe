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
      className={`${className} w-full h-12 bg-greyscale-80 px-4 py-2 text-md rounded-md [&_svg]:size-5 transition-colors hover:bg-greyscale-60`}
    >
      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.957 3.333c-3.93 0-7.124 2.584-7.124 5.75 0 2 1.31 3.75 3.194 4.834l-.491 2.75 3.029-2c.41.083.9.083 1.31.083C14.805 14.75 18 12.167 18 9c.082-3.083-3.112-5.667-7.042-5.667z"
          fill="#fff"
        />
      </svg>
      <span className="text-white">카카오로 시작하기</span>
    </Button>
  );
}
