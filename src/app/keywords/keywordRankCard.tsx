import SvgIcon from '@/components/icon/SvgIcon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button/Button';
import { useRef, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input/Input';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

interface Props {
  rank: number;
  keyword: string;
}

function ChatDialog({ open, onClose }: { open: boolean; onClose: (open: boolean) => void }) {
  const actionState = useRef(false);
  return (
    <AlertDialog open={open} onOpenChange={() => onClose(actionState.current)}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>닉네임 설정</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src="logo.svg" className="bg-greyscale-20" />
            </Avatar>
            <Input className="mt-4 mb-6" placeholder="닉네임을 입력해주세요." dataType="count" />
            <span className="text-xs text-greyscale-30">닉네임은 키워드별로 다르게 설정할 수 있어요.</span>
            <span className="text-xs text-greyscale-30">한/영/숫자 중 1개 이상을 사용해서 입력 가능해요.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="h-12" onClick={() => (actionState.current = true)}>
            입장하기
          </AlertDialogAction>
          <AlertDialogCancel className="h-12">취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function KeywordRankCard({ rank, keyword }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="group flex items-center justify-between px-3 h-[67px] rounded-lg hover:bg-greyscale-20">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-greyscale-80 text-greyscale-10 font-bold flex items-center justify-center group-hover:bg-greyscale-10 group-hover:text-greyscale-90">
            {rank}
          </div>
          <span className="ml-[6px] group-hover:text-greyscale-90">{keyword}</span>
        </div>
        <Button
          onClick={() => setShowDialog(true)}
          variant="outline"
          className="py-2 px-3 border-greyscale-80 bg-greyscale-90 text-greyscale-20 group-hover:text-primary-60"
        >
          <span>채팅하기</span>
          <SvgIcon id="add-chat" />
        </Button>
      </div>
      <ChatDialog
        open={showDialog}
        onClose={(actionState: boolean) => {
          if (actionState) {
            router.push(ROUTE_PATH.CHAT);
          }
          setShowDialog(false);
        }}
      />
    </>
  );
}
