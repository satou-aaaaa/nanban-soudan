# AGENTS.md

こまったら何番？：困りごとの場面を読んで、電話する番号（110・119・118・#9110・#7119・#8000・188・189・171・#9910）を当てる1日5問の学習ゲーム。正解したら「この電話の先にいるのは？」（警察・消防・海上保安庁・医師や看護師など・近くの相談の窓口・録音した伝言・道路を管理する所）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（30種類×3000問：選び肢・答えは1つ・答えと2段目が別に書いた表どおり・まぎらわしい番号の入れ方・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は公式のページ（警察庁・総務省消防庁・海上保安庁・厚生労働省・こども家庭庁・国土交通省・政府広報オンライン・NTT東日本。`data.js` の `SRC`）に書いてあることだけ（2026-11-17 に読んだ。要点は共有フォルダ games/nanban-research.md）。種類を足すときもページを読み、`qa/run.mjs` の `TB`（別に書いた表）にも足す。番号・受付の時間・#7119の実施地域は変わるので、巡回で読み直す。
- 扱うのは場面と番号の結びつきと、つながる先だけ。救急車を呼ぶかの症状の見分け（救急車よぶ？ kyukyusha-yobu）・悪質商法の見分け（akushitsu-miyaburi）・災害のあとの行動（bousai-handan）と重ねない。性犯罪の相談・こころの相談は場面の書き分けが難しく重い題材なので入れない。
- どちらの番号も正しくなりうる場面は作らない。#7119 の場面は「住む地域に#7119がある」と書く。子どもの具合（#8000）では #7119 をまちがいの選び肢にしない（`same`）。
- 相談の助言にしない：遊び方・「このゲームについて」・README に、命にかかわるときは迷わず110番・119番であること、相談の助言・公式の情報の代わりではないこと、番号と受付の時間は公式のページで確かめることを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ（まぎらわしい番号を入れない）、ふつうが4つ、むずかしいが4つ（まぎらわしい番号 `CONF` を1つ必ず入れる）。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。2段目は「この電話の先にいるのは？」（7つ）で、答えの番号で決まる（`GRP_OF`）。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「この電話の先にいるのは？」・復習（1→3→7日後）。記録 `nbn-v1`・文字 `nbn-fs`・復習 `nbn-depth`。
- 保存の読み直しは共通部品 `GameStore`（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。電話をかけるリンク（`tel:`）も置かない。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は震度よみ（shindo-yomi）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
