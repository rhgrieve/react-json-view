import React from "react";
import "./styles.css";

import { JsonView } from "./components/JsonView";
import { mockJson } from "./data/mock";

const jsonViewOptions = {
  controls: true
};

export default function App() {
  return (
    <div className="App">
      <JsonView data={mockJson} {...jsonViewOptions} />
    </div>
  );
}
