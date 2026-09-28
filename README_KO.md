# COMP 229 Assignment 1 — Jihyun Kim React Portfolio

## 먼저 알아둘 것

이 프로젝트는 **React로 만든 개인 포트폴리오 웹사이트**입니다. Word 보고서가 아니라, 브라우저에서 메뉴를 눌러 볼 수 있는 사이트를 제출합니다. Home / About Me / Projects / Education / Services / Contact Me의 여섯 페이지가 있습니다.

이번 수정본에는 보내주신 원본 사진과 **Dental Hygienist Licence — South Korea, 2022**를 반영했습니다. Home·About·학력·프로젝트·서비스·연락 안내 영어 문장과 이력서 PDF도 포함합니다. `docs/SITE_COPY_EN.md`에서 영어 문장만 따로 읽을 수 있습니다.

**남은 일:** 본인 컴퓨터에서 실행·검토·수정, 실제 Git commit 이력, GitHub 업로드, 본인 계정 배포, 공개 URL 테스트, LMS 제출입니다. 코드 참고/AI 도움에 관한 수업 규정을 확인하고, 사용하는 코드를 설명할 수 있도록 학습하세요. ZIP에는 가짜 Git 이력이나 공개 사이트 주소가 없습니다.

이 환경의 npm 서버 DNS 연결이 실패하여 React 패키지 설치와 앱 전체의 실행·빌드는 확인하지 못했습니다. 폼 검증 함수 테스트 8개는 통과했습니다. 실제 검사 범위는 `docs/TEST_REPORT.md`에 구분했습니다.

과제 파일에는 `Week 4, May 31st 11:59pm`이라고 적혀 있습니다. 현재 수업의 실제 마감일을 이 날짜로 단정하지 말고 LMS 과제 화면에서 확인하세요.

## 1. ZIP을 풀고 올바른 폴더 열기

1. ZIP 압축을 풉니다. Windows는 우클릭 → 압축 풀기, Mac은 ZIP 열기로 풀 수 있습니다.
2. VS Code에서 **File → Open Folder**를 선택합니다.
3. `README_KO.md`와 `client`가 함께 보이는 **COMP229_Assignment1_Jihyun** 폴더를 엽니다. ZIP 파일 자체를 여는 것이 아닙니다.
4. **Terminal → New Terminal**을 엽니다.

이전 프로젝트를 직접 수정한 적이 있다면 먼저 백업하고 변경된 파일을 비교하세요. 기존 `.git` 폴더를 삭제하지 않습니다. 이번 ZIP에는 `.git`이 없습니다.

## 2. Node와 Git 확인

```bash
node --version
npm --version
git --version
```

명령이 버전 번호를 출력하면 해당 도구가 실행되는 상태입니다. 이 프로젝트 `package.json`은 Node 22.12 이상을 실행 기준으로 지정합니다. `node` 또는 `npm`을 찾지 못하면 Node 설치와 PATH를 확인한 뒤 VS Code 터미널을 다시 엽니다. Docker나 MongoDB는 이 프런트엔드 프로젝트의 실행 조건이 아닙니다.

## 3. 초기에 Git 기록 시작하기

**실행 위치: COMP229_Assignment1_Jihyun 최상위 폴더.** 아직 Git이 연결되지 않은 새 폴더일 때만 다음과 같이 시작합니다.

```bash
git init -b main
git add .
git commit -m "chore: add portfolio reference for review"
```

작성자 정보 오류가 나면 이 저장소에서 이름과 본인의 Git 작성자 이메일을 지정합니다. 아래 YOUR_GIT_EMAIL은 실제 이메일 또는 GitHub에서 확인한 no-reply 이메일로 바꾸는 자리입니다.

```bash
git config user.name "Jihyun Kim"
git config user.email "YOUR_GIT_EMAIL"
```

이후 commit을 다시 실행합니다. 기존 Git 프로젝트라면 `git status`부터 확인하고, 이미 초기화한 곳에서 이력을 새로 만들려고 하지 않습니다.

## 4. 패키지 설치하고 사이트 실행하기

최상위 폴더의 터미널에서:

```bash
cd client
npm install
npm test
npm run dev
```

- `cd client`: package.json이 있는 React 프로젝트 폴더로 이동합니다.
- `npm install`: package.json에 기록된 도구/라이브러리를 설치합니다. 인터넷 연결이 필요합니다.
- `npm test`: 제공된 폼 검증 함수 테스트를 실행합니다. 전체 UI 테스트가 아닙니다.
- `npm run dev`: 개발 서버를 시작합니다.

터미널에 나오는 **Local 주소**를 브라우저에서 엽니다. 예시는 `http://localhost:5173/`이지만 포트가 다르면 실제 출력된 주소를 사용하세요. 성공하면 JK 로고, 여섯 개 메뉴, Jihyun 소개가 보입니다.

개발 서버가 실행되는 동안 그 터미널은 사용 중입니다. 다른 명령은 새 터미널에서 실행하거나 **Ctrl+C**로 서버를 멈춘 뒤 실행합니다. 프로젝트가 이미 있으므로 여기서 `npm create vite`를 다시 실행하지 않습니다. `index.html`을 더블클릭하거나 VS Code Live Server로 여는 방식도 이 실행 절차를 대체하지 않습니다.

설치가 성공한 뒤 생성되는 `package-lock.json`을 보관하고 Git에 포함하세요. 이 수정본에는 설치 성공을 가장한 lockfile을 넣지 않았습니다.

## 5. 무엇을 어느 파일에서 수정할까?

| 수정할 내용 | 파일 |
|---|---|
| 이름, 학교 이메일, LinkedIn, Home 소개, About 문단, 학력, 프로젝트·서비스 설명 | `client/src/data/portfolio.js` |
| 메뉴 이름·순서·JK 로고 | `client/components/Layout.jsx` |
| Home 화면 배치와 제출된 정보 표시 | `client/components/Home.jsx` |
| About 사진·소개 배치와 PDF 버튼 | `client/src/about.jsx` |
| 프로젝트 카드 배치 | `client/src/project.jsx` |
| 학력과 면허 표시 | `client/src/education.jsx` |
| 서비스 카드 배치 | `client/src/services.jsx` |
| 연락처 패널, 입력 필드, 제출 | `client/src/contact.jsx` |
| 입력 검사 규칙 | `client/src/utils/validateContact.js` |
| 메뉴 주소와 화면 연결, 제출 데이터 보관 | `client/MainRouter.jsx` |
| 색, 글자 크기, 간격, 휴대폰 화면 배치 | `client/src/index.css` |
| 본인 사진 | `client/public/images/portrait.jpg` |
| PDF 이력서 | `client/public/documents/Jihyun_Kim_Resume.pdf` |

### 사진과 면허 — 이미 반영됨

`IMG_6800.JPG`를 웹사이트에서는 `portrait.jpg`라는 파일명으로 보관합니다. 사진 내용은 수정하지 않았습니다. 코드에는 다음 값이 들어 있습니다.

```js
portrait: "/images/portrait.jpg",
dentalLicenceYear: "2022",
```

About에서 사진을 사용하고 Education 및 PDF에서 한국 면허 취득연도를 표시합니다. 웹 경로에 `public`을 덧붙이지 않습니다. 이름이 같은 PDF로 교체하면 기존 이력서 링크를 유지할 수 있습니다.

### 영어 내용 검토

영어 문장을 추가로 처음부터 작성할 필요는 없습니다. `docs/SITE_COPY_EN.md`와 실제 페이지를 보면서 자신이 설명할 수 있는 표현으로 고치세요. 취업 목표는 학습 중인 웹/데이터/요구사항 분석과 핀테크 관심으로 표현하고, 아직 전문 경력으로 입증되지 않은 분야를 expert라고 쓰지 않았습니다.

Centennial은 재학 중, 졸업은 **Expected: December 2028**입니다. 코업 희망기간은 **January–April 2027, four months**입니다. 학위 취득으로 표기하지 않았습니다.

### 연락처 공개 범위

연락처 패널은 학교 이메일과 LinkedIn, Toronto를 표시합니다. 실제 개인 전화번호·집 주소·면허 번호는 기본 공개 정보에 넣지 않았습니다. Contact 폼의 Contact Number는 방문자가 입력하는 필드입니다. 배포 전에 이메일·이력서 등 공개할 내용을 검토하세요.

### 프로젝트 이미지

세 프로젝트의 SVG는 설명용 커버이고 실제 실행 캡처는 아닙니다. 이미지 캡션에도 구분했습니다. 과제는 프로젝트별 이미지를 요구하지만 실제 화면 캡처만 허용한다고 명시하지는 않습니다. 자신의 작업 결과를 더 잘 보여주려면 기존 SQL 결과 화면이나 Zipbob 화면을 본인이 확인해 캡처한 이미지로 교체하세요.

예: `client/public/images/insurance-result.png`를 넣고 해당 프로젝트의 image를 `/images/insurance-result.png`로 수정합니다. imageAlt와 imageCaption도 새 이미지 내용에 맞게 고칩니다. 주민번호·실제 고객 정보·비밀번호가 보이는 화면은 넣지 않습니다.

## 6. 코드에서 이해할 세 가지 연결

### 주소 → 화면

```jsx
<Route path="/about" element={<About />} />
```

주소가 `/about`일 때 About 컴포넌트를 보여주는 규칙입니다. 메뉴에서 이동하는 코드는 다음과 다릅니다.

```jsx
<Link to="/about">About Me</Link>
```

Route는 화면의 대응 관계, Link는 클릭해서 이동할 요소입니다.

### 입력 → state

```jsx
const [formData, setFormData] = useState(initialForm);

function handleChange(event) {
  const { name, value } = event.target;
  const nextFormData = { ...formData, [name]: value };
  setFormData(nextFormData);
}
```

각 input의 `name`으로 어떤 필드인지 구분합니다. spread는 기존 다른 필드를 보존하고 `[name]`은 바뀐 필드만 업데이트합니다. 실제 프로젝트에는 제출 후 오류를 다시 검사하는 코드도 있습니다.

### 제출 → 부모 state → Home

```jsx
onCapture({ ...formData });
navigate("/");
```

Contact에서 검사가 통과하면 부모 MainRouter의 state에 데이터를 전달하고 Home으로 이동합니다. Home에서 다섯 필드를 표시해 정보 캡처를 확인할 수 있습니다. `useNavigate`는 과제의 이동을 구현하기 위해 추가한 기능이며, 교수님의 메뉴 예제와 완전히 동일한 코드는 아닙니다.

**이 폼은 실제 이메일을 보내지 않습니다.** 데이터베이스·서버 전송·영구 저장은 없습니다. 새로고침하면 캡처한 데이터가 사라집니다. 과제에서 처음부터 완전한 전송 기능을 요구하지 않아 이 방식으로 구현했습니다.

## 7. 브라우저에서 직접 검사하기

| 동작 | 기대하는 결과 |
|---|---|
| 여섯 메뉴 각각 클릭 | 해당 페이지가 열리고 메뉴가 표시됨 |
| About 열기 | 실제 사진과 이름·소개가 보임 |
| View résumé (PDF) 클릭 | 1페이지 PDF가 열림 |
| Projects 열기 | 이미지·설명·역할·결과가 있는 카드 3개 |
| Education 열기 | 학력 3개와 한국 면허 2022년 |
| Contact에서 빈 폼 제출 | 오류 표시, Contact에 머무름 |
| 이메일을 `abc`로 입력 | 이메일 오류 표시 |
| 아래 샘플을 넣고 제출 | Home으로 이동하고 5개 값이 표시됨 |
| Clear captured data | 캡처 표시가 사라짐 |
| 좁은 화면으로 확인 | 메뉴·사진·본문·폼이 화면 밖으로 잘리지 않음 |

샘플(실제 방문자 개인정보 대신 테스트 데이터 사용):

```text
First Name: Test
Last Name: Student
Contact Number: 416-555-0123
Email Address: student@example.com
Message: I am testing my React portfolio contact form.
```

이메일의 기본 형태, 전화번호 숫자 개수, 메시지 길이 검사는 이 구현에서 정한 조건입니다. 과제 문서가 지정한 별도 배점 규칙이나 실제 소유권 확인 기능이 아닙니다.

## 8. 실제 변경 때마다 commit하기

React 폴더에서 작업했다면 Git 명령 전에 최상위 폴더로 한 번 이동할 수 있습니다.

```bash
cd ..
git status
git add .
git commit -m "content: personalise portfolio text after review"
```

메시지는 실제 변경 내용에 맞게 바꿉니다. 프로젝트 스크린샷을 추가했을 때, 화면 스타일을 개선했을 때, 문제를 고쳤을 때 별도로 기록합니다. 빈 commit을 반복하거나 완성 후 날짜를 꾸며 개발 과정처럼 만들지 않습니다. 기존 commit이 한 번뿐이라면 앞으로 실제 검토·수정한 작업부터 기록하세요.

## 9. GitHub에 업로드하기

GitHub에서 새 저장소를 만들 때 예시 이름은 `comp229-react-portfolio`입니다. 실제 저장소는 본인 계정에 만듭니다. 현재 프로젝트에 이미 README와 .gitignore가 있으므로 GitHub 생성 화면에서 README/.gitignore/license 자동 추가를 선택하지 않아 빈 원격 저장소로 시작합니다.

교수님이 열람할 수 있는 공개 범위로 설정하세요. 과제 파일 자체가 Public만 요구하지는 않으므로 Private을 쓰는 경우 열람 권한을 따로 확보해야 합니다.

최상위 프로젝트 폴더에서 **본인 저장소 주소**로 연결합니다. 아래 YOUR-USERNAME과 YOUR-REPOSITORY는 그대로 두는 값이 아닙니다.

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git remote -v
git push -u origin main
```

이미 origin이 있는 프로젝트는 `git remote -v`로 현재 연결을 확인하세요. 인증은 GitHub의 안내를 따르고 비밀번호나 토큰을 코드에 넣지 않습니다. 업로드 후 파일 목록에 `client`, `docs`, README 등이 있고 commit 이력이 보이는지 확인합니다. GitHub에는 ZIP 하나만 올리지 않습니다.

## 10. build → Netlify 배포

**다시 client 폴더에서 실행합니다.** 이미 client 안이면 `cd client`를 또 하지 않습니다.

```bash
cd client
npm run build
npm run preview
```

build가 성공하면 `client/dist`가 생깁니다. preview는 배포용 파일을 로컬에서 확인하는 추가 명령입니다. 그 터미널의 Local 주소로 확인하고 Ctrl+C로 종료합니다.

Netlify에 로그인하고 새 프로젝트의 수동 배포/drag-and-drop 영역에 **dist 폴더**를 올립니다. 강의 화면의 Add new project 문구는 서비스 화면에서 조금 다르게 보일 수 있습니다. ZIP 전체, src만, client 전체를 올리는 대신 `index.html`과 assets가 들어 있는 dist를 사용합니다.

`client/public/_redirects`는 `/about` 등을 직접 열거나 새로고침할 때 index.html을 제공하도록 추가한 Netlify용 설정입니다.

```text
/* /index.html 200
```

기존 파일을 유지하고 빌드 결과에도 포함되는지 확인하세요. 이는 모든 주소를 Home 주소로 바꾸는 redirect가 아니라 SPA 화면을 읽게 하는 rewrite입니다. 루트의 `netlify.toml`은 나중에 GitHub 연결 자동 배포를 할 때 사용할 수 있는 설정입니다. 처음에는 강의의 수동 dist 업로드 흐름만 따라가도 됩니다.

공개 주소가 생기면 같은 테스트를 다시 하고 `/about`, `/project`, `/education`, `/services`, `/contact`를 직접 열어 새로고침도 해보세요. localhost는 다른 사람이 볼 공개 주소가 아닙니다.

## 11. 최종 ZIP과 LMS 제출

원본 개발 폴더를 삭제하지 말고 제출용 복사본을 만듭니다. 복사본에서 `node_modules`, `.git`, `.netlify`, 로그, 비밀정보와 `.env`를 제외합니다. 소스, package.json, 설치 후 생성한 package-lock.json, 이미지, PDF, 설정 파일은 유지합니다. dist는 원본 소스를 대신하는 제출물이 아닙니다.

최종 세 가지:

1. 검토·수정한 React 프로젝트 ZIP
2. 본인의 GitHub 저장소 링크
3. 실제 배포된 포트폴리오 사이트 링크

```text
COMP229 – Assignment 1: React Portfolio
Student: Jihyun Kim
GitHub repository: [PASTE YOUR ACTUAL REPOSITORY URL]
Live portfolio: [PASTE YOUR ACTUAL DEPLOYED URL]
Project ZIP: [YOUR FINAL ZIP FILENAME]
```

대괄호 부분을 실제 값으로 교체한 뒤 제출합니다. 학번/분반 입력이 LMS에서 별도로 요구되면 본인 정보를 추가합니다. 파일 안내문에는 학번용 코드나 고정 ZIP 이름이 지정되어 있지 않습니다.

## 자주 막히는 지점

| 상황 | 먼저 확인할 것 |
|---|---|
| package.json을 찾을 수 없다는 오류 | 터미널이 client 폴더인지 |
| Missing script: start | 이 프로젝트 명령은 npm run dev인지 |
| vite 명령을 찾지 못함 | npm install이 성공했는지 |
| npm 설치 오류 | 첫 오류 메시지의 내용; 인터넷/DNS 또는 Node 버전 경고 |
| 사진이 안 나옴 | portrait.jpg 파일, 확장자/대소문자, `/images/portrait.jpg` |
| 로컬은 되는데 배포 후 새로고침 오류 | dist와 _redirects를 포함해 배포했는지 |
| 수정했는데 배포 사이트는 그대로 | 다시 build한 dist를 재배포했는지 |
| nothing to commit | 저장한 실제 파일 변경이 있는지; 빈 commit을 만들지 않기 |

## 자료 구분

과제 필수사항은 Assignment 1 안내문을 기준으로 했습니다. 컴포넌트·라우터·controlled form은 Week 1–2 자료의 개념을 사용했습니다. `useNavigate`, 공유 부모 state의 구체적 구성, 반응형 CSS, 테스트, Netlify rewrite는 요구사항을 구현하기 위한 추가 선택입니다. 모든 수업 예제(useReducer, 별점, React Hook Form 등)를 이 과제에 전부 넣어야 하는 것은 아닙니다.
