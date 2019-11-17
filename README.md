## proxy + client + api-server + database server boilerplate

docker, docker compose를 이용한 개발 및 배포 환경 boilerplate

<br>

### api-server

- node.js
- es6 문법 사용을 위한 babel setting

### cocode

- client server
- development: webpack-dev-server 이용
- production: 빌드된 파일을 nginx에서 serving

### mongodb

- database
- docker-compose로 배포

### proxy

- nginx
- production에서 client서버와 api서버를 중개해주는데에 사용

### script

- deploy.sh: travis에서 배포시에 실행됨
- update-env-files.sh: env파일 수정시 실행시켜서 travis에서 배포 시 최신화 할 수 있도록 함

### travis

- test stage는 간소화
  - push 된 브랜치에서 test script를 실행시키는 것으로 설정 가능
- deploy stage
  - 다음과 같은 방식으로 진행 됨

```
1. 암호화된 압축 env파일을 풀고 풀어서 저장
2. dockerhub에 변경된 사항 push
3. 서비스 서버에 접속하여 배포 지시
```

### 개발 시

- docker-compose up --build 명령어로 client, server, db 컨테이너를 실행시켜 빠르게 개발 시작 가능

### 그 외

- proxy server와 db server는 초기 셋팅이후에는 따로 배포가 필요없기에 자동화하지 않음
