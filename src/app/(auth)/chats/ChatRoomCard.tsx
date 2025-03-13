import { Button } from '@/components/ui/button/Button';
import { isNotNil } from 'es-toolkit';

interface Props {
  title: string;
  userCount?: number;
}

export default function ChatRoomCard({ title, userCount }: Props) {
  return (
    <div className="group flex items-center justify-between px-3 h-[67px] rounded-lg hover:bg-greyscale-20">
      <div className="flex flex-col items-start">
        <span className="group-hover:text-greyscale-90">{title}</span>
        {isNotNil(userCount) && <span className="text-xs text-primary-40">{userCount}명 참여중</span>}
      </div>
      <Button
        variant="outline"
        className="py-2 px-3 border-greyscale-80 bg-greyscale-90 text-greyscale-20 group-hover:text-primary-60"
      >
        <span>채팅하기</span>
      </Button>
    </div>
  );
}
