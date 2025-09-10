// ----------------------------------------
// src/pages/api/svg.ts
// Vercel API Route - SVG生成エンドポイント
// ----------------------------------------
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateSVG } from "../../lib/generateSVG";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const {
        text = "Hello",
        fontSize = "24",
        fill = "black",
        width = "300",
        height = "150",
        xmlns = "http://www.w3.org/2000/svg",
        viewBox = "0 0 300 150",
        style = ""
    } = req.query;

    const svg = generateSVG({
        text: String(text),
        fontSize: String(fontSize),
        fill: String(fill),
        width: String(width),
        height: String(height),
        xmlns: String(xmlns),
        viewBox: String(viewBox),
        style: String(style)
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}
