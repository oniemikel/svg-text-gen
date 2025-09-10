// src/pages/api/svg.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateSVG, LinearGradient, AnimationOptions } from "../../lib/generateSVG";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const {
        text = "Hello",
        fontSize = "24",
        fill = "black",
        fontFamily,
        fontWeight,
        fontStyle,
        rotate,
        bg,
        width = "300",
        height = "150",
        xmlns = "http://www.w3.org/2000/svg",
        viewBox = "0 0 300 150",
        style = "",
        gradId,
        stops,
        shapes,
        animateType,
        animateDuration = "1s",
        animateRepeat = "indefinite"
    } = req.query;

    // linearGradient 配列生成
    let linearGradients: LinearGradient[] | undefined = undefined;
    if (gradId && typeof gradId === "string" && stops && typeof stops === "string") {
        const stopArray = stops.split(",").map(s => {
            const [offset, color] = s.split(":");
            return { offset, color };
        });
        linearGradients = [{ id: gradId, stops: stopArray }];
    }

    // shapes 配列生成
    let shapesArray: string[] | undefined = undefined;
    if (shapes && typeof shapes === "string") {
        try {
            const parsed = JSON.parse(shapes);
            if (Array.isArray(parsed)) shapesArray = parsed.map(String);
        } catch {
            shapesArray = undefined;
        }
    }

    // 複数行対応
    const formattedText = typeof text === "string" ? text.replace(/\\n/g, "\n") : undefined;

    // アニメーションオプション
    let animation: AnimationOptions | undefined = undefined;
    if (typeof animateType === "string") {
        animation = { type: animateType as AnimationOptions["type"], duration: String(animateDuration), repeat: String(animateRepeat) };
    }

    const svg = generateSVG({
        text: formattedText,
        fontSize: Number(fontSize),
        fill: String(fill),
        fontFamily: typeof fontFamily === "string" ? fontFamily : undefined,
        fontWeight: typeof fontWeight === "string" ? fontWeight : undefined,
        fontStyle: typeof fontStyle === "string" ? fontStyle : undefined,
        rotate: rotate ? Number(rotate) : undefined,
        background: typeof bg === "string" ? bg : undefined,
        width: Number(width),
        height: Number(height),
        xmlns: String(xmlns),
        viewBox: String(viewBox),
        style: String(style),
        linearGradients,
        shapes: shapesArray,
        animation
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);
}
