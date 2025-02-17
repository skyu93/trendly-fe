import { Suspense } from 'react';
import { Splash } from '@/components/Splash';
import OnBoarding from '@/app/client/OnBoarding';

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { message: 'success' };
}

async function MyHome() {
  await fetchData();
  return <OnBoarding />
}

export default async function Home() {
  return (
    <Suspense fallback={<Splash />}>
      <MyHome />
    </Suspense>
  );
}
