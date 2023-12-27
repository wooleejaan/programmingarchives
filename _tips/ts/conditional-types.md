## 조건부타입

제네릭 타입과 조합해서 조건부 타입을 만들 수 있음.

```js
type TypeName<T> =
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    'object'

type IsString<T> = T extends string ? 'Yes' : 'No'
```

## never와 함께 쓰기

이렇게 작성했을 때 문제는, 명시적으로 id가 string | number이도록 하기 어려움.

`type ExtractIdType<T extends {id: string | number}> = T["id"]`

이럴 때 never를 씀.

```js
type ExtractIdType<T> = T extends {id: string | number} ? T["id"] : never

interface NumericId {
    id: number
}

interface StringId {
    id: string
}

interface BooleanId {
    id: boolean
}

type NumericIdType = ExtractIdType<NumericId> // type NumericIdType = number
type StringIdType = ExtractIdType<StringId> // type StringIdType = string
type BooleanIdType = ExtractIdType<BooleanId> // type BooleanIdType = never
```

## 조건부 타입을 활용해서 추론하도록 할 수도 있음.

```js
type ExtractIdType<T> = T extends {id: infer U} ? T["id"] : never

interface BooleanId {
    id: boolean
}

type BooleanIdType = ExtractIdType<BooleanId> // type BooleanIdType = boolean
```

## ts 라이브러리에서 쓰는 예시.

### `NonNullable<T>`

```js
type NonNullable<T> = T extends null | undefined ? never : T
type A = NonNullable<number> // number
type B = NonNullable<number | null> // number
type C = NonNullable<number | undefined> // number
type D = NonNullable<null | undefined> // never
```

### `Extract<T, U> and Exclude<T, U>`

```js
type Extract<T, U> = T extends U ? T : never
type Exclude<T, U> = T extends U ? never : T

type A = Extract<string | string[], any[]> // string[]
type B = Exclude<string | string[], any[]> // string

type C = Extract<number, boolean> // never
type D = Exclude<number, boolean> // number
```

### `Parameters<T> and ReturnType<T>`

```js
type Parameters<T> = T extends (...args: infer P) => any ? P : never
type ReturnType<T> = T extends (...args: any) => infer R ? R : any
type A = Parameters<(n: number, s: string) => void> // [n: number, s: string]
type B = ReturnType<(n: number, s: string) => void> // void

type C = Parameters<() => () => void> // []
type D = ReturnType<() => () => void> // () => void
type E = ReturnType<D> // void
```

### `ConstructorParameters<T> and InstanceType<T>`

```js
type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any

interface PointConstructor {
    new (x: number, y: number): Point
}

class Point {
    private x: number;

    private y: number;

    constructor(x: number, y: number) {
            this.x = x;
            this.y = y
    }
}

type A = ConstructorParameters<PointConstructor> // [x: number, y: number]
type B = InstanceType<PointConstructor> // Point
```

## References

[The guide to conditional types in TypeScript](https://blog.logrocket.com/guide-conditional-types-typescript/)<br>
[Conditional Types](https://www.learn-ts.org/en/Conditional_Types)<br>
