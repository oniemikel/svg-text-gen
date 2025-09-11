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

  // linearGradientsとshapesをJSON文字列から変換
  let parsedGradients = undefined;
  try {
    if (linearGradients) parsedGradients = JSON.parse(linearGradients);
  } catch {}

  let parsedShapes = undefined;
  try {
    if (shapes) parsedShapes = JSON.parse(shapes);
  } catch {}

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
    linearGradients: parsedGradients,
    gradientFillId,
    shapes: parsedShapes,
    width,
    height,
    viewBox,
    xmlns,
    style,
  });

  return (
    <div style={{ padding: 10 }}>
      <div dangerouslySetInnerHTML={{ __html: svgString }} />
      <textarea
        readOnly
        value={svgString}
        style={{ width: "100%", height: 200, marginTop: 10 }}
      />
    </div>
  );
};

export default SvgPreview;
