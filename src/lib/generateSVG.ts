// src/lib/generateSVG.ts
export interface GradientStop {
    offset: number; // 0-100 の割合
    color: string;
    opacity?: number;
    animate?: {
        values: string;
        dur: string;
        repeatCount?: string;
    };
}

export interface LinearGradient {
    id: string;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
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

export interface Pattern {
    id: string;
    width: number;
    height: number;
    patternUnits?: string; // "userSpaceOnUse" など
    content: string;       // 中に <circle> や <rect> など
}

export interface ClipPath {
    id: string;
    content: string; // <circle> や <rect> など
}

export interface Filter {
    id: string;
    content: string; // <feGaussianBlur> など
}

export interface Circle {
    cx: number;
    cy: number;
    r: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: string;
    rx?: number;
    ry?: number;
}

export interface Path {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
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
    patterns?: Pattern[];
    clipPaths?: ClipPath[];
    filters?: Filter[];
    circles?: Circle[];
    rects?: Rect[];
    paths?: Path[];
    extraElements?: string[]; // 完全自由に追加
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
        shapes,
        animations,
        patterns,
        clipPaths,
        filters,
        circles,
        rects,
        paths,
        extraElements
    } = params;

    // defs
    let defs = "";
    if (linearGradients && linearGradients.length > 0) {
        defs = `<defs>${linearGradients.map(lg => `
            <linearGradient id="${lg.id}" 
                x1="${lg.x1 !== undefined ? lg.x1 + '%' : '0%'}" 
                y1="${lg.y1 !== undefined ? lg.y1 + '%' : '0%'}" 
                x2="${lg.x2 !== undefined ? lg.x2 + '%' : '100%'}" 
                y2="${lg.y2 !== undefined ? lg.y2 + '%' : '0%'}">
                ${lg.stops.map(stop => `
                    <stop offset="${stop.offset}%" style="stop-color:${stop.color};stop-opacity:${stop.opacity ?? 1}">
                        ${stop.animate ? `<animate attributeName="stop-color" values="${stop.animate.values}" dur="${stop.animate.dur}" repeatCount="${stop.animate.repeatCount ?? 'indefinite'}" />` : ''}
                    </stop>
                `).join("")}
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
            fill="url(#${linearGradients && linearGradients.length > 0 ? linearGradients[0].id : ''})" 
            font-family="${fontFamily}" 
            ${fontWeight ? `font-weight="${fontWeight}"` : ""} 
            ${fontStyle ? `font-style="${fontStyle}"` : ""} 
            text-anchor="${textAnchor}" 
            dominant-baseline="${dominantBaseline}" 
            ${rotate ? `transform="rotate(${rotate} ${width/2} ${height/2})"` : ""}>
            ${lines.map((line, i) => `<tspan x="50%" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`).join("")}
            ${animationTags}
        </text>`;
    }

    // patterns
    if (patterns && patterns.length > 0) {
        defs += patterns.map(p => `
            <pattern id="${p.id}" width="${p.width}" height="${p.height}" patternUnits="${p.patternUnits ?? "userSpaceOnUse"}">
                ${p.content}
            </pattern>
        `).join("");
    }

    // clipPaths
    if (clipPaths && clipPaths.length > 0) {
        defs += clipPaths.map(cp => `
            <clipPath id="${cp.id}">
                ${cp.content}
            </clipPath>
        `).join("");
    }

    // filters
    if (filters && filters.length > 0) {
        defs += filters.map(f => `
            <filter id="${f.id}">
                ${f.content}
            </filter>
        `).join("");
    }

    // circles
    const circlesContent = circles?.map(c => `
        <circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" 
            ${c.fill ? `fill="${c.fill}"` : ""} 
            ${c.stroke ? `stroke="${c.stroke}"` : ""} 
            ${c.strokeWidth ? `stroke-width="${c.strokeWidth}"` : ""} />
    `).join("") ?? "";

    // rects
    const rectsContent = rects?.map(r => `
        <rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" 
            ${r.fill ? `fill="${r.fill}"` : ""} 
            ${r.rx ? `rx="${r.rx}"` : ""} 
            ${r.ry ? `ry="${r.ry}"` : ""} />
    `).join("") ?? "";

    // paths
    const pathsContent = paths?.map(p => `
        <path d="${p.d}" 
            ${p.fill ? `fill="${p.fill}"` : ""} 
            ${p.stroke ? `stroke="${p.stroke}"` : ""} 
            ${p.strokeWidth ? `stroke-width="${p.strokeWidth}"` : ""} />
    `).join("") ?? "";

    const shapesContent = shapes?.join("") ?? "";
    const bgRect = background ? `<rect width="100%" height="100%" fill="${background}" />` : "";

    return `<svg xmlns="${xmlns}" width="${width}" height="${height}" viewBox="${viewBox}" style="${style}">
        ${defs}
        ${bgRect}
        ${shapesContent}
        ${textElement}
        ${circlesContent}
        ${rectsContent}
        ${pathsContent}
        ${extraElements?.join("") ?? ""}
    </svg>`;
}