import { Union } from '@/helper/type';

export interface KeywordPlatformRanking {
  id: number;
  keywordName: string;
  rank: number;
  volume: number;
}
export type KeywordFilterPeriod = 'daily' | 'weekly' | 'monthly';
export interface KeywordRankingData {
  category: string;
  platform: string;
  date: string;
  period: KeywordFilterPeriod;
  keywordsPlatformRanking: KeywordPlatformRanking[];
}
export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

export type DayOfWeek = Union<typeof DAY_OF_WEEK>;
