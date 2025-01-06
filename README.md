# BurpeeMaster🔥

개발자는 맨날 컴퓨터 앞에 앉아있느라 운동같은건 안할까요? 아니요!
의외로 개발자도 운동합니다!

악마의 운동 버피테스트!
(아무리 찾아봐도 없어서 내가 쓰려고 만듬)

## 주요 기능

- 운동 횟수와 간격 설정
- 시각적 카운트다운 타이머
- Ready/Fight 시작 시퀀스
- 버피 운동 애니메이션
- 음악🎹 감상하며 운동 가능
- 진행 상황 표시
- 일시정지/재시작 기능
- 사운드 효과

## 기술 스택

- React
- Tailwind CSS
- React Icons

## 프로젝트 구조

```bash
src/
├── components/
│ ├── BupeeAnim.js # 버피 운동 애니메이션 컴포넌트
│ ├── ControlButtons.js # 컨트롤 버튼 (시작/일시정지/중지)
│ ├── CountdownDisplay.js # 카운트다운 원형 타이머
│ ├── ProgressBar.js # 진행 상황 표시바
│ ├── ReadyFightOverlay.js # Ready/Fight 오버레이
│ └── WorkoutSettings.js # 운동 설정 입력 폼
├── hooks/
│ └── useWorkoutTimer.js # 타이머 로직 커스텀 훅
└── App.js # 메인 애플리케이션 컴포넌트
```

## 컴포넌트 설명

### BupeeAnim

- 버피 운동 동작을 순차적으로 보여주는 애니메이션
- 운동 중일 때만 동작하며 일시정지 시 정지

### CountdownDisplay

- 원형 프로그레스 바로 시간 표시
- 현재 카운트다운 숫자 표시
- 연속 성공 횟수 트래킹

### ProgressBar

- 전체 운동 진행률 표시
- 버피 애니메이션과 통합
- 임계치(85%) 이상 시 경고 색상 표시

### ControlButtons

- 시작/일시정지/중지 기능
- 상태에 따른 버튼 활성화/비활성화
- 아이콘과 텍스트 결합

### WorkoutSettings

- 운동 횟수 설정
- 간격(초) 설정
- 운동 시작 전에만 표시

### ReadyFightOverlay

- 운동 시작 시 Ready/Fight 시퀀스 표시
- 반투명 오버레이로 표시

## 주요 기능 로직

### useWorkoutTimer Hook

- 타이머 상태 관리
- 사운드 재생 처리
- 카운트다운 로직
- Ready/Fight 시퀀스 관리
- 일시정지/재시작 처리

## 설치 및 실행

```bash
npm start
```

## 라이선스

MIT License
