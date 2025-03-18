import { Suspense } from 'react';
import { Splash } from '@/components/Splash';
import OnBoarding from '@/app/about/OnBoarding';

export default function AboutPage() {
  return (
    <Suspense fallback={<Splash />}>
      <OnBoarding />
    </Suspense>
  );
}
