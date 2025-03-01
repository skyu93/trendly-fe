import SvgIcon from '@/components/SvgIcon';
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

interface Props {
  rank: number;
  keyword: string;
}

function ChatDialog({ open, onClose }: { open: boolean; onClose: (open: boolean) => void }) {
  const actionState = useRef(false);
  return (
    <AlertDialog containerSelector="#main" open={open} onOpenChange={() => onClose(actionState.current)}>
      <AlertDialogContent className="w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>닉네임 설정</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div className="flex flex-col">
              <span>개발중 입니다!</span>
            </div>
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
          onClick={() => {
            console.log('teo onClick');
            setShowDialog(true);
          }}
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
          console.log('chat: ', actionState);
          setShowDialog(false);
        }}
      />
    </>
  );
}
