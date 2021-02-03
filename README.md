# Memo Application

### 개발환경

- Mac OS Mojave
- Node (14.0.0)
- webpack (4.5.0)
- webpack-dev-server(^3.11.0)로 구동

### 사용 라이브러리

- React
- Redux
- Redux-Saga
- TypeScript
- react-redux
- react-router-dom
- react-hook-form
- styled-components

### 실행방법

- 디펜던시 설치

```shell
yarn install
```

- 실행 (기본포트 3030으로 설정)

```
yarn start
```

- 접속 URL

```
http://localhost:3030
```

### 폴더 구조

- 도메인으로 먼저 분류하고 도메인 폴더 밑에서 다시 기능별로 분류되어 {도메인}/{기능}/{파일}의 경로를 갖는다.
- 예외적으로 페이지는 여러 도메인이 혼합되거나 도메인을 연관지을 수 없을 수 있어 페이지 폴더를 따로 분류한다.
- 각 폴더별 기능 정의는 다음과 같다

```
src
└─ global: 도메인에 관계없이(모든 도메인에서) 사용되는 파일들의 모음
│    └─ action: dipspatch 되는 Reducer를 호출하는 Action
│    └─ component: 모여서 Page를 이루는 Component
│    └─ context: React Context
│    └─ layout: Top, Footer, Left 등 화면의 레이아웃을 이루는 Component
│    └─ model: 데이터의 Type, Interface 등
│    └─ reducer: Store의 데이터를 변경하는 reducer
│    └─ selector: Store의 데이터에 접근할 수 있는 selelctor
│    └─ service: HTTP 통신 등 외부 데이터와의 통신
|    └─ saga: 여러 액션을 동기적으로 관리하기 위한 사가 모음
│    └─ store: 상태관리 저장소
│    └─ style: GlobalStyle나 CSS 등의 전역적 style 속성
│    └─ route: react-router-dom이 라우팅 할 정보
│    └─ util: 중복코드를 제거하는 유틸형 함수
└─ label: label 도메인에 속한 페이지들에서 사용되는 파일들의 모음
│    └─ action
│    └─ converter: response된 데이터가 UI와 불일치 할때 데이터를 UI에 알맞게 조작하는 함수 모음
│    └─ ...
└─ page: react-router-dom이 직접적으로 노출시킬 컴포넌트들의 모음
└─ ...
```

- 폴더내 파일의 취합이 필요한 경우에는 폴더내에 index.ts 파일을 두어 취합한다

```
example

memo
└─ saga
    └─ index.ts
    └─ memo.count.saga.ts
    └─ memo.create.saga.ts
    └─ memo.list.saga.ts

memo의 사가 펑션들은 index.ts를 통해 취합된 후 export 되어 global/saga에서 적용된다
```

- 컴포넌트의 분류는 도메인과 Atomic Design Pattern을 따르는 것을 지향한다

### 설계

- 3개의 뷰 (라벨목록, 라벨의 메모목록, 메모의 상세조회)가 하나의 페이지를 이루고 있으나 각각의 뷰는 또 다시 하나의 페이지로써 존재할 수 있다면 재사용성이 높아질 수 있을 것이라고 판단하여 세개의 뷰가 독립적으로 동작하는 것을 지향
- 뒤로가기 등의 히스토리 관리는 해쉬 히스토리을 사용 (스토리지 등을 사용할 경우 접속 환경이 변경 될 시 의미가 없어지며 뒤로가기 등의 기본 브라우저 기능을 제어하는 것은 사용자 경험을 해칠 수 있다고 판단)
- MainPage는 레이아웃을 설정하여 출력하는 용도로만 쓰이게 되며 특정 값을 컨트롤하지 않음
- 3개의 뷰끼리 공유되어야 하는 데이터는 해쉬 히스토리와 스토어를 통해 처리
- 개별적인 에러 핸들링 보다는 통합적인 에러 핸들링을 처리하기 위해 사가 펑션으로 API 통신을 처리하는 것을 지향(단 건의 통신일 지라도)
- 반복적으로 사용되어야하며, 용도가 특정될 수 있는 액션은 글로벌 액션으로 처리
- css는 가독성과 직관성을 중시하여 컴포넌트 내에 작성하도록 스타일드 컴포넌트 활용
- input은 react-hook-form으로 처리하여 state관리와 코드량을 감소시킨다

### 핵심동작방식

- 각각의 뷰는 브라우저의 location.hash 값에 따라 필요한 동작을 수행한다
- 각각의 뷰는 해쉬값에 따라 동작을 결정하기 때문에 병렬적으로 동작한다
- 해쉬 값의 변동으로 이루어지는 동작은 flux에 의거하여 dispatch하며 이루어진다

### 개선사항

- 페이지 네이션이 적용되었을 때 아이디를 해쉬값에 저장하는 현재구조로서 대응하기 어려운 부분이 있음. 현재 상세 정보를 리스트 요청에서 응답받은 데이터를 통해 출력하고 있는데 아이디 값을 통해 직접적으로 요청하는 구조로의 변경이 필요.
- 세개의 뷰가 병렬적으로 동작하기 때문에 서버의 응답이 없을 경우 한개의 에러가 아닌 세개의 에러가 발생하게 됨. 직렬 구조로의 변경을 고려해볼 필요가 있음.
- 컴포넌트 분류가 최적화되어 있지 않아 차후 스타일 가이드에 따라 input[type="text"], input[type="submit"], button등의 스타일 공통화 작업이 필요.
- production 환경의 최적화(minimize, split 등) 작업 필요.
- useEffect를 고도화하여 사용하여 서세스 콜백의 개수를 줄일 수 있을 것으로 보임.
