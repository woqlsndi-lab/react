# React 학습 정리

Vite + React 프로젝트로 핵심 개념들 실습하며 정리해둔 노트 // (3~9주차 / 2026.03.18 - 2026.04.29)

---

## 2026/04/29 (Week 9)

### UI 트리 구조 - Render 트리

React는 UI를 트리 구조로 관리한다. 브라우저가 HTML이나 CSS를 트리로 처리하듯, React도 컴포넌트 관계를 트리로 표현하는데 이걸 **Render 트리**라고 부름.

- 각 노드 = 컴포넌트
- 루트는 `App` 컴포넌트
- 화살표는 부모 → 자식 방향
- DOM 트리와 달리 HTML 태그 없이 React 컴포넌트로만 구성됨
- 부모 컴포넌트는 다른 컴포넌트의 자식이 될 수 있지만, 자식의 자식은 안 됨

---

### UI 트리 구조 - 모듈 의존성 트리

컴포넌트를 파일로 분리하면 `import` 관계가 생기는데, 이걸 **모듈 의존성 트리**라고 한다.

- 각 노드 = 모듈
- 각 가지(branch) = `import` 문
- 컴포넌트 외에도 함수나 상수를 export하는 JS 모듈도 포함

---

### JSX에 스타일 적용하기

#### 1. 일반 CSS

`style.css` 만들고 필요한 컴포넌트에서 import해서 쓰는 방식. HTML이랑 달리 `class` 대신 `className` 써야 하고, 전역 스코프라서 클래스명 충돌 조심해야 함.

```css
/* style.css */
.button {
  background: blue;
  color: white;
}
```
```jsx
import './style.css';

export default function Button() {
  return <button className="button">Click</button>;
}
```

#### 2. 인라인 스타일

조건부 스타일 줄 때 제한적으로 씀. 속성 이름을 camelCase로 써야 함.

```jsx
export default function Button() {
  return (
    <button style={{ backgroundColor: "blue", color: "white" }}>Click</button>
  );
}
```

#### 3. CSS-in-JS

`styled-components`, `emotion`, `JSS` 같은 라이브러리로 JS 코드 안에 CSS를 직접 작성하는 방식.

**장점**
- 컴포넌트 단위 스타일 관리라 유지보수 편함
- props로 동적 스타일링 가능
- 클래스명 자동 생성해서 충돌 없음
- Provider로 전역 테마 적용 쉬움

**단점**
- 런타임에 스타일 변환·삽입 과정이 있어서 성능 영향 있음
- 번들 사이즈 늘어남
- 라이브러리 문법 따로 공부해야 함

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: blue;
  color: white;
`;

export default function App() {
  return <Button>Click</Button>;
}
```

#### 4. CSS 프레임워크

Tailwind CSS(클래스 단위), Bootstrap(컴포넌트 단위) 이런 것들. 빠르게 만들 수 있고 일관성이 좋은데, 클래스 이름이 길어지면 읽기 불편해짐.

```jsx
export default function Button() {
  return <button className="bg-blue-500 text-white px-4 py-2">Click</button>;
}
```

#### 5. CSS Modules

클래스명을 `_[클래스이름]_[해시값]` 형태로 자동 변환해서 로컬 스코프를 만들어주는 방식. 빌드하면 고유한 이름으로 바뀌니까 충돌 걱정 없음.

```
.toolBar { ... }  →  [빌드]  →  _toolBar_mv2tm_7
```

- 파일명 규칙: `[컴포넌트명].module.css`
- CSS 작성은 일반 CSS랑 동일, class 선택자 사용
- Tag 선택자는 전역 적용이라 특별한 경우 아니면 안 쓰는 게 좋음
- 클래스 네이밍: 일반 CSS는 kebab-case, React에서는 camelCase
- import 변수명은 관행적으로 `style` 사용, `className={style.클래스명}` 형태로 적용
- 컴포넌트와 같은 디렉토리에 두는 게 일반적

---

### 이벤트에 응답하기

JSX에 이벤트 핸들러를 추가할 수 있다. 클릭, 호버, 포커스 같은 사용자 상호작용에 반응하는 함수임.

#### 이벤트 핸들러 함수 전달

이벤트 핸들러는 **호출이 아니라 전달**해야 함. 헷갈리기 쉬운 부분.

```jsx
// 올바른 방법 - 함수 참조 전달
<button onClick={handleClick} />

// 잘못된 방법 - 렌더링 시 즉시 실행됨
<button onClick={handleClick()} />
```

첫 번째는 React가 기억해뒀다가 클릭할 때 호출하고, 두 번째는 JSX가 중괄호 안을 즉시 실행해버려서 렌더링 시 바로 실행됨.

인라인으로 작성할 때도 마찬가지.

```jsx
// 잘못된 방법 - 렌더링 시 즉시 실행
<button onClick={alert('You Clicked me!')} />

// 올바른 방법 - 익명 함수로 감싸기
<button onClick={() => alert('You Clicked me!')} />
```

---

## 2026/04/15 (Week 7)

### 리스트 렌더링 (이어서)

배열 데이터를 구조화해서 `filter()`와 `map()`으로 렌더링.

```jsx
const heroes = [
  { id: 0, casting: '스파이더맨', name: '피터 파커' },
  { id: 1, casting: '아이언맨', name: '토니 스타크' },
  // ...
];
```

`filter()`는 조건이 `true`인 것만 모은 새 배열 반환.

```jsx
const filterTests = heroes.filter((hero) => hero.name === "클라크 켄트");

const listHeroes = filterTests.map((hero) => (
  <li>
    <p>{hero.name}의 배역은 {hero.casting} 입니다.</p>
  </li>
));
```

#### 화살표 함수와 return

화살표 함수는 `=>` 바로 뒤 표현식을 묵시적으로 반환 → `return` 안 써도 됨.

```jsx
// 묵시적 반환 (return 불필요)
const listItems = heroes.map((hero) => <li>...</li>);
```

`=>` 뒤에 `{}` 오면 **`return` 반드시 써야 함**.

```jsx
// 명시적 return 필요
const listItems = heroes.map((hero) => {
  return <li>...</li>;
});
```

#### key prop

배열 렌더링할 때 각 자식 요소를 구별하는 용도. 항목이 이동/삽입/삭제돼도 React가 각 요소를 제대로 추적할 수 있게 해줌. key는 즉석에서 생성하지 말고 데이터 안에 포함시켜야 함.

```jsx
export const heroes = [
  { id: 0, casting: "스파이더맨", name: "피터 파커", power: 3 },
  // ...
];

export default function MovieHeroes() {
  const filterTests = heroes.filter((hero) => hero.power === 5);

  const listHeroes = filterTests.map((hero) => (
    <li key={hero.id}>
      <p>{hero.name}의 배역은 {hero.casting} 입니다.</p>
    </li>
  ));

  return (
    <section>
      <h1>영화 속 영웅들</h1>
      <ul>{listHeroes}</ul>
    </section>
  );
}
```

#### 프래그먼트와 key prop

반환 태그가 여러 개면 `<></>` 또는 `<div>` 등으로 묶어야 하는데, `<></>` 구문으로는 `key`를 전달할 수 없음. 이럴 땐 `<div>` 쓰거나 `<Fragment>` 컴포넌트를 명시적으로 써야 함.

---

### 컴포넌트를 순수하게 유지하기

#### 순수 함수란?

- 같은 입력 → 항상 같은 결과
- 외부 상태를 바꾸지 않음 (사이드 이펙트 없음)

```jsx
// 순수 함수
function add(a, b) {
  return a + b;
}

// 순수 함수 아닌 예 - 외부 변수를 변경함
let count = 0;
function increase() {
  count++;
}
```

컴포넌트를 순수하게 작성하면 코드베이스가 커져도 예상치 못한 버그를 줄일 수 있다.

#### 지역 변경 (local mutation)

```jsx
// 잘못된 예 - 외부 변수를 렌더링 중에 변경
let guest = 0;

function Cup() {
  guest = guest + 1; // 외부 변수 변경!
  return <h2>Tea cup for guest #{guest}</h2>;
}
```

```jsx
// 올바른 예 - props로 전달
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

렌더링 중 외부 변수를 바꾸는 걸 **Mutation(변경)** 이라 함. 순수 함수는 함수 스코프 밖 변수를 건드리지 않는다. 단, 렌더링 중 새로 생성된 변수/객체를 바꾸는 건 괜찮음.

```jsx
export default function TeaGathering() {
  const cups = [];
  for (let i = 0; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />); // 렌더링 중 생성된 배열이라 OK
  }
  return cups;
}
```

---

## 2026/04/08 (Week 6)

### 조건부 렌더링

조건에 따라 다른 걸 보여줘야 할 때. React는 `if`문, 삼항 연산자, `&&` 같은 JS 문법을 그대로 활용함.

#### 삼항 연산자

```jsx
return <li>{isPacked ? <del>{name + " ✅"}</del> : name}</li>;
```

#### 논리 AND (`&&`)

조건이 참일 때만 렌더링, 거짓이면 아무것도 안 보여줄 때 씀.

```jsx
<li>{name} {isPacked && "✅"}</li>
```

> **주의**: `&&` 왼쪽에 숫자 `0`이 오면 React가 `0`을 그대로 렌더링해버림.

```jsx
// 잘못된 방법 - messageCount가 0이면 0이 화면에 보임
messageCount && <p>New messages</p>

// 올바른 방법
messageCount > 0 && <p>New messages</p>
```

#### 변수에 조건부 JSX 할당

```jsx
let itemContent = name;

if (isPacked) {
  itemContent = name + " ✅";
}

return <li>{itemContent}</li>;
```

---

### 리스트 렌더링

여러 데이터를 같은 형식으로 출력할 때 `map()`, `filter()` 활용.

```jsx
const heroes = [
  "스파이더맨: 피터 파커",
  "아이언맨: 토니 스타크",
  "배트맨: 브루스 웨인",
  "슈퍼맨: 클라크 켄트",
  "헐크: 로버트 브루스 배너",
];

const listHeroes = heroes.map((hero) => <li>{hero}</li>);

return <ul>{listHeroes}</ul>;
```

배열에 데이터 넣어야 `map()`, `filter()` 쓸 수 있음. 댓글 목록이나 이미지 갤러리 같은 반복 UI 만들 때 자주 쓰는 패턴.

---

## 2026/04/01 (Week 5)

### JSX로 마크업 작성하기

JSX는 JavaScript 파일 안에서 HTML처럼 마크업을 작성할 수 있게 해주는 확장 문법. 렌더링 로직이랑 마크업이 같은 컴포넌트 안에 있으니까, 버튼의 로직이 바뀌면 버튼 마크업도 같이 확인할 수 있어서 동기화가 쉬워짐.

> JSX랑 React는 별개 개념이다. JSX는 문법 확장이고, React는 라이브러리. 같이 쓰는 경우가 많아서 헷갈리기 쉬움.

#### JSX 규칙

**1. 하나의 루트 엘리먼트로 감싸기**

컴포넌트에서 여러 엘리먼트를 반환할 땐 무조건 하나의 부모 태그로 감싸야 함.

```jsx
// 안 됨
return (
  <h1>제목</h1>
  <p>내용</p>
);

// 됨 - div나 프래그먼트로 감싸기
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);
```

JSX는 내부적으로 JS 객체로 변환되는데, 함수 하나가 두 개의 객체를 반환할 수 없어서 이런 규칙이 있음.

**2. 모든 태그 닫기**

HTML에서 `<img>`나 `<br>`처럼 닫지 않아도 되는 태그들이 JSX에서는 전부 닫아야 함.

```jsx
<img src="photo.jpg" alt="사진" />
<br />
<li>항목</li>
```

**3. 거의 대부분 camelCase**

JSX 어트리뷰트는 JS 객체 키가 되기 때문에 JS 변수명 규칙을 따라야 함. 그래서 `class` → `className`, `stroke-width` → `strokeWidth` 이런 식으로 씀.

```jsx
<div className="container">
  <label htmlFor="input">입력</label>
  <input id="input" />
</div>
```

---

## 2026/03/25 (Week 4)

### 컴포넌트 import & export

컴포넌트가 많아지면 한 파일에 다 넣기 복잡해지니까 파일로 분리함. 분리하면 찾기도 쉽고 재사용하기도 편해짐.

#### Root 컴포넌트

`App.js`가 보통 루트 컴포넌트 파일. 다른 모든 컴포넌트가 여기서 출발. Next.js 같은 프레임워크는 페이지마다 루트 컴포넌트가 다를 수도 있음.

#### 파일 분리하는 3단계

1. 컴포넌트 담을 JS 파일 새로 만들기
2. 거기서 컴포넌트 `export` (default 또는 named)
3. 쓸 파일에서 `import`

#### default export vs named export

한 파일에서 `default export`는 딱 하나만 가능하고, `named export`는 여러 개 써도 됨.

```jsx
// Gallery.js

// default export - import할 때 이름 자유롭게 정할 수 있음
export default function Gallery() {
  return <section>...</section>;
}

// named export - import할 때 이름 똑같이 써야 함
export function Profile() {
  return <img src="..." />;
}
```

```jsx
// App.js
import Gallery from './Gallery.js';         // default import
import { Profile } from './Gallery.js';     // named import

export default function App() {
  return (
    <>
      <Gallery />
      <Profile />
    </>
  );
}
```

파일 확장자 `.js` 생략해도 되는 경우 많은데, 명시적으로 쓰는 게 더 확실함.

---

## 2026/03/18 (Week 3)

### 첫 번째 컴포넌트

React 컴포넌트는 마크업을 반환하는 JS 함수. 기존 방식이 HTML에 JS를 얹는 거였다면, React는 상호작용을 중심으로 두고 마크업을 함수 안에 넣는 구조.

#### 컴포넌트 만드는 3단계

**1단계: export**

```jsx
export default function Profile() {
```

`export default`로 다른 파일에서 import할 수 있게 내보냄.

**2단계: 함수 이름은 대문자로**

```jsx
function Profile() {  // 반드시 대문자 시작
```

소문자로 시작하면 React가 HTML 태그로 인식해버림. 컴포넌트 이름은 무조건 대문자.

**3단계: JSX 반환**

```jsx
export default function Profile() {
  return (
    <img src="https://example.com/photo.jpg" alt="프로필" />
  );
}
```

HTML처럼 생겼지만 실제로는 JS. 이게 JSX임.

#### 컴포넌트 중첩

컴포넌트끼리 중첩해서 새 컴포넌트를 구성할 수 있음. 이게 React 재사용성의 핵심.

```jsx
function Profile() {
  return <img src="photo.jpg" alt="프로필" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>갤러리</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

`Gallery`가 `Profile`을 자식으로 렌더링하는 부모 컴포넌트가 됨. 한 번 정의해두면 원하는 만큼 재사용 가능.
