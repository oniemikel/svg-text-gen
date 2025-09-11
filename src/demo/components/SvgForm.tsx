// src/demo/components/SvgForm.tsx
import React, { useState } from "react";
import FormField from "./FormField";

export interface SvgFormValues {
  text: string;
  fontSize: number;
  fill: string;
  fontFamily: string;
  fontWeight?: string;
  fontStyle?: string;
  textAnchor: string;
  dominantBaseline: string;
  rotate?: number;
  background?: string;
  linearGradients?: string; // JSON文字列
  gradientFillId?: string;
  shapes?: string; // JSON文字列
  width?: number;
  height?: number;
  viewBox?: string;
  xmlns?: string;
  style?: string;
}

interface SvgFormProps {
  values: SvgFormValues;
  onChange: (values: SvgFormValues) => void;
}

const fontWeights = ["", "normal", "bold", "bolder", "lighter"];
const fontStyles = ["", "normal", "italic", "oblique"];
const textAnchors = ["start", "middle", "end"];
const dominantBaselines = [
  "auto",
  "middle",
  "hanging",
  "text-bottom",
  "alphabetic",
];

const SvgForm: React.FC<SvgFormProps> = ({ values, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...values,
      [name]:
        ["fontSize", "rotate", "width", "height"].includes(name) && value !== ""
          ? Number(value)
          : value,
    });
  };

  return (
    <div style={{ padding: 10 }}>
      <FormField
        label="Text"
        name="text"
        value={values.text}
        onChange={handleChange}
      />
      <FormField
        label="Font Size"
        name="fontSize"
        type="number"
        value={values.fontSize}
        onChange={handleChange}
      />
      <FormField
        label="Fill Color"
        name="fill"
        value={values.fill}
        onChange={handleChange}
      />
      <FormField
        label="Font Family"
        name="fontFamily"
        value={values.fontFamily}
        onChange={handleChange}
      />
      <FormField
        label="Font Weight"
        name="fontWeight"
        type="select"
        value={values.fontWeight ?? ""}
        options={fontWeights}
        onChange={handleChange}
      />
      <FormField
        label="Font Style"
        name="fontStyle"
        type="select"
        value={values.fontStyle ?? ""}
        options={fontStyles}
        onChange={handleChange}
      />
      <FormField
        label="Text Anchor"
        name="textAnchor"
        type="select"
        value={values.textAnchor}
        options={textAnchors}
        onChange={handleChange}
      />
      <FormField
        label="Dominant Baseline"
        name="dominantBaseline"
        type="select"
        value={values.dominantBaseline}
        options={dominantBaselines}
        onChange={handleChange}
      />
      <FormField
        label="Rotate (deg)"
        name="rotate"
        type="number"
        value={values.rotate ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Background"
        name="background"
        value={values.background ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Linear Gradients (JSON)"
        name="linearGradients"
        value={values.linearGradients ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Gradient Fill ID"
        name="gradientFillId"
        value={values.gradientFillId ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Shapes (JSON Array)"
        name="shapes"
        value={values.shapes ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Width"
        name="width"
        type="number"
        value={values.width ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Height"
        name="height"
        type="number"
        value={values.height ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="ViewBox"
        name="viewBox"
        value={values.viewBox ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="XMLNS"
        name="xmlns"
        value={values.xmlns ?? ""}
        onChange={handleChange}
      />
      <FormField
        label="Style"
        name="style"
        value={values.style ?? ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SvgForm;
