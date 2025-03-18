import KeywordTabs from '@/app/keywords/KeywordTabs';
import { Suspense } from 'react';
import { Splash } from '@/components/Splash';

export default function Main() {
  return (
    <Suspense fallback={<Splash />}>
      <KeywordTabs />
    </Suspense>
  );
}
