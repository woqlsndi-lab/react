import Item from "./Item";

export default function PackingList() {
  return (
    <section>
      <h1>여행 준비 목록</h1>
      <ul>
        <Item name="가방" isPacked={false} />
        <Item name="핸드폰" isPacked={false} />
        <Item name="카드" isPacked={true} />
      </ul>
    </section>
  );
}
