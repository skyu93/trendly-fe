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
