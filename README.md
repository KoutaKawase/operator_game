<h2 align="center">Akashic EngineとTypeScriptでゲームを作る為のボイラープレート</h2>

<p align="center">
  <a href="https://akashic-games.github.io/"><img src="https://avatars0.githubusercontent.com/u/16815486?s=200&v=4" width="80px"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://pbs.twimg.com/profile_images/1149708719178993664/3Hb8W4aX_400x400.png" width="80px" /></a>
</p>

## 説明

これは <a href="https://akashic-games.github.io">Akashic Engine</a>を使用し、TypeScript でゲームを作るためのボイラープレートです。
骨組みとして

```
akashic init -t typescript-shin-ichiba-ranking
```

で生成されるプロジェクトを流用しています。

この土台を元に使いやすいようリンターやフォーマッタを追加しています。tsconfig.json を弄ってるので自分好みにしてください。デフォルトはかなり Strict です。

また、コミット時に ESLint のチェックと prettier によるフォーマッタが走るようになっています。

リポジトリを git clone するだけで簡単に開発を始められます。

## なぜ公式のボイラープレートが存在するのにこれを作ったか

使用されるライブラリ群が古いのと jest を TypeScript で使えるようにしたかった為です。あとは自分用に次から楽できるように。

現在 TypeScript の最新バージョンが 3.9 なのに対し、公式ボイラープレートは 2.9.2 を使用しています。極めつけは TSLint で、これは TSLint 公式が deprecated を宣言しており、ESLint への移行を薦めています。つまり非推奨ということです。

jest に関しては、テストを TypeScript で書くために ts-jest を使いたいので入れました。

## 使い方

```
git clone https://github.com/KoutaKawase/akashic_boiler.git 任意のプロジェクト名
cd akashic_boiler(任意のプロジェクトを付けたならその名前。つけてないならakashic_boiler)
git remote rm origin
yarn install
yarn build
yarn start
👉 http://localhost:3000/game/
```

NodeJS のバージョンは 12.18.0 を使用しています。14 なの新し過ぎると動かないかもしれないので nvm などの Node version manager を使用してバージョンを下げてみることをオススメします。
yarn を使用していますが npm ユーザーの方はそちらを使用しても大丈夫です。

```
yarn fmt　//フォーマット
yarn lint //linterとtscの型検査
yarn lint:es //eslintのみ実行
yarn lint:type //tscで型チェックのみ
```

## 💩 LICENSE

MIT

以下元からある README 文です。

# typescript-game-sample

**typescript-game-sample**は TypeScript で Akashic のゲームを作る際のサンプルプロジェクトです。

## 利用方法

`typescript-game-sample` を利用するには Node.js が必要です。

初回のみ、以下のコマンドを実行して、ビルドに必要なパッケージをインストールしてください。
この作業は `typescript-game-sample` を新しく生成するごとに必要です。

```sh
npm install
```

### ビルド方法

`typescript-game-sample` は TypeScript で書かれているため、以下のコマンドで JavaScript ファイルに変換する必要があります。

```sh
npm run build
```

`src` ディレクトリ以下の TypeScript ファイルがコンパイルされ、`script` ディレクトリ以下に JavaScript ファイルが生成されます。

`npm run build` は自動的に `akashic scan asset script` を実行するので、`game.json` の更新が行われます。

### 動作確認方法

以下のどちらかを実行後、ブラウザで `http://localhost:3000/game/` にアクセスすることでゲームを実行できます。

- `npm start`

- `npm install -g @akashic/akashic-sandbox` 後、 `akashic-sandbox .`

### テンプレートの使い方

#### typescript

- `src/main.ts` を編集することでゲームの作成が可能です。
  - スプライトの表示、音を鳴らす、タッチイベント定義等が、最初からこのテンプレートで行われています。

#### typescript-minimal

- `src/main.ts` を編集することでゲームの作成が可能です。
- 基本的な使い方は typescript テンプレートと同じですが、このテンプレートでは最低限のものしか記述されていないため以下のことは行われていません。
  - スプライトの表示
  - 音を鳴らす
  - タッチイベント定義

#### typescript-shin-ichiba-ranking

- ゲーム部分を作成する場合は、 `src/main.ts` を編集してください。
  - 基本的に`src/_bootstrap.ts`を編集する必要はありません。
- 基本的な使い方は typescript テンプレートと同じですが、このテンプレートでは `src/main.ts` の `main` 関数の引数`param`に以下の値が新たに付与されています。
  - `param.sessionParameter`: [セッションパラメーター](https://akashic-games.github.io/guide/ranking.html#session-parameters)
  - `param.isAtsumaru`:コンテンツが動作している環境が RPG アツマール上かどうかを表す bool 値
- ランキングモードに対応したニコニコ新市場コンテンツの作り方の詳細については、[こちら](https://akashic-games.github.io/guide/ranking.html)を参照してください。

### アセットの更新方法

各種アセットを追加したい場合は、それぞれのアセットファイルを以下のディレクトリに格納します。

- 画像アセット: `image`
- スクリプトアセット: `script`
- テキストアセット: `text`
- オーディオアセット: `audio`

これらのアセットを追加・変更したあとに `npm run update` をすると、アセットの変更内容をもとに `game.json` を書き換えることができます。

### npm モジュールの追加・削除

`typescript-game-sample` で npm モジュールを利用する場合、このディレクトリで `akashic install <package_name>` することで npm モジュールを追加することができます。

また `akashic uninstall <package_name>` すると npm モジュールを削除することができます。

## エクスポート方法

`typescript-game-sample` をエクスポートするときは以下のコマンドを利用します。

### html ファイルのエクスポート

`npm run export-html` のコマンドを利用することで `game` ディレクトリにエクスポートすることができます。

`game/index.html` をブラウザで開くと単体動作させることができます。

### zip ファイルのエクスポート

`npm run export-zip` のコマンドを利用することで `game.zip` という名前の zip ファイルを出力できます。

## テスト方法

1. [TSLint](https://github.com/palantir/tslint 'TSLint')を使った Lint
2. [Jasmine](http://jasmine.github.io 'Jasmine')を使ったテスト

がそれぞれ実行されます。

```sh
npm test
```

テストコードのサンプルとして `spec/testSpec.js` を用意していますので参考にしてテストコードを記述して下さい。
