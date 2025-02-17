# 🌤️ Next.js Weather App

기상청 API를 활용한 SSR 기반 날씨 예보 웹 애플리케이션.

## 📌 프로젝트 개요

이 프로젝트는 **기상청 단기예보 및 중기예보 API**를 활용하여  
사용자의 **현재 위치 기반 날씨 및 10일 예보**를 제공하는 웹 애플리케이션입니다.  
**직관적인 UI/UX**와 **심플한 데이터 시각화**를 통해 날씨 정보를 쉽게 확인할 수 있습니다.

- **Framework:** Next.js (v15.1.7)
- **Styling:** styled-components
- **Data Fetching:** 기상청 OpenAPI (`VillageFcstInfoService_2.0`, `MidFcstInfoService`)
- **State Management:** React Hook (`useState`, `useEffect`)
- **SEO Optimization:** next-seo

---

## 🚀 주요 기능

### ✅ 1. 현재 날씨
- **현재 위치의 기온, 날씨 상태(맑음, 비, 눈 등), 습도, 풍향/풍속 표시**
- `geolocation`을 활용하여 사용자의 현재 위치를 자동 감지
- 현재 위치를 기준으로 실시간 날씨 데이터 업데이트

### ✅ 2. 시간별 날씨 예보
- **시간대별 기온, 강수 확률, 강수량, 풍향/풍속, 습도 제공**
- 오전/오후별 날씨 컨디션을 시각적으로 구분하여 표시

### ✅ 3. 10일간의 일기예보
- **1~2일차**: 단기예보 (`getVilageFcst`) 활용
- **3~10일차**: 중기예보 (`getMidTa`, `getMidLandFcst`) 활용
- **기온, 날씨 컨디션(맑음, 흐림, 비 등), 강수 확률 제공**
- **중기예보 오전/오후 날씨 상태를 하나로 통일하여 표시** (`흐림 > 구름 많음 > 맑음` 우선순위 적용)

### ✅ 4. 위치 검색 기능 (선택 사항)
- **도시 이름을 입력하여 해당 지역 날씨 조회 가능**
- 검색어 자동완성 기능 제공 (추후 개선 예정)

---

## 📡 사용 API

### 🔹 **기상청 단기예보 API**
- `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`
- **현재 날씨, 1~2일 단기 예보 데이터 조회**
- 기온(TMP), 풍속(WSD), 강수량(PCP), 습도(REH) 등 포함

### 🔹 **기상청 중기예보 API**
- `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa`
- `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst`
- **3~10일 중기 예보 데이터 조회**
- 오전/오후 기상 상태(`wfXAm`, `wfXPm`) 및 최고/최저기온(`taMinX`, `taMaxX`) 제공

---

## 📦 사용된 주요 라이브러리

### ✅ 개발 필수 라이브러리

| 라이브러리          | 버전   |
| ------------------- | ------ |
| `react`             | 19.0.0 |
| `react-dom`         | 19.0.0 |
| `next`              | 15.1.7 |
| `styled-components` | latest |
| `next-seo`          | latest |
| `axios`             | latest |

### ✅ 개발 도구 & Linter

| 도구 / 라이브러리    | 버전   |
| -------------------- | ------ |
| `eslint`             | latest |
| `prettier`           | latest |
| `eslint-config-next` | latest |

## 🔧 개발 환경

| 도구      | 버전    |
| --------- | ------- |
| `Node.js` | 20.0.0  |
| `Yarn`    | 1.22.19 |

## 🚀 프로젝트 실행 방법

```bash
# 1. 패키지 설치
yarn install

# 2. 개발 서버 실행
yarn dev

# 3. 프로젝트 빌드
yarn build

# 4. 프로덕션 실행
yarn start
```
