'use client';
import SvgIcon from '@/components/SvgIcon';
import { usePageMeta } from '@/hooks/page-meta/usePageMeta';
import { Suspense } from 'react';

export function GlobalHeader() {
  return (
    <Suspense fallback={<div></div>}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const { pageMeta } = usePageMeta();
  return (
    pageMeta && (
      <header className="absolute top-0 left-0 right-0 z-10 h-[49px] flex items-center justify-center px-4">
        <SvgIcon id={pageMeta.icon} color="primary" className="absolute left-4" />
        {pageMeta.title}
      </header>
    )
  );
}
