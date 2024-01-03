## js보다 css, css보다 html인 이유

js는 브라우저 동작을 설명하는 언어이므로 다재다능하지만,<br>
웹은 js보다 css를, css보다 html을 선호함.

브라우저가 동작하지 않거나, 로드를 실패하거나 구문분석 및 실행에 추가 리소스가 필요함.

js는 imperative하며, html/css는 선언적임(declarative).

- 즉, 수행 방법이 아니라 수행할 작업만 지시하면 브라우저가 이를 수행하는 가장 최적의 방법으로 수행함.

html/css 기능은 브라우저에서 처리하므로 성능이 뛰어나며, 접근성이 좋음.

지금까지 브라우저는 js로만 구현가능했던 기능들을 html/css로 이식해오는 작업을 진행해왔음. 앞으로도 그럴 것임.

## 예제 코드

### custom switches

```html
<label>
  <input type="checkbox" />
  My awesome feature
</label>
```

input type으로 checkbox를 넘겨주면 됨. 스타일링을 변경하려면 `appearance: none;`으로 지우고 `::before`에서 스타일링을 시작하면 됨.

checkbox가 체크되었을 때 ui를 변경하려면

```css
:checked {
  background: green;
}
:checked::before {
  transform: translateX(1rem);
}
```

키보드 엔터로 포커스하는 사람들을 위해서라면 아래와 같이 추가할 수 있음.

```css
input:focus {
  outline: none;
  outline-color: transparent;
}
input:focus-visible {
  outline: 2px solid dodgerblue;
  outline-offset: 2px;
}
```

### Datalist, a native autosuggest

datalist라는 태그를 사용하고 input list로 연결하면 됨.

```html
<input list="frameworks" />

<datalist id="frameworks">
  <option>Bootstrap</option>
  <option>Tailwind CSS</option>
  <option>Foundation</option>
  <option>Bulma</option>
  <option>Skeleton</option>
</datalist>
```

### Color picker

```html
<label> <input type="color" /> Color </label>
```

### Accordions

```html
<details open>
  <summary>My accordion</summary>
  <p>My accordion content</p>
</details>
```

details 안에 작성하면 숨겨줌. open 값을 넘겨주면 열려있는 상태가 됨.

```css
summary::marker {
  font-size: 1.5em;
  content: "📬";
}
[open] summary::marker {
  font-size: 1.5em;
  content: "📭";
}
```

열었을 때 닫았을 때를 스타일링할 수도 있음.

### Dialog modals

다이얼로그 모달도 html로 가능함.

```html
<dialog>
  <form method="dialog">
    <p>Tabs or spaces?</p>
    <button type="submit" value="wrong">Tabs</button>
    <button type="submit" value="correct">Spaces</button>
  </form>
</dialog>
```

모달 열렸을 때 배경 흐릿하게도 가능함.

```css
dialog::backdrop {
  background: #fff5;
  backdrop-filter: blur(4px);
}
```

## 기타 등등

그외에도 다양한 html, css가 존재함

`scroll-behavior: smooth` (but only when prefers-reduced-motion: no preference matches)

`grid-template-rows: masonry`

A fully stylable `select` with the new `selectlist`

`:has()` selector

## References

[You don't need JavaScript for that](https://www.htmhell.dev/adventcalendar/2023/2/)<br>
