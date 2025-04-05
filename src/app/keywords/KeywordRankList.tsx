'use client';

import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import KeywordRankCard from '@/app/keywords/keywordRankCard';
import { map } from 'es-toolkit/compat';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';
import { KeywordPlatformRanking } from '@/services/keyword/keywordsRanking.type';

interface Props {
  ranking: KeywordPlatformRanking[];
}
export default function KeywordRankList({ ranking }: Props) {
  const { filterPeriod } = useKeywordRankFilter();

  return (
    <ScrollArea className="flex-1 pr-3">
      {map(ranking, ({ rank, keywordName, roomId }) => (
        <div key={keywordName}>
          <KeywordRankCard rank={rank} roomId={roomId} keyword={keywordName} />
          <Separator className="bg-greyscale-80" />
        </div>
      ))}
      {ranking.length > 0 && (
        <div className="px-2 py-3 bg-greyscale-80 flex flex-col mt-3 mb-[30px] text-[10px] rounded-[12px]">
          <div className="flex text-greyscale-30">
            <span className="mr-2">•</span>
            <div className="flex flex-col">
              <span>서비스에서 제공하는 키워드는 특정 기준에 따라 선정된 것으로,</span>
              <span>실제 실시간 키워드와 다를 수 있습니다.</span>
            </div>
          </div>
          {filterPeriod !== 'realtime' && (
            <div className="flex text-primary-80 mt-3">
              <span className="mr-2">•</span>
              <div className="flex flex-col">
                <span>기간 필터 적용시, 키워드 별 채팅하기를 이용할 수 없습니다.</span>
                <span>채팅하기 서비스를 이용하시려면 실시간 키워드를 활용해 주세요.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </ScrollArea>
  );
}
