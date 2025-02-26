'use client';
import SvgIcon from '@/components/SvgIcon';
import { usePageMeta } from '@/hooks/page-meta/usePageMeta';
import { Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function GlobalHeader() {
  return (
    <Suspense fallback={<div></div>}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const { pageMeta } = usePageMeta();
  const router = useRouter();
  const goBack = useCallback(() => {
    if (pageMeta?.canGoBack) {
      router.back();
    }
  }, [pageMeta, router]);
  return (
    pageMeta && (
      <header className="absolute top-0 left-0 right-0 z-10 h-[49px] flex items-center justify-center">
        <div onClick={goBack}>
          <SvgIcon id={pageMeta.icon} color="primary" className="absolute left-6" />
          <span>{pageMeta.title}</span>
        </div>
      </header>
    )
  );
}
