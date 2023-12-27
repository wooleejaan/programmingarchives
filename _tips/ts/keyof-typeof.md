## typeof

```js
let person = {name: "Alice", age: 28};
type Person = typeof person;
type PersonKeys = keyof Person;  // "name" | "age"
```

typeof는 객체 데이터를 객체 타입으로 변환해주는 연산자. => 객체에 쓰인 타입 구조를 그대로 가져와, 독립된 타입으로 사용할 때 씀.

- 함수도 타입으로 변환 가능.
- 클래스의 경우, 클래스 자체가 객체 타입이 될 수 있어서 typeof 안 붙여도 됨.

```js
function fn(num: number, str: string): string {
   return num.toString();
}

type Fn_Type = typeof fn;
// type Fn_Type = (num: number, str: string) => string

const ff: Fn_Type = (num: number, str: string): string => {
   return str;
};

// --------------------------------------------------------------

class Classes {
   constructor(public name: string, public age: number) {}
}

type Class_Type = Classes;
// type Class_Type = { name: string, age, number }

const cc: Class_Type = {
   name: '임꺾정',
   age: 18888,
};
```

## keyof

객체 형태의 타입을, 따로 속성들만 뽑아 유니온 타입으로 만들어주는 연산자.

```js
const obj = { red: 'apple', yellow: 'banana', green: 'cucumber' } as const; // 상수 타입을 구성하기 위해서는 타입 단언을 해준다.

// 위의 객체에서 red, yellow, green 부분만 꺼내와 타입으로서 사용하고 싶을떄
type Color = keyof typeof obj; // 객체의 key들만 가져와 상수 타입으로

let ob2: Color = 'red';
let ob3: Color = 'yellow';
let ob4: Color = 'green';
```

value 값을 타입으로 쓰고 싶다면 아래와 같이.

```js
const obj = { red: 'apple', yellow: 'banana', green: 'cucumber' } as const;

type Key = typeof obj[keyof typeof obj]; // 객체의 value들만 가져와 상수 타입으로

let ob2: Key = 'apple';
let ob3: Key = 'banana';
let ob4: Key = 'cucumber';
```

## typeof, keyof 활용

### enum 대체 상수 타입

```js
enum EDirection {
   Up,
   Down,
   Left,
   Right,
}

const ODirection = {
   Up: 0,
   Down: 1,
   Left: 2,
   Right: 3,
} as const;

console.log(EDirection.Left); // 2
console.log(ODirection.Right); // 3

// Enum을 타입으로 사용
function walk(dir: EDirection) {
   console.log(dir);
}

// 객체를 타입으로 사용하기 위해선 typeof 와 keyof 파라미터를 사용해야 한다
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {
   console.log(dir);
}

walk(EDirection.Left); // 2
run(ODirection.Right); // 3
```

### 제네릭 활용

예를 들어, 함수의 매개변수 key가 반드시, 매개변수 obj의 제네릭타입(T)에 존재해야 할 때,

```js
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // 성공
getProperty(x, "m"); // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음.
```

## References

[keyof and typeof Operators](https://www.learn-ts.org/en/keyof_and_typeof_Operators)<br>
[📘 객체를 타입으로 변환 - keyof / typeof 사용법](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-keyof-typeof-%EC%82%AC%EC%9A%A9%EB%B2%95)<br>
