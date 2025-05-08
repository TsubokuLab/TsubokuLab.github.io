# TsubokuLab GitHub Pages

TsubokuLabのプロジェクト一覧を表示するGitHub Pagesサイトです。

## ローカルテスト方法

初回のみ、以下の手順でローカルサーバーをセットアップしてください：

1. `setup-local-server.bat` をダブルクリックして実行
2. http-serverパッケージがインストールされるまで待機

ローカルテストを開始するには：

1. `startLocalServer.bat` をダブルクリックして実行
2. 自動的にブラウザが開き、http://localhost:8080 にアクセスします
3. 終了するには、コマンドプロンプトウィンドウで `Ctrl+C` を押してください

## リポジトリの管理方法

リポジトリ情報は `repositories.json` ファイルで管理されています。

管理用のWebインターフェースを使用する場合：

1. ローカルサーバーを起動
2. ブラウザで http://localhost:8080/admin.html にアクセス
3. フォームからリポジトリ情報を追加・編集
4. 「JSONエクスポート」ボタンをクリックしてファイルをダウンロード
5. ダウンロードした `repositories.json` をプロジェクトルートディレクトリに配置

## デプロイ方法

GitHubにデプロイするには：

1. `deployToGithub.bat` をダブルクリックして実行
2. デプロイが完了するまで待機
3. 変更が反映されるまで数分かかる場合があります
4. https://tsubokulab.github.io/ にアクセスして確認

## カスタマイズ方法

- `css/style.css` の `:root` セクションで色を変更できます
- `index.html` のヘッダーやフッターを編集できます
- 必要に応じてJavaScriptを拡張できます
