'use client';

import { Splash } from '@/components/Splash';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized } = useAuth(true);

  // 인증 체크 중이거나 인증되지 않은 경우
  if (!isAuthorized) {
    return <Splash />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
}
