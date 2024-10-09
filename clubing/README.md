# 🎁 Clubing
(MERN 스택으로 만든 소모임 웹사이트)

## 📣 개발 이유 및 배경

### 디지털 전환 가속화
코로나19 팬데믹 이후 비대면 활동이 증가하면서 온라인 소통과 모임이 필수가 되었습니다. 이런 상황에서 소모임 웹사이트는 사람들이 언제 어디서든 쉽게 모일 수 있도록 돕는 중요한 플랫폼이 되었습니다.

### 개인화된 커뮤니티의 성장
현대 사회에서 사람들은 대규모 소셜 미디어보다는 자신만의 관심사와 취향에 맞는 소규모 커뮤니티에서 더 큰 만족감을 느끼는 경향이 있습니다. 소모임 웹사이트는 이러한 흐름에 맞춰 사람들에게 맞춤형 커뮤니티를 제공하는 역할을 할 수 있습니다.

### 사회적 고립감 증가
도시화와 디지털 시대가 깊어지면서 많은 사람들이 물리적 공간에서의 소통 기회가 줄어들고, 고립감을 느끼고 있습니다. 소모임 웹사이트는 이러한 문제를 해결하기 위해 사람들이 서로 연결될 수 있는 장을 제공하는 배경을 가지고 있습니다.

### 환경과 사회적 문제에 대한 관심 증가
기후 변화, 환경 보호, 사회적 공헌 활동 등 다양한 이슈에 대한 인식이 높아지면서, 사람들이 이런 공통된 목표 아래 모여 활동할 수 있는 온라인 플랫폼이 필요해졌습니다. 소모임 웹사이트는 환경과 사회적 가치를 추구하는 모임을 조직하는 데에 중요한 역할을 할 수 있습니다.

### 시간과 장소의 제약 완화
현대인들은 바쁜 삶 속에서 물리적 공간에 모이는 것이 어려워지고 있습니다. 소모임 웹사이트는 시간과 장소에 구애받지 않고 다양한 사람들이 쉽게 모일 수 있는 온라인 플랫폼을 제공하는 시대적 필요를 반영합니다.

## 📣 개발 목표
이러한 배경을 바탕으로, 소모임 웹사이트는 사람들에게 맞춤형 커뮤니티와 비대면 소통의 기회를 제공하고, 사회적 고립감을 해소하며, 환경과 사회적 가치를 공유하는 모임을 조직할 수 있는 공간을 만들고자 하였습니다. 바쁜 현대인들이 시간과 장소에 구애받지 않고 쉽게 연결될 수 있도록, 사용자 친화적인 플랫폼을 개발하는 것이 목표입니다.

## 📣 개발 환경

### Frontend
`react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`, `react-query`, `@mui/material`, `react-router-dom`, `axios`, `cropperjs`, `tui-image-editor`, `@toast-ui/react-image-editor`

### Backend
`express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `passport`, `passport-local`, `multer`, `express-fileupload`, `express-session`, `connect-mongo`, `nodemailer`, `socket.io`, `dotenv`

### Database
`MongoDB`

### Communication
`GitHub`, `Git`, `Slack`, `Jira`

### IDE
`VSCode`, `MongoDB Compass`, `Sourcetree`, `Postman`
## 📣 기술 선정 이유
- **React**: 코드 가독성과 모듈화된 개발이 가능하고, 다양한 상태 관리 라이브러리와 함께 자유롭게 확장하고 커스터마이징할 수 있어서 선택.
- **Express**: 경량성과 유연성 덕분에 빠른 개발이 가능하고, 다양한 미들웨어를 통해 쉽게 확장할 수 있어서 선택.
- **MongoDB**: 유연한 스키마와 JSON과 유사한 BSON 형식을 사용하여 데이터를 저장, 높은 성능과 확장성을 제공하며, 대량의 비정형 데이터를 처리하는 데 유리할 것으로 보여서 선택.

## 📣 구현 기능
- 홈 / 모임찾기 / 정모일정 / 이벤트 / 클럽상세페이지 / 마이페이지 / 찜목록 등 다양한 콘텐츠 구현
- 원하는 모임 카테고리별 위치별 찾기 기능 구현
- 소셜로그인 및 플랫폼 내 로그인 구현
- JWT 토큰 기반 인증 및 리프레시 토큰 구현
- 회원의 권한에 따른 보여지는 컨텐츠 분류화
- 모임 CRUD 구현
- 모임에 갤러리 , 게시판 , 채팅 기능 구현
  - 갤러리 -> tui-image-editor 라이브러리를 이용한 갤러리 리스트 CRUD 구현 및 댓글 기능 crud 구현
  - 게시판 -> ck5-editor 라이브러리를 이용한 게시판 CRUD 및 투표 CRUD 기능 구현
  - 채팅 -> socket.io 라이브러리를 사용해서 실시간 채팅기능 구현 ( 웹에서 실시간으로 통신하기 위해 http 객체 사용 )
- 로그인한 회원의 맞춤 모임 및 정기모임 추천 기능 구현
- 날짜별 정기모임 및 카테고리별 정기모임 추천 기능 구현

![image](https://github.com/user-attachments/assets/5edff070-c166-47fc-9668-29a3185e335e)
![image](https://github.com/user-attachments/assets/994f7d69-239d-4250-831e-866034486c46)
![image](https://github.com/user-attachments/assets/d30de9da-6e16-4434-9a02-12b6aa1db87c)
![image](https://github.com/user-attachments/assets/e8880d78-a731-40ff-bbef-8745c377df72)
![image](https://github.com/user-attachments/assets/1081e887-9c2b-41df-9cea-d1c26f0dcab0)
![image](https://github.com/user-attachments/assets/a06a6f5b-1b33-4b9c-b810-9c2aa6591e97)
![image](https://github.com/user-attachments/assets/f3b3e98b-8ed0-4340-bc87-0afddb0eb608)
![image](https://github.com/user-attachments/assets/2b3d7d38-a5bc-4a83-ab07-3a62e5d1b270)
![image](https://github.com/user-attachments/assets/db3c7adb-9312-40c1-8411-1512fddbb207)
![image](https://github.com/user-attachments/assets/8e3bbeff-f2b9-4efb-ad63-9e906de10f9c)
![image](https://github.com/user-attachments/assets/04d42584-aa63-47bc-b7b9-9ccf27bda480)
![image](https://github.com/user-attachments/assets/be2dc54c-b6dc-4491-973a-705c1327cd0e)
![image](https://github.com/user-attachments/assets/4cffe01b-2793-4f3e-9ada-6e7f9fa185d0)
![image](https://github.com/user-attachments/assets/9202898e-9d21-4717-875c-3ed964f68918)
![image](https://github.com/user-attachments/assets/5abb79ae-b8d7-44a4-9eb3-373a0c46b649)
![image](https://github.com/user-attachments/assets/a9338554-65bd-4670-9e2e-756b4a8e653a)
![image](https://github.com/user-attachments/assets/da87d275-c2da-4c83-a1b8-a15e887dd4b6)
![image](https://github.com/user-attachments/assets/ac0fea8f-ab08-4169-acaf-41b1b75f79d7)
![image](https://github.com/user-attachments/assets/d2580278-3527-43ec-b402-79e59fd3b2b3)
![image](https://github.com/user-attachments/assets/d2b52478-a328-4874-b752-d46e0c4e7475)
![image](https://github.com/user-attachments/assets/bf653133-e7df-47b2-9672-2fdb12b05804)





배포 버전 1.0.0
메인 페이지 - 이벤트 캐러셀, 모임 찾기, 신규 모임, 모임추천, 정모일정으로 구성
모임 페이지 - 모임소개, 게시판, 갤러리, 채팅으로 구성 


fix:
@ 클럽 게시판 보완 필요 
@ 모임 추천 페이지 알고리즘 보완 필요 
@ 공지사항 페이지 및 브랜드 페이지 등 기본 구성 보완 필요
