// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、電話の受話器と「?」。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M30 22c4-3 9-2 11 2l5 9c2 3 1 7-2 9l-4 3c3 7 8 12 15 15l3-4c2-3 6-4 9-2l9 5c4 2 5 7 2 11l-4 5c-4 4-10 5-15 3C38 72 28 62 22 42c-2-5-1-11 3-15z" fill="#f6d77a"/>
      <text x="74" y="38" font-size="30" font-weight="900" fill="#fffdf7" text-anchor="middle" font-family="sans-serif">?</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
