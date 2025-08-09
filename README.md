# Re:view ZIP (진행중)

다 본 영화부터, 다시 본 영화까지 감상을 간편하게 정리하고 보관하는 감상 아카이브입니다.
<br/>

## 프로젝트 목적

기억이 흐릿해진 예전 영화의 감상 경험을 되짚고 싶을 때, 기존 영화 기록 앱은 단순한 평점이나 자유로운 텍스트 입력에 의존해 아쉬움이 있습니다. . 본 프로젝트는 감상 상태, 관람 방식, 재관람 의향 등 다양한 키워드를 조합해, 보다 편리하고 직관적으로 개인의 영화 감상 기록하고 회상할 수 있도록 기획하였습니다.

## 기술 스택

| category | stack                                                                                                                                                                                                                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Design   | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white)                                                                                                                                                                                                                       |
| FrontEnd | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white) ![TanStack Query](https://img.shields.io/badge/Tanstack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) |
| Tools    | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white)               |     |

\*[TMDB (The Movie Database)](https://www.themoviedb.org/) API를 사용하여 영화 데이터를 제공

## 주요 기능

- 감상한 영화의 상세 정보를 확인할 수 있습니다.
- 키워드 기반의 감상 기록 폼을 통해 **개인의 감상 경험과 느낀 점을 쉽고 구체적으로** 남길 수 있습니다.
- **재관람 여부나 감상 중단 여부**를 탭별로 쉽게 파악할 수 있습니다.

---

# Main

- `useQueries`로 여러 카테고리 데이터(상영 중인 영화, 개봉 예정작, 이번주 트렌드 영화/시리즈)를 한번에 요청하여 슬라이드 컴포넌트(Swiper)로 간략한 정보 노출
- 각 슬라이드에 '더보기' 버튼 클릭 시, pathname에 따라 `/collection` 또는 `/review` 경로로 카테고리명을 쿼리 파라미터로 포함하여 이동

### 카테고리 별 영화 페이지

- useInfiniteQuery로 카테고리별 전체 영화 호출
- useInView 훅으로 무한스크롤 구현

### 내가 본 영화

- LocalStorage의 `movieRecord` 에 저장된 영화 데이터를 목록 형태로 나열
- 상태별 탭으로 분류하여 사용자가 저장한 영화의 상태를 한눈에 파악할 수 있도록 구성

# Search

### 최근 검색어

- 검색 시마다 최근 검색어 목록에 추가
  - `LocalStorage`에 `searchKeyword`로 저장 -`{ "text": "검색어", "date": "YYYY-MM-DD" }`
- 삭제 기능
  - 목록의 삭제 버튼 클릭 시 해당 검색어 삭제 (LocalStorage에서도 제거)
  - "전체 삭제" 클릭 시 `searchKeyword` 데이터 전부 삭제
- 검색어 클릭 시 해당 검색어로 검색 결과 페이지로 이동

### 추천 영화/시리즈

- 추천 영화 항목 클릭 시 해당 영화의 디테일 페이지로 이동

### 검색 바

- 검색어 입력 시 삭제 버튼 표시, 입력값 없을 시 버튼 숨김
- 삭제 버튼 클릭 시 검색 입력값 초기화 및 검색 결과 제거
- 제출 버튼 클릭 시에만 검색 실행

### 검색 결과

- 검색 결과가 있는 경우
  - 영화 제목에 검색어가 포함된 항목 나열
  - 영화 클릭 시 해당 영화의 디테일 페이지로 이동
  - `모바일에서는 세로 컬럼 형태`, `태블릿과 PC에서는 그리드 형태`로 반응형으로 배치해 보여줌
- 검색 결과가 없는 경우
  - `"검색어"`에 대한 검색 결과가 없다는 안내 화면 표시 (앗! "검색어" 검색결과가 없어요)

# Detail

### 영화 정보

- `react-router-dom`을 사용해 각 영화의 `id` 값을 기반으로 페이지 라우팅
- URL의 `id` 값을 `useParams`로 가져와 해당 영화의 데이터를 API에서 요청하여 불러옴

### 기록 저장 기능

- **필터 UI**
  - Bottom Sheet 형식의 슬라이드 UI로 구현
  - 영화 제목이 있는 헤더 영역 클릭 시 Bottom Sheet 닫힘
- **입력 폼 구성**:
  - `radio`, `checkbox`, `textarea` 등 다양한 HTML 폼 요소를 조합해 직관적인 감상 키워드 입력 UI 구현
  - 사용자가 선택한 감상 데이터를 LocalStorage에 `movieRecords`에 저장
    - `createId`, `movieId` , `poster_path`, `title`등과 함께 저장
  - 폼이 모두 완성되었을 때만 저장 버튼이 활성화되도록 **유효성 검사 로직 적용**

# Review

- 영화의 **제목**과 **포스터 이미지** 표시
- 사용자가 선택한 **상태값**(예: 관람 상태 등)를 **상태값에 따라 시각적으로 구분**될 수 있도록 색상 구분

### 탭 구성 (영화 기록 / 영화 정보)

- **영화 기록**
  - 기본 탭으로 설정
  - 해당 영화에 대해 사용자가 저장한 기록들을 나열
  - 기록이 여러 개인 경우, **최신순으로 정렬**하여 모두 표시
