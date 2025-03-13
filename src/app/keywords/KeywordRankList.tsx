'use client';

import { useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import KeywordRankCard from '@/app/keywords/keywordRankCard';
import SvgIcon from '@/components/icon/SvgIcon';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { map } from 'es-toolkit/compat';

interface Props {
  title: string;
  list: {
    rank: number;
    keyword: string;
  }[];
}
export default function KeywordRankList({ title, list }: Props) {
  const router = useRouter();
  const [activeRank, setActiveRank] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalTime = 1500;
  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setActiveRank(prevIndex => {
          if (prevIndex === null) {
            return 0;
          }
          return (prevIndex % list.length) + 1;
        });
      }, intervalTime);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, list, intervalTime, intervalRef.current]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center gap-1">
          <SvgIcon id="trend" color="primary" />
          <span className="text-greyscale-10 text-lg font-bold">{title}</span>
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-greyscale-40"
          onClick={() => router.push(ROUTE_PATH.KEYWORDS_FILTER)}
        >
          <div className="text-greyscale-20 text-sm">기간설정</div>
          <SvgIcon id="filter" size={12} color="greyscale-20" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {map(list, ({ rank, keyword }) => (
          <div key={keyword}>
            <KeywordRankCard rank={rank} keyword={keyword} activeRank={activeRank} setIsHovered={setIsHovered} />
            <Separator className="bg-greyscale-80" />
          </div>
        ))}
        {list.length > 0 && (
          <div className="h-[67px] flex flex-col items-end text-greyscale-60 mt-3 text-[10px]">
            <span>서비스에서 제공하는 키워드는 특정 기준에 따라 선정된 것으로</span>
            <span>실제 실시간 키워드와 다를 수 있습니다.</span>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
