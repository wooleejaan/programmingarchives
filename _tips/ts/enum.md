## enum은 변수들을 하나의 그룹으로 묶고 싶을 때 사용

enum은 직접 타입으로 가능

```js
function func(dir: ColorEnum) {}
```

- 숫자 열거형

  - 기본적으로 0부터 인덱싱 지원.
  - 리버스 맵핑 가능 (숫자형만 가능)

  ```js
  enum Enum {
      Color
  }

  let color = Enum.Color // 0
  let keyName = Enum[Color] // 'Color'
  ```

- 문자 열거형

## 일반 객체로도 enum 효과낼 수 있음.

as const 붙여야 하며, keyof-typeof 조합을 잘 활용해야 함.

```js
const obj = {
    Color = 1,
    BackgroundColor = 2
} as const
// as const를 붙이지 않으면 value가 number로만 나오는데,
// as const를 붙이면 1,2 이렇게 enum처럼 정확한 값 나옴
```

## enum 문제점?

### tree shaking 문제?

enum은 ts에서 enum이라는 열거형 기능을 위해 만들어낸 것 => js로 트랜스파일링 필요.

이 과정에서 일부 번들러에서는 treeshaking 못하는 문제 존재.

- rollup에서 안 되고, webpack에서는 된다?

### 안전하지 않은 number enum

숫자 enum은 자동 인덱싱되므로 주의해야 함.

## 그래서 대처?

### const enum 사용

tree shaking 잘됨.

but, const enum은 트랜스파일링 시 트러블 슈팅 해야 할 수도.

```js
export const enum ColorList = {
    Red = 0,
    Blue = 1,
    Purple = 2,
}
```

### 그냥 union type 쓰셈

객체에 as const 후, keyof-typeof 처리.

tree shaking 잘됨.

## References

[[TS] enum, keyof, typeof](https://velog.io/@codns1223/TS-enum-keyof-typeof)<br>
[[Typescript] Enum 왜 쓰지 말아야하죠?](https://velog.io/@sensecodevalue/Typescript-Enum-%EC%99%9C-%EC%93%B0%EC%A7%80-%EB%A7%90%EC%95%84%EC%95%BC%ED%95%98%EC%A3%A0)<br>
[우리 팀의 우아한 타입스크립트 컨벤션 정하기 여정](https://techblog.woowahan.com/9804/)<br>
[const enum compile time evaluate #940](https://github.com/swc-project/swc/issues/940)<br>
