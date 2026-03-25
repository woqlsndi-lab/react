// import * as Foo from "./NamedComponent";
import * as Foo from "./NamedComponent";

export default function NamedExportTest() {
  return (
    <>
      <h1>Named Export Test</h1>
      <Foo.NamedComponent1 />
      <Foo.NamedComponent2 />
      <Foo.NamedComponent3 />
    </>
  );
}
