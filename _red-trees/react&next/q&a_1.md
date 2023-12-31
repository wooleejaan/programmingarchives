# SPA에서 URL과 State를 동기화해야 하는 이유, Nextjs RSC에서 UI State과 Event를 연결하는 우아한 방법

## Features

spa에서 클라이언트 단에서 ui 상태를 관리할 때, 흔하게 발생하는 문제 중 하나가 새로고침 문제. 유저가 인터랙션을 통해 상태를 변경하더라도 브라우저를 새로고침하면 초기화되는 문제가 발생한다. ui 상태를 url과 동기화했을 때 다음과 같은 이점들이 존재한다.

**유저 경험 측면**

- 유저가 웹의 URL을 외부로 공유했을 때(혹은 브라우저 북마크), 본인의 인터랙션이 반영된 동일한 UI를 공유할 수 있다.
- 브라우저의 기능과 ui 상태 간 자연스러운 흐름을 만들 수 있다. (이전 버튼을 누르면 이전 ui를 보여주고, 다음 버튼을 누르면 다음 ui를 자연스럽게 보여줄 수 있다. 새로고침을 하더라도 동일한 ui가 유지된다.)

**개발 측면**

- SEO(검색엔진최적화) 면에서 url에 상태를 표현하는 게 유리하다.
- React에서 서버 컴포넌트를 사용할 경우 useState를 사용하지 않더라도 ui 상태를 구현할 수 있다. [Example](https://github.com/wooleejaan/yw-frontend/tree/main/managing-ui-state-through-url)

### url을 사용해 상태를 관리했을 때, SEO에 유리한 이유

페이지의 특정 상태에 대한 고유한 url을 생성하므로 검색엔진이 이를 쉽게 색인화할 수 있다.<br>
url에 상태를 "적절히" 동기화하면, 보다 높은 검색 순위를 차지할 수 있다.

## References

- [React로 필터 UI 구현하기 (+ URL 동기화)](https://www.daleseo.com/react-filter/)
- [STOP using useState, instead put state in URL (in React & Next.js)](https://www.youtube.com/watch?v=ukpgxEemXsk)
