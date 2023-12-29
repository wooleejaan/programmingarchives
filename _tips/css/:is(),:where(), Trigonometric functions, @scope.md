### :is(), :where()

:is()로 css 그룹화 가능.

:is()는 가장 구체적인 선택자의 명시도를 따름.<br>
:where()은 명시도가 없음.

사용할 때 명시도 문제 잘 고려하기.

### trigonometric functions

chrome111에서 css 삼각함수 추가

`sin(), cos(), tan(), asin(), acos(), atan(), atan2()`

### @scope

css 스타일을 줄 때 범위로 지정해서 주고 싶을 때 사용

```css
@scope (#my-id) {
  :scope {
    background-color: red;
  }
}
```

## References

[새로운 CSS 기능적인 의사 클래스 :is()와 :where()](https://ui.toast.com/weekly-pick/ko_20210721)<br>
[CSS의 삼각 함수](https://web.dev/articles/css-trig-functions?hl=ko)<br>
[:scope::CSS 레퍼런스](http://www.devdic.com/css/reference/cssselector/css-selector:6669/:scope)<br>
