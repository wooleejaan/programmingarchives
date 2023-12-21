```bash
# 기존 명령어 간소화 또는 일부 변경
s = status

sw = switch
swc = switch -c

ac = "!git add --all && git commit -v"
amend = commit -a --amend --no-edit
precommit = commit --allow-empty -n

pushthis = push origin HEAD

# 추적하지 않는 파일도 포함해서 stash 하기
stash = stash --include-untracked

# n번째 stash의 내용 확인하기
stash-show = "!f() { git stash show -p --include-untracked \"${1:-0}\"; }; f"

# 현재 가리키고 있는 커밋 해시 출력
hash = "!git rev-parse --short HEAD"

# 현재 체크아웃된 브랜치의 이름 출력
head = !git rev-parse --abbrev-ref HEAD

# 현재 브랜치의 백업 브랜치 만들기
bak = "!git switch -c \"bak/$(git head)\""

# 백업 브랜치 일괄 삭제하기
bak-clean = "!git for-each-ref refs/heads/bak --format='%(refname)' | while read ref ; do branch=${ref#refs/heads/} ; git branch -D $branch ; done"

# 동일한 이름의 로컬 브랜치를 원격 저장소와 동기화하기
synchard = "!f() { git fetch --all && git checkout ${1:-main} && git reset --hard origin/${1:-main} && git switch - ; }; f"
```

## References

[리눅스 Bash 줄바꿈](https://openwiki.kr/tech/%EB%A6%AC%EB%88%85%EC%8A%A4_bash_%EC%A4%84%EB%B0%94%EA%BF%88)<br>
[Git, Github 명령어 사용 꿀팁](https://prgms.tistory.com/217)<br>
[datalater/.gitconfig](https://gist.github.com/datalater/2e89ff92c264f3ee3a5fed1e1385827e)<br>
[2.7 Git Basics - Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)<br>
