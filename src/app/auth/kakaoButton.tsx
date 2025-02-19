'use client';

import { useAuth } from '@/hooks/auth/useAuth';

export default function KakaoButton() {
  const { getAuthUrl } = useAuth();

  const handleLogin = () => {
    window.location.href = getAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-[#FEE500] text-[#000000] px-4 py-2 rounded-md hover:bg-[#FDD835] transition-colors"
    >
      카카오로 시작하기
    </button>
  );
}
