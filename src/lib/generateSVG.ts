// src/lib/generateSVG.ts
export interface GradientStop {
    offset: string;
    color: string;
    opacity?: number;
}

export interface LinearGradient {
    id: string;
    x1?: string;
    y1?: string;
    x2?: string;
    y2?: string;
    stops: GradientStop[];
}

export interface Animation {
    attributeName: string;  // 例: "x", "y", "fill", "opacity"
    values?: string;        // 例: "0;50;0"
    from?: string;
    to?: string;
    dur: string;            // 例: "2s"
    repeatCount?: string;   // "indefinite" など
    type?: string;          // animateTransform 用: "rotate" など
    additive?: string;
    accumulate?: string;
}

export interface SVGParams {
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
    linearGradients?: LinearGradient[];
    gradientFillId?: string;
    shapes?: string[];
    animations?: Animation[]; // ★追加
}

export function generateSVG(params: SVGParams): string {
    const {
        width = 400,
        height = 200,
        viewBox = `0 0 ${width} ${height}`,
        xmlns = "http://www.w3.org/2000/svg",
        style = "",
        background,
        text,
        fontSize = 40,
        fill = "black",
        fontFamily = "Arial, sans-serif",
        fontWeight,
        fontStyle,
        textAnchor = "middle",
        dominantBaseline = "middle",
        rotate,
        linearGradients,
        gradientFillId,
        shapes,
        animations,
    } = params;

    // defs
    let defs = "";
    if (linearGradients && linearGradients.length > 0) {
        defs = `<defs>${linearGradients.map(lg => `
            <linearGradient id="${lg.id}" x1="${lg.x1 || "0%"}" y1="${lg.y1 || "0%"}" x2="${lg.x2 || "100%"}" y2="${lg.y2 || "0%"}">
                ${lg.stops.map(stop => `<stop offset="${stop.offset}" style="stop-color:${stop.color};stop-opacity:${stop.opacity ?? 1}" />`).join("")}
            </linearGradient>
        `).join("")}</defs>`;
    }

    // animations
    const animationTags = animations?.map(anim => {
        if (anim.type) {
            return `<animateTransform attributeName="transform" attributeType="XML" type="${anim.type}" from="${anim.from ?? ""}" to="${anim.to ?? ""}" dur="${anim.dur}" repeatCount="${anim.repeatCount ?? "indefinite"}" />`;
        }
        return `<animate attributeName="${anim.attributeName}" values="${anim.values ?? ""}" from="${anim.from ?? ""}" to="${anim.to ?? ""}" dur="${anim.dur}" repeatCount="${anim.repeatCount ?? "indefinite"}" ${anim.additive ? `additive="${anim.additive}"` : ""} ${anim.accumulate ? `accumulate="${anim.accumulate}"` : ""} />`;
    }).join("") ?? "";

    // text
    let textElement = "";
    if (text) {
        const lines = text.split(/\r?\n/);
        const lineHeight = fontSize * 1.2;
        textElement = `<text 
            x="50%" y="50%" 
            font-size="${fontSize}" 
            fill="${gradientFillId ? `url(#${gradientFillId})` : fill}" 
            font-family="${fontFamily}" 
            ${fontWeight ? `font-weight="${fontWeight}"` : ""} 
            ${fontStyle ? `font-style="${fontStyle}"` : ""} 
            text-anchor="${textAnchor}" 
            dominant-baseline="${dominantBaseline}" 
            ${rotate ? `transform="rotate(${rotate} ${width/2} ${height/2})"` : ""}
        >
            ${lines.map((line, i) => `<tspan x="50%" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`).join("")}
            ${animationTags}
        </text>`;
    }

    const shapesContent = shapes?.join("") ?? "";
    const bgRect = background ? `<rect width="100%" height="100%" fill="${background}" />` : "";

    return `<svg xmlns="${xmlns}" width="${width}" height="${height}" viewBox="${viewBox}" style="${style}">
        ${defs}
        ${bgRect}
        ${shapesContent}
        ${textElement}
    </svg>`;
}
