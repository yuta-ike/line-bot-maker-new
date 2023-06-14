「技育展 2022 チーム開発部門」にて最優秀賞をいただきました 🎉🎉🎉

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">🏆 <a href="https://twitter.com/hashtag/%E6%8A%80%E8%82%B2%E5%B1%95?src=hash&amp;ref_src=twsrc%5Etfw">#技育展</a> 2022 結果発表 🏆<br>【チーム開発】<br><br>最優秀賞🥇は・・・<br><br>👑 ふろちゃでぼっと 👑 <br><br>が受賞されました！<br>受賞作品には賞金20万円が贈呈されます。<br>🙌🙌🙌 おめでとうございます 🙌🙌🙌<a href="https://twitter.com/hashtag/%E3%82%AA%E3%83%B3%E3%82%A8%E3%82%A2%E4%B8%AD?src=hash&amp;ref_src=twsrc%5Etfw">#オンエア中</a><a href="https://twitter.com/hashtag/15%E6%99%82%E3%81%8B%E3%82%89%E6%9C%80%E5%84%AA%E7%A7%80%E8%B3%9E%E3%81%AE%E5%86%8D%E3%83%97%E3%83%AC%E3%82%BC%E3%83%B3?src=hash&amp;ref_src=twsrc%5Etfw">#15時から最優秀賞の再プレゼン</a> <a href="https://t.co/MK3dC5ewLp">pic.twitter.com/MK3dC5ewLp</a></p>&mdash; 【公式】技育プロジェクト (@geek_pjt) <a href="https://twitter.com/geek_pjt/status/1573178791505309698?ref_src=twsrc%5Etfw">September 23, 2022</a></blockquote>

# ふろちゃでぼっと

Front-end repository of "ふろちゃでぼっと" created by students in Kyoto University.

- [使ってみる](https://lbm.vercel.app/)
- [発表資料](https://docs.google.com/presentation/d/1ppaFRecLssDuJEaxndWJUHQG2cfsEdfi/edit#slide=id.p1)
- [バックエンドレポジトリ](https://github.com/xiaogeamadeus/linebot_backend2)

<video src="https://user-images.githubusercontent.com/38308823/191561558-c18b676f-7e45-47d8-a7a7-d9b90227e9d7.mp4"></video>

<details>
<summary>Gif (Old version)</summary>
<img src="https://user-images.githubusercontent.com/38308823/181484172-08841425-61c8-4214-8835-27a12ef3211c.gif"/>
</details>

## 技術スタック

React / TypeScript / Next.js / Tailwind.css / MUI / LIFF / LINE Login

## 開発

### 初回のみ

ライブラリインストール

```
npm install
```

環境変数の設定

```
.env.local.exampleを複製して、.env.localにリネーム
適切な値を設定
```

### 開発サーバの立ち上げ

- https の場合（LINE の認証を入れたので、https://localhost:3000 でしか動きません）

```
npm run dev:https
```

- http の場合（LINE の認証を一時的に外す必要があります）

```
npm run dev
```

### LIFF を利用する場合

https://zenn.dev/sotszk/articles/b4e6a4e19d2e35 を参照して、root に`/cert/localhost.key`と`/cert/localhost.crt`を生成する

開発サーバの立ち上げは、`npm run dev:https`を利用する
