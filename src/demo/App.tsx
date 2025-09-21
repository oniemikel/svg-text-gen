// src/demo/App.tsx
import React, { useState } from "react";
import SplitContainer from "@/demo/components/SplitContainer";
import SvgForm from "@/demo/components/SvgForm";
import { SvgParamsProps, SvgParamsDefaults } from "@/lib/svgParams";
import SvgPreview from "@/demo/components/SvgPreview";

const defaultValues: SvgParamsProps = {
  ...SvgParamsDefaults, // デフォルト値を展開
  text: "Hello SVG", // 初期テキスト
};

const App: React.FC = () => {
  const [values, setValues] = useState<SvgParamsProps>(defaultValues);

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
