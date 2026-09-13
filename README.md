# JS の Canvas で砂時計のプログラム

HTML Canvas で砂時計のアニメーションを描画するアプリです。

## 技術スタック

- React 19
- TypeScript
- Vite
- Sass（SCSS）

## 開発の始め方

```bash
npm ci
npm run dev
```

ブラウザで [http://localhost:5173](http://localhost:5173) を開いて確認できます。

## スクリプト

| コマンド          | 説明                       |
| ----------------- | -------------------------- |
| `npm run dev`     | 開発サーバー               |
| `npm run build`   | 本番ビルド（出力は `dist/`） |
| `npm run preview` | ビルド結果の確認           |

## 機能

### ボールの計算プログラム

- 主に animationRoutine で行う
- かつ、animationRoutine からボール１個１個のレンダリング関数（renderBall）を呼び出している
- 全てのボールの座標を格納している変数は balls である

### ボールのレンダリングプログラム

- renderBall：ボールをレンダリングする関数
  - １個ずつ、位置と真ん中のテキストを引数として、ボールをレンダリングする

### キャンバスベースのレンダリングプログラム

- drawGrid 関数
  - 仮フレームのレンダリングを実施する
