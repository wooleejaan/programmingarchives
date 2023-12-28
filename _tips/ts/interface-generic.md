### 인터페이스

클래스에 인터페이스 적용시 implements 키워드 사용해야.

```js
interface Color {
  name: string;
}

class Background implements Color {
  // ...
}
```

생성자함수에는 new 키워드 사용해야.

```js
interface Color {
  new(name: string): NewColor;
}

function createColor(construct: Color, name: string) {
  return new construct(name);
}

const color1 = createColor(NewColor, "yongwoo");
```

인터페이스 상속은 extends

### 제네릭

함수 선언식

```js
function func<T>(input: T): T {
  return input;
}
```

객체 리터럴 타입 함수 호출 시그니처

```js
const func: { <T>(input: T): T } = (input) => {
  return input;
};
```

함수 표현식

```js
const func: <T>(input: T) => T = (input) => {
  return input;
};
```

제네릭 인터페이스

```js
interface Interface<T> {
  (input: T): T;
}

interface Interface2 {
  <T>(input: T): T;
}
```

## References

[[TypeScript] 인터페이스와 제네릭](https://charles098.tistory.com/165)<br>
