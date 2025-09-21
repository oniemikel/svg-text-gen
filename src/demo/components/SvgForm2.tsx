// src/demo/components/SvgForm2.tsx
import React from "react";
import { VStack } from "@chakra-ui/react";
import { SvgParamsProps } from '@/lib/svgParams';

interface SvgFormProps {
  values: SvgParamsProps;
  onChange: (values: SvgParamsProps) => void;
}

const SvgForm: React.FC<SvgFormProps> = ({ values, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    <VStack spacing={4}>

    </VStack>
  );
};

export default SvgForm;
