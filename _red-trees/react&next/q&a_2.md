# Next.js에서 패키지 가져오기를 최적화하는 방법(배럴 파일 관리)

## Features

자바스크립트의 배럴(barrel) 파일은 단일 파일에서 여러 모듈을 그룹화해서 내보내는 방법입니다.<br>
배럴 파일의 문제점은 불필요한 모듈까지 전부 가져온다는 점입니다. 자바스크립트의 require, import는 자바스크립트 런타임에서 비용이 됩니다. 무심코 배럴 파일을 사용하면 우리의 어플리케이션은 쉽게 느려질 수 있습니다.

트리-쉐이킹도 해결책은 아닙니다. 트리-쉐이킹은 기본적으로 번들러의 기능이며, 자바스크립트 런타임 기능이 아닙니다.<br>
기본적으로 번들러는 external 라이브러리에 대해서는 트리-쉐이킹을 하지 않으며, 심지어 특정 라이브러리를 어플리케이션 코드로 포함한다고 해도(사이드 이펙트가 없다고 판단), 전체 모듈 그래프를 분석한 뒤에 트리-쉐이킹을 진행하기 때문에 빌드가 느려진다.

**modularizeImports**

첫번째 접근 방법은 modularizeImports입니다. modularizeImports는는 nextjs 13.1부터 사용할 수 있습니다.

예를 들어, nextjs에서 modularizeImports는 아래와 같이 사용하는데,

```js
// next.config.js
module.exports = {
  modularizeImports: {
    "@acme/ui": {
      transform: "@acme/ui/dist/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};
```

이렇게 설정하면, `import { ArrowBack } from '@mui/icons-material';`와 같은 import 구문을 `import { default as <any_name>} from '@mui/icons-material/ArrowBack';`로 트랜스파일해줍니다.

modularizeImports는 굉장히 효과적이지만, 의존하는 라이브러리 내부 코드가 변경되거나 하면 거기에 맞춰서 일일이 수정해줘야 합니다. 번거롭기 때문에 한계가 명확합니다.

**optimizePackageImports**

next.js 13.5부터 [optimizePackageImports 옵션](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports)을 지원합니다. 패키지 이름을 배열에 넣으면, 해당 패키지 entry 파일을 분석해 배럴 파일인지 판단합니다. 한 번에 하나의 진입점 배럴 파일만 확인하므로 트리 쉐이킹 비용보다 저렴하다. 기본적으로 동작 방식은 modularizeImports과 유사하다.

## References

- [How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [no-barrel-import](https://github.com/gajus/eslint-plugin-canonical#no-barrel-import)
- [Next.js: Modularize Imports](https://medium.com/@under_the_hook/next-js-modularize-imports-687d7a2cddcf)
