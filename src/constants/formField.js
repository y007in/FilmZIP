import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faSyncAlt,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';

export const WATCH_STATUS = [
  {
    value: 'FINISHED',
    label: '다 본 작품',
    icon: <FontAwesomeIcon icon={faCheckCircle} />,
  },
  {
    value: 'REWATCHED',
    label: '재관람 작품',
    icon: <FontAwesomeIcon icon={faSyncAlt} />,
  },
  {
    value: 'STOPPED',
    label: '중단한 작품',
    icon: <FontAwesomeIcon icon={faStopCircle} />,
  },
];

export const getWatchStatusLabel = (status, type) => {
  const found = WATCH_STATUS.find(s => s.value === status);
  if (!found) return '';

  return type === 'icon' ? found.icon : found.label;
};

export const formField = [
  {
    label: '관람 상태',
    type: 'buttons',
    options: WATCH_STATUS,
  },
  {
    label: '언제 관람하셨나요?',
    type: 'dates',
  },
  {
    label: '누구와 함께했나요?',
    type: 'buttonsCheck',
    options: [
      '친구',
      '연인﹒배우자',
      '지인﹒동료',
      '혼자',
      '아이',
      '부모님',
      '반려동물',
      '친척﹒형제',
      '기타',
    ],
  },
  {
    label: '어디서 시청하셨나요?',
    type: 'buttons',
    options: [
      '영화관',
      '집',
      '카페',
      '비행기',
      '학교',
      '야외',
      'OTT',
      '시사회',
      '기타',
    ],
  },
  {
    label: '다시 볼 의향이 있나요?',
    type: 'buttons',
    options: ['네 있어요', '애매해요', '아니요 안볼래요'],
  },
  {
    label: '어떤 영화였나요?',
    type: 'buttonsCheckGroup',
    options: [
      {
        group: '스토리/구성',
        items: [
          '생각할 거리를 던져줬어요',
          '이해는 안 갔지만 분위기는 좋았어요',
          '스토리는 별로인데 연출은 좋았어요',
          '다시 보면 다르게 느껴질 것 같아요',
          '스토리가 산으로 갔어요',
          '좋은 건 알겠는데 취향은 아니에요',
          '평점만 보고 속았어요',
          '구성이 탄탄해서 몰입했어요',
          '전개가 느려서 지루했어요',
          '중반부터 예측 가능했어요',
          '마무리가 아쉬웠어요',
          '아이디어는 신선했지만 구현이 아쉬워요',
        ],
      },
      {
        group: '감정/여운',
        items: [
          '끝나고 멍해졌어요',
          '기분은 이상한데 계속 생각나요',
          '좀 이상한 기분이 오래 남았어요',
          '감정은 남았는데 내용은 기억 안 나요',
          '감정선은 좋았는데 줄거리가 산만했어요',
          '눈물이 멈추질 않았어요',
          '기분이 더 나빠졌어요',
          '감동적이어서 울컥했어요',
          '감정 표현이 과했어요',
          '감정선이 약해서 아쉬웠어요',
          '여운이 길게 남았어요',
          '감정이 오락가락해서 혼란스러웠어요',
        ],
      },
      {
        group: '연출/기술',
        items: [
          'OST가 아직도 맴돌아요',
          '몰입해서 시간 가는 줄 몰랐어요',
          '보는 내내 긴장했어요',
          '배우 연기에 감탄했어요',
          '연기가 몰입이 안 됐어요',
          '억지 감동이었어요',
          '지루해서 졸았어요',
          '몰입이 안 됐어요',
          // 추가
          '촬영 기법이 독창적이었어요',
          '특수 효과가 부자연스러웠어요',
          '편집이 매끄러웠어요',
          '사운드가 너무 컸어요',
          '기술적인 부분에서 아쉬움이 남았어요',
        ],
      },
      {
        group: '장르/테마',
        items: [
          '잔잔하고 따뜻했어요',
          '쫄깃하고 긴장됐어요',
          '현실 비판이 강했어요',
          '상상력 넘치는 세계였어요',
          '웃긴데 묘하게 슬펐어요',
          '공포감이 오래 남았어요',
          '예상치 못한 반전이 있었어요',
          '사랑이 뭉클했어요',
          '장르가 명확해서 좋았어요',
          '테마가 모호해서 혼란스러웠어요',
          '신선한 시도로 인상 깊었어요',
          '클리셰가 많아서 식상했어요',
          '분위기가 일관적이지 않았어요',
        ],
      },
    ],
  },
  {
    label: '추가적인 코멘트를 남겨보세요!',
    type: 'textarea',
  },
];
