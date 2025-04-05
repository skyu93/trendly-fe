'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { memo } from 'react';
import { map, times } from 'es-toolkit/compat';

function ChatRoomSkeleton() {
  return (
    <ScrollArea className="flex-1 pr-3">
      {map(times(10), index => (
        <div key={`skeleton-${index}`}>
          <div className="flex items-center justify-between p-3 h-[67px] border-greyscale-10">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-[14px] w-12" />
            </div>
            <div>
              <Skeleton className="h-[31px] w-[82px]" />
            </div>
          </div>
          <Separator className="bg-greyscale-80" />
        </div>
      ))}
    </ScrollArea>
  );
}
export default memo(ChatRoomSkeleton);
