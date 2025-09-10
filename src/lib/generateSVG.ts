// ----------------------------------------
// src/lib/generateSVG.ts
// SVG生成ロジック
// ----------------------------------------
export interface SVGParams {
    text: string;
    fontSize: string;
    fill: string;
    width: string;
    height: string;
    xmlns: string;
    viewBox: string;
    style: string;
}

export function generateSVG(params: SVGParams): string {
    const { text, fontSize, fill, width, height, xmlns, viewBox, style } = params;
    return `<svg xmlns="${xmlns}" width="${width}" height="${height}" viewBox="${viewBox}" style="${style}">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-size="${fontSize}" fill="${fill}" font-family="Arial, sans-serif">
          ${text}
      </text>
  </svg>`;
}
