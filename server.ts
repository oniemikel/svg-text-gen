import express from "express";
import { Request, Response } from "express";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

/**
 * XML エスケープ（テキストノード用）
 */
function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * 属性値向けの簡易サニタイズ（色や背景など）
 * 許容する文字の簡易正規表現で不正文字を弾き、ダメならフォールバックを返す
 */
function sanitizeColor(val: unknown, fallback = "black"): string {
    if (!val && val !== "") return fallback;
    const s = String(val).trim();
    // hex, named colors, rgb()/rgba()/hsl() 等の簡易許可：英数字, #, (), , . % - space
    if (/^[#\w\d\(\),.\s%\-]+$/.test(s)) {
        return escapeXml(s);
    }
    return fallback;
}

app.get("/api/svg", (req: Request, res: Response) => {
    const rawText = req.query.text ?? "Hello";
    const text = String(rawText);

    const fill = sanitizeColor(req.query.fill as string | undefined, "black");
    const bg = sanitizeColor(req.query.bg as string | undefined, "transparent");

    let fontSize = Number.parseInt(String(req.query.fontSize ?? "24"), 10);
    if (Number.isNaN(fontSize) || fontSize < 8) fontSize = 24;
    if (fontSize > 300) fontSize = 300;

    const padding = Math.round(fontSize * 0.6);
    const estimatedWidth = Math.max(100, Math.round(text.length * fontSize * 0.6) + padding * 2);
    const width = estimatedWidth;
    const height = fontSize + padding * 2;
    const escapedText = escapeXml(text);

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapedText}">
    <rect width="100%" height="100%" fill="${bg}" />
    <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" fill="${fill}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" text-anchor="middle">${escapedText}</text>
</svg>`;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    // 開発段階ではキャッシュしないようにする（本番で必要なら調整）
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(200).send(svg);
});

app.listen(port, () => {
    console.log(`SVG API listening at http://localhost:${port}/api/svg`);
});
