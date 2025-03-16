import { create } from 'zustand/react';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';

dayjs.extend(weekOfYear);

type KeywordRankFilterPeriod = 'realtime' | 'monthly' | 'weekly' | 'daily';
interface FilterMonthly {
  year: string;
  month: string;
}
interface FilterWeekly {
  year: string;
  month: string;
  week: string;
}
interface FilterDaily {
  year: string;
  month: string;
  day: string;
}

interface KeywordRankFilterState {
  filterPeriod: KeywordRankFilterPeriod;
  monthly: FilterMonthly;
  weekly: FilterWeekly;
  daily: FilterDaily;
}

interface KeywordRankFilterAction {
  setFilterPeriod(period: KeywordRankFilterPeriod): void;
  setMonthly(filter: FilterMonthly): void;
  setWeekly(filter: FilterWeekly): void;
  setDaily(filter: FilterDaily): void;
  init(): void;
}
export const useKeywordRankFilter = create<KeywordRankFilterState & KeywordRankFilterAction>(set => {
  const now = dayjs();

  const getWeekOfMonth = (): string => {
    // 해당 월의 첫 날
    const firstDayOfMonth = now.startOf('month');
    // 현재 날짜의 일(day)
    const currentDay = now.date();
    // 첫 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const firstDayOfWeek = firstDayOfMonth.day();
    // 계산: (현재 일 + 첫날의 요일 - 1) / 7 올림
    return String(Math.ceil((currentDay + firstDayOfWeek - 1) / 7));
  };

  return {
    filterPeriod: 'realtime',
    setFilterPeriod: (period: KeywordRankFilterPeriod) => {
      set({ filterPeriod: period });
    },
    monthly: {
      year: now.format('YYYY'),
      month: now.format('MM'),
    },
    setMonthly: (filter: FilterMonthly) => {
      set({ monthly: { ...filter } });
    },
    weekly: {
      year: now.format('YYYY'),
      month: now.format('MM'),
      week: getWeekOfMonth(),
    },
    setWeekly: (filter: FilterWeekly) => {
      set({ weekly: { ...filter } });
    },
    daily: {
      year: now.format('YYYY'),
      month: now.format('MM'),
      day: now.format('DD'),
    },
    setDaily: (filter: FilterDaily) => {
      set({ daily: { ...filter } });
    },
    init() {
      set({
        filterPeriod: 'realtime',
        weekly: {
          year: now.format('YYYY'),
          month: now.format('MM'),
          week: getWeekOfMonth(),
        },
        daily: {
          year: now.format('YYYY'),
          month: now.format('MM'),
          day: now.format('DD'),
        },
        monthly: {
          year: now.format('YYYY'),
          month: now.format('MM'),
        },
      });
    },
  };
});
