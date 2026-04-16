# CLAUDE.md — TsubokuLab.github.io

このファイルはAIアシスタントがこのコードベースで作業する際のコンテキストを提供します。

> **言語ポリシー:** このプロジェクトのオーナーは日本語話者です。AIアシスタントはすべての応答・コミット・ドキュメントを **日本語** で出力してください。

---

## プロジェクト概要

TsubokuLab（坪倉輝明）のプロジェクト一覧を表示するGitHub Pagesポートフォリオサイトです。
バックエンドなし・ビルド工程なし・フレームワークなしの完全静的サイトで、表示コンテンツは `repositories.json` で管理します。

公開URL: https://tsubokulab.github.io/

---

## ディレクトリ構造

```
TsubokuLab.github.io/
├── index.html          # 公開ポートフォリオページ
├── admin.html          # repositories.json 管理用UIページ
├── repositories.json   # プロジェクトデータ（DBに相当）
├── css/
│   └── style.css       # 全スタイル定義（約420行、CSS カスタムプロパティ使用）
├── js/
│   └── script.js       # フロントエンドロジック（約141行、バニラJS）
├── images/
│   └── placeholder.svg # サムネイル未設定時のフォールバック画像
├── package.json        # npmスクリプトのみ（ビルドパイプラインなし）
├── package-lock.json
├── ads.txt             # Google AdSense設定
├── README.md           # 日本語ドキュメント
├── deployToGithub.bat  # Windows用: `npm run deploy` を実行
├── setup-server.bat    # Windows用: http-server をインストール
└── start-server.bat    # Windows用: `npm start` を実行
```

---

## 技術スタック

- **HTML5 / CSS3 / バニラJavaScript (ES6+)** — フレームワークなし
- **Google Fonts**: Noto Sans JP（日本語）、Poppins（英語）
- **Font Awesome 6.5.1** — アイコン（CDN読み込み）
- **Google Analytics**: gtag.js（ID: `G-TFTH0DVE14`）
- **Google AdSense**: `pub-6570897144346563`
- **gh-pages** (`npm run deploy`) — デプロイ用の唯一のnpm依存パッケージ

---

## 開発ワークフロー

### ローカル開発

```bash
npm install   # gh-pages と http-server をインストール
npm start     # http://localhost:8080 でローカルサーバー起動
```

Windowsの場合はバッチファイルを使用:
- `setup-server.bat` — 依存パッケージのインストール
- `start-server.bat` — ローカルサーバーの起動

管理画面は `http://localhost:8080/admin.html` でアクセス可能。

### プロジェクトの追加・編集

プロジェクト情報は `repositories.json` で管理します。推奨フロー:

1. `http://localhost:8080/admin.html` を開く
2. GUIでプロジェクトの追加・編集・並び替えを行う
3. 「ダウンロード」ボタンで更新済みの `repositories.json` をエクスポート
4. プロジェクトルートのファイルを差し替える

`repositories.json` を直接編集する場合のスキーマ:

```json
{
  "name": "プロジェクト表示名",
  "repo": "リポジトリ名",
  "description": "プロジェクトの短い説明",
  "url": "https://example.github.io/project/",
  "thumbnail": "images/thumbnail.png",
  "tags": ["Web"],
  "date": "YYYY-MM-DD"
}
```

有効なタグ値: `"Web"`、`"Tool"`、`"Unity"`（大文字小文字を区別する）

### デプロイ

```bash
npm run deploy   # gh-pages パッケージでプロジェクトルートを gh-pages ブランチへプッシュ
```

Windowsの場合は `deployToGithub.bat` を実行。数分後に https://tsubokulab.github.io/ へ反映されます。

> **注意:** CI/CDパイプラインはありません。デプロイは常に手動で行います。

---

## コード規約

### HTML

- 言語設定: 日本語（`lang="ja"`）
- プロジェクトカードは `index.html` 内の `<template id="project-card-template">` から生成する — HTMLに直接記述しない
- フォント・アイコンなど外部アセットはすべてCDNから読み込む（ローカルコピーなし）

### CSS（`css/style.css`）

デザインシステムはCSSカスタムプロパティで定義されています。色などの値は必ず変数を使用し、直接値を記述しないこと:

```css
--primary-color: #3498db
--secondary-color: #2980b9
--accent-color: #e74c3c
--text-color: #333
--light-text: #777
--bg-color: #f9f9f9
--animation-speed: 0.3s
--border-radius: 8px
--shadow: 0 4px 15px rgba(0, 0, 0, 0.1)
```

- レスポンシブブレークポイント: `768px` と `480px`
- クラス命名はBEMスタイル: `project-card`、`project-info`、`project-title`
- 定義済みアニメーション: `fadeInUp`、`rotate`、`dash`

### JavaScript（`js/script.js`）

- バニラJSのみ — jQueryやフレームワークは不使用
- エントリーポイント: ページ読み込み時に `fetchRepositories()` が `repositories.json` を取得
- `renderProjects(data)`: `<template>` 要素をクローンしてプロジェクトカードを生成
- `filterProjects(filter)`: タグによるカードの表示フィルタリング
- `formatDate(dateString)`: `YYYY-MM-DD` → 日本語形式（`YYYY年MM月DD日`）に変換
- モジュールシステムなし — すべてのコードは1ファイルにまとめる

### データ（`repositories.json`）

- クライアントサイドで `fetch()` により読み込むプレーンなJSON配列
- 日付フォーマット: `YYYY-MM-DD`
- タグは大文字小文字を区別する文字列。有効値は `Web`、`Tool`、`Unity` のみ
- `thumbnail` のパスはサイトルートからの相対パス

---

## やってはいけないこと

- **JavaScriptフレームワークやビルド手順を導入しない** — このサイトは意図的にビルド不要な構成にしている
- **ファイルをminify（圧縮）しない** — ソースファイルをそのまま配信している
- **バックエンドを追加しない** — 静的なGitHub Pagesサイトとして運用する
- **`node_modules/` を変更しない** — `gh-pages` のみが依存パッケージでデプロイ専用
- **プロジェクトカードをHTMLに直接記述しない** — `repositories.json` とテンプレートシステムを使う
- **`master` や `gh-pages` ブランチへ直接プッシュしない** — `gh-pages` ブランチは `npm run deploy` が自動生成する。機能追加はフィーチャーブランチで行う

---

## ブランチ運用

| ブランチ | 用途 |
|--------|------|
| `master` | メインのソースブランチ |
| `gh-pages` | `npm run deploy` が自動生成。手動編集禁止 |
| `claude/*` | AIアシスタント用の作業ブランチ |

---

## 国際化について

- サイトのコンテンツは主に日本語
- ユーザー向けテキスト（説明文・見出しなど）は日本語で記述
- コードコメントは日本語・英語どちらも可
- 日付表示は日本語形式: `YYYY年MM月DD日`

---

## テストについて

自動テストはありません。`npm test` スクリプトはエラーで終了するプレースホルダーです。動作確認はローカルサーバーで目視確認してください。
