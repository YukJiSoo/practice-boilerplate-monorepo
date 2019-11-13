## proxy + client + api-server + database server boilerplate

docker compose를 이용한 개발 및 배포 환경 boilerplate

<br>

### 🌈 step1

- json data를 주고받는 client/server 구조 구현
- client: CRA
- server: express-generator

<br>

### 🌈 step2

- docker-compose.yml 으로 nginx + react client server + api server 환경 구성
- 실행 명령어

```
// 다시 이미지를 빌드하고 컨테이너 실행
docker-compose up --build

// 백그라운드로 컨테이너 실행
docker-compose up -d

```

<br>

### 🌈 step3

- docker-compose.yml 에 mongodb 추가
- 실행명령어 동일

<br>

### 🌈 step4

- travis를 이용한 CI/CD(delivery) 적용
- master에 PR을 보내면 travis CI server에 요청
- CD는 DockerHub에 새로운 이미지를 push하는 것 까지 수행

<br>

### 🌈 step5

- client + server 구조 ci test
