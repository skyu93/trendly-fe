import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import KeywordRankCard from '@/app/keywords/keywordRankCard';
import SvgIcon from '@/components/SvgIcon';

interface Props {
  title: string;
  list: {
    rank: number;
    keyword: string;
  }[];
}
export default function KeywordRankList({ title, list }: Props) {
  return (
    <div className="flex flex-col w-full h-full text-greyscale-10">
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center gap-1">
          <SvgIcon id="trend" color="primary" />
          <div>{title}</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-greyscale-20 text-sm">기간설정</div>
          <SvgIcon id="filter" size={12} color="greyscale-20" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {list.map(({ rank, keyword }) => (
          <div key={keyword}>
            <KeywordRankCard rank={rank} keyword={keyword} />
            <Separator className="bg-greyscale-80" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
