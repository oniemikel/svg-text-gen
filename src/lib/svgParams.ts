// src/lib/svgParams.ts

// 型定義
export interface SvgParamsProps {
    width?: number;
    height?: number;
    viewBox?: string;
    xmlns?: string;
    style?: string;
    background?: string;
    text?: string;
    fontSize?: number;
    fill?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAnchor?: string;
    dominantBaseline?: string;
    rotate?: number;
    gradientFillId?: string;

    // defs 系
    linearGradients?: {
        id: string;
        x1?: string;
        y1?: string;
        x2?: string;
        y2?: string;
        stops: { offset: string; color: string; opacity?: number }[];
    }[];
    patterns?: { id: string; width: number; height: number; patternUnits?: string; content: string }[];
    clipPaths?: { id: string; content: string }[];
    filters?: { id: string; content: string }[];

    // animations
    animations?: {
        type?: string;
        attributeName?: string;
        values?: string;
        from?: string;
        to?: string;
        dur: string;
        repeatCount?: string;
        additive?: string;
        accumulate?: string;
    }[];

    // shapes
    shapes?: string[];
    circles?: { cx: number; cy: number; r: number; fill?: string; stroke?: string; strokeWidth?: number }[];
    rects?: { x: number; y: number; width: number; height: number; fill?: string; rx?: number; ry?: number }[];
    paths?: { d: string; fill?: string; stroke?: string; strokeWidth?: number }[];

    // その他
    extraElements?: string[];
}

// デフォルト値
export const SvgParamsDefaults: Required<
    Pick<SvgParamsProps, "width" | "height" | "viewBox" | "xmlns" | "style" | "fontSize" | "fill" | "fontFamily" | "textAnchor" | "dominantBaseline">
> = {
    width: 300,
    height: 150,
    viewBox: "0 0 300 150",
    xmlns: "http://www.w3.org/2000/svg",
    style: "",
    fontSize: 24,
    fill: "#000000",
    fontFamily: "Arial, sans-serif",
    textAnchor: "middle",
    dominantBaseline: "middle",
};
