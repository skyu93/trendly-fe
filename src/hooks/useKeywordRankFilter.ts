import { create } from 'zustand/react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { KeywordRankingData } from '@/services/keyword/keywordsRanking.type';
import { KeywordsRankingApi } from '@/services/keyword/keywordsRankingApi';

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
  isLoading: boolean;
  keywordRankingData: KeywordRankingData | null;
}

interface KeywordRankFilterAction {
  setFilterPeriod: (period: KeywordRankFilterPeriod) => void;
  setMonthly: (filter: FilterMonthly) => void;
  setWeekly: (filter: FilterWeekly) => void;
  setDaily: (filter: FilterDaily) => void;
  init: () => void;
  getKeywords: () => Promise<void>;
  getContentsTitle: () => string;
}

export const useKeywordRankFilter = create<KeywordRankFilterState & KeywordRankFilterAction>((set, get) => {
  const getWeekOfMonth = (date: dayjs.Dayjs): string => {
    const firstDayOfMonth = date.startOf('month');
    const currentDay = date.date();
    const firstDayOfWeek = firstDayOfMonth.day();

    // 월요일 시작 기준으로 계산
    // 일요일(0)이면 6을 더해서 마지막 요일로 처리, 그 외에는 -1 (월요일이 0이 되도록)
    const adjustedDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // 계산: (현재 일 + 조정된 요일) / 7 올림
    return String(Math.ceil((currentDay + adjustedDay) / 7));
  };

  const now = dayjs();
  return {
    filterPeriod: 'realtime',
    isLoading: false,
    keywordRankingData: null,

    monthly: {
      year: now.format('YYYY'),
      month: now.format('MM'),
    },

    weekly: {
      year: now.format('YYYY'),
      month: now.format('MM'),
      week: getWeekOfMonth(now),
    },

    daily: {
      year: now.format('YYYY'),
      month: now.format('MM'),
      day: now.format('DD'),
    },

    setFilterPeriod: (period: KeywordRankFilterPeriod) => set({ filterPeriod: period }),
    setMonthly: (filter: FilterMonthly) => set({ monthly: { ...filter } }),
    setWeekly: (filter: FilterWeekly) => set({ weekly: { ...filter } }),
    setDaily: (filter: FilterDaily) => set({ daily: { ...filter } }),

    init: () => {
      const current = dayjs();
      set({
        filterPeriod: 'realtime',
        monthly: {
          year: current.format('YYYY'),
          month: current.format('MM'),
        },
        weekly: {
          year: current.format('YYYY'),
          month: current.format('MM'),
          week: getWeekOfMonth(current),
        },
        daily: {
          year: current.format('YYYY'),
          month: current.format('MM'),
          day: current.format('DD'),
        },
      });
    },

    getKeywords: async () => {
      try {
        set({ isLoading: true });
        const { filterPeriod, monthly, weekly, daily } = get();

        // 필터 기간에 따라 해당 일의 마지막 시간을 ISO 8601 형식으로 생성
        let currentTime: string = dayjs().toISOString();

        if (filterPeriod === 'monthly') {
          // YYYY-MM 형식으로 해당 월의 마지막 날짜 구하기
          const lastDayOfMonth = dayjs(`${monthly.year}-${monthly.month}`).endOf('month');
          currentTime = lastDayOfMonth.endOf('day').toISOString(); // 해당 월 마지막 날의 23:59:59.999
        } else if (filterPeriod === 'weekly') {
          // 주차 계산 (해당 월의 n주차의 마지막 날)
          const startOfMonth = dayjs(`${weekly.year}-${weekly.month}-01`);
          const weekNumber = parseInt(weekly.week, 10);

          // 첫째 주 월요일 찾기
          let firstMonday = startOfMonth;
          while (firstMonday.day() !== 1) {
            // 1은 월요일
            firstMonday = firstMonday.add(1, 'day');
          }

          // n주차의 일요일 (주의 마지막 날) 계산
          const endOfWeek = firstMonday.add((weekNumber - 1) * 7 + 6, 'day');
          currentTime = endOfWeek.endOf('day').toISOString(); // 해당 주 일요일의 23:59:59.999
        } else if (filterPeriod === 'daily') {
          // YYYY-MM-DD 형식
          const selectedDay = dayjs(`${daily.year}-${daily.month}-${daily.day}`);
          currentTime = selectedDay.endOf('day').toISOString(); // 해당 일의 23:59:59.999
        }

        const keywordRankingData = await KeywordsRankingApi.getKeywords(
          currentTime,
          filterPeriod !== 'realtime' ? filterPeriod : undefined,
        );

        set({ keywordRankingData, isLoading: false });
      } catch (err) {
        set({ isLoading: !err });
      }
    },

    getContentsTitle: () => {
      const { filterPeriod, monthly, weekly, daily } = get();

      if (filterPeriod === 'realtime') {
        return '실시간';
      }

      if (filterPeriod === 'monthly') {
        const { year, month } = monthly;
        return dayjs(`${year}-${month}`).format('YYYY년 MM월');
      }

      if (filterPeriod === 'weekly') {
        const { year, month, week } = weekly;
        return dayjs(`${year}-${month}`).format('YYYY년 MM월') + ` ${week}주차`;
      }

      if (filterPeriod === 'daily') {
        const { year, month, day } = daily;
        return dayjs(`${year}-${month}-${day}`).format('YYYY년 MM월 DD일');
      }

      return '실시간';
    },
  };
});
