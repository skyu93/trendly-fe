import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';
import { useMemo } from 'react';

dayjs.extend(weekOfYear);

export const useDate = (date?: Partial<{ year: string; month: string }>) => {
  const { year, month } = date ?? { year: undefined, month: undefined };
  const today = dayjs();
  const endYear = today.subtract(10, 'year').year();

  // 연도 범위 생성 (현재 연도부터 10년 전까지)
  const years = useMemo(
    () => Array.from({ length: today.year() - endYear + 1 }, (_, i) => (endYear + i).toString()),
    [today, endYear],
  );

  // 월 배열 생성 (01-12)
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')), []);

  // 해당 월의 일수 계산
  const daysInMonth = useMemo(() => {
    if (!year || !month) {
      return 31;
    }

    return dayjs(`${year}-${month}`).daysInMonth();
  }, [year, month]);

  // 일 배열 생성 (01-xx)
  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0')),
    [daysInMonth],
  );

  // 해당 월의 주차 수 계산
  const weeksInMonth = useMemo(() => {
    if (!year || !month) {
      return 5; // 기본값
    }

    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const lastDayOfMonth = dayjs(`${year}-${month}-${daysInMonth}`);

    // 첫째 주와 마지막 주의 차이 + 1
    const firstWeek = firstDayOfMonth.week();
    const lastWeek = lastDayOfMonth.week();

    // 12월에서 1월로 넘어가는 경우 처리 (lastWeek가 1이 될 수 있음)
    return lastWeek < firstWeek ? 52 - firstWeek + lastWeek + 1 : lastWeek - firstWeek + 1;
  }, [year, month, daysInMonth]);

  // 주차 배열 생성
  const weeklies = useMemo(() => Array.from({ length: weeksInMonth }, (_, i) => (i + 1).toString()), [weeksInMonth]);

  // 현재 날짜/시간 정보
  const currentDate = useMemo(
    () => ({
      year: today.year().toString(),
      month: (today.month() + 1).toString().padStart(2, '0'),
      day: today.date().toString().padStart(2, '0'),
      weekly: today.week().toString(),
    }),
    [today],
  );

  return {
    years,
    months,
    days,
    weeklies,
    daysInMonth,
    weeksInMonth,
    currentDate,
  };
};
