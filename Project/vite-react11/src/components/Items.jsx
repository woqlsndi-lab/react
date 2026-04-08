export default function Items({ name, isPacked }) {
  // return (
  //   <li>
  //     {name} {isPacked ? "✅" : ""}{" "}
  //   </li>
  // );
  return <li>{isPacked ? <dlel>{name + "✅"}</dlel> : name}</li>;
}