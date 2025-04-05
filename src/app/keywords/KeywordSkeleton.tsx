'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { map, times } from 'es-toolkit/compat';
import { memo } from 'react';

function KeywordSkeleton() {
  return (
    <ScrollArea className="flex-1 pr-3">
      {map(times(10), index => (
        <div key={`skeleton-${index}`}>
          <div className="flex items-center justify-between p-3 h-[67px] border-greyscale-10">
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div>
              <Skeleton className="h-10 w-[92px]" />
            </div>
          </div>
          <Separator className="bg-greyscale-80" />
        </div>
      ))}
    </ScrollArea>
  );
}

export default memo(KeywordSkeleton);
