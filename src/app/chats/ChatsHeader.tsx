import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/icon/SvgIcon';

export default function ChatsHeader() {
  return (
    <GlobalHeader>
      <GlobalHeader.Icon>
        <SvgIcon id="logo" className="text-primary" />
      </GlobalHeader.Icon>
      <GlobalHeader.Title>채팅</GlobalHeader.Title>
    </GlobalHeader>
  );
}
