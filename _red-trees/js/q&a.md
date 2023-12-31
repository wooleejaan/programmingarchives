# Variable declaration keyword(var, let, const) & Lexical Enviroment

## Features

최근에는 브라우저 js 엔진들의 성능 최적화로 차이가 미미해졌지만, 일반적으로 var이 let, const보다 빠르다.

이유는 렉시컬 환경에 있다. 렉시컬 환경은 식별자, 특정 변수와 함수 간 연관성을 정의하기 위한 스펙이다.<br>
자바스크립트에서 코드 실행 단계를 실행 단계(execution phase)과 생성 단계(creation phase)로 나눈다. var은 함수형 스코프로, 생성 단계에 생성된다. 반면 let, const는 실행 단계에 생성된다. 실행 단계에 생성되면서 특정 block에서의 새로운 렉시컬 환경을 생성하므로 이에 따른 시스템적인 비용이 발생하기 때문이다.

var과 let,const의 성능 차이는 미미한 반면, var은 전역 변수이므로 실제 코드에서는 작성을 지양하는 게 좋다. 전역 변수이므로, 변수 오염 위험으로 인해 예상치 못한 결과를 일으킬 수 있기 때문이다.

물론 js로 코딩테스트에 응시할 경우 let으로 통과되지 않을 때 var로 변경해서 효율성 테스트에 통과한 경험은 있기에, 코딩테스트에서는 한정적으로 var을 사용할 때가 있다.

## References

- [Issue 4762: Low performance when use "let" in "for" loop](https://bugs.chromium.org/p/v8/issues/detail?id=4762&q=let%20label%3APerformance%20&colspec=ID%20Type%20Status%20Priority%20Owner%20Summary%20HW%20OS%20Component%20Stars)
- [Lexical Environments | ECMAScript® 2015 Language Specification](https://262.ecma-international.org/6.0/#sec-lexical-environments)
- [[javascript] var가 let보다 빠르다?](https://blinders.tistory.com/101)
- [The one and only article you need to know about var, let, and const in JavaScript](https://levelup.gitconnected.com/the-one-and-only-article-you-need-to-know-about-var-let-and-const-in-javascript-d51562a17f47)

### to be read

- [Temporal dead zone (TDZ) | mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
