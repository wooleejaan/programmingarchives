### 크기 맞춰주기

정렬하기 전에 기본적으로 이미지와 텍스트의 크기가 어느 정도 비슷해야 함.

```css
svg {
  width: 2rem;
  height: 2rem;
}

span {
  font-size: 2rem;
}
```

### vertical-align

text, svg 모두 인라인이므로 vertical-align: middle; 적용해주면 됨.

```css
svg,
span {
  vertical-align: middle;
}
```

이 스타일링의 단점은 아이콘과 텍스트 간 간격 조절이 어렵다는 점임 => 인라인 요소 간에는 letter-spacing 속성이 간격을 결정하는데 이걸 바꾸면 단어간 간격도 조정되기 때문임.

=> flexbox 활용하는 게 best
