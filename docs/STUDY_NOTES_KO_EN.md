# COMP 229 Week 2 — React 이해와 영어 시험 준비

이 노트는 제공된 Week 2 PPT, Lab 문서, Form Validation 문서, Assignment 1 문서를 중심으로 정리했습니다. 수업 자료에 없는 구현 선택은 ‘과제 적용’ 또는 ‘보충’으로 구분합니다. 아래 연습 문제는 학습용이며 실제 시험 문제나 출제 비중이 확인된 것은 아닙니다.

영상은 0:30과 6:00 화면을 확인했으며 Netlify 배포 자료 및 dist 폴더를 다루는 장면이었습니다. 전체 음성을 전사한 정리본은 아닙니다.

## 1. 이번 주의 전체 연결

1주차에서는 MERN의 각 기술이 무엇을 담당하는지 배웠습니다. 이번 주에는 그중 React를 이용해 화면을 만들고, 사용자의 입력에 반응하게 하고, 여러 화면을 연결한 뒤 배포하는 과정을 배웁니다.

```text
컴포넌트와 JSX로 화면 설명
→ createRoot로 브라우저에 렌더링
→ React Router로 URL과 화면 연결
→ state로 바뀌는 데이터 관리
→ event handler로 사용자 입력 처리
→ validation으로 입력 검사
→ build 후 dist를 호스팅
```

과제 1은 이 내용을 묶어서 개인 포트폴리오에 적용하는 작업입니다. 모든 강의 예제를 포트폴리오에 넣으라는 뜻은 아닙니다. Counter와 StarRating은 state 학습 예제이며 과제 필수 페이지가 아닙니다.

## 2. React, ReactDOM, Vite 구분

**React**는 사용자 인터페이스를 만드는 JavaScript 라이브러리입니다. 자료는 framework가 아니라 library라고 명시하고 view layer를 중심으로 설명합니다. 화면 전체를 하나의 덩어리로 작성하기보다 재사용 가능한 component로 나누는 것이 중요한 특징입니다.

**ReactDOM**은 React로 설명한 UI를 브라우저 DOM에 렌더링하는 역할을 합니다. **Vite**는 프로젝트를 시작하고 개발 서버를 실행하며 배포 파일을 만드는 도구입니다. 세 이름을 서로 바꾸어 사용하면 안 됩니다.

**English exam answer**

> React is a JavaScript library for building user interfaces from components. ReactDOM renders React interfaces in the browser. Vite provides development and build tooling for the project.

근거: Introduction 슬라이드 2, 7, 13.

## 3. Functional component와 class component

Functional component는 UI를 반환하는 JavaScript 함수입니다.

```jsx
function Welcome() {
  return <h1>Welcome Message!</h1>;
}
export default Welcome;
```

`function Welcome()`은 함수 정의입니다. `return` 뒤의 JSX는 화면에 무엇을 보여줄지 설명합니다. 다른 파일에서는 default export를 import해 `<Welcome />`처럼 사용합니다.

같은 종류의 UI를 class 문법으로도 표현할 수 있습니다.

```jsx
import React from "react";

class Welcome extends React.Component {
  render() {
    return <h1>Welcome Message!</h1>;
  }
}
export default Welcome;
```

class 예제는 `extends React.Component`와 `render()`가 핵심입니다. 함수 예제에서는 함수가 JSX를 반환하고, class 예제에서는 `render()` 메서드가 JSX를 반환합니다. 이번 과제 참고 구현은 강의의 함수 컴포넌트와 Hooks 방식을 사용합니다.

**English exam answer**

> A functional component is a JavaScript function that returns UI content. A class component extends React.Component and uses a render method to return the UI.

근거: Introduction 슬라이드 19–29.

## 4. JSX 읽는 법

자료는 JSX를 JavaScript 안에 HTML을 작성하는 표현으로 소개합니다. 코드에서는 HTML과 비슷한 태그 구조와 JavaScript 표현식을 함께 읽어야 합니다.

```jsx
const name = "John Smith";
const a = 25;
const b = 75;

return (
  <div className="introduction">
    <h1>Hello, {name}</h1>
    <p>{a + b}</p>
  </div>
);
```

화면에는 `Hello, John Smith`와 `100`이 표시됩니다. `{name}`은 문자열 `{name}`을 그대로 출력하는 것이 아니라 변수의 값을 사용합니다. `{a + b}`는 표현식 계산 결과를 사용합니다. JSX의 CSS 클래스 속성은 `className`입니다.

강의 코드 일부에는 `<h1>...</h1>;`처럼 태그 뒤에 세미콜론이 들어 있습니다. 그 세미콜론이 JSX 자식 위치에 있으면 화면의 문자로 나타납니다. 과제 구현에서는 제목 뒤의 불필요한 표시 문자를 제외했습니다. JavaScript 문장을 끝내는 `return ...;`의 세미콜론과 구분하세요.

**English exam answer**

> JSX allows JavaScript expressions inside curly braces. The expression is evaluated, and its result is included in the UI. In JSX, className is used to assign a CSS class.

근거: Introduction 슬라이드 32, 44–50. 세미콜론은 슬라이드 20·22의 코드와 출력에서 확인할 수 있습니다.

## 5. createRoot와 실행 연결

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`document.getElementById("root")`는 HTML 문서에서 React 화면이 들어갈 요소를 찾습니다. `createRoot(...)`는 그 위치를 React root로 만들고, `.render(<App />)`가 루트 컴포넌트를 렌더링합니다.

과제 파일에서는 다음 순서로 연결됩니다.

```text
index.html의 root 요소와 main.jsx script
→ main.jsx의 createRoot
→ App.jsx의 BrowserRouter
→ MainRouter.jsx
→ 공통 Layout + 현재 URL에 맞는 페이지
```

자료에는 구형 `ReactDOM.render`와 `createRoot`가 함께 등장합니다. Introduction 슬라이드 31은 둘을 Old Method와 React 18 Method로 구분합니다. 과제 구현에서는 자료의 createRoot 버전으로 통일했습니다. `StrictMode`는 예제에 포함되어 있지만, 이 자료에는 세부 동작 설명이 충분하지 않으므로 이번 핵심은 createRoot와 render의 역할입니다.

**English exam answer**

> createRoot creates a React root inside a browser DOM element. Calling root.render displays the React component tree in that root.

근거: Introduction 슬라이드 21, 25, 29, 31.

## 6. map(), key, props

자료는 재료 목록을 직접 여러 줄로 적은 후, 배열을 map으로 변환하는 방법을 보여줍니다.

```jsx
const items = ["Butter", "Sugar", "Eggs"];

function IngredientsList() {
  return (
    <ul className="ingredients">
      {items.map((ingredient, i) => (
        <li key={i}>{ingredient}</li>
      ))}
    </ul>
  );
}
```

`map()`은 각 배열 요소를 받아 JSX 요소를 만듭니다. `ingredient`는 현재 요소의 값이고 `i`는 위치입니다. 이 예제는 `<li>` 세 개를 만듭니다. 자료는 `key`가 list item을 식별한다고 설명합니다.

**과제 적용:** 프로젝트 데이터에는 `id`가 있으므로 `key={project.id}`를 사용했습니다. `project.id`와 `project.title`은 서로 다른 역할입니다. 전자는 항목 식별, 후자는 사용자에게 보여주는 제목입니다.

props는 부모에서 자식에게 전달하는 입력입니다. 자료의 별점 예제에서 `totalStars`, `selected`, `onSelect`가 그 예입니다. `selectedStars`는 부모 StarRating 안에서 관리하는 state입니다.

```jsx
<Star selected={true} onSelect={handleSelect} />
```

이 코드는 자식에게 선택 여부와 호출할 함수를 전달합니다. 함수를 전달한다는 것과 이 위치에서 즉시 호출한다는 것은 다릅니다.

**English exam answer**

> map creates a list of React elements from an array. A key identifies an item in that list. Props carry data or callbacks from a parent component to a child.

근거: Introduction 슬라이드 38–43, 53; State Management 슬라이드 30. key의 id 사용은 과제 적용입니다.

## 7. State와 다시 렌더링되는 과정

state는 컴포넌트가 렌더링할 때 사용하는, 바뀔 수 있는 데이터입니다. 자료는 클릭 횟수처럼 render 사이에 유지해야 하는 값을 예로 설명합니다.

**State Management 슬라이드 8의 그림**은 버튼 클릭 → 값 1에서 2로 변경 → Counter 다시 렌더링 → 비교 → 필요한 브라우저 DOM 변경이라는 흐름을 보여줍니다. 사용자의 행동이 먼저 있고, 그 행동을 처리하는 함수가 state를 바꾸며, 새 state가 UI에 반영됩니다.

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleIncrement}>Click me</button>
    </div>
  );
}
```

`0`은 초기값입니다. `count`는 현재 state이고 `setCount`는 갱신 함수입니다. 버튼 클릭 시 `handleIncrement`가 호출되고, 현재 숫자에 1을 더한 값을 다음 state로 요청합니다. 처음에는 0, 한 번 클릭 후 1, 두 번 클릭 후 2가 표시됩니다.

```jsx
onClick={handleIncrement}
```

이것은 함수를 넘기는 표현입니다. 다음은 렌더링 중에 함수를 호출하는 표현이므로 의미가 다릅니다.

```jsx
onClick={handleIncrement()}
```

state를 바꾸는 함수를 이처럼 렌더링 중 계속 호출하는 코드는 잘못된 업데이트 반복으로 이어질 수 있습니다. 이 비교는 강의 Counter 코드를 읽기 위한 구현 설명입니다.

**English exam answer**

> useState returns the current state value and a setter function. Calling the setter requests a state update, and React can render the component again using the new state.

**정확성 보충:** 자료의 “state가 바뀔 때만 re-render된다”는 문장을 보편적 규칙으로 외우지는 마세요. React 공식 Render and Commit 문서는 자기 state 또는 조상 컴포넌트의 state 업데이트로 다시 렌더링될 수 있음을 설명합니다. 또한 render는 UI를 계산하는 단계이고, commit은 DOM에 필요한 변경을 적용하는 단계입니다. 매번 브라우저 문서 전체를 새로고침한다는 뜻이 아닙니다.

근거: State Management 슬라이드 2, 8–12. 보충: https://react.dev/learn/render-and-commit

## 8. useReducer: action을 보내서 state 바꾸기

`useState`에서는 setter로 다음 상태를 요청합니다. `useReducer`에서는 action을 dispatch하고 reducer가 다음 상태를 결정합니다.

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
    </div>
  );
}
```

`dispatch({ type: "INCREMENT" })`는 “증가라는 동작을 수행하라”는 action을 전달합니다. reducer는 현재 state와 action을 받아 `{ count: ... }`를 반환합니다. 그 반환값이 다음 state입니다. default에서 기존 state를 반환하면 알 수 없는 action을 받았을 때 상태를 유지합니다.

숫자 state를 사용하는 앞 슬라이드와 객체 state를 사용하는 이 완성 예제를 섞지 마세요. `{ count: 0 }`로 시작했으면 표시할 때 `state.count`를 사용합니다.

**English exam answer**

> useReducer returns the current state and a dispatch function. Dispatching an action causes the reducer to calculate the next state from the current state and the action.

Context API는 내장 선택지로 소개되고, Redux/Redux Toolkit, Recoil, Jotai, Zustand, MobX, HookState는 외부 대안의 이름으로 소개됩니다. 자료에 이 도구들 각각의 완성 실습이 있는 것은 아닙니다. 이번 포트폴리오에는 추가 상태 관리 라이브러리를 넣지 않았습니다.

근거: State Management 슬라이드 7, 18–26. 슬라이드 20 그림이 dispatch → reducer → next state를 보여줍니다.

## 9. 별점 예제로 props와 state 연결하기

자료의 핵심 부분:

```jsx
<Star
  key={i}
  selected={selectedStars > i}
  onSelect={() => setSelectedStars(i + 1)}
/>
```

5개 별의 index는 0, 1, 2, 3, 4입니다. 세 번째 별은 i=2이므로 클릭하면 `selectedStars`가 3이 됩니다. `3 > i`는 0, 1, 2에 대해서만 true입니다. 따라서 처음 세 개의 별만 선택 색으로 보입니다.

`i + 1`이 없으면 세 번째 별을 클릭해도 2점이 됩니다. `selectedStars > i` 대신 `>=`를 사용하면 0점일 때 i=0인 첫 별까지 선택되는 문제가 생깁니다.

자식 Star는 전달받은 `selected`에 따라 색을 정하고, 클릭 시 `onSelect`를 실행합니다. StarRating이 실제 숫자 state를 관리합니다.

**English exam answer**

> Array indexes begin at zero, so i + 1 converts the clicked star’s index into a rating. The selectedStars > i condition selects every star whose index is below the rating.

근거: State Management 슬라이드 28–31.

## 10. React Router: 페이지와 URL 연결하기

SPA는 여러 화면을 갖더라도 이동할 때마다 HTML 문서 전체를 새로 불러오는 방식이 아닌 구조로 자료에 소개됩니다. React Router는 URL에 맞는 컴포넌트를 선택하고 이동을 처리합니다.

| 이름 | 역할 |
|---|---|
| BrowserRouter | 브라우저 history 기반으로 routing 문맥 제공 |
| HashRouter | URL의 hash 부분을 이용해 화면과 주소 연결 |
| Routes | route 정의들을 감싸는 컨테이너 |
| Route | path와 렌더링할 element 연결 |
| Link | `to` 경로로 이동하는 링크 |
| NavLink | 현재 활성 경로에 따른 스타일 적용 가능 |

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

이 정의만 있다고 메뉴가 생기지는 않습니다. 사용자가 클릭할 요소는 다음처럼 별도로 만듭니다.

```jsx
<Link to="/about">About Me</Link>
```

`Route`는 주소와 화면의 연결 규칙이고, `Link`는 그 주소로 이동하는 인터페이스입니다. 또한 파일을 만들기만 해도 자동으로 route가 생기는 것은 아닙니다. 강의 MainRouter에서 import와 Route를 추가하는 과정을 기억하세요.

Protected Routes는 권한이 없는 사용자의 접근을 제한하는 개념으로 소개됩니다. PPT의 RequireAuth는 예시 wrapper이며, 자료에는 완성된 인증 시스템 구현이 없습니다. 개인 포트폴리오 과제에서도 로그인을 요구하지 않습니다.

**English exam answer**

> React Router maps URL paths to React components. Route defines what is rendered at a path, while Link lets the user navigate to that path without a full-page refresh.

근거: Portfolio 슬라이드 9–19, 20–32.

## 11. Controlled component

controlled form에서는 React state가 입력값의 기준입니다.

```jsx
const [inputValue, setInputValue] = useState("");

function handleChange(event) {
  setInputValue(event.target.value);
}

<input value={inputValue} onChange={handleChange} />
```

`value`는 현재 state를 input에 연결합니다. `onChange`는 입력 변경 시 handler를 실행하고, `event.target.value`로 새 문자열을 읽습니다. setter로 state를 갱신하면 다음 렌더링에서 input과 표시 문장이 그 값을 사용합니다. 자료의 “initial value” 표현만 보고 value가 처음 한 번만 적용된다고 이해하면 안 됩니다. 같은 자료 슬라이드 11이 이후의 동기화까지 설명합니다.

| 입력 종류 | React에서 연결할 값 | event에서 읽는 값 |
|---|---|---|
| text / email / textarea | value | event.target.value |
| select | value | event.target.value |
| checkbox | checked | event.target.checked |

체크박스는 true/false가 필요하므로 checked를 사용합니다.

```jsx
const [isChecked, setIsChecked] = useState(false);
<input
  type="checkbox"
  checked={isChecked}
  onChange={(event) => setIsChecked(event.target.checked)}
/>
{isChecked && <p>Blue is selected!</p>}
```

`&&` 뒤의 메시지는 isChecked가 true일 때 렌더링됩니다.

**English exam answer**

> In a controlled component, React state controls the form value. The value or checked prop reflects state, and an onChange handler updates that state when the user interacts with the field.

근거: React Forms 슬라이드 3–4, 7–19.

## 12. 여러 필드를 하나의 객체로 관리하기

자료의 multiple form은 1주차 문법이 왜 중요한지 잘 보여줍니다.

```jsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

function handleChange(event) {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
}
```

`const { name, value }`는 구조 분해입니다. `name`은 input의 name 속성이고 `value`는 현재 입력값입니다. `...prevFormData`는 기존 필드들을 새 객체에 펼쳐 넣습니다. `[name]`은 name이라는 변수 안의 문자열을 실제 속성 이름으로 사용합니다.

사용자가 email input에 입력했다면 name은 `"email"`입니다. 따라서 `[name]: value`가 변경하는 속성은 email입니다. 대괄호 없이 `name: value`라고 쓰면 항상 name 속성을 바꾸게 됩니다.

기존 상태가 다음과 같다고 가정하세요.

```js
{ name: "Jihyun", email: "old@example.com", message: "Hello" }
```

email 필드에서 새 값을 읽어 위 코드를 실행하면 결과는 다음과 같습니다.

```js
{ name: "Jihyun", email: "new@example.com", message: "Hello" }
```

spread를 생략해 `{ email: value }`만 전달하면 새 객체에 name과 message가 없습니다. 기존 객체의 나머지 필드를 보존하려는 목적 때문에 spread가 들어갑니다.

**English exam answer**

> The spread syntax preserves the other form fields. The computed property name, [name], updates the field whose name matches the input that changed.

근거: React Forms 슬라이드 21–26.

## 13. Submit: 출력, 저장, 전송은 다르다

```jsx
function handleSubmit(event) {
  event.preventDefault();
  alert(formData.message);
}
```

`preventDefault()`는 브라우저의 기본 submit 동작을 막습니다. 그다음 어떤 처리를 할지는 개발자가 작성해야 합니다. alert는 팝업을 보여줄 뿐이며, console.log는 콘솔 출력일 뿐입니다. setter는 React state를 갱신합니다. 이 중 어느 것도 자동으로 이메일을 보내는 기능은 아닙니다.

**과제 적용:** 이번 Contact는 유효한 데이터를 부모 state로 전달한 뒤 Home으로 이동합니다.

```jsx
onCapture({ ...formData });
navigate("/");
```

onCapture에는 MainRouter의 setSubmission을 전달했습니다. Home과 Contact보다 위에 state가 있어야 Contact가 사라진 후에도 Home이 그 값을 읽을 수 있습니다. 이 공유 위치와 useNavigate는 과제 조건을 구현하기 위한 적용입니다.

**English exam answer**

> preventDefault stops the browser’s default form submission. In this implementation, valid input is captured in parent state, then useNavigate redirects the user to Home. No email is sent.

근거: React Forms 슬라이드 22; Assignment 1 페이지 2. useNavigate 보충: https://reactrouter.com/api/hooks/useNavigate

## 14. Uncontrolled component와 useRef

uncontrolled form에서는 입력 요소의 현재 값을 DOM이 관리합니다. 제출 시점에 ref로 읽을 수 있습니다.

```jsx
const inputRef = useRef(null);

function handleSubmit(event) {
  event.preventDefault();
  console.log(inputRef.current.value);
}

<form onSubmit={handleSubmit}>
  <input ref={inputRef} type="text" />
  <button type="submit">Submit</button>
</form>
```

ref를 input에 붙이면 `.current`로 그 DOM 요소에 접근하는 연결이 생깁니다. text input은 `.current.value`, checkbox는 `.current.checked`로 현재 상태를 읽습니다. useRef 예제를 useState의 setter와 동일하게 설명하지 마세요.

**English exam answer**

> In an uncontrolled component, the browser DOM manages the form element’s current value. A ref can be used to read that value, for example through inputRef.current.value.

근거: React Forms 슬라이드 34–40.

## 15. Form validation: 입력이 조건에 맞는가?

자료가 구분하는 검사는 required, format, length, pattern입니다. 문자열의 길이와 숫자의 크기를 특히 구분하세요.

| 규칙 | 검사 대상 | 예 |
|---|---|---|
| required | 값이 반드시 있는지 | firstName 비어 있으면 오류 |
| min / max | 숫자 범위 | age 18–99 |
| minLength / maxLength | 문자열 길이 | firstName 20자 이하 |
| pattern | 정규식 패턴 | 특정 문자 형식 |
| validate | 사용자 정의 함수 | onlyEven 검사 |

React Forms의 과일 입력 예제는 5자 미만이면 오류 메시지를 state에 넣고, 조건에 맞으면 null로 지웁니다. 확장된 슬라이드 30은 제출값을 submittedValue에 보관한 뒤 입력값을 비웁니다. 그러나 반환 JSX에는 submittedValue를 표시하는 부분이 없으므로, **값을 저장했다는 사실과 화면에 출력했다는 사실을 구분**해야 합니다.

**English exam answer**

> Form validation checks whether user input meets specified requirements before it is used or submitted. These requirements may involve required values, formats, lengths, patterns, or custom rules.

근거: React Forms 슬라이드 27–33, 56; Form Validation 문서 페이지 1.

## 16. React Hook Form과 useForm

React Hook Form은 별도 form library입니다. useForm은 React의 useState와 같은 built-in Hook이 아니라 `react-hook-form` 패키지에서 가져옵니다.

```jsx
import { useForm } from "react-hook-form";

function ContactExample() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function submitForm(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      {errors.firstName?.type === "required" && <p>First Name is required</p>}
      {errors.firstName?.type === "maxLength" && <p>Use at most 20 characters</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

이 예제는 노트의 설명용 코드입니다. 별도 프로젝트에서 실행하려면 `npm install react-hook-form`이 필요합니다. 과제 참고 구현은 직접 작성한 controlled form이므로 기본 의존성에 이 패키지가 들어 있지 않습니다.

`register`는 input을 library에 등록합니다. 첫 번째 인수는 필드 이름, 두 번째 인수는 validation options입니다. `handleSubmit(submitForm)`은 검사를 통과한 데이터를 submitForm에 전달합니다. 직접 작성한 함수 이름 handleSubmit과 library가 제공하는 handleSubmit이 이름은 같을 수 있지만 출처가 다르다는 점을 구분하세요.

`formState: { errors }`는 중첩 구조 분해입니다. errors는 useForm 결과의 formState 안에 있는 오류 객체입니다. 자료에서는 오류 필드가 객체의 속성으로 들어 있고, 오류 종류가 type으로 표시된다고 설명합니다.

`errors.firstName?.type`의 `?.`는 firstName 오류가 없을 때 undefined의 type을 읽으려는 오류를 피합니다. errors 자체가 없다는 뜻이 아니라 그 안의 firstName 속성이 없을 수 있다는 뜻입니다.

**English exam answer**

> register connects a form field and its validation rules to React Hook Form. handleSubmit validates the form before calling the submission callback. formState.errors provides information about invalid fields.

> Optional chaining prevents an error when the field-specific error object does not exist.

근거: React Forms 슬라이드 43–49; Form Validation 문서 페이지 1–4.

### 사용자 정의 검사: onlyEven

```jsx
register("age", {
  min: 18,
  max: 99,
  validate: { onlyEven: (value) => value % 2 == 0 },
})
```

나이가 18 이상, 99 이하이면서 짝수여야 통과하는 수업용 예제입니다. 18과 42는 통과, 17은 min과 짝수 조건에 맞지 않으며, 19는 onlyEven에 맞지 않고, 100은 max를 넘습니다. 이 규칙이 실제 사용자 나이 수집의 보편적 기준이라는 뜻은 아닙니다.

### useEffect, defaultValues, setValue

자료는 defaultValues를 빈 이름과 age=0으로 설정하고, useEffect 안에서 Homer/Simpson/42 데이터를 만든 뒤 `setValue(prop, data[prop])`로 각 필드를 채웁니다. 이 예제에는 실제 서버 요청이 없습니다. 초기 데이터를 얻는 모양을 설명하기 위한 하드코딩된 객체입니다.

useEffect의 전체 생명주기와 의존성 규칙은 이 문서에 자세히 전개되어 있지 않습니다. 우선 **이 예제에서 필드를 초기 데이터로 채우는 작업에 사용한다**는 범위부터 이해하세요.

### 오류 표시와 버튼 비활성화

```jsx
<button disabled={Object.keys(errors).length > 0}>Update User</button>
```

Object.keys(errors)는 현재 오류 객체의 속성 이름 배열을 만듭니다. 하나 이상이면 버튼이 disabled 상태가 됩니다. 자료는 처음 submit을 시도한 후 오류가 나타나고 이후 수정에 따라 갱신된다고 설명합니다. 따라서 초기 오류 객체가 비어 있다는 사실만으로 모든 입력 검사가 이미 끝났다고 결론 내리면 안 됩니다.

dirtyFields는 수정된 필드, touchedFields는 방문한 필드를 관찰하기 위한 항목으로 간단히 소개됩니다.

근거: Form Validation 문서 페이지 1–5.

## 17. Lab과 과제를 실행하는 순서

### Week 2 Lab을 새로 연습하는 경우

Lab 문서는 `lab-session-2` 폴더를 만들고 Introduction PPT를 따르라고 안내합니다. 별도 폴더에서 Vite React 프로젝트를 만들 수 있습니다.

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm run dev
```

npm의 옵션 전달을 위한 추가 `--`는 실행용으로 보완한 문법입니다. 명령 결과로 나온 프롬프트와 Local 주소를 확인하세요. 최신 도구의 프롬프트 문구와 요구 버전은 강의 스크린샷과 달라질 수 있습니다.

### 이 ZIP을 실행하는 경우

이미 index.html, package.json, src 등이 있으므로 새 프로젝트를 만들지 않습니다.

```bash
cd client
npm install
npm test
npm run dev
```

**근거 구분:** Lab의 폴더명과 활동은 Lab 문서, Vite 시작 방식은 Introduction PPT, npm의 추가 `--`와 현재 요구 Node 버전은 Vite 공식 문서 보충입니다.

## 18. Deployment

Introduction PPT에는 `build.manifest`와 `rollupOptions.input = "./src/main.jsx"` 설정이 있습니다. 반면 Deploy React App PPT는 frontend만 배포할 때 다음 설정으로 교체하라고 명시합니다.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ plugins: [react()] });
```

과제 참고 구현은 이 frontend-only 설정을 사용합니다. 두 설정을 아무 구분 없이 합치지 마세요.

```bash
npm run build
```

성공하면 dist가 만들어지고, 그 폴더가 정적 배포 대상입니다. npm run dev는 개발 서버 실행, npm run build는 배포 산출물 생성, npm run preview는 산출물의 로컬 미리보기입니다. preview를 실행했다고 인터넷에 공개된 것은 아닙니다.

**보충:** BrowserRouter 경로를 Netlify에서 직접 열거나 새로고침할 수 있도록 다음 rewrite를 public/_redirects에 넣었습니다.

```text
/* /index.html 200
```

실제 파일이 아닌 /about 요청 등에 index.html을 제공하면 React Router가 해당 컴포넌트를 선택할 수 있습니다. 이것은 교수님 슬라이드의 추가 요구사항이 아니라 배포 동작을 위한 보완입니다.

**English exam answer**

> npm run build creates the production files in dist. These files are uploaded to a host. A development server running on localhost is not the same as a publicly hosted website.

근거: Deploy React App 슬라이드 2–4. 보충: Vite Guide 및 Netlify Rewrites and Proxies 공식 문서.

## 19. Assignment 1 연결

필수 여섯 화면은 Home, About Me, Projects, Education, Services, Contact Me입니다. 포트폴리오 PPT가 제공한 다섯 화면에 Services를 추가해야 합니다.

Home의 welcome, About 링크와 mission, About의 법적 이름/사진/소개/PDF 이력서, Projects의 최소 3개 이미지/역할/결과, Education의 학력/자격/기간, Services, Contact 정보 패널과 다섯 필드 form을 확인합니다. 반응형 CSS와 테스트는 참고 구현이 추가한 것이며, 과제 채점 항목별 세부 배점은 문서에 없는 숫자로 나누지 않았습니다.

문서의 제출물은 프로젝트 ZIP, GitHub 링크, 실제 live URL입니다. 로컬에서 실행되는 것만으로 제출이 끝나지 않습니다. GitHub의 commit은 실제 수정 과정이어야 하며, 완성본을 올리고 빈 commit을 추가해 개발 이력처럼 꾸미는 것은 하지 않습니다.

현재 참고 프로젝트의 완료 범위 및 남은 항목은 README_KO와 SUBMISSION_CHECKLIST를 확인하세요.

## 20. 영어 시험 연습 — 답안까지

먼저 질문만 보고 영어로 1–3문장으로 답한 뒤 펼쳐 보세요.

<details><summary>Q1. Is React a framework? What is its main purpose?</summary>

**Answer:** React is a JavaScript library for building user interfaces. It focuses on the view layer and builds interfaces from components.

한국어 포인트: library, user interfaces, components를 포함합니다.

</details>

<details><summary>Q2. What is the difference between React and ReactDOM?</summary>

**Answer:** React is used to describe UI with components. ReactDOM renders those interfaces in the browser DOM.

</details>

<details><summary>Q3. What does the JSX expression &lt;h1&gt;{25 + 75}&lt;/h1&gt; display?</summary>

**Answer:** It displays 100. The JavaScript expression inside the curly braces is evaluated.

</details>

<details><summary>Q4. Explain the roles of map and key when rendering a list.</summary>

**Answer:** map transforms array items into React elements. A key identifies each item in the rendered list.

</details>

<details><summary>Q5. What does const [count, setCount] = useState(0) mean?</summary>

**Answer:** It creates state with an initial value of zero. count is the current state, and setCount is the function used to update it.

</details>

<details><summary>Q6. Why is onClick={handleIncrement} different from onClick={handleIncrement()}?</summary>

**Answer:** The first expression passes a function to be called when the click occurs. The second calls the function immediately during rendering.

</details>

<details><summary>Q7. A counter begins at 0. Its reducer handles INCREMENT with +1 and DECREMENT with -1. What is the final value after INCREMENT, INCREMENT, DECREMENT?</summary>

**Answer:** The final value is 1. The state changes from 0 to 1, then 2, then 1.

</details>

<details><summary>Q8. What is the purpose of dispatch in useReducer?</summary>

**Answer:** dispatch sends an action to the reducer. The reducer uses the current state and that action to determine the next state.

</details>

<details><summary>Q9. Why does the star-rating example use i + 1?</summary>

**Answer:** Array indexes start at zero, but ratings start at one. Adding one converts the star’s index into the rating.

</details>

<details><summary>Q10. selectedStars is 3 and the indexes are 0–4. Which stars satisfy selectedStars &gt; i?</summary>

**Answer:** The stars at indexes 0, 1, and 2 satisfy the condition. Three stars are selected.

</details>

<details><summary>Q11. Compare Route and Link.</summary>

**Answer:** Route maps a path to a component. Link provides a clickable way to navigate to a path.

</details>

<details><summary>Q12. What is a controlled component?</summary>

**Answer:** It is a component whose form value is controlled by React state. The value or checked prop reflects state, and an onChange handler updates that state.

</details>

<details><summary>Q13. Should a checkbox handler read event.target.value or event.target.checked?</summary>

**Answer:** It should read event.target.checked to obtain whether the checkbox is selected as a Boolean value.

</details>

<details><summary>Q14. Why is ...prevFormData used before [name]: value?</summary>

**Answer:** The spread syntax preserves existing fields. The computed property then updates only the field whose name matches the changed input.

</details>

<details><summary>Q15. Does event.preventDefault() send the form data to the server?</summary>

**Answer:** No. It stops the default browser action. Sending data requires separate implementation.

</details>

<details><summary>Q16. How can an uncontrolled text input be read?</summary>

**Answer:** Attach a ref to the input and read ref.current.value. The DOM manages the input’s current value.

</details>

<details><summary>Q17. Compare min and minLength.</summary>

**Answer:** min sets a minimum numeric value. minLength sets a minimum number of characters in a value.

</details>

<details><summary>Q18. Why does errors.firstName?.type use optional chaining?</summary>

**Answer:** firstName may not exist in the errors object when the field has no error. Optional chaining prevents reading type from undefined.

</details>

<details><summary>Q19. A field requires min: 18, max: 99, and onlyEven. Do 18, 19, 42, and 100 pass?</summary>

**Answer:** 18 and 42 pass. 19 fails the even-number rule, and 100 exceeds the maximum.

</details>

<details><summary>Q20. Explain how the portfolio form captures data and redirects to Home.</summary>

**Answer:** The form stores input in controlled state and validates it on submission. If validation succeeds, it passes the data to parent state and calls navigate("/"). Home then reads and displays the captured data.

</details>

<details><summary>Q21. Which folder is produced by the Vite build and uploaded in the lecture’s Netlify workflow?</summary>

**Answer:** The dist folder contains the production build files and is uploaded to the hosting service.

</details>

<details><summary>Q22. Does an empty errors object before the first validation prove that every input has already passed validation?</summary>

**Answer:** No. It only shows that there are currently no recorded validation errors. The form may not have been validated yet.

</details>

## 21. 마지막 복습

코드를 읽을 때 다음 세 가지를 먼저 찾으면 구조가 보입니다. **어떤 데이터가 있는가? 누가 그 데이터를 바꾸는가? 어떤 JSX가 그 데이터를 보여주는가?** 그다음 input의 name/value/onChange, route의 path/element, form의 validation/callback/redirect를 각각 연결해서 설명하세요.

영어 답안은 정의 한 문장과 작동 방식 한 문장으로 연습하면 됩니다. 예를 들어 “React state stores the input value. The onChange handler updates that state.”처럼 짧지만 정확한 문장부터 시작하세요.
