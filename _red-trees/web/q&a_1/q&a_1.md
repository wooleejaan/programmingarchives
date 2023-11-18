# JWT를 어떻게 관리해야 할까요? | JWT는 안전한가요?

유저 인증/인가를 위해 오늘날 jwt를 통한 토큰 인증 방식을 주로 사용합니다.<br>
단순 쿠키 기반 인증은 보안에 취약하고 유저 정보를 담을 만큼 저장공간이 충분하지 않습니다.<br>
세션 기반 인증은 서버에 부하가 심해지기 때문입니다.

물론 웹 상에서 jwt를 사용하는 것만으로도 기본적인 보안 처리는 가능합니다.<br>
일반적으로 https 위에서 사용되므로 서버와 클라이언트 간 네트워크 통신에 ssl 인증이 선행되며,<br>
jwt는 토큰 안에 중요 정보를 담지 않습니다. 유일한 토큰이므로 이 토큰이 유효한지만 판별하면 되기 때문입니다.

그럼에도 불구하고, 위험성이 존재합니다.<br>
한번 로그인을 하면 jwt를 서버로부터 발급받을텐데, 이 통신 과정에서 토큰 자체를 탈취당할 수 있습니다.<br>
그리고 XSS, CSRF 등 해킹으로 이어질 위험이 존재합니다.

클라이언트 측에서는 발급 받은 토큰을 안전하기 관리하며 로그인 상태를 유지해 사용자경험의 질을 낮추지 않아야 합니다.<br>
프론트엔드 개발자는 적절한 방법을 선택해 jwt를 안전하게 관리할 필요가 있습니다.<br>
물론 이에 앞서, 관련한 지식들을 먼저 이해해야 합니다.

## JWT (Json Web Token)

jwt는 인증에 필요한 정보를 컴팩트하게 담아 암호화한 토큰입니다.<br>
로그인 시 유저 정보를 서버에 저장하지 않고, 해당 유저에 유일한 토큰을 발급합니다.<br>
이후 인증 시, 이 jwt를 통해 위조 여부를 판별하고 http authorization header에 담아 인증/인가를 처리합니다.

jwt는 크게 3가지 부분(Header, Payload, Signature)으로 나뉩니다.

- Header에는 jwt에서 사용할 타입과 해시 알고리즘 종류를 명시합니다.
- Payload에는 사용자 권한 데이터(이 데이터 안에서는 하나의 key-value 쌍 정보를 Claim이라고 칭합니다.)를 담습니다. 비밀번호와 같은 중요 정보는 담지 않아야 합니다.
- Signature에는 json 형식인 Header, Payload를 `Base64 URL-safe encode 방식(일반적인 Base64 encode에서 "+", "/"를 "-", "_"로 바꿔 오류없이 사용하도록 만든 방식입니다)`을 통해 직렬화하고, Header에 명시된 해시함수를 적용한 뒤 개인키(private key)로 서명한 전자서명이 담겨 있습니다.

서버는 클라이언트로부터 전달 받은 jwt에 있는 Header, Payload를 서버의 개인키로 다시 시그니처를 생성합니다.<br>
그리고 클라이언트로부터 전달받은 jwt의 시그니처와 비교해 위조 여부를 판별합니다.

### 토큰 기반 인증 방식의 장점

쿠키, 세션 기반과 달리 토큰 안에 어떤 정보가 들어 있는지보다, 해당 토큰 자체가 유효한지에 관심을 갖습니다.<br>
토큰의 목적은 정보 보호가 아니라 위조 방지입니다. 시그니처 생성에 사용된 개인키만 노출되지 않으면 됩니다.<br>
페이로드 부분은 그대로 노출되므로 중요 정보를 담으면 안 됩니다.

- 세션 기반 인증 방식과 달리, 서버가 상태를 유지하지 않습니다. Stateless합니다.
- 쿠키/세션과 달리 토큰 자체의 길이가 길어, 인증 요청이 많아질수록 네트워크 부하가 심해질 수 있습니다.
- 토큰을 탈취당하면 대처하기가 어렵습니다.
  - 세션은 서버가 세션 상태를 지니므로 쉽게 무효화할 수 있지만, 토큰은 서버가 상태를 관리하지 않기 때문입니다.

그래서 방법 중 하나는 토큰의 유효기간을 짧게 잡는 것입니다.

## 유명한 공격 방식

### XSS (Cross Site Scripting)

CSS는 이미 약자가 존재하므로 XSS로 불립니다.<br>
code injection attack이라고도 불립니다.<br>
공격자가 악의적인 javascript 코드를 클라이언트에서 실행시킵니다.<br>
사실상 스크립트가 주입 가능하면 모든 게 가능해집니다. 웹 보안의 가장 기본이 됩니다.

공격자가 jwt를 탈취한 경우, 인증된 유저로 둔갑해 보호된 리소스에 무단 엑세스 권한을 얻게 됩니다.

### CSRF (Cross Site Request Forgery)

XSS처럼 스크립트 주입이 아닌, request를 가로채는 공격 방식입니다.<br>
사용자의 의도와 달리 혹은 사용자 모르게 악의적인 request를 서버에 보냅니다.

마찬가지로 권한이 필요한 요청에 있어 jwt를 탈취한다면 위험해집니다.<br>
심지어 request의 경우 XSS처럼 스크립트가 아닌 img, link tag로도 가능합니다.

## 그래서 토큰을 어디에 어떻게 저장하고 관리해야 안전할까요?

### refresh token과 함께 사용하는 게 안전합니다.

안전하게 사용하려면, 토큰의 유효기간을 짧게 잡아야 합니다.<br>
인증 목적이 아닌 새로운 엑세스 토큰을 생성하는 목적으로서의 리프레시 토큰을 엑세스 토큰과 함께 사용합니다.<br>
엑세스 토큰이 만료되었을 때, 리프레시 토큰을 재발급받는 로직을 구현합니다.

### 어디에 저장할까요?

클라이언트 저장소는 크게 3가지로 나눠서 생각해볼 수 있습니다.

1. 자바스크립트의 private variable
2. 브라우저스토리지 - localStorage
3. 쿠키

일반적으로 로그인 후 `엑세스토큰`과 `리프레시토큰`을 서버로부터 받으면, 나눠서 저장합니다.<br>
`엑세스토큰`은 js의 private variable에 저장합니다.<br>
`리프레시토큰`은 쿠키 또는 로컬스토리지에 저장합니다.
url이 새로고침될 떄마다 혹은 짧은 유효기간이 지났을 때마다 `리프레시토큰`을 사용해 `엑세스토큰`을 재발급받는 로직을 구현합니다.

- axios를 사용한다면 interceptor에 재발급 로직을 구현합니다.

### 리프레시토큰을 쿠키 또는 로컬스토리지에 저장한다고 했는데, 각각의 어떤 장단점이 존재할까요?

로컬스토리지의 경우 XSS에는 취약하며, CSRF 공격에는 안전합니다.

- 로컬스토리지는 공격자가 스크립트를 통해 쉽게 접근할 수 있습니다.
- 반면, 스크립트가 아니면 로컬스토리지에 접근할 수 없으므로 request 기반인 CSRF에서는 안전합니다.

쿠키는 XSS에는 안전한 편이며, CSRF 공격에는 취약합니다.

- 대신 쿠키를 httpOnly 옵션을 사용해 스크립트로 조작할 수 없게 해야 합니다.
  - 서버에서 httpOnly로 쿠키를 구워주면 됩니다.
- 단, httpOnly로 요청 헤더에 자동으로 담기므로, CSRF에 취약합니다.

물론 XSS 공격의 경우 쿠키도 완벽한 건 아니며,<br>
리프레시 토큰의 경우 빈번하게 서버 요청에 담아야 하므로 자동으로 담기는 쿠키(with httpOnly)를 사용하는 게 일반적입니다.

### 쿠키를 안전하게 사용하려면,

리프레시토큰을 쿠키에 저장하기로 결정했다면, 다음 설정을 고려해야 합니다.

- `httpOnly` : 자바스크립트가 읽지 못하도록 합니다.
- `secure=true` : https를 통해서만 전송하도록 합니다.
- `sameSite=strict` : 요청에 있어 동일한 도메인을 강제합니다. CSRF를 막기 위함입니다.

클라이언트에서는 withCredentials를 true로 설정합니다.<br>
Credentials 이란 자격 인증 정보(쿠키, Authorization 인증 헤더, TLS client certificates(증명서))를 의미합니다.<br>
서로 다른 도메인(크로스 도메인)에 요청을 보낼 때, true가 아니면 자동으로 전달되지 않습니다.

### (참고) 쿠키란?

쿠키는 브라우저에 저장되는 작은 문자열이며, http 프로토콜의 일부입니다.<br>
쿠키는 주로 웹서버에 의해 만들어집니다. 서버가 http 응답 헤더의 Set-Cookie에 내용을 넣어 전달하면, 브라우저는 이 내용을 자체적으로 브라우저에 저장합니다. 브라우저는 사용자가 쿠키를 생성하도록 한 동일 서버(사이트)에 접속할 때마다 쿠키의 내용을 Cookie 요청 헤더에 넣어서 함께 전달합니다.

## References

[RFC 7519 - JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)<br>
[JWT는 어디에 저장해야할까? - localStorage vs cookie](https://velog.io/@0307kwon/JWT%EB%8A%94-%EC%96%B4%EB%94%94%EC%97%90-%EC%A0%80%EC%9E%A5%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C-localStorage-vs-cookie)<br>
[LocalStorage vs Cookies: the best-practice guide to storing JWT tokens securely in your front-end](https://www.cyberchief.ai/2023/05/secure-jwt-token-storage.html)<br>
[ReactJS(v18) JWT Authentication Using HTTP Only Cookie](https://www.learmoreseekmore.com/2022/10/reactjs-v18-jwtauthentication-using-httponly-cookie.html)<br>
[HTTP Ajax 요청시 사용하는 withCredentials 옵션의 의미](https://junglast.com/blog/http-ajax-withcredential)<br>
[JWT에서 Refresh Token은 왜 필요한가?](https://velog.io/@park2348190/JWT%EC%97%90%EC%84%9C-Refresh-Token%EC%9D%80-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80)<br>
[[ JSP ] 쿠키(Cookie) 생성하고 사용하기](https://velog.io/@duck-ach/JSP-%EC%BF%A0%ED%82%A4Cookie-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B3%A0-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)<br>
[CORS 쿠키 전송하기 (withCredentials 옵션)](https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98)<br>
[쿠키와 document.cookie](https://ko.javascript.info/cookie)<br>
