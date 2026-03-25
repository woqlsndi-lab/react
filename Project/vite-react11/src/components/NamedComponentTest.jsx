import { NamedComponent1 as Foo, NamedComponent3 as Bar,} from "./NamedComponent";

export function NamedComponentTest() {
  return (
    <>
      <h1>Named Component Test</h1>
      <Foo />
      <Bar />
    </>
  );
}