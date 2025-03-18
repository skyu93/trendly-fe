import { Suspense } from 'react';
import { Splash } from '@/components/Splash';
import KakaoCallback from '@/app/auth/KakaoCalback';

export default function AuthPage() {
  return (
    <Suspense fallback={<Splash />}>
      <KakaoCallback />
    </Suspense>
  );
}
