좋은 commit 메시지 작성

1.  제목과 본문을 한 줄 띄워 분리하기
    - `git log --oneline`로 찍어보면 명확하게 알 수 있다.
2.  제목은 영문 기준 50자 이내로
3.  제목 첫글자를 대문자로
4.  제목 끝에 . 금지
5.  제목은 명령조로
    - 예를 들어, 메시지 앞에 (If applied, this commit will)가 있다고 가정하고 문맥을 고려하기
    - (If applied, this commit will) Refactor subsystem X for readability
6.  Github - 제목(이나 본문)에 이슈 번호 붙이기
    - `{동작} #번호 - 내용`
    - 예시 : `Refactor #28 - getPersonID()`
7.  본문은 영문 기준 72자마다 줄 바꾸기
8.  본문은 어떻게보다 무엇을, 왜에 맞춰 작성하기
9.  커밋 메시지로 github 이슈 자동 종료 - `키워드 #번호`

close 계열은 일반 개발 이슈, fix 계열은 버그 픽스나 핫 픽스 이슈, resolve 계열은 문의나 요청 사항에 대응한 이슈에 사용하면 적당

```bash
    close
    closes
    closed
    fix
    fixes
    fixed
    resolve
    resolves
    resolved
```

## 참고자료

- [좋은 git 커밋 메시지를 작성하기 위한 8가지 약속](https://djkeh.github.io/articles/How-to-write-a-git-commit-message-kor/)
