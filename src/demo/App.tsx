// src/demo/App.tsx
import React, { useState } from "react";
import SplitContainer from "./components/SplitContainer";
import SvgForm, { SvgFormValues } from "./components/SvgForm";
import SvgPreview from "./components/SvgPreview";

const initialValues: SvgFormValues = {
  text: "Hello SVG",
  fontSize: 40,
  fill: "black",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  fontStyle: "normal",
  textAnchor: "middle",
  dominantBaseline: "middle",
  rotate: 0,
  background: "",
  linearGradients: "",
  gradientFillId: "",
  shapes: "",
  width: 400,
  height: 200,
  viewBox: "0 0 400 200",
  xmlns: "http://www.w3.org/2000/svg",
  style: "",
};

const App: React.FC = () => {
  const [values, setValues] = useState<SvgFormValues>(initialValues);

  const panes = [
    {
      content: <SvgForm values={values} onChange={setValues} />,
      flex: 1,
      minWidth: 300,
    },
    {
      content: <SvgPreview values={values} />,
      flex: 2,
      minWidth: 300,
    },
  ];

  return <SplitContainer panes={panes} gap={10} direction="row" />;
};

export default App;
