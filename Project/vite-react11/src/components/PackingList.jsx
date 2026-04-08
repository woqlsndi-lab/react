import Items from "./Items";

export default function PackingList() {
  return (
    <section>
      <h1>여행 짐 리스트</h1>
      <ul>
        <Items name="여분 옷" />
        <Items name="칫솔" />
        <Items name="화장품" isPacked="true"/>
      </ul>
    </section>
  );
}