//(1) 함수 선언문 방식

/* App 컴포넌트를 함수형 컴포넌트로 선언. 선언할 때
export default 키워드를 사용하면 이 컴포넌트를 다른 파일에서
쉽게 불러와 사용 가능함. 컴포넌트의 이름은 Pascal Case(각 단어의 
첫글자를 대문자로 쓰고 공백이나 구분자 없이 이어 붙이는 표기법
를 따라 작성해야 함.
*/

const App = function App()
{
  return (
    <>
      <h1>함수 표현식 방식</h1>
      <h1>Hello, Function Component!</h1>      
    </>
  );
}
export default App;
/*
<>는 JSX문법의 코드로써 <Fragment>, 
<React.Fragment>와 
동일한 코드로써 여러 요소를 감쌀 때 
불필요한 HTML 태그를 추가하지 않고
그룹화 할 있게 해주는 태그
*/
