MovieVerse - Vanilla JS 기반 영화 큐레이션 웹 앱

> TMDB API와 Pure JavaScript로 구현한 비동기 영화 큐레이션 및 검색 웹 애플리케이션입니다.

[라이브 데모 보러가기](https://wiseoyul.github.io/movie-verse/)


## 주요 기능
- **인기 영화 및 검색 목록 제공**: TMDB API 비동기 Fetch 통신
- **검색 최적화**: Debounce(300ms) 기법을 적용하여 불필요한 API 요청 방지
- **무한 스크롤(Infinite Scroll)**: `Intersection Observer API`를 활용한 성능 최적화
- **영화 상세 모달 & History API**: 브라우저 뒤로가기(popstate) 이벤트 연동 모달 제어
- **반응형 UI**: CSS Grid & Flexbox 기반 다바이스 대응

## 🛠 사용 기술
- **Frontend**: HTML5, CSS3, JavaScript (ES6+ Vanilla JS)
- **API**: TMDB (The Movie Database) Open API
- **Deployment**: GitHub Pages

## 기술적 의사결정 & 트러블슈팅
1. **Scroll 이벤트 대신 Intersection Observer 도입**
   - 기존 `scroll` 이벤트 리스너는 리플로우(Reflow)를 자주 발생시켜 성능 저하를 유발하므로, 뷰포트 교차 상태만 감지하는 `Intersection Observer`를 적용해 브라우저 부하를 줄였습니다.
2. **Debouncing을 통한 네트워크 요청 절감**
   - 검색창 입력 시 매 타자마다 API가 호출되는 현상을 막기 위해 Closure를 활용한 `debounce` 유틸 함수를 구현하여 API 호출 횟수를 대폭 절감했습니다.