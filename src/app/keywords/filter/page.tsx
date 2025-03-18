'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import YearSelector from '@/app/keywords/filter/components/YearSelector';
import MonthSelector from '@/app/keywords/filter/components/MonthSelector';
import DaySelector from '@/app/keywords/filter/components/DaySelector';
import { useKeywordRankFilter } from '@/hooks/useKeywordRankFilter';
import WeekSelector from '@/app/keywords/filter/components/WeekSelector';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/Button';

export default function FilterPage() {
  const { filterPeriod, setFilterPeriod, monthly, setMonthly, weekly, setWeekly, daily, setDaily, init } =
    useKeywordRankFilter();
  const router = useRouter();

  return (
    <div className="w-full flex flex-col justify-between page-container">
      <Accordion type="single" value={filterPeriod} onValueChange={setFilterPeriod}>
        <AccordionItem value="realtime" className="px-4">
          <AccordionTrigger>실시간</AccordionTrigger>
        </AccordionItem>
        <Separator className="bg-greyscale-80" />

        <AccordionItem value="daily" className="px-4">
          <AccordionTrigger>일간</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between gap-[10px]">
              <YearSelector value={daily.year} onChange={v => setDaily({ ...daily, year: v })} />
              <MonthSelector value={daily.month} onChange={v => setDaily({ ...daily, month: v, day: '01' })} />
              <DaySelector
                value={daily.day}
                onChange={v => setDaily({ ...daily, day: v })}
                year={daily.year}
                month={daily.month}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <Separator className="bg-greyscale-80" />

        <AccordionItem value="weekly" className="px-4">
          <AccordionTrigger>주간</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between gap-[10px]">
              <YearSelector value={weekly.year} onChange={v => setWeekly({ ...weekly, year: v })} />
              <MonthSelector value={weekly.month} onChange={v => setWeekly({ ...weekly, month: v })} />
              <WeekSelector value={weekly.week} onChange={v => setWeekly({ ...weekly, month: v })} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <Separator className="bg-greyscale-80" />

        <AccordionItem value="monthly" className="px-4">
          <AccordionTrigger>월간</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between gap-[10px]">
              <YearSelector value={monthly.year} onChange={v => setMonthly({ ...monthly, year: v })} />
              <MonthSelector value={monthly.month} onChange={v => setMonthly({ ...monthly, month: v })} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <Separator className="bg-greyscale-80" />
      </Accordion>
      <div className="flex items-center px-4 gap-2">
        <Button className="w-[116px] h-12" variant="outline" onClick={init}>
          초기화
        </Button>
        <Button className="w-full h-12" onClick={() => router.back()}>
          순위보기
        </Button>
      </div>
    </div>
  );
}
