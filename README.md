# 株式会社東雲火山のホームページ

[![Netlify Status](https://api.netlify.com/api/v1/badges/1144d4c3-87db-4b83-a04f-2a2c8f5f3ef0/deploy-status)](https://app.netlify.com/sites/gracious-visvesvaraya-65ad09/deploys)

株式会社東雲火山のホームページを作るためのリポジトリです。

https://shinonomekazan.com でNetlifyでデプロイされています。

HTMLやCSSを長らく触っていなかったのでその勉強用として作っており、デザイナーさんに依頼するまでの捨てコードで構成されています。

VuePressかGatsbyを使うべき内容ですが、極力JavaScriptを使いたくなかったので使ってません。

## 使い方

- git clone -> npm iしてから、npm startでローカル実行。（ただし実行にはなぜかnode v10系以上が必要です）ブラウザで http://localhost:3000 にアクセスで確認。WSLだとCtrl + Cで停止。
- `template` や `sass` や `js` をいじって `npm run build` とかして使います
- 手元で作業したら、コミットする前に `npm run lint:fix` をかけて下さい
- Netlifyは自動デプロイです。この際`npm run deploy`を使って`dist`ディレクトリを対象にしています

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
- [Netlify](https://www.netlify.com/)
    - 最初[Firebase](https://firebase.google.com/)にしようと思いましたが・・
    - さすがにコーポレートサイトは違うのでは？と思い、Netlifyを使ってみました
- [Google Analytics](https://analytics.google.com/analytics/web/)とGoogle Tag Manager
    - GitHubに入れるコードに入れるべきか悩ましいところですが
    - 埋め込んだのはGTAのタグで、タグにAnalyticsを連動させて管理してます

## LICENSE

特に意味はありませんがMITです。

詳しくは[LICENSE](./LICENSE)をご参照ください。
