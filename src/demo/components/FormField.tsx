// src/demo/components/FormField.tsx
import React from "react";

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
  rows = 4,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label>
        {label}:<br />
        {type === "select" && options ? (
          <select name={name} value={value} onChange={onChange}>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            rows={rows}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} />
        )}
      </label>
    </div>
  );
};

export default FormField;
