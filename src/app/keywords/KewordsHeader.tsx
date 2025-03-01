import GlobalHeader from '@/app/GlobalHeader';
import SvgIcon from '@/components/SvgIcon';

export default function KeywordsHeader() {
  return (
    <GlobalHeader>
      <GlobalHeader.Icon>
        <SvgIcon id="logo" className="text-primary" />
      </GlobalHeader.Icon>
      <GlobalHeader.Title>키워드 순위</GlobalHeader.Title>
    </GlobalHeader>
  );
}
