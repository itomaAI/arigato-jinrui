# arigato-jinrui (thanks-proxy)

「完全オープンでどこへでも無理やり届ける」をコンセプトとした、社会の信用割当問題をハックする感謝伝達プラットフォーム。

## コンセプト
飛行機の操縦士、レストランの料理人、バックオフィスの担当者など、普段顔の見えない（直接感謝を伝えづらい）労働者に対して、AIが仲介して感謝のメッセージを送りつけるシステム。資本主義の金銭による評価を「ハピネス（感謝）」にズラすことを目的とする。

## アーキテクチャ (PoC)
サーバーを持たない完全静的構成。
1. **Frontend**: GitHub Pages (HTML / Tailwind CSS / Vue.js)
2. **Inbox**: Slack Webhook を経由した非同期キュー
3. **Backend Agent**: Itera OS デーモンによるLLMモデレーション・所属推定、および Git Push バッチ
4. **Database**: GitHub リポジトリ上の JSON ファイル (クライアントサイドでの Fuse.js 検索)

## 開発状況
- Phase 1: フロントエンドUI構築およびモック検証（現在進行中）
- Phase 2: Slack Webhook 連携および Itera Agent 構築