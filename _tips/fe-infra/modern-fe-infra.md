### 1. monorepo

소스 코드 중복 감소, 팀 간 협업 증대, repository 관리 단순화

- 코드 재사용 (공통 컴포넌트, 라이브러리, 툴 중복 문제 해결)
- 의존성 관리 (의존성 관리, 버전 충돌 - trunk based development 관련)

`Yarn Workspaces, NX, Bazel 등`

### 2. ci/cd 파이프라인 구축

개발 및 배포 자동화 (지속적 통합, 지속적 배포)

- 빠른 피드백
- 자동화된 배포
- 운영 효율성 (배포는 자동화하고, 코드에 집중)

`Jenkins, Travis CI, Github Actions, GitLab CI 등`

### 3. design system

반복되는 디자인 요소와 패턴 표준화 => 일관된 ui 제공

- ui 컴포넌트
- 스타일 가이드 (색상, 폰트, 간격 등)
- 문서화 (design system 사용법, best practice 명세)

`Storybook, Pattern Lab, Styleguidist 등`

- 또는 Yarn Workspace 등 모노레포 기능으로 디자인 시스템 모듈을 만들어 각 프로젝트에 import하는 방식도 가능 (for 편의성)

### 4. event logging

사용자가 앱과 상호작용하는 방식 기록/분석

- 사용자 행동 이해
- 성능 모니터링 => 성능 이슈 식별, 최적화 후 UX 향상
- 오류 추적 => 문제 발생 시 빠르게 인식/대응

`Google Analytics, Mixpanel 등`

- 로깅을 담당하는 모듈을 만들어 각 프로젝트 import해서 사용하면 통일된 로깅 로직을 전 서비스에 공유하는 방식으로 사용.

### 5. monitoring

앱 상태를 실시간 감시

- 가용성 => 시스템 가용성 보장, 다운타임 최소화
- 성능 및 사용성 => 앱이 기대한 대로 원할히 동작하는지 확인
- 알림 => 문제 발생시 신속하게 알림 제공해 대응

`Prometheus, Grafana, Sentry 등`

### 6. a/b test

사용자 경험과 전환율 개선을 위한 효율적인 방법.

- 의사결정 : 데이터에 근거, 어떤 UI/UX 변화가 더 효율적인지 결정
- 사용자 선호도 : 다양한 사용자층 이해, 최적 경험 제공
- 위험 회피 : 큰 변경사항 적용 전 전체 리스크 최소화

`Optimizely, Google Optimiza, Firebase 등`

- 또는 직접 로직 구축 가능.

## References

[현대적인 프론트엔드 인프라](https://careerly.co.kr/comments/96732?utm_campaign=user-share)<br>
