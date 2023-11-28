# Next js debug

크롬 브라우저의 source 탭을 사용합니다.<br>
중단점을 기반으로, 콜스택을 확인하고 정의된 모든 변수를 한 눈에 볼 수 있습니다.

[Chrome으로 디버깅하기](https://ko.javascript.info/debugging-chrome)<br>

next js의 server-sice 코드를 크롬 devtool로 보려면 스크립트를 추가합니다.

```js
{
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

[Debugging](https://nextjs.org/docs/pages/building-your-application/configuring/debugging)<br>

소스맵을 사용할 수 있습니다.<br>
next js config에서 설정합니다.

[productionBrowserSourceMaps](https://nextjs.org/docs/pages/api-reference/next-config-js/productionBrowserSourceMaps)<br>
[Debug your Next.js Projects with Source Maps](https://www.bugpilot.io/guides/en/debug-nextjs-projects-source-maps-d506)<br>
[Next.js에서 sourcemap 생성하기](https://velog.io/@inhyejeong59/Next.js%EC%97%90%EC%84%9C-sourcemap-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)<br>
