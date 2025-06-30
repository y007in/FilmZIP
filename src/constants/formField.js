import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faSyncAlt,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';

export const WATCH_STATUS = [
  {
    value: 'FINISHED',
    label: '다 본 영화',
    icon: <FontAwesomeIcon icon={faCheckCircle} />,
  },
  {
    value: 'REWATCHED',
    label: '재관람 영화',
    icon: <FontAwesomeIcon icon={faSyncAlt} />,
  },
  {
    value: 'STOPPED',
    label: '중단한 영화',
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
        ],
      },
    ],
  },
  {
    label: '추가적인 코멘트를 남겨보세요!',
    type: 'textarea',
  },
];
