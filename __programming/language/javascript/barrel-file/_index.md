## Barrel 파일의 문제점

### 런타임 보다는 런타임 전/후에 성능 문제가 발생할 가능성이 높다.

아무리 런타임 속도가 낮은 파일이더라도, import하는 과정에서 시간이 오래 걸린다.<br>
즉, 아무리 코드 자체의 성능을 개선하더라도, 모듈 형태로 파일을 쪼개면, 그걸 가져오는 과정 자체에서 속도가 느려진다는 것이다.

주로, 런타임이 아니라 코드를 실행하기 전이나 후에 시간이 낭비된다.

배럴(barrel) 파일이란, 다른 파일만 내보내고 코드 자체를 포함하지 않는 파일을 말한다.

예를 들어, 여러 개로 분산되어 있는 파일들이 아래와 같이 존재한다.

```js
import { foo } from "../foo";
import { bar } from "../bar";
import { baz } from "../baz";
```

여기서 import를 줄이기 위해 아래와 같이 배럴 파일을 생성한다.

```js
// feature/index.js
export * from "./foo";
export * from "./bar";
export * from "./baz";
```

그럼 이렇게 import 숫자를 줄일 수 있다.

```js
import { foo, bar, baz } from "../feature";
```

이런 패턴에서 모듈은 다른 파일을 import하는 배럴 파일을 또 import 하고, ... 반복하게 된다.<br>
결국에는 거미줄처럼 얽힌 import 문을 통해 프로젝트의 모든 파일을 import하게 된다. 프로젝트 규모가 클수록 이런 모듈을 로드하는 시간이 굉장히 골칫거리가 되곤 한다.

### 배럴 패턴 위에서의 테스트 코드는 최악이다.

테스트 코드를 작성하면 문제는 더 심각해진다.<br>
각 테스트 파일은 고유한 자식 프로세스에서 실행된다. 이는 사실상 모든 테스트 파일이 모듈 그래프를 처음부터 다시 구상하고 그에 대한 비용을 지불해야 한다는 의미이다.

### 배럴 패턴 위에서의 린트 규칙도 문제다.

린터는 일반적으로 파일 단위로 실행된다. 모듈 그래프를 구성하는 데 있어 드는 비용을 모든 파일에 지불해야 하는 셈이다.

### 그러므로 해야 할 일

일부분 배럴은 괜찮지만, 모든 폴더에 배럴 파일이 있는 건 문제다.

배럴 파일을 삭제해야 한다.

## 배럴 파일 단점 예시

### Shortening Imports

배럴 파일은 import paths를 단축시킬 수 있다. 하지만 이게 import context를 잃게 만드는 이유가 되기도 한다.

예를 들어, 아래에서 단순히 'state'에서 import하는 구조를 만들면, `user/utilities/network`라는 구체적인 맥락을 잃어버리는 셈이다.

```js
import { ambigousObject } from "state";
// vs
import { ambigousObject } from "state/user/utilities/network";
```

### Blurring the Pattern

아래와 같은 작성 방식은 IDE에서 파일 이름으로 특정 파일을 탐색하는 걸 어렵게 만든다.

```js
//components/button/index.ts
export const Button () => <button />;
```

## 참고자료

- [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)
- [Are TypeScript Barrel Files an Anti-pattern?](https://steven-lemon182.medium.com/are-typescript-barrel-files-an-anti-pattern-72a713004250)