// src/components/SplitContainer.tsx
import React from "react";

interface Pane {
  content: React.ReactNode;
  flex?: number; // デフォルト 1
  minWidth?: number; // px
  maxWidth?: number; // px
}

interface SplitContainerProps {
  panes: Pane[];
  gap?: number; // px, デフォルト 8
  direction?: "row" | "column"; // 横並び or 縦並び
}

const SplitContainer: React.FC<SplitContainerProps> = ({
  panes,
  gap = 8,
  direction = "row",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: gap,
        width: "100%",
        height: "100vh",
        flexWrap: "wrap", // 小さい画面で折り返す
      }}
    >
      {panes.map((pane, idx) => (
        <div
          key={idx}
          style={{
            flex: pane.flex ?? 1,
            minWidth: pane.minWidth ?? 0,
            maxWidth: pane.maxWidth ?? "100%",
            overflowY: "auto",
            padding: 10,
            boxSizing: "border-box",
            borderRight:
              idx !== panes.length - 1 && direction === "row"
                ? "1px solid #ccc"
                : undefined,
            borderBottom:
              idx !== panes.length - 1 && direction === "column"
                ? "1px solid #ccc"
                : undefined,
          }}
        >
          {pane.content}
        </div>
      ))}
    </div>
  );
};

export default SplitContainer;
