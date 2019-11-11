## proxy + client + api-server + database server boilerplate

docker compose를 이용한 개발 및 배포 환경 boilerplate

### 🌈 step1

-   json data를 주고받는 client/server 구조 구현
-   client: CRA
-   server: express-generator

### 🌈 step2

-   docker-compose.yml 으로 nginx + react client server + api server 환경 구성
-   실행 명령어

```
// 다시 이미지를 빌드하고 컨테이너 실행
docker-compose up --build

// 백그라운드로 컨테이너 실행
docker-compose up -d

```
