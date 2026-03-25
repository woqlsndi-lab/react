/*주목할 코드
(1) export default function App() 형태로 
    바꿔서 Vite 기본 구조에 맞춤
(2) Header()함수에서 <Nav /> 코드를 추가하여
    Nav을 Header 안에서 실제로 사용하도록 연결함.
(2)30번 라인에서 <Section /> 코드를 추가하여
   Section을 Article 안에서 실제로 사용하도록 연결함.
(3)화면이 너무 비어 보이지 않도록 p, ul, li를 추가
(4)JSX 문법에 맞게 전체 구조를 안정적으로 정리
*/

//Header 컴포넌트 : 로고와 내비게이션 바
function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <Nav />
    </header>
  );
}
//Navigation 컴포넌트 : 웹사이트 메뉴
function Nav() {
  return <nav>Home | About | Services | Contact</nav>;
}
//Article 컴포넌트 : 주요 콘텐츠
function Article() {
  return (
    <article>
      <h2>Main Article</h2>
      <p>Welcome to the main content area 
        of this website.</p>
      <Section />
    </article>
  );
}
//Section 컴포넌트 : 세부 콘텐츠 
function Section() {
  return (
    <section>
      <h3>More Details</h3>
      <p>This section provides additional information.</p>
    </section>
  );
}
//Aside 컴포넌트 : 광고, 추가 정보 
function Aside() {
  return (
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li>React Guide</li>
        <li>Vite Documentation</li>
        <li>Component Examples</li>
      </ul>
    </aside>
  );
}
//Footer 컴포넌트 : 저작권 정보, 연락처
function Footer() {
  return (
    <footer>
      <p>© 2025 My Website. All rights reserved.</p>
    </footer>
  );
}
//App 컴포넌트 : 모든 컴포넌트를 조합해 전체 페이지 구성
export default function App() {
  return (
    <div>
      <Header />
      <Article />
      <Aside />
      <Footer />
    </div>
  );
}