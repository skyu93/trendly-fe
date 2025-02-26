import { usePathname, useSearchParams } from 'next/navigation';
import { isNil } from 'es-toolkit/compat';
import { useMemo } from 'react';
import { ROUTE_PAGE_META, RoutePath } from '@/constants/route';

export const usePageMeta = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageMeta = useMemo(() => {
    const [path] = pathname.split('?');
    const pageMeta = ROUTE_PAGE_META[path as RoutePath];

    if (isNil(pageMeta)) {
      return null;
    }
    return { ...pageMeta, pathname };
  }, [pathname]);

  const getSearchParams = (name: string) => {
    if (isNil(name)) {
      return '';
    }
    return searchParams.get(name) || '';
  };

  return {
    pageMeta,
    getSearchParams,
  };
};
