# enum to array

Enum이 아래와 같을 떄,

```js
export enum SignatureFontEnum {
  SerifLight = 'serifLight',
  SerifHJS = 'serifHJS',
  KoreaClassic = 'koreaClassic', // NationalMuseumFoundationOfKoreaClassic
  Kukdetopokki = 'kukdetopokki',
}
```

key를 배열값으로 쓰려면 아래와 같이 사용합니다.

```js
const SIGNATURE_FONT_KEYS_MAP = Object.keys(SignatureFontEnum) as (keyof typeof SignatureFontEnum)[]
```

value를 배열값으로 사용하려면 아래와 같이 사용합니다.

```js
const SIGNATURE_FONT_MAP = Object.values(SignatureFontEnum) as (SignatureFontEnum)[]
```
