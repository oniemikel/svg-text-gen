// src/demo/components/FormField.tsx
import React from "react";
import {
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";

interface FormFieldProps {
  label: string;
  type?: "text" | "textarea" | "number" | "select";
  name: string;
  value: string | number;
  options?: string[]; // select用
  rows?: number; // textarea用
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  options,
  rows = 2,
  onChange,
}) => {
  return (
    <FormControl mb={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {type === "select" && options ? (
        <Select id={name} name={name} value={value} onChange={onChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      ) : type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          rows={rows}
          onChange={onChange}
        />
      ) : (
        <Input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </FormControl>
  );
};

export default FormField;
