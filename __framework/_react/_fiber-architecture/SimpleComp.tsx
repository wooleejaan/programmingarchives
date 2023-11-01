/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

export function SimpleComp(): JSX.Element {
  const [name, setName] = React.useState<string>("Alice");
  return (
    <div>
      <h1>Hello react!</h1>
      <section>
        <p>{`Name : ${name}`}</p>
        <button
          onClick={(e) => setName(name === "Samuel" ? "Alice" : "Samuel")}
        >
          Click me
        </button>
      </section>
    </div>
  );
}
