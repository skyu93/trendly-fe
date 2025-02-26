import { Button } from '@/components/ui/button/Button';
import SvgIcon from '@/components/SvgIcon';

interface Props {
  rank: number;
  keyword: string;
}
export default function KeywordRankCard({ rank, keyword }: Props) {
  return (
    <div className="group flex items-center justify-between h-[67px] py-[18px] rounded-lg hover:cursor-pointer hover:bg-greyscale-20">
      <div className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-greyscale-80 text-greyscale-10 flex items-center justify-center group-hover:bg-greyscale-10 group-hover:text-greyscale-90">
          {rank}
        </div>
        <span className="ml-[6px]">{keyword}</span>
      </div>
      <Button
        variant="outline"
        className="py-2 px-3 border-greyscale-80 text-greyscale-20 group-hover:pointer-events-none group-hover:text-primary-60 group-hover:bg-greyscale-80"
      >
        채팅하기
        <SvgIcon id="add-chat" />
      </Button>
    </div>
  );
}
