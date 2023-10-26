forked repo를 잔디에 남기려면,

1. 커밋 복사할 새로운 Repo 생성
2. 로컬에서 가벼운 복제본 생성

- `git clone --bare <복사할 forked repo 링크>`

3. mirror push

- `cd forkedRepository.git`
- `git push --mirror <커밋 복사하기 위해 새로 생성한 Repo 링크>`
