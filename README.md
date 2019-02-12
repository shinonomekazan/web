# 株式会社東雲火山のホームページ

株式会社東雲火山のホームページを作るためのリポジトリです。

HTMLやCSSを長らく触っていなかったのでその勉強用として作っており、デザイナーさんに依頼するまでの捨てコードで構成されています。

VuePressかGatsbyを使うべき内容ですが、極力JavaScriptを使いたくなかったので使ってません。

## 使い方

- git clone -> npm iしてから、npm startでローカル実行
- `template` や `sass` や `js` をいじって `npm run build` とかして使います
- `gh-pages` で公開する場合、`cp` と `rm` と `git` が動くなら `npm run deploy` で楽をできます

## 使った技術

- [HTML5](https://www.w3.org/TR/html52/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria/)
    - あんまり知らなかったんでこれを機に調べ中
- [Bulma](https://bulma.io/)
    - フロントエンドを触らな過ぎてとっかかりが少ないのでとっかかり用
    - （とはいえ）とっかかりにはなりましたが、レイアウトもろくにないこのページにはあまり合いませんでした
- [node-sass](https://github.com/sass/node-sass)
    - フロントエンドを触らな過ぎて知らないのでおべんきょしたい（という気持ち）
- [handlebars](https://handlebarsjs.com/)
    - navigationとかを全部のファイルに書くのがだるくなってきたのでとりあえず
    - 最終的にはVuePressとかGatsbyとかに移行するとは思いますがそれ使っちゃうとこのリポジトリの意味がない
- デバッグ用に[node.jsのmjs](https://nodejs.org/api/esm.html)
    - ずっとTypeScript触ってきて認識がもやっているが今更requireもなぁ・・ということで

## LICENSE

特に意味はありませんがMITです。

詳しくは[LICENSE](./LICENSE)をご参照ください。
