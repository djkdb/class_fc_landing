# CLASS FC Official Website

소프트웨어학부 축구 동아리 CLASS FC의 공식 웹사이트입니다.

배포는 AIVEN, Cloudinary, render, github pages를 이용해 현재 테스트 중입니다.
아래 방법으로 로컬에서 실행할 수 있습니다.

## 주요 기능
- 선수단, 포지션별 프로필
- 경기 일정, 참석 체크
- 스쿼드 메이커
- 통계, MOTM 투표
- 공지, 댓글
- 갤러리 (이미지 / 유튜브 영상)

## 기술 스택
- Frontend: React, Javascript, HTML5, CSS3, Bootstrap 5
- Backend: Node.js, Express
- Database: MySQL
- 로그인 토큰 인증: JWT, bcrypt

## 프로젝트 구조
- frontend/ : React 프론트엔드
- backend/  : Express API 서버
- backend/schema.sql : 데이터베이스 테이블

## 로컬 실행 방법

### 사전 준비
- Node.js, MySQL

### 1. 데이터베이스
- MySQL에서 데이터베이스 생성 후 schema.sql 실행

### 2. 백엔드
- backend로 이동하여 npm install
- backend/.env 파일을 만들고 로컬 MySQL 정보 입력:
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=MySQL비밀번호
    DB_NAME=classfc
    JWT_SECRET=랜덤 문자열
    PORT=3001
- 초기 데이터 입력 후 서버 실행:
    npm run seed
    npm start
- http://localhost:3001/api/health 접속하여 db연결 및 서버 상태 체크

### 3. 프론트엔드
새 터미널에서:
-frontend 폴더로 이동하여 npm install, npm start
- http://localhost:3000로 접속

## 관리자 계정
- ID: admin
- PW: admin1234로 로그인 가능

관리자 로그인 후 ADMIN 페이지에서 부원, 경기, 공지, 갤러리를 데이터베이스에 직접 추가/삭제할 수 있습니다.

# 팀원
- 2022041067 이성준
- 2022041068 차형창
- 2022041076 김태효
