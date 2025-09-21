// src/lib/generateSVG.ts
import { SvgParamsProps, SvgParamsDefaults } from './svgParams';

export function generateSVG(params: SvgParamsProps): string {
    const {
        width = SvgParamsDefaults.width,
        height = SvgParamsDefaults.height,
        viewBox = SvgParamsDefaults.viewBox,
        xmlns = SvgParamsDefaults.xmlns,
        style = SvgParamsDefaults.style,
        background,
        text,
        fontSize = SvgParamsDefaults.fontSize,
        fill = SvgParamsDefaults.fill,
        fontFamily = SvgParamsDefaults.fontFamily,
        fontWeight,
        fontStyle,
        textAnchor = SvgParamsDefaults.textAnchor,
        dominantBaseline = SvgParamsDefaults.dominantBaseline,
        rotate,
        linearGradients,
        gradientFillId,
        shapes,
        animations,
        patterns,
        clipPaths,
        filters,
        circles,
        rects,
        paths,
        extraElements,
    } = params;

    // defs
    let defs = "";
    if (linearGradients?.length) {
        defs += `<defs>${linearGradients.map(lg => `
            <linearGradient id="${lg.id}" x1="${lg.x1 ?? "0%"}" y1="${lg.y1 ?? "0%"}" x2="${lg.x2 ?? "100%"}" y2="${lg.y2 ?? "0%"}">
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

    // patterns
    if (patterns?.length) {
        defs += patterns.map(p => `
            <pattern id="${p.id}" width="${p.width}" height="${p.height}" patternUnits="${p.patternUnits ?? "userSpaceOnUse"}">
                ${p.content}
            </pattern>
        `).join("");
    }

    // clipPaths
    if (clipPaths?.length) {
        defs += clipPaths.map(cp => `
            <clipPath id="${cp.id}">
                ${cp.content}
            </clipPath>
        `).join("");
    }

    // filters
    if (filters?.length) {
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
