// src/demo/components/SvgPreview.tsx
import React from "react";
import { SvgFormValues } from "./SvgForm";
import { generateSVG } from "@/lib/generateSVG";

interface SvgPreviewProps {
  values: SvgFormValues;
}

const SvgPreview: React.FC<SvgPreviewProps> = ({ values }) => {
  const {
    text,
    fontSize,
    fill,
    fontFamily,
    fontWeight,
    fontStyle,
    textAnchor,
    dominantBaseline,
    rotate,
    background,
    linearGradients,
    gradientFillId,
    shapes,
    width,
    height,
    viewBox,
    xmlns,
    style,
  } = values;

  // そのまま配列として渡す
  const svgString = generateSVG({
    text,
    fontSize,
    fill,
    fontFamily,
    fontWeight,
    fontStyle,
    textAnchor,
    dominantBaseline,
    rotate,
    background,
    linearGradients,
    gradientFillId,
    shapes,
    width,
    height,
    viewBox,
    xmlns,
    style,
  });

  return (
    <div
      style={{
        padding: 10,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{ border: "1px solid #ccc", minHeight: 200 }}
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
      <textarea
        readOnly
        value={svgString}
        style={{ width: "100%", height: 200, marginTop: 10 }}
      />
    </div>
  );
};

export default SvgPreview;
