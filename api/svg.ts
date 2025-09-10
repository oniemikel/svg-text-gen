// api/svg.ts
export default function handler(req: any, res: any) {
    const escapeXml = (str: string) =>
        String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");

    const sanitizeColor = (val: unknown, fallback = "black") => {
        if (!val && val !== "") return fallback;
        const s = String(val).trim();
        if (/^[#\w\d\(\),.\s%\-]+$/.test(s)) {
            return escapeXml(s);
        }
        return fallback;
    };

    const text = String(req.query?.text ?? "Hello");
    const fill = sanitizeColor(req.query?.fill, "black");
    const bg = sanitizeColor(req.query?.bg, "transparent");
    let fontSize = Number.parseInt(String(req.query?.fontSize ?? "24"), 10);
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
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).send(svg);
}
