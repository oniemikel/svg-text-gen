// src/demo/components/SvgForm.tsx
import React from "react";
import {
  VStack,
  Input,
  Textarea,
  Select,
  NumberInput,
  Box,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import LinearGradientEditor from "./LinearGradientEditor";
import { LinearGradient } from "../../lib/generateSVG";

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
  linearGradients?: LinearGradient[];
  gradientFillId?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  xmlns?: string;
  style?: string;
}

interface SvgFormProps {
  values?: Partial<SvgFormValues>;
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

const defaultValues: SvgFormValues = {
  text: "",
  fontSize: 16,
  fill: "#000000",
  fontFamily: "Arial",
  fontWeight: "normal",
  fontStyle: "normal",
  textAnchor: "start",
  dominantBaseline: "auto",
  rotate: 0,
  background: "#ffffff",
  linearGradients: [],
  gradientFillId: "",
  width: 200,
  height: 100,
  viewBox: "0 0 200 100",
  xmlns: "http://www.w3.org/2000/svg",
  style: "",
};

const SvgForm: React.FC<SvgFormProps> = ({ values, onChange }) => {
  const v: SvgFormValues = { ...defaultValues, ...values };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onChange({
      ...v,
      [name]:
        ["fontSize", "rotate", "width", "height"].includes(name) && value !== ""
          ? Number(value)
          : value,
    });
  };

  const handleNumberChange = (name: keyof SvgFormValues, value: number) => {
    onChange({
      ...v,
      [name]: value,
    });
  };

  const updateGradients = (updated: LinearGradient[]) => {
    onChange({ ...v, linearGradients: updated });
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <FormControl>
        <FormLabel>Text</FormLabel>
        <Textarea name="text" value={v.text} onChange={handleChange} rows={2} />
      </FormControl>

      <FormControl>
        <FormLabel>Font Size</FormLabel>
        <NumberInput
          value={v.fontSize}
          onChange={(val) => handleNumberChange("fontSize", val)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Fill Color</FormLabel>
        <Input
          type="color"
          name="fill"
          value={v.fill}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Font Family</FormLabel>
        <Input name="fontFamily" value={v.fontFamily} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Font Weight</FormLabel>
        <Select
          name="fontWeight"
          value={v.fontWeight ?? ""}
          onChange={handleChange}
        >
          {fontWeights.map((fw) => (
            <option key={fw} value={fw}>
              {fw || "None"}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Font Style</FormLabel>
        <Select
          name="fontStyle"
          value={v.fontStyle ?? ""}
          onChange={handleChange}
        >
          {fontStyles.map((fs) => (
            <option key={fs} value={fs}>
              {fs || "None"}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Text Anchor</FormLabel>
        <Select name="textAnchor" value={v.textAnchor} onChange={handleChange}>
          {textAnchors.map((ta) => (
            <option key={ta} value={ta}>
              {ta}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Dominant Baseline</FormLabel>
        <Select
          name="dominantBaseline"
          value={v.dominantBaseline}
          onChange={handleChange}
        >
          {dominantBaselines.map((db) => (
            <option key={db} value={db}>
              {db}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Rotate (deg)</FormLabel>
        <NumberInput
          value={v.rotate ?? 0}
          onChange={(val) => handleNumberChange("rotate", val)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Background</FormLabel>
        <Input
          type="color"
          name="background"
          value={v.background ?? "#ffffff"}
          onChange={handleChange}
        />
      </FormControl>

      <Box>
        <FormLabel>Linear Gradients</FormLabel>
        <LinearGradientEditor
          gradients={v.linearGradients ?? []}
          onChange={updateGradients}
        />
      </Box>

      <FormControl>
        <FormLabel>Gradient Fill ID</FormLabel>
        <Input
          name="gradientFillId"
          value={v.gradientFillId ?? ""}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Width</FormLabel>
        <NumberInput
          value={v.width ?? 0}
          onChange={(val) => handleNumberChange("width", val)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Height</FormLabel>
        <NumberInput
          value={v.height ?? 0}
          onChange={(val) => handleNumberChange("height", val)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>ViewBox</FormLabel>
        <Input name="viewBox" value={v.viewBox ?? ""} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>XMLNS</FormLabel>
        <Input name="xmlns" value={v.xmlns ?? ""} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Style</FormLabel>
        <Input name="style" value={v.style ?? ""} onChange={handleChange} />
      </FormControl>
    </VStack>
  );
};

export default SvgForm;
