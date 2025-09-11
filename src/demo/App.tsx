// src/demo/App.tsx
import React, { useState } from "react";
import SplitContainer from "@/demo/components/SplitContainer";
import SvgForm, { SvgFormValues } from "@/demo/components/SvgForm";
import SvgPreview from "@/demo/components/SvgPreview";

const defaultValues: SvgFormValues = {
  text: "Hello SVG",
  fontSize: 40,
  fill: "#000000",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  fontStyle: "normal",
  textAnchor: "middle",
  dominantBaseline: "middle",
  rotate: 0,
  background: "#ffffff",
  linearGradients: [],
  gradientFillId: "",
  shapes: [],
  width: 400,
  height: 200,
  viewBox: "0 0 400 200",
  xmlns: "http://www.w3.org/2000/svg",
  style: "",
};

const App: React.FC = () => {
  const [values, setValues] = useState<SvgFormValues>(defaultValues);

  return (
    <SplitContainer
      direction="row"
      gap={10}
      panes={[
        {
          content: <SvgForm values={values} onChange={setValues} />,
          flex: 1,
          minWidth: 300,
        },
        {
          content: <SvgPreview values={values} />,
          flex: 1,
          minWidth: 300,
        },
      ]}
    />
  );
};

export default App;
