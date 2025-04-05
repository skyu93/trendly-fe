import { create } from 'zustand/react';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { DAY_OF_WEEK, KeywordRankingData } from '@/services/keyword/keywordsRanking.type';
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
    const adjustedDay = firstDayOfWeek === DAY_OF_WEEK.SUNDAY ? DAY_OF_WEEK.SATURDAY : firstDayOfWeek - 1;

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
          // 월의 첫 날짜
          const firstDayOfMonth = dayjs(`${weekly.year}-${weekly.month}-01`);

          // 선택된 주차 (1부터 시작)
          const weekNumber = parseInt(weekly.week, 10);

          let endOfWeek;

          if (weekNumber === 1) {
            // 1주차: 월의 첫 날부터 해당 주의 일요일까지
            // 예: 월의 첫날이 수요일이면, 첫 주는 수~일 (3일간)
            const firstDayOfWeekInMonth = firstDayOfMonth.day(); // 0(일)~6(토)

            if (firstDayOfWeekInMonth === 0) {
              // 월 첫날이 일요일이면 그날이 1주차의 마지막 날
              endOfWeek = firstDayOfMonth;
            } else {
              // 그 외의 경우 다음 일요일까지가 1주차
              const daysUntilSunday = 7 - firstDayOfWeekInMonth;
              endOfWeek = firstDayOfMonth.add(daysUntilSunday, 'day');
            }
          } else {
            // 2주차 이상: 1주차 이후 7일씩 계산
            // 월의 첫날이 속한 주의 일요일 찾기
            const firstDayOfWeekInMonth = firstDayOfMonth.day(); // 0(일)~6(토)
            let firstSunday;

            if (firstDayOfWeekInMonth === 0) {
              // 월 첫날이 일요일이면 그날이 첫 주의 마지막 날
              firstSunday = firstDayOfMonth;
            } else {
              // 그 외의 경우 첫 일요일 계산
              const daysUntilSunday = 7 - firstDayOfWeekInMonth;
              firstSunday = firstDayOfMonth.add(daysUntilSunday, 'day');
            }

            // 2주차부터는 첫 일요일 이후 7일씩 더하기
            endOfWeek = firstSunday.add((weekNumber - 1) * 7, 'day');

            // 월 마지막 날을 초과하지 않도록 조정
            const lastDayOfMonth = firstDayOfMonth.endOf('month');
            if (endOfWeek.isAfter(lastDayOfMonth)) {
              endOfWeek = lastDayOfMonth;
            }
          }

          currentTime = endOfWeek.endOf('day').toISOString(); // 해당 주 마지막 날의 23:59:59.999
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
      } finally {
        set({ isLoading: false });
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
