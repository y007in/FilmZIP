export const WATCH_STATUS = [
  { value: 'FINISHED', label: '👏 다 본 영화' },
  { value: 'REWATCHED', label: '👍 재관람 영화' },
  { value: 'STOPPED', label: '👎 중단한 영화' },
];

export const getWatchStatusLabel = status =>
  WATCH_STATUS.find(s => s.value === status)?.label || '';

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
    options: ['영화관', '집', '카페', '비행기', 'OTT', '기타'],
  },
  {
    label: '다시 볼 의향이 있나요?',
    type: 'buttons',
    options: ['네 있어요', '애매해요', '아니요 안볼래요'],
  },
  {
    label: '어떤 영화였나요?',
    type: 'buttonsCheck',
    options: [
      'N차 관람 확정',
      '내 취향 저격',
      '장면 하나가 계속 떠올라요',
      '끝나고 멍해졌어요',
      '생각보다 별로였어요',
      '재밌었는데 설명은 어려운 영화',
      '내 감정 어지럽힘',
    ],
  },
  {
    label: '추가적인 코멘트를 남겨보세요!',
    type: 'textarea',
  },
];
