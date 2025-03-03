import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/icon/SvgIcon';

export default function MyHeader() {
  return (
    <GlobalHeader>
      <GlobalHeader.Icon>
        <SvgIcon id="logo" className="text-primary" />
      </GlobalHeader.Icon>
      <GlobalHeader.Title>마이</GlobalHeader.Title>
    </GlobalHeader>
  );
}
