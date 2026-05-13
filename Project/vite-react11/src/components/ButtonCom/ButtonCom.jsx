import style from "./ButtonCom.module.css";

const handleClick = (text) => {
  alert(`${text} Clicked!`);
};

const ButtonCom = () => {
  return (
    <>
      <h1 className={style.title}>ButtonCom Component With CSS Module</h1>
      <nav className={style.navBar}>
        <button
          className={style.myButton}
          onClick={() => handleClick("button1")}
        >
          button1
        </button>
        <button
          className={style.myButton}
          onClick={() => handleClick("button2")}
        >
          button2
        </button>
      </nav>
    </>
  );
};

export default ButtonCom;
