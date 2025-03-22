import { KeywordFilterPeriod, KeywordRankingData } from '@/services/keyword/keywordsRanking.type';

export class KeywordsRankingApi {
  static getKeywords = async (currentTime: string, period?: KeywordFilterPeriod): Promise<KeywordRankingData> => {
    // const { data } = await Api.get<KeywordRankingData>(`${API_PATH.KEYWORDS_RANKING}${period ? `/${period}` : ''}?currentTime=${currentTime}`);
    // return data;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const baseData: KeywordRankingData = {
      category: '전체',
      platform: '구글',
      date: currentTime,
      period: period || 'daily',
      keywordsPlatformRanking: [],
    };

    // 기간에 따라 랭킹 데이터 차별화
    if (period === 'monthly') {
      baseData.keywordsPlatformRanking = [
        { id: 101, keywordName: '인공지능 채팅', rank: 1, volume: 850000 },
        { id: 102, keywordName: '미국 대선 결과', rank: 2, volume: 720000 },
        { id: 103, keywordName: '올림픽 메달 순위', rank: 3, volume: 680000 },
        { id: 104, keywordName: '겨울 여행지 추천', rank: 4, volume: 590000 },
        { id: 105, keywordName: '암호화폐 시세', rank: 5, volume: 520000 },
        { id: 106, keywordName: '김치찌개 레시피', rank: 6, volume: 480000 },
        { id: 107, keywordName: '스마트폰 신제품', rank: 7, volume: 450000 },
        { id: 108, keywordName: '코로나 신규 변이', rank: 8, volume: 420000 },
        { id: 109, keywordName: '유튜브 인기 채널', rank: 9, volume: 380000 },
        { id: 110, keywordName: '주식 시장 전망', rank: 10, volume: 350000 },
      ];
    } else if (period === 'weekly') {
      baseData.keywordsPlatformRanking = [
        { id: 201, keywordName: '드라마 신작 순위', rank: 1, volume: 320000 },
        { id: 202, keywordName: '부동산 시장 동향', rank: 2, volume: 290000 },
        { id: 203, keywordName: 'AI 이미지 생성기', rank: 3, volume: 260000 },
        { id: 204, keywordName: '국내 여행 코스', rank: 4, volume: 240000 },
        { id: 205, keywordName: '간헐적 단식 효과', rank: 5, volume: 220000 },
        { id: 206, keywordName: '재택근무 팁', rank: 6, volume: 195000 },
        { id: 207, keywordName: '연말정산 꿀팁', rank: 7, volume: 175000 },
        { id: 208, keywordName: '넷플릭스 인기 영화', rank: 8, volume: 160000 },
        { id: 209, keywordName: '명절 음식 간편화', rank: 9, volume: 145000 },
        { id: 210, keywordName: '전기차 충전소', rank: 10, volume: 130000 },
      ];
    } else if (period === 'daily') {
      baseData.keywordsPlatformRanking = [
        { id: 301, keywordName: '오늘 날씨 예보', rank: 1, volume: 120000 },
        { id: 302, keywordName: '최신 영화 개봉', rank: 2, volume: 98000 },
        { id: 303, keywordName: '프리미어리그 결과', rank: 3, volume: 75000 },
        { id: 304, keywordName: '주식 특징주', rank: 4, volume: 62000 },
        { id: 305, keywordName: '오늘의 환율', rank: 5, volume: 55000 },
        { id: 306, keywordName: '간단한 아침 식사', rank: 6, volume: 48000 },
        { id: 307, keywordName: '핫플레이스 맛집', rank: 7, volume: 43000 },
        { id: 308, keywordName: '집에서 운동하기', rank: 8, volume: 39000 },
        { id: 309, keywordName: '면접 팁', rank: 9, volume: 35000 },
        { id: 310, keywordName: '유행 패션 아이템', rank: 10, volume: 32000 },
      ];
    } else {
      // realtime 케이스 (period가 undefined 또는 'realtime'일 때)
      baseData.keywordsPlatformRanking = [
        { id: 401, keywordName: '실시간 뉴스', rank: 1, volume: 85000 },
        { id: 402, keywordName: '교통 상황', rank: 2, volume: 72000 },
        { id: 403, keywordName: '주요 사건사고', rank: 3, volume: 65000 },
        { id: 404, keywordName: '증시 실시간', rank: 4, volume: 55000 },
        { id: 405, keywordName: '스포츠 중계', rank: 5, volume: 48000 },
        { id: 406, keywordName: '당첨 번호', rank: 6, volume: 43000 },
        { id: 407, keywordName: '행사 티켓 예매', rank: 7, volume: 38000 },
        { id: 408, keywordName: '실검 순위', rank: 8, volume: 34000 },
        { id: 409, keywordName: '긴급 속보', rank: 9, volume: 30000 },
        { id: 410, keywordName: '지진 발생', rank: 10, volume: 27000 },
      ];
    }

    return baseData;
  };
}
