### parsing error

No Babel config file detected 관련 에러일 경우
<br>아래와 같이 `"eslint.workingDirectories"` 코드 추가하면 해결

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: "@react-native",
  "eslint.workingDirectories": [{ mode: "auto" }],
};
```
