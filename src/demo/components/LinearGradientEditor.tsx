// src/demo/components/LinearGradientEditor.tsx
import React from "react";
import { LinearGradient, GradientStop } from "@/lib/generateSVG";
import FormField from "./FormField";

interface LinearGradientEditorProps {
  gradients: LinearGradient[];
  onChange: (gradients: LinearGradient[]) => void;
}

const LinearGradientEditor: React.FC<LinearGradientEditorProps> = ({
  gradients,
  onChange,
}) => {
  const handleGradientChange = (
    index: number,
    field: keyof LinearGradient,
    value: any
  ) => {
    const newGradients = [...gradients];
    newGradients[index] = { ...newGradients[index], [field]: value };
    onChange(newGradients);
  };

  const handleStopChange = (
    gIndex: number,
    sIndex: number,
    field: keyof GradientStop,
    value: any
  ) => {
    const newGradients = [...gradients];
    const stops = [...newGradients[gIndex].stops];
    stops[sIndex] = { ...stops[sIndex], [field]: value };
    newGradients[gIndex].stops = stops;
    onChange(newGradients);
  };

  const addGradient = () => {
    onChange([
      ...gradients,
      {
        id: `grad${gradients.length + 1}`,
        stops: [
          { offset: "0%", color: "#000" },
          { offset: "100%", color: "#fff" },
        ],
      },
    ]);
  };

  const addStop = (gIndex: number) => {
    const newGradients = [...gradients];
    newGradients[gIndex].stops.push({ offset: "100%", color: "#fff" });
    onChange(newGradients);
  };

  return (
    <div style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
      <h4>Linear Gradients</h4>
      {gradients.map((grad, gIdx) => (
        <div
          key={grad.id}
          style={{ marginBottom: 10, padding: 5, border: "1px dashed #aaa" }}
        >
          <FormField
            label="Gradient ID"
            name="id"
            value={grad.id}
            onChange={(e) => handleGradientChange(gIdx, "id", e.target.value)}
          />
          <FormField
            label="x1"
            name="x1"
            value={grad.x1 ?? "0%"}
            onChange={(e) => handleGradientChange(gIdx, "x1", e.target.value)}
          />
          <FormField
            label="y1"
            name="y1"
            value={grad.y1 ?? "0%"}
            onChange={(e) => handleGradientChange(gIdx, "y1", e.target.value)}
          />
          <FormField
            label="x2"
            name="x2"
            value={grad.x2 ?? "100%"}
            onChange={(e) => handleGradientChange(gIdx, "x2", e.target.value)}
          />
          <FormField
            label="y2"
            name="y2"
            value={grad.y2 ?? "0%"}
            onChange={(e) => handleGradientChange(gIdx, "y2", e.target.value)}
          />
          <div style={{ marginLeft: 10 }}>
            <h5>Stops</h5>
            {grad.stops.map((stop, sIdx) => (
              <div key={sIdx}>
                <FormField
                  label="Offset"
                  name="offset"
                  value={stop.offset}
                  onChange={(e) =>
                    handleStopChange(gIdx, sIdx, "offset", e.target.value)
                  }
                />
                <FormField
                  label="Color"
                  name="color"
                  value={stop.color}
                  onChange={(e) =>
                    handleStopChange(gIdx, sIdx, "color", e.target.value)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={() => addStop(gIdx)}>
              Add Stop
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addGradient}>
        Add Gradient
      </button>
    </div>
  );
};

export default LinearGradientEditor;
