/*
Header / Main / Footer → 내부에서만 사용하는 컴포넌트
App → 외부에서 import해서 사용하는 대표 컴포넌트. 
JavaScript 모듈 규칙에서 
default export = "이 파일의 대표(기본) 내보내기"로써 
파일마다 “대표 1개”만 존재해야 함.
*/

function Header() {
  return (
    <>
      <h1>Header!</h1>
    </>
  );
}

function Main() {
  return (
    <>
      <h1>Hello, Function Component 추가 연습!</h1>
    </>
  );
}

function Footer() {
  return (
    <>
      <h1>Footer!</h1>
    </>
  );
}


//App 컴포넌트 내부에서 Header,
// Main,Footer 컴포넌트를
//HTML 태그처럼 <Header /> 형태로 사용함.
//React 는 이 태그를 보고 Header,Main,
// Footer 컴포넌트를 실행하고
//그 결과로 생성된 JSX를 
//App 컴포넌트 내에 함께 실행시킴.
export default function App() {
  // return 키워드 옆에 바로 코드가 오지 않을 경우, 
  // 반드시 소괄호 ()로 감싸야 정상적으로 렌더링됩니다.
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}