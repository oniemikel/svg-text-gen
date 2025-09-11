# SVG生成API - 詳細仕様

軽量なSVG生成APIです。テキスト、色、フォント、グラデーション、アニメーション、図形をURLクエリで指定してSVGを生成できます。  
署名、アイコン、簡易バナー、図形付きSVGなどに利用可能です。

## エンドポイント

```
GET https://svg-text-gen.vercel.app/api/svg
```

---

## クエリパラメータ仕様

### 基本パラメータ

| パラメータ         | 型     | デフォルト                     | 説明                                                                                                                                  |
| ------------------ | ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `text`             | string | `"Hello"`                      | SVGに表示するテキスト。改行は `%0A` または `\n` で指定可能。複数行の場合は `<tspan>` に自動分割され中央揃えで描画されます。           |
| `fontSize`         | number | `40`                           | テキストのフォントサイズ（px単位）。複数行の場合は自動で行間1.2倍が設定されます。                                                     |
| `fill`             | string | `"black"`                      | テキストの塗り色。単色のCSSカラー（例: `"red"`, `"#ff0000"`, `"rgb(255,0,0)"`）または `url(#gradId)` 形式でグラデーションを指定可能。 |
| `fontFamily`       | string | `"Arial, sans-serif"`          | フォントファミリー。Web安全フォントやGoogle Fontsの指定も可能です。                                                                   |
| `fontWeight`       | string | `undefined`                    | 文字の太さ。`"bold"`、`"normal"`などCSSに準拠。                                                                                       |
| `fontStyle`        | string | `undefined`                    | 文字のスタイル。`"italic"`、`"normal"`などCSSに準拠。                                                                                 |
| `textAnchor`       | string | `"middle"`                     | テキストの水平方向揃え。`"start"`、`"middle"`、`"end"`が指定可能。                                                                    |
| `dominantBaseline` | string | `"middle"`                     | テキストの垂直方向揃え。`"middle"`、`"hanging"`、`"baseline"`などSVG標準値。                                                          |
| `rotate`           | number | `undefined`                    | テキストをSVG中央を中心に回転する角度（度単位）。例: `45` で45度回転。                                                                |
| `bg`               | string | `undefined`                    | 背景色を矩形で描画。CSSカラー指定可能。                                                                                               |
| `width`            | number | `400`                          | SVG全体の横幅（px）。                                                                                                                 |
| `height`           | number | `200`                          | SVG全体の縦幅（px）。                                                                                                                 |
| `xmlns`            | string | `"http://www.w3.org/2000/svg"` | SVG名前空間。基本的に変更不要。                                                                                                       |
| `viewBox`          | string | `"0 0 width height"`           | ビューボックス。`0 0 width height` の形式で指定。拡大縮小表示に使用されます。                                                         |
| `style`            | string | `""`                           | SVG全体に適用するインラインCSSスタイル。例: `"border:1px solid black"`                                                                |

---

### グラデーション関連

| パラメータ       | 型     | 説明                                                                                                                                         |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `gradId`         | string | グラデーションのIDを指定します。例えば `"grad1"` とすると `<linearGradient id="grad1">` が生成されます。                                     |
| `stops`          | string | 停止点配列をカンマ区切りで指定します。形式: `"offset:color[:opacity],..."` 例: `"0%:red,50%:blue,100%:green:0.5"`。opacityは0〜1で省略可能。 |
| `gradientFillId` | string | 作成した `gradId` をここに指定するとテキストの `fill` に自動適用されます。例: `fill="url(#grad1)"` と同等。                                  |

**注意:** 停止点は順番通りに描画されます。SVG仕様上 `offset` は必ず `%` で指定してください。

---

### 図形（shapes）

| パラメータ | 型             | 説明                                                                                                                                        |
| ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `shapes`   | JSON文字列配列 | 任意のSVG要素を追加可能です。文字列として `<circle>`、`<rect>`、`<path>` 等を記述。例: `["<circle cx='50' cy='100' r='40' fill='red'/>"]`。 |

追加された図形はテキストの下に描画されます。

---

### アニメーション（animations）

| パラメータ   | 型             | 説明                                                                                                                                                                                                                                                                                                                          |
| ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animations` | JSON文字列配列 | `<text>` に追加される `<animate>` または `<animateTransform>` 要素を指定可能です。<br>属性:`attributeName`（例: `"fill"`、`"x"`、`"opacity"`）<br>値:`values`（例: `"red;blue;red"`）<br>`from`/`to`で開始・終了値も指定可能<br>`dur`（例: `"2s"`）、`repeatCount`（例: `"indefinite"`）、`type`（rotate, scale等）も指定可能 |

例（文字色を4秒で変化）:

```json
[
  {
    "attributeName": "fill",
    "values": "red;blue;red",
    "dur": "4s",
    "repeatCount": "indefinite"
  }
]
```

---

## サンプルURL（クリック可）

- **基本文字＋背景色**  
[Hello / 背景色](https://svg-text-gen.vercel.app/api/svg?text=Hello&fontSize=40&bg=lightyellow&fill=green)

- **グラデーション文字**  
[Gradient / グラデーション](https://svg-text-gen.vercel.app/api/svg?text=Gradient&fontSize=50&gradId=grad1&stops=0%25:red,100%25:blue&gradientFillId=grad1)

- **図形追加（circle）**  
[Circle / 図形](https://svg-text-gen.vercel.app/api/svg?text=Circle&shapes=%5B%22<circle%20cx='50'%20cy='100'%20r='40'%20fill='orange'/>%22%5D)

- **図形アニメーション**  
[Moving Circle](https://svg-text-gen.vercel.app/api/svg?text=Moving%20Circle&shapes=%5B%22<circle%20cx='50'%20cy='100'%20r='40'%20fill='lightgreen'><animate%20attributeName='cx'%20values='50;350;50'%20dur='6s'%20repeatCount='indefinite'/%3E</circle>%22%5D)

- **テキストアニメーション**  
[Color Shift](https://svg-text-gen.vercel.app/api/svg?text=Color%20Shift&animations=%5B%7B%22attributeName%22%3A%22fill%22%2C%22values%22%3A%22red%3Bblue%3Bred%22%2C%22dur%22%3A%224s%22%2C%22repeatCount%22%3A%22indefinite%22%7D%5D)

---

## 注意事項

1. URLエンコードが必要なパラメータがあります（`shapes`、`animations`）。  
2. 横幅・縦幅の指定ミスで文字や図形が隠れることがあります。  
3. 不正値を指定するとSVGは描画されますが、見た目が期待通りにならない場合があります。  
4. グラデーションは必ず `<linearGradient>` 定義を作成し、`gradientFillId` でテキストに適用してください。
