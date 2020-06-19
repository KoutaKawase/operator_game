function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    g.aez_bundle_main = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }

          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }

        return n[i].exports;
      }

      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
        o(t[i]);
      }

      return o;
    }

    return r;
  }()({
    1: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * 文字列からルビをパースする。
       * このパーサは、akashic-labelのデフォルトルビ記法のためのパーサである。
       *
       * このパーサを使う場合、ラベルに与える文字列にJSONのオブジェクトを表す文字列を含むことができる。
       * 文字列中のオブジェクトはルビを表す要素として扱われる。
       * オブジェクトのメンバーには、ルビを表す `rt` と、本文を表す `rb` を含む必要がある。
       * これらのメンバー以外に、RubyOptions型が持つメンバーを含むことができる。
       *
       * 入力の例として、
       * 'これは{"rb":"本文","rt":"ルビ", "rubyFontSize": 2}です。'
       * という文字列が与えられた場合、このパーサは
       * ["これは", {rb:"本文", rt: "ルビ", rubyFontSize: 2}, "です。"]
       * という配列を返す。
       * また、 `{` や `}` は `\\` でエスケープする必要がある。
       * 例として、括弧は `\\{` 、 バックスラッシュは `\\` を用いて表現する。
       * 注意すべき点として、オブジェクトのプロパティ名はダブルクォートでくくられている必要がある。
       */

      function parse(text) {
        var pattern = /^((?:[^\\{]|\\+.)*?)({(?:[^\\}]|\\+.)*?})([\s\S]*)/; // ((?:[^\\{]|\\+.)*?) -> オブジェクトリテラルの直前まで
        // ({(?:[^\\}]|\\+.)*?}) -> 最前のオブジェクトリテラル
        // ([\s\S]*) -> オブジェクトリテラル以降の、改行を含む文字列

        var result = [];

        while (text.length > 0) {
          var parsedText = text.match(pattern);

          if (parsedText !== null) {
            var headStr = parsedText[1];
            var rubyStr = parsedText[2];
            text = parsedText[3];

            if (headStr.length > 0) {
              result.push(headStr.replace(/\\{/g, "{").replace(/\\}/g, "}"));
            }

            var parseResult = JSON.parse(rubyStr.replace(/\\/g, "\\\\"));

            if (parseResult.hasOwnProperty("rt") && parseResult.hasOwnProperty("rb")) {
              parseResult.rt = parseResult.rt.replace(/\\{/g, "{").replace(/\\}/g, "}");
              parseResult.rb = parseResult.rb.replace(/\\{/g, "{").replace(/\\}/g, "}");
              parseResult.text = rubyStr;
              result.push(parseResult);
            } else {
              throw g.ExceptionFactory.createTypeMismatchError("parse", "RubyFragment");
            }
          } else {
            result.push(text.replace(/\\{/g, "{").replace(/\\}/g, "}"));
            break;
          }
        }

        return result;
      }

      exports.parse = parse;
    }, {}],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      /**
       * 行に含まれる文字列要素。
       */

      var StringDrawInfo =
      /** @class */
      function () {
        function StringDrawInfo(text, width, glyphs) {
          this.text = text;
          this.width = width;
          this.glyphs = glyphs;
        }

        return StringDrawInfo;
      }();

      exports.StringDrawInfo = StringDrawInfo;
      /**
       * 行に含まれるルビ要素。
       */

      var RubyFragmentDrawInfo =
      /** @class */
      function () {
        function RubyFragmentDrawInfo(fragment, width, rbWidth, rtWidth, glyphs, rubyGlyphs) {
          this.text = fragment.text;
          this.fragment = fragment;
          this.width = width;
          this.rbWidth = rbWidth;
          this.rtWidth = rtWidth;
          this.glyphs = glyphs;
          this.rubyGlyphs = rubyGlyphs;
        }

        return RubyFragmentDrawInfo;
      }();

      exports.RubyFragmentDrawInfo = RubyFragmentDrawInfo;
    }, {}],
    3: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return function (d, b) {
          extendStatics(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      var rp = require("./RubyParser");

      var fr = require("./FragmentDrawInfo");

      var dr = require("./DefaultRubyParser");
      /**
       * 複数行のテキストを描画するエンティティ。
       * 文字列内の"\r\n"、"\n"、"\r"を区切りとして改行を行う。
       * また、自動改行が有効な場合はエンティティの幅に合わせて改行を行う。
       * 本クラスの利用にはg.Fontが必要となる。
       */


      var Label =
      /** @class */
      function (_super) {
        __extends(Label, _super);
        /**
         * 各種パラメータを指定して `Label` のインスタンスを生成する。
         * @param param このエンティティに対するパラメータ
         */


        function Label(param) {
          var _this = _super.call(this, param) || this;

          _this.text = param.text;
          _this.font = param.font;
          _this.fontSize = param.fontSize;
          _this._lineBreakWidth = param.width;
          _this.lineBreak = "lineBreak" in param ? param.lineBreak : true;
          _this.lineGap = param.lineGap || 0;
          _this.textAlign = "textAlign" in param ? param.textAlign : g.TextAlign.Left;
          _this.textColor = param.textColor;
          _this.trimMarginTop = "trimMarginTop" in param ? param.trimMarginTop : false;
          _this.widthAutoAdjust = "widthAutoAdjust" in param ? param.widthAutoAdjust : false;
          _this.rubyEnabled = "rubyEnabled" in param ? param.rubyEnabled : true;
          _this.fixLineGap = "fixLineGap" in param ? param.fixLineGap : false;
          _this.rubyParser = "rubyParser" in param ? param.rubyParser : dr.parse;
          _this.lineBreakRule = "lineBreakRule" in param ? param.lineBreakRule : undefined;

          if (!param.rubyOptions) {
            param.rubyOptions = {};
          }

          _this.rubyOptions = param.rubyOptions;
          _this.rubyOptions.rubyFontSize = "rubyFontSize" in param.rubyOptions ? param.rubyOptions.rubyFontSize : param.fontSize / 2;
          _this.rubyOptions.rubyFont = "rubyFont" in param.rubyOptions ? param.rubyOptions.rubyFont : _this.font;
          _this.rubyOptions.rubyGap = "rubyGap" in param.rubyOptions ? param.rubyOptions.rubyGap : 0;
          _this.rubyOptions.rubyAlign = "rubyAlign" in param.rubyOptions ? param.rubyOptions.rubyAlign : rp.RubyAlign.SpaceAround;
          _this._lines = [];
          _this._beforeText = undefined;
          _this._beforeTextAlign = undefined;
          _this._beforeFontSize = undefined;
          _this._beforeLineBreak = undefined;
          _this._beforeFont = undefined;
          _this._beforeWidth = undefined;
          _this._beforeRubyEnabled = undefined;
          _this._beforeFixLineGap = undefined;
          _this._beforeTrimMarginTop = undefined;
          _this._beforeWidthAutoAdjust = undefined;
          _this._beforeRubyOptions = {};

          _this._invalidateSelf();

          return _this;
        }
        /**
         * このエンティティの描画キャッシュ無効化をエンジンに通知する。
         * このメソッドを呼び出し後、描画キャッシュの再構築が行われ、各 `g.Renderer` に描画内容の変更が反映される。
         */


        Label.prototype.invalidate = function () {
          this._invalidateSelf();

          _super.prototype.invalidate.call(this);
        };

        Label.prototype.renderCache = function (renderer) {
          if (!this.rubyEnabled && this.fontSize === 0) return;
          renderer.save();
          var currentLineHeight = 0;

          for (var i = 0; i < this._lines.length; ++i) {
            if (this._lines[i].width > 0 && this._lines[i].height > 0) {
              renderer.drawImage(this._lines[i].surface, 0, 0, this._lines[i].width, this._lines[i].height, this._offsetX(this._lines[i].width), currentLineHeight);
            }

            currentLineHeight += this._lines[i].height + this.lineGap;
          }

          if (this.textColor) {
            renderer.setCompositeOperation(g.CompositeOperation.SourceAtop);
            renderer.fillRect(0, 0, this._lineBreakWidth, this.height, this.textColor);
          }

          renderer.restore();
        };
        /**
         * 利用している `g.Surface` を破棄した上で、このエンティティを破棄する。
         * 利用している `g.Font` の破棄は行わないため、 `g.Font` の破棄はコンテンツ製作者が明示的に行う必要がある。
         */


        Label.prototype.destroy = function () {
          this._destroyLines();

          _super.prototype.destroy.call(this);
        };
        /**
         * 禁則処理によって行幅が this.width を超える場合があるため、 `g.CacheableE` のメソッドをオーバーライドする
         */


        Label.prototype.calculateCacheSize = function () {
          // TODO: 最大値の候補に this.width を使用するのは textAlign が g.Center か g.Right の場合に描画に必要なキャッシュサイズを確保するためであり、
          // 最大行幅に対して this.width が大きい場合、余分なキャッシュ領域を確保することになる。
          // これは g.CacheableE にキャッシュ描画位置を調整する cacheOffsetX を導入することで解決される。
          var maxWidth = Math.ceil(this._lines.reduce(function (width, line) {
            return Math.max(width, line.width);
          }, this.width));
          return {
            width: maxWidth,
            height: this.height
          };
        };

        Object.defineProperty(Label.prototype, "lineCount", {
          /**
           * 描画内容の行数を返す
           */
          get: function get() {
            return this._lines.length;
          },
          enumerable: true,
          configurable: true
        });

        Label.prototype._offsetX = function (width) {
          switch (this.textAlign) {
            case g.TextAlign.Left:
              return 0;

            case g.TextAlign.Right:
              return this._lineBreakWidth - width;

            case g.TextAlign.Center:
              return (this._lineBreakWidth - width) / 2;

            default:
              return 0;
          }
        };

        Label.prototype._destroyLines = function () {
          for (var i = 0; i < this._lines.length; i++) {
            if (this._lines[i].surface && !this._lines[i].surface.destroyed()) {
              this._lines[i].surface.destroy();
            }
          }

          this._lines = undefined;
        };

        Label.prototype._invalidateSelf = function () {
          if (this.fontSize < 0) throw g.ExceptionFactory.createAssertionError("Label#_invalidateSelf: fontSize must not be negative.");
          if (this.lineGap < -1 * this.fontSize) throw g.ExceptionFactory.createAssertionError("Label#_invalidateSelf: lineGap must be greater than -1 * fontSize."); // this.width がユーザから変更された場合、this._lineBreakWidth は this.width に追従する。

          if (this._beforeWidth !== this.width) this._lineBreakWidth = this.width;

          if (this._beforeText !== this.text || this._beforeFontSize !== this.fontSize || this._beforeFont !== this.font || this._beforeLineBreak !== this.lineBreak || this._beforeWidth !== this.width && this._beforeLineBreak === true || this._beforeTextAlign !== this.textAlign || this._beforeRubyEnabled !== this.rubyEnabled || this._beforeFixLineGap !== this.fixLineGap || this._beforeTrimMarginTop !== this.trimMarginTop || this._beforeWidthAutoAdjust !== this.widthAutoAdjust || this._isDifferentRubyOptions(this._beforeRubyOptions, this.rubyOptions)) {
            this._updateLines();
          }

          if (this.widthAutoAdjust) {
            // this.widthAutoAdjust が真の場合、 this.width は描画幅に応じてトリミングされる。
            this.width = Math.ceil(this._lines.reduce(function (width, line) {
              return Math.max(width, line.width);
            }, 0));
          }

          var height = this.lineGap * (this._lines.length - 1);

          for (var i = 0; i < this._lines.length; i++) {
            height += this._lines[i].height;
          }

          this.height = height;
          this._beforeText = this.text;
          this._beforeTextAlign = this.textAlign;
          this._beforeFontSize = this.fontSize;
          this._beforeLineBreak = this.lineBreak;
          this._beforeFont = this.font;
          this._beforeWidth = this.width;
          this._beforeRubyEnabled = this.rubyEnabled;
          this._beforeFixLineGap = this.fixLineGap;
          this._beforeTrimMarginTop = this.trimMarginTop;
          this._beforeWidthAutoAdjust = this.widthAutoAdjust;
          this._beforeRubyOptions.rubyFontSize = this.rubyOptions.rubyFontSize;
          this._beforeRubyOptions.rubyFont = this.rubyOptions.rubyFont;
          this._beforeRubyOptions.rubyGap = this.rubyOptions.rubyGap;
          this._beforeRubyOptions.rubyAlign = this.rubyOptions.rubyAlign;
        };

        Label.prototype._updateLines = function () {
          // ユーザのパーサを適用した後にも揃えるが、渡す前に改行記号を replace して統一する
          var fragments = this.rubyEnabled ? this.rubyParser(this.text.replace(/\r\n|\n/g, "\r")) : [this.text]; // Fragment のうち文字列のものを一文字ずつに分解する

          fragments = rp.flatmap(fragments, function (f) {
            if (typeof f !== "string") return f; // サロゲートペア文字を正しく分割する

            return f.replace(/\r\n|\n/g, "\r").match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
          });

          var undrawnLineInfos = this._divideToLines(fragments);

          var lines = [];
          var hasNotChanged = this._beforeFontSize === this.fontSize && this._beforeFont === this.font && !this._isDifferentRubyOptions(this._beforeRubyOptions, this.rubyOptions);

          for (var i = 0; i < undrawnLineInfos.length; i++) {
            var undrawnLineInfo = undrawnLineInfos[i];
            var line = this._lines[i];

            if (hasNotChanged && line !== undefined && undrawnLineInfo.sourceText === line.sourceText && undrawnLineInfo.width === line.width && undrawnLineInfo.height === line.height) {
              lines.push(line);
            } else {
              if (line && line.surface && !line.surface.destroyed()) {
                line.surface.destroy();
              }

              this._drawLineInfoSurface(undrawnLineInfo);

              lines.push(undrawnLineInfo);
            }
          } // 行数が減った場合、使われない行のSurfaceをdestroyする。


          for (var i = lines.length; i < this._lines.length; i++) {
            var line = this._lines[i];

            if (line.surface && !line.surface.destroyed()) {
              line.surface.destroy();
            }
          }

          this._lines = lines;
        };

        Label.prototype._drawLineInfoSurface = function (lineInfo) {
          var lineDrawInfo = lineInfo.fragmentDrawInfoArray;

          var rhi = this._calcRubyHeightInfo(lineDrawInfo);

          var lineSurface = this.scene.game.resourceFactory.createSurface(Math.ceil(lineInfo.width), Math.ceil(lineInfo.height));
          var lineRenderer = lineSurface.renderer();
          lineRenderer.begin();
          lineRenderer.save();
          var rbOffsetY = rhi.hasRubyFragmentDrawInfo || this.fixLineGap ? this.rubyOptions.rubyGap + rhi.maxRubyGlyphHeightWithOffsetY : 0;
          var minMinusOffsetY = lineInfo.minMinusOffsetY;

          for (var i = 0; i < lineDrawInfo.length; i++) {
            var drawInfo = lineDrawInfo[i];

            if (drawInfo instanceof fr.RubyFragmentDrawInfo) {
              this._drawRubyFragmentDrawInfo(lineRenderer, drawInfo, rbOffsetY - minMinusOffsetY, -rhi.minRubyMinusOffsetY);
            } else if (drawInfo instanceof fr.StringDrawInfo) {
              this._drawStringGlyphs(lineRenderer, this.font, drawInfo.glyphs, this.fontSize, 0, rbOffsetY - minMinusOffsetY, 0);
            }

            lineRenderer.translate(drawInfo.width, 0);
          }

          lineRenderer.restore();
          lineRenderer.end();
          lineInfo.surface = lineSurface;
        }; // 文字列の等幅描画


        Label.prototype._drawStringGlyphs = function (renderer, font, glyphs, fontSize, offsetX, offsetY, margin) {
          if (margin === void 0) {
            margin = 0;
          }

          renderer.save();
          renderer.translate(offsetX, offsetY);

          for (var i = 0; i < glyphs.length; i++) {
            var glyph = glyphs[i];
            var glyphScale = fontSize / font.size;
            var glyphWidth = glyph.advanceWidth * glyphScale;

            if (!glyph.isSurfaceValid) {
              glyph = this._createGlyph(glyph.code, font);
              if (!glyph) continue;
            }

            renderer.save();
            renderer.transform([glyphScale, 0, 0, glyphScale, 0, 0]);

            if (glyph.width > 0 && glyph.height > 0) {
              renderer.drawImage(glyph.surface, glyph.x, glyph.y, glyph.width, glyph.height, glyph.offsetX, glyph.offsetY);
            }

            renderer.restore();
            renderer.translate(glyphWidth + margin, 0);
          }

          renderer.restore();
        }; // ルビベースとルビテキストの描画


        Label.prototype._drawRubyFragmentDrawInfo = function (renderer, rubyDrawInfo, rbOffsetY, rtOffsetY) {
          var f = rubyDrawInfo.fragment;
          var rubyFontSize = "rubyFontSize" in f ? f.rubyFontSize : this.rubyOptions.rubyFontSize;
          var rubyAlign = "rubyAlign" in f ? f.rubyAlign : this.rubyOptions.rubyAlign;
          var rubyFont = "rubyFont" in f ? f.rubyFont : this.rubyOptions.rubyFont;
          var isRtWideThanRb = rubyDrawInfo.rtWidth > rubyDrawInfo.rbWidth;
          var width = rubyDrawInfo.width;
          var rtWidth = rubyDrawInfo.rtWidth;
          var rbWidth = rubyDrawInfo.rbWidth;
          var rtStartPositionX;
          var rbStartPositionX;
          var rtUnitMargin;
          var rbUnitMargin;

          switch (rubyAlign) {
            case rp.RubyAlign.Center:
              rtUnitMargin = 0;
              rbUnitMargin = 0;
              rtStartPositionX = isRtWideThanRb ? 0 : (width - rtWidth) / 2;
              rbStartPositionX = isRtWideThanRb ? (width - rbWidth) / 2 : 0;
              break;

            case rp.RubyAlign.SpaceAround:
              rtUnitMargin = rubyDrawInfo.rubyGlyphs.length > 0 ? (width - rtWidth) / rubyDrawInfo.rubyGlyphs.length : 0;
              rbUnitMargin = 0;
              rtStartPositionX = isRtWideThanRb ? 0 : rtUnitMargin / 2;
              rbStartPositionX = isRtWideThanRb ? (width - rbWidth) / 2 : 0;
              break;

            default:
              throw g.ExceptionFactory.createAssertionError("Label#_drawRubyFragmentDrawInfo: unknown rubyAlign.");
          }

          this._drawStringGlyphs(renderer, this.font, rubyDrawInfo.glyphs, this.fontSize, rbStartPositionX, rbOffsetY, rbUnitMargin);

          this._drawStringGlyphs(renderer, rubyFont, rubyDrawInfo.rubyGlyphs, rubyFontSize, rtStartPositionX, rtOffsetY, rtUnitMargin);
        };

        Label.prototype._calcRubyHeightInfo = function (drawInfoArray) {
          var maxRubyFontSize = this.rubyOptions.rubyFontSize;
          var maxRubyGlyphHeightWithOffsetY = 0;
          var maxRubyGap = this.rubyOptions.rubyGap;
          var hasRubyFragmentDrawInfo = false;
          var maxRealDrawHeight = 0;
          var realOffsetY;

          for (var i = 0; i < drawInfoArray.length; i++) {
            var ri = drawInfoArray[i];

            if (ri instanceof fr.RubyFragmentDrawInfo) {
              var f = ri.fragment;

              if (f.rubyFontSize > maxRubyFontSize) {
                maxRubyFontSize = f.rubyFontSize;
              }

              if (f.rubyGap > maxRubyGap) {
                maxRubyGap = f.rubyGap;
              }

              var rubyGlyphScale = (f.rubyFontSize ? f.rubyFontSize : this.rubyOptions.rubyFontSize) / (f.rubyFont ? f.rubyFont.size : this.rubyOptions.rubyFont.size);
              var currentMaxRubyGlyphHeightWithOffsetY = Math.max.apply(Math, ri.rubyGlyphs.map(function (glyph) {
                return glyph.offsetY > 0 ? glyph.height + glyph.offsetY : glyph.height;
              }));
              var currentMinRubyOffsetY = Math.min.apply(Math, ri.rubyGlyphs.map(function (glyph) {
                return glyph.offsetY > 0 ? glyph.offsetY : 0;
              }));

              if (maxRubyGlyphHeightWithOffsetY < currentMaxRubyGlyphHeightWithOffsetY * rubyGlyphScale) {
                maxRubyGlyphHeightWithOffsetY = currentMaxRubyGlyphHeightWithOffsetY * rubyGlyphScale;
              }

              var rubyFont = f.rubyFont ? f.rubyFont : this.rubyOptions.rubyFont;

              var currentRubyStandardOffsetY = this._calcStandardOffsetY(rubyFont);

              var currentFragmentRealDrawHeight = (currentMaxRubyGlyphHeightWithOffsetY - Math.min(currentMinRubyOffsetY, currentRubyStandardOffsetY)) * rubyGlyphScale;

              if (maxRealDrawHeight < currentFragmentRealDrawHeight) {
                maxRealDrawHeight = currentFragmentRealDrawHeight; // その行で描画されるルビのうち、もっとも実描画高さが高い文字が持つoffsetYを求める

                realOffsetY = Math.min(currentMinRubyOffsetY, currentRubyStandardOffsetY) * rubyGlyphScale;
              }

              hasRubyFragmentDrawInfo = true;
            }
          } // ルビが無い行でもfixLineGapが真の場合ルビの高さを使う


          if (maxRubyGlyphHeightWithOffsetY === 0) {
            maxRubyGlyphHeightWithOffsetY = this.rubyOptions.rubyFontSize;
          }

          var minRubyMinusOffsetY = this.trimMarginTop ? realOffsetY : 0;
          return {
            maxRubyFontSize: maxRubyFontSize,
            maxRubyGlyphHeightWithOffsetY: maxRubyGlyphHeightWithOffsetY,
            minRubyMinusOffsetY: minRubyMinusOffsetY,
            maxRubyGap: maxRubyGap,
            hasRubyFragmentDrawInfo: hasRubyFragmentDrawInfo
          };
        };

        Label.prototype._divideToLines = function (fragmentArray) {
          var state = {
            resultLines: [],
            currentStringDrawInfo: new fr.StringDrawInfo("", 0, []),
            currentLineInfo: {
              sourceText: "",
              fragmentDrawInfoArray: [],
              width: 0,
              height: 0,
              minMinusOffsetY: 0,
              surface: undefined
            },
            reservedLineBreakPosition: null
          };

          for (var i = 0; i < fragmentArray.length; i++) {
            this._addFragmentToState(state, fragmentArray, i);
          }

          this._flushCurrentStringDrawInfo(state);

          this._feedLine(state); // 行末ではないが、状態をflushするため改行処理を呼ぶ


          return state.resultLines;
        };

        Label.prototype._addFragmentToState = function (state, fragments, index) {
          var fragment = fragments[index];

          if (state.reservedLineBreakPosition !== null) {
            state.reservedLineBreakPosition--;
          }

          if (state.reservedLineBreakPosition === 0) {
            this._flushCurrentStringDrawInfo(state);

            this._feedLine(state);

            state.reservedLineBreakPosition = null;
          }

          if (typeof fragment === "string" && fragment === "\r") {
            /*
            // 行末に改行記号が来た場合、禁則処理によって改行すべきかは判断を保留し、一旦禁則処理による改行はしないことにする
            if (this._needFixLineBreakByRule(state)) {
                this._applyLineBreakRule(index, state);
            }
            */
            this._flushCurrentStringDrawInfo(state);

            this._feedLine(state);
          } else if (typeof fragment === "string") {
            var code = g.Util.charCodeAt(fragment, 0);
            if (!code) return;

            var glyph = this._createGlyph(code, this.font);

            if (!glyph) return;
            var glyphScale = this.fontSize / this.font.size;
            var glyphWidth = glyph.advanceWidth * glyphScale;

            if (this._needBreakLine(state, glyphWidth)) {
              this._breakLine(state, fragments, index);
            }

            state.currentStringDrawInfo.width += glyphWidth;
            state.currentStringDrawInfo.glyphs.push(glyph);
            state.currentStringDrawInfo.text += fragment;
          } else {
            var ri = this._createRubyFragmentDrawInfo(fragment);

            if (ri.width <= 0) return;

            this._flushCurrentStringDrawInfo(state);

            if (this._needBreakLine(state, ri.width)) {
              this._breakLine(state, fragments, index);
            }

            state.currentLineInfo.width += ri.width;
            state.currentLineInfo.fragmentDrawInfoArray.push(ri);
            state.currentLineInfo.sourceText += fragment.text;
          }
        };

        Label.prototype._createStringGlyph = function (text, font) {
          var glyphs = [];

          for (var i = 0; i < text.length; i++) {
            var code = g.Util.charCodeAt(text, i);
            if (!code) continue;

            var glyph = this._createGlyph(code, font);

            if (!glyph) continue;
            glyphs.push(glyph);
          }

          return glyphs;
        };

        Label.prototype._createGlyph = function (code, font) {
          var glyph = font.glyphForCharacter(code);

          if (!glyph) {
            var str = code & 0xFFFF0000 ? String.fromCharCode((code & 0xFFFF0000) >>> 16, code & 0xFFFF) : String.fromCharCode(code);
            this.game().logger.warn("Label#_invalidateSelf(): failed to get a glyph for '" + str + "' " + "(BitmapFont might not have the glyph or DynamicFont might create a glyph larger than its atlas).");
          }

          return glyph;
        };

        Label.prototype._createRubyFragmentDrawInfo = function (fragment) {
          var glyphs = this._createStringGlyph(fragment.rb, this.font);

          var rubyGlyphs = this._createStringGlyph(fragment.rt, this.rubyOptions.rubyFont);

          var rubyFont = "rubyFont" in fragment ? fragment.rubyFont : this.rubyOptions.rubyFont;
          var rubyFontSize = "rubyFontSize" in fragment ? fragment.rubyFontSize : this.rubyOptions.rubyFontSize;
          var glyphScale = this.fontSize / this.font.size;
          var rubyGlyphScale = rubyFontSize / rubyFont.size;
          var rbWidth = glyphs.length > 0 ? glyphs.map(function (glyph) {
            return glyph.advanceWidth;
          }).reduce(function (pre, cu) {
            return pre + cu;
          }) * glyphScale : 0;
          var rtWidth = rubyGlyphs.length > 0 ? rubyGlyphs.map(function (glyph) {
            return glyph.advanceWidth;
          }).reduce(function (pre, cu) {
            return pre + cu;
          }) * rubyGlyphScale : 0;
          var width = rbWidth > rtWidth ? rbWidth : rtWidth;
          return new fr.RubyFragmentDrawInfo(fragment, width, rbWidth, rtWidth, glyphs, rubyGlyphs);
        };

        Label.prototype._flushCurrentStringDrawInfo = function (state) {
          if (state.currentStringDrawInfo.width > 0) {
            state.currentLineInfo.fragmentDrawInfoArray.push(state.currentStringDrawInfo);
            state.currentLineInfo.width += state.currentStringDrawInfo.width;
            state.currentLineInfo.sourceText += state.currentStringDrawInfo.text;
          }

          state.currentStringDrawInfo = new fr.StringDrawInfo("", 0, []);
        };

        Label.prototype._feedLine = function (state) {
          var glyphScale = this.fontSize / this.font.size;
          var minOffsetY = Infinity;
          var minMinusOffsetY = 0;
          var maxGlyphHeightWithOffsetY = 0;
          state.currentLineInfo.fragmentDrawInfoArray.forEach(function (fragmentDrawInfo) {
            fragmentDrawInfo.glyphs.forEach(function (glyph) {
              if (minMinusOffsetY > glyph.offsetY) {
                minMinusOffsetY = glyph.offsetY;
              } // offsetYの一番小さな値を探す


              if (minOffsetY > glyph.offsetY) minOffsetY = glyph.offsetY;
              var heightWithOffsetY = glyph.offsetY > 0 ? glyph.height + glyph.offsetY : glyph.height;

              if (maxGlyphHeightWithOffsetY < heightWithOffsetY) {
                maxGlyphHeightWithOffsetY = heightWithOffsetY;
              }
            });
          });
          minMinusOffsetY = minMinusOffsetY * glyphScale;
          maxGlyphHeightWithOffsetY = state.currentLineInfo.fragmentDrawInfoArray.length > 0 ? maxGlyphHeightWithOffsetY * glyphScale - minMinusOffsetY : this.fontSize;
          maxGlyphHeightWithOffsetY = Math.ceil(maxGlyphHeightWithOffsetY);

          var rhi = this._calcRubyHeightInfo(state.currentLineInfo.fragmentDrawInfoArray);

          state.currentLineInfo.height = rhi.hasRubyFragmentDrawInfo || this.fixLineGap ? maxGlyphHeightWithOffsetY + rhi.maxRubyGlyphHeightWithOffsetY + rhi.maxRubyGap : maxGlyphHeightWithOffsetY;
          state.currentLineInfo.minMinusOffsetY = minMinusOffsetY;

          if (this.trimMarginTop) {
            var minOffsetYInRange = Math.min(minOffsetY, this._calcStandardOffsetY(this.font)) * glyphScale;
            state.currentLineInfo.height -= minOffsetYInRange;
            state.currentLineInfo.minMinusOffsetY += minOffsetYInRange;
          }

          state.resultLines.push(state.currentLineInfo);
          state.currentLineInfo = {
            sourceText: "",
            fragmentDrawInfoArray: [],
            width: 0,
            height: 0,
            minMinusOffsetY: 0,
            surface: undefined
          };
        };

        Label.prototype._needBreakLine = function (state, width) {
          return this.lineBreak && width > 0 && state.reservedLineBreakPosition === null && state.currentLineInfo.width + state.currentStringDrawInfo.width + width > this._lineBreakWidth && state.currentLineInfo.width + state.currentStringDrawInfo.width > 0; // 行頭文字の場合は改行しない
        };

        Label.prototype._isDifferentRubyOptions = function (ro0, ro1) {
          return ro0.rubyFontSize !== ro1.rubyFontSize || ro0.rubyFont !== ro1.rubyFont || ro0.rubyGap !== ro1.rubyGap || ro0.rubyAlign !== ro1.rubyAlign;
        };

        Label.prototype._calcStandardOffsetY = function (font) {
          // 標準的な高さを持つグリフとして `M` を利用するが明確な根拠は無い
          var text = "M";
          var glyphM = font.glyphForCharacter(text.charCodeAt(0));
          return glyphM.offsetY;
        };
        /** stateのcurrent系プロパティを禁則処理的に正しい構造に再構築する */


        Label.prototype._breakLine = function (state, fragments, index) {
          if (!this.lineBreakRule) {
            this._flushCurrentStringDrawInfo(state);

            this._feedLine(state);

            return;
          }

          var correctLineBreakPosition = this.lineBreakRule(fragments, index); // 外部ルールが期待する改行位置

          var diff = correctLineBreakPosition - index;

          if (diff === 0) {
            this._flushCurrentStringDrawInfo(state);

            this._feedLine(state);
          } else if (diff > 0) {
            // 先送り改行
            state.reservedLineBreakPosition = diff;
          } else {
            // 巻き戻し改行
            this._flushCurrentStringDrawInfo(state);

            var droppedFragmentDrawInfoArray = []; // currentLineInfoのfragmentDrawInfoArrayを巻き戻す

            while (diff < 0) {
              var fragmentDrawInfoArray = state.currentLineInfo.fragmentDrawInfoArray;
              var lastDrawInfo = fragmentDrawInfoArray[fragmentDrawInfoArray.length - 1];

              if (lastDrawInfo instanceof fr.RubyFragmentDrawInfo) {
                diff++;
                droppedFragmentDrawInfoArray.push(lastDrawInfo);
                fragmentDrawInfoArray.pop();
              } else {
                if (-diff >= lastDrawInfo.text.length) {
                  diff += lastDrawInfo.text.length;
                  droppedFragmentDrawInfoArray.push(lastDrawInfo);
                  fragmentDrawInfoArray.pop();
                } else {
                  var droppedGlyphs = lastDrawInfo.glyphs.splice(diff);
                  var glyphScale = this.fontSize / this.font.size;
                  var droppedDrawInfoWidth = droppedGlyphs.reduce(function (acc, glyph) {
                    return glyph.advanceWidth * glyphScale + acc;
                  }, 0);
                  lastDrawInfo.width -= droppedDrawInfoWidth;
                  var droppedDrawInfoText = lastDrawInfo.text.substring(lastDrawInfo.text.length + diff);
                  lastDrawInfo.text = lastDrawInfo.text.substring(0, lastDrawInfo.text.length + diff);
                  droppedFragmentDrawInfoArray.push(new fr.StringDrawInfo(droppedDrawInfoText, droppedDrawInfoWidth, droppedGlyphs));
                  diff = 0;
                }
              }
            } // currentLineInfoのその他を更新する


            var droppedWidth = 0;
            var droppedSourceText = "";
            droppedFragmentDrawInfoArray.forEach(function (fragment) {
              droppedWidth += fragment.width;
              droppedSourceText += fragment.text;
            });
            state.currentLineInfo.width -= droppedWidth;
            var sourceText = state.currentLineInfo.sourceText;
            state.currentLineInfo.sourceText = sourceText.substr(0, sourceText.length - droppedSourceText.length);

            this._feedLine(state);

            state.currentLineInfo.fragmentDrawInfoArray = droppedFragmentDrawInfoArray;
            state.currentLineInfo.width = droppedWidth;
            state.currentLineInfo.sourceText = droppedSourceText;
          }
        };

        return Label;
      }(g.CacheableE);

      module.exports = Label;
    }, {
      "./DefaultRubyParser": 1,
      "./FragmentDrawInfo": 2,
      "./RubyParser": 4
    }],
    4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var RubyAlign;

      (function (RubyAlign) {
        /**
         * rtの字間は固定で中央に揃える。
         */
        RubyAlign[RubyAlign["Center"] = 0] = "Center";
        /**
         * rb幅に合わせてrtの字間を揃える。
         */

        RubyAlign[RubyAlign["SpaceAround"] = 1] = "SpaceAround";
      })(RubyAlign = exports.RubyAlign || (exports.RubyAlign = {}));

      function flatmap(arr, func) {
        return Array.prototype.concat.apply([], arr.map(func));
      }

      exports.flatmap = flatmap;
    }, {}],
    5: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Label = require("./Label");
      exports.FragmentDrawInfo = require("./FragmentDrawInfo");
      exports.RubyParser = require("./RubyParser");
      exports.RubyAlign = exports.RubyParser.RubyAlign; // tslintが誤動作するので一時的に無効化する

      /* tslint:disable: no-unused-variable */

      var DRP = require("./DefaultRubyParser");

      exports.defaultRubyParser = DRP.parse;
      /* tslint:enable: no-unused-variable */
    }, {
      "./DefaultRubyParser": 1,
      "./FragmentDrawInfo": 2,
      "./Label": 3,
      "./RubyParser": 4
    }],
    6: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Answer = void 0;

      var entityUtil_1 = require("./utils/entityUtil");

      var Answer =
      /** @class */
      function () {
        function Answer(scene, problem) {
          //連続正解カウント
          this.continuousCount = 0; //連続正解時付与される追加ポイント

          this._bonus = 0;
          this.scene = scene;
          this.currectAnswerCountLabel = {
            left: this.createLeftLabel(),
            right: this.createRightLabel()
          };
          this.problem = problem;
          this.currectCount = 0;
          this.bonusText = this.createBonusTextLabel();
          this.bonusPoint = this.createBonusPointLabel();
        }

        Answer.prototype.show = function () {
          this.scene.append(this.currectAnswerCountLabel.left);
          this.scene.append(this.currectAnswerCountLabel.right);
          this.scene.append(this.bonusText);
          this.scene.append(this.bonusPoint);
        };

        Answer.prototype.count = function () {
          this.currectCount += 1;
          var count = this.currectCount.toString();
          this.currectAnswerCountLabel.right.text = count + '回';
          this.currectAnswerCountLabel.right.invalidate();
        };

        Answer.prototype.bonusCount = function () {
          this.continuousCount += 1; //連続正解二回目からボーナス付与させたいので

          if (this.continuousCount > 1) {
            //ボーナス計算に使うため
            var FIXED_BONUS = 50;
            this._bonus = FIXED_BONUS * this.continuousCount;

            var bonus = this._bonus.toString();

            this.bonusPoint.text = '+' + bonus;
            this.bonusPoint.invalidate();
          }
        };

        Answer.prototype.resetBonus = function () {
          this.continuousCount = 0;
          this.bonusPoint.text = '+0';
          this.bonusPoint.invalidate();
        };

        Object.defineProperty(Answer.prototype, "bonus", {
          get: function get() {
            return this._bonus;
          },
          enumerable: false,
          configurable: true
        });
        /**
         * ユーザーが選んだ答えと問題の答え合わせをする
         * @param operator ユーザーの選んだ演算子
         * @return {boolean} 正解したかどうかの真偽値
         */

        Answer.prototype.submit = function (operator) {
          var isCorrect = this.problem.compareWith(operator);
          return isCorrect;
        };

        Answer.prototype.createRightLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(this.scene, 'answer');
          var rightLabel = new g.Label({
            scene: scene,
            text: '0回',
            font: font,
            x: 570,
            y: 100,
            fontSize: font.size
          });
          return rightLabel;
        };

        Answer.prototype.createLeftLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(this.scene, 'answer');
          var leftLabel = new g.Label({
            scene: scene,
            text: '正解数',
            font: font,
            x: 390,
            y: 100,
            fontSize: font.size
          });
          return leftLabel;
        };

        Answer.prototype.createBonusTextLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(scene, 'bonus');
          var bonusText = new g.Label({
            scene: scene,
            text: '連続正解ボーナス付与',
            font: font,
            x: 390,
            y: 135,
            fontSize: font.size
          });
          return bonusText;
        };

        Answer.prototype.createBonusPointLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(scene, 'bonus');
          var bonusPoint = new g.Label({
            scene: scene,
            text: '+0',
            font: font,
            x: 500,
            y: 165,
            fontSize: font.size
          });
          return bonusPoint;
        };

        return Answer;
      }();

      exports.Answer = Answer;
    }, {
      "./utils/entityUtil": 27
    }],
    7: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.gameAsset = exports.descriptionAsset = exports.titleAssets = void 0;
      exports.titleAssets = ['titleImage', 'tokimakure', 'tokimakure_glyphs', 'zzz', 'titleBgm', 'koukoku'];
      exports.descriptionAsset = ['descBack', 'description', 'description_glyphs'];
      exports.gameAsset = ['countdown', 'gameUI', 'time_num', 'time_num_glyphs', 'score', 'score_glyphs', 'score_num', 'score_num_glyphs', 'answer', 'answer_glyphs', 'plus', 'minus', 'cross', 'div', 'problem', 'problem_glyphs', 'currect', 'fail', 'bonus', 'bonus_glyphs', 'finish', 'comment', 'comment_glyphs'];
    }, {}],
    8: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Choice = void 0;

      var operatos_1 = require("./operatos");

      var Choice =
      /** @class */
      function () {
        function Choice(scene, answer, score, problem, fc) {
          this.scene = scene;
          var operatorInfo = {
            scene: this.scene,
            answer: answer,
            score: score,
            problem: problem,
            fc: fc
          };
          var plus = new operatos_1.Plus(operatorInfo);
          var minus = new operatos_1.Minus(operatorInfo);
          var cross = new operatos_1.Cross(operatorInfo);
          var div = new operatos_1.Div(operatorInfo);
          this.operators = [plus, minus, cross, div];
        }

        Choice.prototype.show = function () {
          var _this = this;

          this.operators.forEach(function (o) {
            _this.scene.append(o);
          });
        };

        Choice.prototype.initHandler = function () {
          this.operators.forEach(function (o) {
            o.initHandler();
          });
        };

        Choice.prototype.blockTouch = function () {
          this.operators.forEach(function (o) {
            o.touchable = false;
          });
        };

        return Choice;
      }();

      exports.Choice = Choice;
    }, {
      "./operatos": 26
    }],
    9: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics = function extendStatics(d, b) {
          _extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics(d, b);
        };

        return function (d, b) {
          _extendStatics(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.DescriptionSubScene = void 0;

      var SubScene_1 = require("./SubScene");

      var akashic_label_1 = require("@akashic-extension/akashic-label");

      var DescriptionSubScene =
      /** @class */
      function (_super) {
        __extends(DescriptionSubScene, _super);

        function DescriptionSubScene(sceneInfo) {
          return _super.call(this, sceneInfo) || this;
        }

        DescriptionSubScene.prototype.loadedHandler = function () {
          var _this = this;

          this.update.add(this.updateHandler);
          var background = new g.FilledRect({
            scene: this,
            width: g.game.width,
            height: g.game.height,
            cssColor: '#000000',
            opacity: 0.8
          });
          this.append(background);
          var descBack = new g.Sprite({
            scene: this,
            src: this.assets['descBack'],
            y: 50,
            x: 170
          });
          this.append(descBack);
          var descFont = this.assets['description'];
          var descGlyph = this.assets['description_glyphs'];
          var glyphData = JSON.parse(descGlyph.data);
          var font = new g.BitmapFont({
            src: descFont,
            map: glyphData.map,
            defaultGlyphWidth: glyphData.width,
            defaultGlyphHeight: glyphData.height,
            missingGlyph: glyphData.missingGlyph
          });
          var desc = new akashic_label_1.Label({
            scene: this,
            text: '右辺の答えに合うような\r演算子を選ぼう！',
            font: font,
            fontSize: font.size,
            y: 120,
            lineGap: 10,
            width: g.game.width,
            textAlign: g.TextAlign.Center
          });
          this.append(desc);
          this.setTimeout(function () {
            _this.goNext();
          }, DescriptionSubScene.DISPLAY_TIME);
        };

        DescriptionSubScene.prototype.updateHandler = function () {
          _super.prototype.commonUpdateHandler.call(this);
        };

        DescriptionSubScene.DISPLAY_TIME = 3000;
        return DescriptionSubScene;
      }(SubScene_1.SubScene);

      exports.DescriptionSubScene = DescriptionSubScene;
    }, {
      "./SubScene": 15,
      "@akashic-extension/akashic-label": 5
    }],
    10: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics2 = function extendStatics(d, b) {
          _extendStatics2 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics2(d, b);
        };

        return function (d, b) {
          _extendStatics2(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FoxComment = void 0;

      var entityUtil_1 = require("./utils/entityUtil");

      var akashic_label_1 = require("@akashic-extension/akashic-label");

      var FoxComment =
      /** @class */
      function (_super) {
        __extends(FoxComment, _super);

        function FoxComment(scene) {
          var _this = this;

          var font = entityUtil_1.getFont(scene, 'comment');
          _this = _super.call(this, {
            scene: scene,
            text: '',
            font: font,
            fontSize: font.size,
            x: FoxComment.x,
            y: FoxComment.y,
            width: g.game.width
          }) || this;
          return _this;
        }

        FoxComment.prototype.flashCurrect = function (scene) {
          var _this = this;

          var comment = this.getComment('currect');
          this.text = comment;
          this.x = this.adjustPoint(comment);
          this.invalidate();
          scene.append(this);
          scene.setTimeout(function () {
            //ヌッの時X座標が変更されてるので戻しておく
            _this.x = FoxComment.x;

            _this.invalidate();

            scene.remove(_this);
          }, FoxComment.REMOVE_TIME);
        };

        FoxComment.prototype.flashFail = function (scene) {
          var _this = this;

          var comment = this.getComment('fail');
          this.text = comment;
          this.x = this.adjustPoint(comment);
          this.invalidate();
          scene.append(this);
          scene.setTimeout(function () {
            scene.remove(_this);
          }, FoxComment.REMOVE_TIME);
        };

        FoxComment.prototype.getComment = function (state) {
          var commentState = state === 'currect' ? state : 'fail';
          var random = g.game.random.generate();
          var comments = FoxComment.comments[commentState];
          var comment = comments[Math.floor(random * comments.length)];
          return comment;
        }; //出てきたセリフに合わせて調整されたx座標を出力する


        FoxComment.prototype.adjustPoint = function (comment) {
          switch (comment) {
            case 'ヌッ':
              return this.x + 30;

            default:
              return this.x;
          }
        };

        FoxComment.x = 400;
        FoxComment.y = 230;
        FoxComment.comments = {
          currect: ['やりますねえ！', 'ヌッ'],
          fail: ['頭に来ますよ', 'あっおい待てィ\r(江戸っ子)']
        };
        FoxComment.REMOVE_TIME = 500;
        return FoxComment;
      }(akashic_label_1.Label);

      exports.FoxComment = FoxComment;
    }, {
      "./utils/entityUtil": 27,
      "@akashic-extension/akashic-label": 5
    }],
    11: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics3 = function extendStatics(d, b) {
          _extendStatics3 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics3(d, b);
        };

        return function (d, b) {
          _extendStatics3(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
          });
        }

        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }

          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }

          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }

          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };

      var __generator = this && this.__generator || function (thisArg, body) {
        var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
            f,
            y,
            t,
            g;
        return g = {
          next: verb(0),
          "throw": verb(1),
          "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
          return this;
        }), g;

        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }

        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");

          while (_) {
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];

              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;

                case 4:
                  _.label++;
                  return {
                    value: op[1],
                    done: false
                  };

                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;

                case 7:
                  op = _.ops.pop();

                  _.trys.pop();

                  continue;

                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }

                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }

                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }

                  if (t && _.label < t[2]) {
                    _.label = t[2];

                    _.ops.push(op);

                    break;
                  }

                  if (t[2]) _.ops.pop();

                  _.trys.pop();

                  continue;
              }

              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          }

          if (op[0] & 5) throw op[1];
          return {
            value: op[0] ? op[1] : void 0,
            done: true
          };
        }
      };

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.GameSubScene = void 0;

      var SubScene_1 = require("./SubScene");

      var entityUtil_1 = require("./utils/entityUtil");

      var Time_1 = require("./Time");

      var Score_1 = require("./Score");

      var Answer_1 = require("./Answer");

      var Choice_1 = require("./Choice");

      var Problem_1 = require("./Problem");

      var FoxComment_1 = require("./FoxComment");

      var GameSubScene =
      /** @class */
      function (_super) {
        __extends(GameSubScene, _super);

        function GameSubScene(sceneInfo) {
          var _this = _super.call(this, sceneInfo) || this;

          _this.isInGame = false;
          _this.gameTime = null;
          _this.score = null;
          _this.answer = null;
          _this.choice = null;
          _this.problem = null;
          return _this;
        }

        GameSubScene.prototype.runReadySound = function (shadow) {
          var _this = this;

          this.assets['countdown'].play(); //play()だけだとすぐ次の処理にいってしまうのでサウンド分待って次にいくためsetTimeoutをしている

          return new Promise(function (resolve) {
            _this.setTimeout(function () {
              _this.isInGame = true;

              _this.remove(shadow);

              resolve();
            }, GameSubScene.COUNTDOWN_TIME);
          });
        };

        GameSubScene.prototype.loadedHandler = function () {
          return __awaiter(this, void 0, void 0, function () {
            var gameUIBase, shadow, foxComment;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  gameUIBase = entityUtil_1.createGameUIBase(this);
                  shadow = entityUtil_1.createShadow(this);
                  this.append(gameUIBase);
                  this.problem = new Problem_1.Problem(this);
                  this.problem.show();
                  this.gameTime = new Time_1.Time(this);
                  this.gameTime.show();
                  this.answer = new Answer_1.Answer(this, this.problem);
                  this.answer.show();
                  this.score = new Score_1.Score(this, this.answer);
                  this.score.show();
                  foxComment = new FoxComment_1.FoxComment(this);
                  this.choice = new Choice_1.Choice(this, this.answer, this.score, this.problem, foxComment);
                  this.choice.show();
                  this.append(shadow);
                  this.update.add(_super.prototype.commonUpdateHandler, this);
                  this.update.add(this.updateHandler, this);
                  return [4
                  /*yield*/
                  , this.runReadySound(shadow)];

                case 1:
                  _a.sent();

                  this.choice.initHandler();
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        };

        GameSubScene.prototype.updateHandler = function () {
          var _a, _b, _c, _d, _e;

          if (this.isInGame && !((_a = this.gameTime) === null || _a === void 0 ? void 0 : _a.isFinished())) {
            (_b = this.gameTime) === null || _b === void 0 ? void 0 : _b.count();
            (_c = this.gameTime) === null || _c === void 0 ? void 0 : _c.update();
          }

          if ((_d = this.gameTime) === null || _d === void 0 ? void 0 : _d.isFinished()) {
            this.assets['finish'].play();
            (_e = this.choice) === null || _e === void 0 ? void 0 : _e.blockTouch();
            this.update.remove(this.updateHandler, this);
          }
        }; //カウントダウン音声のおおよその長さ この長さ分待ってからゲームを開始


        GameSubScene.COUNTDOWN_TIME = 4500;
        return GameSubScene;
      }(SubScene_1.SubScene);

      exports.GameSubScene = GameSubScene;
    }, {
      "./Answer": 6,
      "./Choice": 8,
      "./FoxComment": 10,
      "./Problem": 13,
      "./Score": 14,
      "./SubScene": 15,
      "./Time": 16,
      "./utils/entityUtil": 27
    }],
    12: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.MainSceneController = void 0;

      var gameUtil_1 = require("./utils/gameUtil");

      var AssetInfos_1 = require("./AssetInfos");

      var TitleSubScene_1 = require("./TitleSubScene");

      var DescriptionSubScene_1 = require("./DescriptionSubScene");

      var GameSubScene_1 = require("./GameSubScene");

      var MainSceneController =
      /** @class */
      function () {
        function MainSceneController() {}

        MainSceneController.createMainScene = function (game, param) {
          var controller = new this();
          return controller.createScene(game, param);
        };

        MainSceneController.prototype.createScene = function (game, param) {
          var _this = this;

          gameUtil_1.initGameState(param);
          var scene = new g.Scene({
            game: game
          });
          scene.loaded.add(function () {
            _this.onLoaded(scene);
          });
          return scene;
        };

        MainSceneController.prototype.onLoaded = function (scene) {
          scene.update.add(this.onUpdate);
          var titleSubScene = new TitleSubScene_1.TitleSubScene({
            game: g.game,
            assetIds: AssetInfos_1.titleAssets
          });
          var descriptionSubScene = new DescriptionSubScene_1.DescriptionSubScene({
            game: g.game,
            assetIds: AssetInfos_1.descriptionAsset
          });
          var gameSubScene = new GameSubScene_1.GameSubScene({
            game: g.game,
            assetIds: AssetInfos_1.gameAsset
          });
          titleSubScene.init(descriptionSubScene);
          descriptionSubScene.init(gameSubScene);
          gameSubScene.init();
          g.game.pushScene(titleSubScene);
        };

        MainSceneController.prototype.onUpdate = function () {
          g.game.vars.gameState.totalTimeLimit -= 1 / g.game.fps;
        };

        return MainSceneController;
      }();

      exports.MainSceneController = MainSceneController;
    }, {
      "./AssetInfos": 7,
      "./DescriptionSubScene": 9,
      "./GameSubScene": 11,
      "./TitleSubScene": 17,
      "./utils/gameUtil": 28
    }],
    13: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Problem = void 0;

      var entityUtil_1 = require("./utils/entityUtil");

      function isCalculatedNegative(left, right) {
        return Math.sign(left - right) === -1;
      }

      function isCalculatedInteger(left, right) {
        return Number.isInteger(left / right);
      }

      function getRandomOperator() {
        var operators = ['+', '-', '*', '/'];
        var random = g.game.random;
        return operators[Math.floor(random.generate() * operators.length)];
      }

      function getRandomIndex(max) {
        return Math.floor(g.game.random.generate() * max);
      } //答えの演算子が複数存在するような組み合わせを検査する
      //example) 2 + 2 と 2 * 2のような組み合わせ
      //全ての演算子のパターンを計算し格納し計算結果が他と重複していれば
      //それは答えの演算子が複数あるとして弾く


      function isOperatorDuplicate(left, right) {
        var calculateds = [left + right, left - right, left * right, left / right];
        return new Set(calculateds).size !== calculateds.length;
      }

      var Problem =
      /** @class */
      function () {
        function Problem(scene) {
          this.validCombinations = this.createValidCombinations();
          this.currentProblem = this.pickProblemRandomly();
          this.scene = scene;
          this.problemLabel = this.createProblemLabel();
        }

        Problem.prototype.show = function () {
          this.scene.append(this.problemLabel);
        };

        Problem.prototype.compareWith = function (operator) {
          return this.currentProblem.operator === operator;
        };

        Problem.prototype.remove = function () {
          this.scene.remove(this.problemLabel);
        };

        Problem.prototype.reflesh = function () {
          this.scene.remove(this.problemLabel);
          this.currentProblem = this.pickProblemRandomly();
          this.problemLabel = this.createProblemLabel();
          this.show();
        };

        Problem.prototype.pickProblemRandomly = function () {
          var operator = getRandomOperator();
          var index = getRandomIndex(this.validCombinations[operator].length);
          return this.validCombinations[operator][index];
        };

        Problem.prototype.createProblemLabel = function () {
          var scene = this.scene;
          var group = new g.E({
            scene: scene,
            x: 30,
            y: 110
          });

          var _a = this.stringifyProblem(),
              leftText = _a.leftText,
              rightText = _a.rightText,
              equalText = _a.equalText,
              calculatedText = _a.calculatedText;

          var _b = entityUtil_1.getProblemPoint(),
              leftX = _b.leftX,
              leftY = _b.leftY,
              rightX = _b.rightX,
              rightY = _b.rightY,
              equalX = _b.equalX,
              equalY = _b.equalY,
              calculatedX = _b.calculatedX,
              calculatedY = _b.calculatedY;

          var font = entityUtil_1.getFont(scene, 'problem');
          var left = entityUtil_1.getProblemLabel(scene, font, leftText, leftX, leftY);
          group.append(left);
          var right = entityUtil_1.getProblemLabel(scene, font, rightText, rightX, rightY);
          group.append(right);
          var equal = entityUtil_1.getProblemLabel(scene, font, equalText, equalX, equalY);
          group.append(equal);
          var calculated = entityUtil_1.getProblemLabel(scene, font, calculatedText, calculatedX, calculatedY);
          group.append(calculated);
          return group;
        };

        Problem.prototype.stringifyProblem = function () {
          var leftText = this.currentProblem.left.toString();
          var rightText = this.currentProblem.right.toString();
          var equalText = '=';
          var calculatedText = this.currentProblem.calculated.toString();
          return {
            leftText: leftText,
            rightText: rightText,
            equalText: equalText,
            calculatedText: calculatedText
          };
        };

        Problem.prototype.createValidCombinations = function () {
          var combinatonList = {
            '+': [],
            '-': [],
            '*': [],
            '/': []
          };

          for (var left = 1; left < 20; left++) {
            for (var right = 1; right < 20; right++) {
              if (!isOperatorDuplicate(left, right)) {
                combinatonList = this.storeCombinations(left, right, combinatonList);
              }
            }
          }

          return combinatonList;
        };

        Problem.prototype.storeCombinations = function (left, right, list) {
          list['+'].push({
            left: left,
            operator: '+',
            right: right,
            calculated: left + right
          });

          if (!isCalculatedNegative(left, right)) {
            list['-'].push({
              left: left,
              operator: '-',
              right: right,
              calculated: left - right
            });
          }

          list['*'].push({
            left: left,
            operator: '*',
            right: right,
            calculated: left * right
          });

          if (isCalculatedInteger(left, right)) {
            list['/'].push({
              left: left,
              operator: '/',
              right: right,
              calculated: left / right
            });
          }

          return list;
        };

        return Problem;
      }();

      exports.Problem = Problem;
    }, {
      "./utils/entityUtil": 27
    }],
    14: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Score = void 0;

      var entityUtil_1 = require("./utils/entityUtil");

      var Score =
      /** @class */
      function () {
        function Score(scene, answer) {
          this.scene = scene;
          this.scoreLabel = {
            left: this.createScoreLeftLabel(),
            right: this.createScoreRightLabel()
          };
          this.point = 0;
          this.answer = answer;
        }

        Score.prototype.show = function () {
          this.scene.append(this.scoreLabel.left);
          this.scene.append(this.scoreLabel.right);
        };

        Score.prototype.count = function () {
          var bonus = this.answer.bonus;
          this.point += Score.FIXED_POINT + bonus;
          g.game.vars.gameState.score = this.point;
          this.updateRightLabel(540);
        };

        Score.prototype.deduct = function () {
          if (this.point === 0) return;
          var deductPoint = 200;
          this.point -= deductPoint;
          g.game.vars.gameState.score = this.point;
          this.updateRightLabel();
        };

        Score.prototype.updateRightLabel = function (x) {
          var pointStr = this.point.toString();

          if (x != null) {
            this.scoreLabel.right.x = x;
          }

          this.scoreLabel.right.text = pointStr;
          this.scoreLabel.right.invalidate();
        };

        Score.prototype.createScoreRightLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(this.scene, 'score_num');
          var rightLabel = new g.Label({
            scene: scene,
            text: '0',
            font: font,
            x: 600,
            y: 70,
            fontSize: font.size
          });
          return rightLabel;
        };

        Score.prototype.createScoreLeftLabel = function () {
          var scene = this.scene;
          var font = entityUtil_1.getFont(this.scene, 'score');
          var leftLabel = new g.Label({
            scene: scene,
            text: 'SCORE:',
            font: font,
            x: 390,
            y: 70,
            fontSize: font.size
          });
          return leftLabel;
        };

        Score.FIXED_POINT = 300;
        return Score;
      }();

      exports.Score = Score;
    }, {
      "./utils/entityUtil": 27
    }],
    15: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics4 = function extendStatics(d, b) {
          _extendStatics4 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics4(d, b);
        };

        return function (d, b) {
          _extendStatics4(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SubScene = void 0;

      var SubScene =
      /** @class */
      function (_super) {
        __extends(SubScene, _super);

        function SubScene(sceneInfo) {
          var _this = _super.call(this, sceneInfo) || this;

          _this.requestedNestSubScene = new g.Trigger();
          return _this;
        }

        SubScene.prototype.init = function (nextSubScene) {
          var _this = this;

          this.loaded.add(function () {
            _this.setNextSubScene(nextSubScene);

            _this.loadedHandler();
          });
        };

        SubScene.prototype.goNext = function () {
          this.requestedNestSubScene.fire();
        };

        SubScene.prototype.setNextSubScene = function (nextSubScene) {
          var _this = this;

          this.requestedNestSubScene.add(function () {
            _this.destroy();

            if (!nextSubScene) {
              return;
            }

            g.game.pushScene(nextSubScene);
          });
        };

        SubScene.prototype.commonUpdateHandler = function () {
          var time = g.game.vars.gameState.totalTimeLimit;
          var _a = g.game.vars.gameState,
              isAtsumaru = _a.isAtsumaru,
              score = _a.score;

          if (Math.trunc(time) <= 0) {
            if (isAtsumaru) {
              var boardId_1 = 1;
              window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId_1, score).then(function () {
                window.RPGAtsumaru.experimental.scoreboards.display(boardId_1);
              });
            }

            console.log('end');
            this.update.remove(this.commonUpdateHandler, this);
          }

          g.game.vars.gameState.totalTimeLimit -= 1 / g.game.fps;
        };

        return SubScene;
      }(g.Scene);

      exports.SubScene = SubScene;
    }, {}],
    16: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Time = void 0;

      var Time =
      /** @class */
      function () {
        function Time(scene) {
          //プレイするゲームそのものの制限時間
          this.gameTime = 70;
          this.scene = scene;
          this.timeLabel = this.createTimeLabel();
        }

        Time.prototype.show = function () {
          this.scene.append(this.timeLabel);
        };

        Time.prototype.count = function () {
          this.gameTime -= 1 / g.game.fps;
        };

        Time.prototype.update = function () {
          this.timeLabel.text = Math.trunc(this.gameTime).toString();
          this.timeLabel.invalidate();
        };

        Time.prototype.now = function () {
          return this.gameTime;
        };

        Time.prototype.isFinished = function () {
          return this.gameTime <= 0;
        };

        Time.prototype.createTimeLabel = function () {
          var scene = this.scene;
          var timeFont = scene.assets['time_num'];
          var timeGlyph = scene.assets['time_num_glyphs'];
          var glyphData = JSON.parse(timeGlyph.data);
          var font = new g.BitmapFont({
            src: timeFont,
            map: glyphData.map,
            defaultGlyphWidth: glyphData.width,
            defaultGlyphHeight: glyphData.height,
            missingGlyph: glyphData.missingGlyph
          });
          var timeLabel = new g.Label({
            scene: scene,
            text: this.gameTime.toString(),
            font: font,
            x: 450,
            y: 32,
            fontSize: font.size
          });
          return timeLabel;
        };

        return Time;
      }();

      exports.Time = Time;
    }, {}],
    17: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics5 = function extendStatics(d, b) {
          _extendStatics5 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics5(d, b);
        };

        return function (d, b) {
          _extendStatics5(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.TitleSubScene = void 0;

      var SubScene_1 = require("./SubScene");

      var TitleSubScene =
      /** @class */
      function (_super) {
        __extends(TitleSubScene, _super);

        function TitleSubScene(sceneInfo) {
          return _super.call(this, sceneInfo) || this;
        }

        TitleSubScene.prototype.loadedHandler = function () {
          var _this = this;

          this.assets['titleBgm'].play();
          this.update.add(this.updateHandler);
          var background = new g.FilledRect({
            scene: this,
            width: g.game.width,
            height: g.game.height,
            opacity: 0.2,
            cssColor: '#FFCC66'
          });
          this.append(background);
          var fox = new g.Sprite({
            scene: this,
            src: this.assets['titleImage'],
            x: g.game.width - 150,
            y: g.game.height - 150
          });
          this.append(fox);
          var ad = new g.Sprite({
            scene: this,
            src: this.assets['koukoku'],
            y: 165,
            x: -10
          });
          this.append(ad);
          var zzz = new g.FrameSprite({
            scene: this,
            src: this.assets['zzz'],
            width: 100,
            height: 100,
            srcWidth: 100,
            srcHeight: 100,
            frames: [0, 1, 2],
            x: g.game.width - 83,
            y: g.game.height - 230,
            interval: 1000
          });
          this.append(zzz);
          zzz.start();
          var tokimakureFont = this.assets['tokimakure'];
          var tokimakureGlyph = this.assets['tokimakure_glyphs'];
          var glyphData = JSON.parse(tokimakureGlyph.data);
          var font = new g.BitmapFont({
            src: tokimakureFont,
            map: glyphData.map,
            defaultGlyphWidth: glyphData.width,
            defaultGlyphHeight: glyphData.height,
            missingGlyph: glyphData.missingGlyph
          });
          var titleTop = new g.Label({
            scene: this,
            text: '解きまくれ！',
            fontSize: font.size,
            font: font,
            y: 35
          });
          var titleBottom = new g.Label({
            scene: this,
            text: 'エキノコックスくん！',
            fontSize: font.size,
            font: font,
            y: titleTop.y * 2 + 10
          });
          titleTop.x = (g.game.width - titleTop.width) / 2;
          titleBottom.x = (g.game.width - titleBottom.width) / 2;
          titleTop.modified();
          titleBottom.modified();
          this.append(titleTop);
          this.append(titleBottom);
          this.setTimeout(function () {
            _this.assets['titleBgm'].stop();

            _this.goNext();
          }, TitleSubScene.DISPLAY_TIME);
        };

        TitleSubScene.prototype.updateHandler = function () {
          _super.prototype.commonUpdateHandler.call(this);
        };

        TitleSubScene.DISPLAY_TIME = 7000;
        return TitleSubScene;
      }(SubScene_1.SubScene);

      exports.TitleSubScene = TitleSubScene;
    }, {
      "./SubScene": 15
    }],
    18: [function (require, module, exports) {
      "use strict";

      var main_1 = require("./main");

      module.exports = function (originalParam) {
        var param = {};
        Object.keys(originalParam).forEach(function (key) {
          param[key] = originalParam[key];
        }); // セッションパラメーター

        param.sessionParameter = {}; // コンテンツが動作している環境がRPGアツマール上かどうか

        param.isAtsumaru = typeof window !== "undefined" && typeof window.RPGAtsumaru !== "undefined"; // 乱数生成器

        param.random = g.game.random;
        var limitTickToWait = 3; // セッションパラメーターが来るまでに待つtick数

        var scene = new g.Scene({
          game: g.game
        }); // セッションパラメーターを受け取ってゲームを開始します

        scene.message.add(function (msg) {
          if (msg.data && msg.data.type === "start" && msg.data.parameters) {
            param.sessionParameter = msg.data.parameters; // sessionParameterフィールドを追加

            if (msg.data.parameters.randomSeed != null) {
              param.random = new g.XorshiftRandomGenerator(msg.data.parameters.randomSeed);
            }

            g.game.popScene();
            main_1.main(param);
          }
        });
        scene.loaded.add(function () {
          var currentTickCount = 0;
          scene.update.add(function () {
            currentTickCount++; // 待ち時間を超えた場合はゲームを開始します

            if (currentTickCount > limitTickToWait) {
              g.game.popScene();
              main_1.main(param);
            }
          });
        });
        g.game.pushScene(scene);
      };
    }, {
      "./main": 19
    }],
    19: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.main = void 0;

      var MainSceneController_1 = require("./MainSceneController");

      function main(param) {
        g.game.pushScene(MainSceneController_1.MainSceneController.createMainScene(g.game, param));
      }

      exports.main = main;
    }, {
      "./MainSceneController": 12
    }],
    20: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FIXED_Y = exports.MARGIN_RIGHT = exports.OPERATOR_WIDTH = void 0;
      exports.OPERATOR_WIDTH = 80;
      exports.MARGIN_RIGHT = 24;
      exports.FIXED_Y = 278;
    }, {}],
    21: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics6 = function extendStatics(d, b) {
          _extendStatics6 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics6(d, b);
        };

        return function (d, b) {
          _extendStatics6(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Cross = void 0;

      var Constants_1 = require("./Constants");

      var OperatorSprite_1 = require("./OperatorSprite");

      var Cross =
      /** @class */
      function (_super) {
        __extends(Cross, _super);

        function Cross(_a) {
          var scene = _a.scene,
              answer = _a.answer,
              score = _a.score,
              problem = _a.problem,
              fc = _a.fc;

          var _this = _super.call(this, {
            scene: scene,
            src: scene.assets['cross'],
            x: Constants_1.OPERATOR_WIDTH * 2 + Constants_1.MARGIN_RIGHT,
            y: Constants_1.FIXED_Y,
            touchable: true
          }, answer, score, problem, fc) || this;

          _this.operator = '*';
          return _this;
        }

        return Cross;
      }(OperatorSprite_1.OperatorSprite);

      exports.Cross = Cross;
    }, {
      "./Constants": 20,
      "./OperatorSprite": 24
    }],
    22: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics7 = function extendStatics(d, b) {
          _extendStatics7 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics7(d, b);
        };

        return function (d, b) {
          _extendStatics7(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Div = void 0;

      var Constants_1 = require("./Constants");

      var OperatorSprite_1 = require("./OperatorSprite");

      var Div =
      /** @class */
      function (_super) {
        __extends(Div, _super);

        function Div(_a) {
          var scene = _a.scene,
              answer = _a.answer,
              score = _a.score,
              problem = _a.problem,
              fc = _a.fc;

          var _this = _super.call(this, {
            scene: scene,
            src: scene.assets['div'],
            x: Constants_1.OPERATOR_WIDTH * 3 + Constants_1.MARGIN_RIGHT,
            y: Constants_1.FIXED_Y,
            touchable: true
          }, answer, score, problem, fc) || this;

          _this.operator = '/';
          return _this;
        }

        return Div;
      }(OperatorSprite_1.OperatorSprite);

      exports.Div = Div;
    }, {
      "./Constants": 20,
      "./OperatorSprite": 24
    }],
    23: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics8 = function extendStatics(d, b) {
          _extendStatics8 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics8(d, b);
        };

        return function (d, b) {
          _extendStatics8(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Minus = void 0;

      var Constants_1 = require("./Constants");

      var OperatorSprite_1 = require("./OperatorSprite");

      var Minus =
      /** @class */
      function (_super) {
        __extends(Minus, _super);

        function Minus(_a) {
          var scene = _a.scene,
              answer = _a.answer,
              score = _a.score,
              problem = _a.problem,
              fc = _a.fc;

          var _this = _super.call(this, {
            scene: scene,
            src: scene.assets['minus'],
            x: Constants_1.OPERATOR_WIDTH + Constants_1.MARGIN_RIGHT,
            y: Constants_1.FIXED_Y,
            touchable: true
          }, answer, score, problem, fc) || this;

          _this.operator = '-';
          return _this;
        }

        return Minus;
      }(OperatorSprite_1.OperatorSprite);

      exports.Minus = Minus;
    }, {
      "./Constants": 20,
      "./OperatorSprite": 24
    }],
    24: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics9 = function extendStatics(d, b) {
          _extendStatics9 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics9(d, b);
        };

        return function (d, b) {
          _extendStatics9(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.OperatorSprite = void 0;

      var OperatorSprite =
      /** @class */
      function (_super) {
        __extends(OperatorSprite, _super);

        function OperatorSprite(spriteInfo, answer, score, problem, fc) {
          var _this = _super.call(this, spriteInfo) || this;

          _this.answer = answer;
          _this.currect = spriteInfo.scene.assets['currect'];
          _this.fail = spriteInfo.scene.assets['fail'];
          _this.score = score;
          _this.problem = problem;
          _this.foxComment = fc;
          return _this;
        }

        OperatorSprite.prototype.initHandler = function () {
          var _this = this;

          this.pointDown.add(function () {
            _this.pointDownHandler();
          });
        };

        OperatorSprite.prototype.pointDownHandler = function () {
          var isCorrect = this.answer.submit(this.operator);

          if (isCorrect) {
            this.currect.play();
            this.foxComment.flashCurrect(this.scene);
            this.answer.count();
            this.answer.bonusCount();
            this.score.count();
            this.problem.reflesh();
          } else {
            this.fail.play();
            this.foxComment.flashFail(this.scene);
            this.answer.resetBonus();
            this.score.deduct();
            this.problem.reflesh();
          }
        };

        return OperatorSprite;
      }(g.Sprite);

      exports.OperatorSprite = OperatorSprite;
    }, {}],
    25: [function (require, module, exports) {
      "use strict";

      var __extends = this && this.__extends || function () {
        var _extendStatics10 = function extendStatics(d, b) {
          _extendStatics10 = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) {
              if (b.hasOwnProperty(p)) d[p] = b[p];
            }
          };

          return _extendStatics10(d, b);
        };

        return function (d, b) {
          _extendStatics10(d, b);

          function __() {
            this.constructor = d;
          }

          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.Plus = void 0;

      var Constants_1 = require("./Constants");

      var OperatorSprite_1 = require("./OperatorSprite");

      var Plus =
      /** @class */
      function (_super) {
        __extends(Plus, _super);

        function Plus(_a) {
          var scene = _a.scene,
              answer = _a.answer,
              score = _a.score,
              problem = _a.problem,
              fc = _a.fc;

          var _this = _super.call(this, {
            scene: scene,
            src: scene.assets['plus'],
            x: Constants_1.MARGIN_RIGHT,
            y: Constants_1.FIXED_Y,
            touchable: true
          }, answer, score, problem, fc) || this;

          _this.operator = '+';
          return _this;
        }

        return Plus;
      }(OperatorSprite_1.OperatorSprite);

      exports.Plus = Plus;
    }, {
      "./Constants": 20,
      "./OperatorSprite": 24
    }],
    26: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var Plus_1 = require("./Plus");

      Object.defineProperty(exports, "Plus", {
        enumerable: true,
        get: function get() {
          return Plus_1.Plus;
        }
      });

      var Minus_1 = require("./Minus");

      Object.defineProperty(exports, "Minus", {
        enumerable: true,
        get: function get() {
          return Minus_1.Minus;
        }
      });

      var Cross_1 = require("./Cross");

      Object.defineProperty(exports, "Cross", {
        enumerable: true,
        get: function get() {
          return Cross_1.Cross;
        }
      });

      var Div_1 = require("./Div");

      Object.defineProperty(exports, "Div", {
        enumerable: true,
        get: function get() {
          return Div_1.Div;
        }
      });
    }, {
      "./Cross": 21,
      "./Div": 22,
      "./Minus": 23,
      "./Plus": 25
    }],
    27: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getFont = exports.createShadow = exports.getProblemPoint = exports.getProblemLabel = exports.createTimeLabel = exports.createGameUIBase = void 0;

      function createGameUIBase(scene) {
        return new g.Sprite({
          scene: scene,
          src: scene.assets['gameUI']
        });
      }

      exports.createGameUIBase = createGameUIBase;

      function createTimeLabel(scene) {
        var timeFont = scene.assets['time_num'];
        var timeGlyph = scene.assets['time_num_glyphs'];
        var glyphData = JSON.parse(timeGlyph.data);
        var font = new g.BitmapFont({
          src: timeFont,
          map: glyphData.map,
          defaultGlyphWidth: glyphData.width,
          defaultGlyphHeight: glyphData.height,
          missingGlyph: glyphData.missingGlyph
        });
        var timeLabel = new g.Label({
          scene: scene,
          text: '120',
          font: font,
          x: 450,
          y: 32,
          fontSize: font.size
        });
        return timeLabel;
      }

      exports.createTimeLabel = createTimeLabel;

      function getProblemLabel(scene, font, text, x, y) {
        var label = new g.Label({
          scene: scene,
          text: text,
          font: font,
          x: x,
          y: y,
          fontSize: font.size
        });
        return label;
      }

      exports.getProblemLabel = getProblemLabel;

      function getProblemPoint() {
        var BASE_Y = 0;
        var leftX = 10;
        var leftY = BASE_Y;
        var rightX = 150;
        var rightY = BASE_Y;
        var equalX = 210;
        var equalY = BASE_Y - 2;
        var calculatedX = 245;
        var calculatedY = BASE_Y;
        return {
          leftX: leftX,
          leftY: leftY,
          rightX: rightX,
          rightY: rightY,
          equalX: equalX,
          equalY: equalY,
          calculatedX: calculatedX,
          calculatedY: calculatedY
        };
      }

      exports.getProblemPoint = getProblemPoint;

      function createShadow(scene) {
        return new g.FilledRect({
          scene: scene,
          width: g.game.width,
          height: g.game.width,
          cssColor: '#999999',
          opacity: 0.5
        });
      }

      exports.createShadow = createShadow;

      function getFont(scene, assetsName) {
        var font = scene.assets[assetsName];
        var glyph = scene.assets[assetsName + "_glyphs"];
        var glyphData = JSON.parse(glyph.data);
        var bmf = new g.BitmapFont({
          src: font,
          map: glyphData.map,
          defaultGlyphWidth: glyphData.width,
          defaultGlyphHeight: glyphData.height,
          missingGlyph: glyphData.missingGlyph
        });
        return bmf;
      }

      exports.getFont = getFont;
    }, {}],
    28: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.initGameState = void 0;

      function initGameState(param) {
        var totalTimeLimit = 95;

        if (param.sessionParameter.totalTimeLimit) {
          totalTimeLimit = param.sessionParameter.totalTimeLimit;
        }

        var gameState = {
          score: 0,
          totalTimeLimit: totalTimeLimit,
          isAtsumaru: param.isAtsumaru
        };
        g.game.vars.gameState = gameState;
      }

      exports.initGameState = initGameState;
    }, {}]
  }, {}, [18])(18);
});