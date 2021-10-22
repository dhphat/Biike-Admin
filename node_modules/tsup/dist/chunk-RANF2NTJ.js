"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var _chunkBNJB64XRjs = require('./chunk-BNJB64XR.js');

// node_modules/jju/lib/unicode.js
var require_unicode = _chunkBNJB64XRjs.__commonJS.call(void 0, {
  "node_modules/jju/lib/unicode.js"(exports, module) {
    var Uni = module.exports;
    module.exports.isWhiteSpace = function isWhiteSpace(x) {
      return x === " " || x === "\xA0" || x === "\uFEFF" || x >= "	" && x <= "\r" || x === "\u1680" || x >= "\u2000" && x <= "\u200A" || x === "\u2028" || x === "\u2029" || x === "\u202F" || x === "\u205F" || x === "\u3000";
    };
    module.exports.isWhiteSpaceJSON = function isWhiteSpaceJSON(x) {
      return x === " " || x === "	" || x === "\n" || x === "\r";
    };
    module.exports.isLineTerminator = function isLineTerminator(x) {
      return x === "\n" || x === "\r" || x === "\u2028" || x === "\u2029";
    };
    module.exports.isLineTerminatorJSON = function isLineTerminatorJSON(x) {
      return x === "\n" || x === "\r";
    };
    module.exports.isIdentifierStart = function isIdentifierStart(x) {
      return x === "$" || x === "_" || x >= "A" && x <= "Z" || x >= "a" && x <= "z" || x >= "\x80" && Uni.NonAsciiIdentifierStart.test(x);
    };
    module.exports.isIdentifierPart = function isIdentifierPart(x) {
      return x === "$" || x === "_" || x >= "A" && x <= "Z" || x >= "a" && x <= "z" || x >= "0" && x <= "9" || x >= "\x80" && Uni.NonAsciiIdentifierPart.test(x);
    };
    module.exports.NonAsciiIdentifierStart = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/;
    module.exports.NonAsciiIdentifierPart = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/;
  }
});

// node_modules/jju/lib/parse.js
var require_parse = _chunkBNJB64XRjs.__commonJS.call(void 0, {
  "node_modules/jju/lib/parse.js"(exports, module) {
    var Uni = require_unicode();
    function isHexDigit(x) {
      return x >= "0" && x <= "9" || x >= "A" && x <= "F" || x >= "a" && x <= "f";
    }
    function isOctDigit(x) {
      return x >= "0" && x <= "7";
    }
    function isDecDigit(x) {
      return x >= "0" && x <= "9";
    }
    var unescapeMap = {
      "'": "'",
      '"': '"',
      "\\": "\\",
      "b": "\b",
      "f": "\f",
      "n": "\n",
      "r": "\r",
      "t": "	",
      "v": "\v",
      "/": "/"
    };
    function formatError(input, msg, position, lineno, column, json5) {
      var result = msg + " at " + (lineno + 1) + ":" + (column + 1), tmppos = position - column - 1, srcline = "", underline = "";
      var isLineTerminator = json5 ? Uni.isLineTerminator : Uni.isLineTerminatorJSON;
      if (tmppos < position - 70) {
        tmppos = position - 70;
      }
      while (1) {
        var chr = input[++tmppos];
        if (isLineTerminator(chr) || tmppos === input.length) {
          if (position >= tmppos) {
            underline += "^";
          }
          break;
        }
        srcline += chr;
        if (position === tmppos) {
          underline += "^";
        } else if (position > tmppos) {
          underline += input[tmppos] === "	" ? "	" : " ";
        }
        if (srcline.length > 78)
          break;
      }
      return result + "\n" + srcline + "\n" + underline;
    }
    function parse(input, options) {
      var json5 = false;
      var cjson = false;
      if (options.legacy || options.mode === "json") {
      } else if (options.mode === "cjson") {
        cjson = true;
      } else if (options.mode === "json5") {
        json5 = true;
      } else {
        json5 = true;
      }
      var isLineTerminator = json5 ? Uni.isLineTerminator : Uni.isLineTerminatorJSON;
      var isWhiteSpace = json5 ? Uni.isWhiteSpace : Uni.isWhiteSpaceJSON;
      var length = input.length, lineno = 0, linestart = 0, position = 0, stack = [];
      var tokenStart = function() {
      };
      var tokenEnd = function(v) {
        return v;
      };
      if (options._tokenize) {
        ;
        (function() {
          var start = null;
          tokenStart = function() {
            if (start !== null)
              throw Error("internal error, token overlap");
            start = position;
          };
          tokenEnd = function(v, type) {
            if (start != position) {
              var hash = {
                raw: input.substr(start, position - start),
                type,
                stack: stack.slice(0)
              };
              if (v !== void 0)
                hash.value = v;
              options._tokenize.call(null, hash);
            }
            start = null;
            return v;
          };
        })();
      }
      function fail(msg) {
        var column = position - linestart;
        if (!msg) {
          if (position < length) {
            var token = "'" + JSON.stringify(input[position]).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            if (!msg)
              msg = "Unexpected token " + token;
          } else {
            if (!msg)
              msg = "Unexpected end of input";
          }
        }
        var error = SyntaxError(formatError(input, msg, position, lineno, column, json5));
        error.row = lineno + 1;
        error.column = column + 1;
        throw error;
      }
      function newline(chr) {
        if (chr === "\r" && input[position] === "\n")
          position++;
        linestart = position;
        lineno++;
      }
      function parseGeneric() {
        var result;
        while (position < length) {
          tokenStart();
          var chr = input[position++];
          if (chr === '"' || chr === "'" && json5) {
            return tokenEnd(parseString(chr), "literal");
          } else if (chr === "{") {
            tokenEnd(void 0, "separator");
            return parseObject();
          } else if (chr === "[") {
            tokenEnd(void 0, "separator");
            return parseArray();
          } else if (chr === "-" || chr === "." || isDecDigit(chr) || json5 && (chr === "+" || chr === "I" || chr === "N")) {
            return tokenEnd(parseNumber(), "literal");
          } else if (chr === "n") {
            parseKeyword("null");
            return tokenEnd(null, "literal");
          } else if (chr === "t") {
            parseKeyword("true");
            return tokenEnd(true, "literal");
          } else if (chr === "f") {
            parseKeyword("false");
            return tokenEnd(false, "literal");
          } else {
            position--;
            return tokenEnd(void 0);
          }
        }
      }
      function parseKey() {
        var result;
        while (position < length) {
          tokenStart();
          var chr = input[position++];
          if (chr === '"' || chr === "'" && json5) {
            return tokenEnd(parseString(chr), "key");
          } else if (chr === "{") {
            tokenEnd(void 0, "separator");
            return parseObject();
          } else if (chr === "[") {
            tokenEnd(void 0, "separator");
            return parseArray();
          } else if (chr === "." || isDecDigit(chr)) {
            return tokenEnd(parseNumber(true), "key");
          } else if (json5 && Uni.isIdentifierStart(chr) || chr === "\\" && input[position] === "u") {
            var rollback = position - 1;
            var result = parseIdentifier();
            if (result === void 0) {
              position = rollback;
              return tokenEnd(void 0);
            } else {
              return tokenEnd(result, "key");
            }
          } else {
            position--;
            return tokenEnd(void 0);
          }
        }
      }
      function skipWhiteSpace() {
        tokenStart();
        while (position < length) {
          var chr = input[position++];
          if (isLineTerminator(chr)) {
            position--;
            tokenEnd(void 0, "whitespace");
            tokenStart();
            position++;
            newline(chr);
            tokenEnd(void 0, "newline");
            tokenStart();
          } else if (isWhiteSpace(chr)) {
          } else if (chr === "/" && (json5 || cjson) && (input[position] === "/" || input[position] === "*")) {
            position--;
            tokenEnd(void 0, "whitespace");
            tokenStart();
            position++;
            skipComment(input[position++] === "*");
            tokenEnd(void 0, "comment");
            tokenStart();
          } else {
            position--;
            break;
          }
        }
        return tokenEnd(void 0, "whitespace");
      }
      function skipComment(multi) {
        while (position < length) {
          var chr = input[position++];
          if (isLineTerminator(chr)) {
            if (!multi) {
              position--;
              return;
            }
            newline(chr);
          } else if (chr === "*" && multi) {
            if (input[position] === "/") {
              position++;
              return;
            }
          } else {
          }
        }
        if (multi) {
          fail("Unclosed multiline comment");
        }
      }
      function parseKeyword(keyword) {
        var _pos = position;
        var len = keyword.length;
        for (var i = 1; i < len; i++) {
          if (position >= length || keyword[i] != input[position]) {
            position = _pos - 1;
            fail();
          }
          position++;
        }
      }
      function parseObject() {
        var result = options.null_prototype ? Object.create(null) : {}, empty_object = {}, is_non_empty = false;
        while (position < length) {
          skipWhiteSpace();
          var item1 = parseKey();
          skipWhiteSpace();
          tokenStart();
          var chr = input[position++];
          tokenEnd(void 0, "separator");
          if (chr === "}" && item1 === void 0) {
            if (!json5 && is_non_empty) {
              position--;
              fail("Trailing comma in object");
            }
            return result;
          } else if (chr === ":" && item1 !== void 0) {
            skipWhiteSpace();
            stack.push(item1);
            var item2 = parseGeneric();
            stack.pop();
            if (item2 === void 0)
              fail("No value found for key " + item1);
            if (typeof item1 !== "string") {
              if (!json5 || typeof item1 !== "number") {
                fail("Wrong key type: " + item1);
              }
            }
            if ((item1 in empty_object || empty_object[item1] != null) && options.reserved_keys !== "replace") {
              if (options.reserved_keys === "throw") {
                fail("Reserved key: " + item1);
              } else {
              }
            } else {
              if (typeof options.reviver === "function") {
                item2 = options.reviver.call(null, item1, item2);
              }
              if (item2 !== void 0) {
                is_non_empty = true;
                Object.defineProperty(result, item1, {
                  value: item2,
                  enumerable: true,
                  configurable: true,
                  writable: true
                });
              }
            }
            skipWhiteSpace();
            tokenStart();
            var chr = input[position++];
            tokenEnd(void 0, "separator");
            if (chr === ",") {
              continue;
            } else if (chr === "}") {
              return result;
            } else {
              fail();
            }
          } else {
            position--;
            fail();
          }
        }
        fail();
      }
      function parseArray() {
        var result = [];
        while (position < length) {
          skipWhiteSpace();
          stack.push(result.length);
          var item = parseGeneric();
          stack.pop();
          skipWhiteSpace();
          tokenStart();
          var chr = input[position++];
          tokenEnd(void 0, "separator");
          if (item !== void 0) {
            if (typeof options.reviver === "function") {
              item = options.reviver.call(null, String(result.length), item);
            }
            if (item === void 0) {
              result.length++;
              item = true;
            } else {
              result.push(item);
            }
          }
          if (chr === ",") {
            if (item === void 0) {
              fail("Elisions are not supported");
            }
          } else if (chr === "]") {
            if (!json5 && item === void 0 && result.length) {
              position--;
              fail("Trailing comma in array");
            }
            return result;
          } else {
            position--;
            fail();
          }
        }
      }
      function parseNumber() {
        position--;
        var start = position, chr = input[position++], t;
        var to_num = function(is_octal2) {
          var str = input.substr(start, position - start);
          if (is_octal2) {
            var result = parseInt(str.replace(/^0o?/, ""), 8);
          } else {
            var result = Number(str);
          }
          if (Number.isNaN(result)) {
            position--;
            fail('Bad numeric literal - "' + input.substr(start, position - start + 1) + '"');
          } else if (!json5 && !str.match(/^-?(0|[1-9][0-9]*)(\.[0-9]+)?(e[+-]?[0-9]+)?$/i)) {
            position--;
            fail('Non-json numeric literal - "' + input.substr(start, position - start + 1) + '"');
          } else {
            return result;
          }
        };
        if (chr === "-" || chr === "+" && json5)
          chr = input[position++];
        if (chr === "N" && json5) {
          parseKeyword("NaN");
          return NaN;
        }
        if (chr === "I" && json5) {
          parseKeyword("Infinity");
          return to_num();
        }
        if (chr >= "1" && chr <= "9") {
          while (position < length && isDecDigit(input[position]))
            position++;
          chr = input[position++];
        }
        if (chr === "0") {
          chr = input[position++];
          var is_octal = chr === "o" || chr === "O" || isOctDigit(chr);
          var is_hex = chr === "x" || chr === "X";
          if (json5 && (is_octal || is_hex)) {
            while (position < length && (is_hex ? isHexDigit : isOctDigit)(input[position]))
              position++;
            var sign = 1;
            if (input[start] === "-") {
              sign = -1;
              start++;
            } else if (input[start] === "+") {
              start++;
            }
            return sign * to_num(is_octal);
          }
        }
        if (chr === ".") {
          while (position < length && isDecDigit(input[position]))
            position++;
          chr = input[position++];
        }
        if (chr === "e" || chr === "E") {
          chr = input[position++];
          if (chr === "-" || chr === "+")
            position++;
          while (position < length && isDecDigit(input[position]))
            position++;
          chr = input[position++];
        }
        position--;
        return to_num();
      }
      function parseIdentifier() {
        position--;
        var result = "";
        while (position < length) {
          var chr = input[position++];
          if (chr === "\\" && input[position] === "u" && isHexDigit(input[position + 1]) && isHexDigit(input[position + 2]) && isHexDigit(input[position + 3]) && isHexDigit(input[position + 4])) {
            chr = String.fromCharCode(parseInt(input.substr(position + 1, 4), 16));
            position += 5;
          }
          if (result.length) {
            if (Uni.isIdentifierPart(chr)) {
              result += chr;
            } else {
              position--;
              return result;
            }
          } else {
            if (Uni.isIdentifierStart(chr)) {
              result += chr;
            } else {
              return void 0;
            }
          }
        }
        fail();
      }
      function parseString(endChar) {
        var result = "";
        while (position < length) {
          var chr = input[position++];
          if (chr === endChar) {
            return result;
          } else if (chr === "\\") {
            if (position >= length)
              fail();
            chr = input[position++];
            if (unescapeMap[chr] && (json5 || chr != "v" && chr != "'")) {
              result += unescapeMap[chr];
            } else if (json5 && isLineTerminator(chr)) {
              newline(chr);
            } else if (chr === "u" || chr === "x" && json5) {
              var off = chr === "u" ? 4 : 2;
              for (var i = 0; i < off; i++) {
                if (position >= length)
                  fail();
                if (!isHexDigit(input[position]))
                  fail("Bad escape sequence");
                position++;
              }
              result += String.fromCharCode(parseInt(input.substr(position - off, off), 16));
            } else if (json5 && isOctDigit(chr)) {
              if (chr < "4" && isOctDigit(input[position]) && isOctDigit(input[position + 1])) {
                var digits = 3;
              } else if (isOctDigit(input[position])) {
                var digits = 2;
              } else {
                var digits = 1;
              }
              position += digits - 1;
              result += String.fromCharCode(parseInt(input.substr(position - digits, digits), 8));
            } else if (json5) {
              result += chr;
            } else {
              position--;
              fail();
            }
          } else if (isLineTerminator(chr)) {
            fail();
          } else {
            if (!json5 && chr.charCodeAt(0) < 32) {
              position--;
              fail("Unexpected control character");
            }
            result += chr;
          }
        }
        fail();
      }
      skipWhiteSpace();
      var return_value = parseGeneric();
      if (return_value !== void 0 || position < length) {
        skipWhiteSpace();
        if (position >= length) {
          if (typeof options.reviver === "function") {
            return_value = options.reviver.call(null, "", return_value);
          }
          return return_value;
        } else {
          fail();
        }
      } else {
        if (position) {
          fail("No data, only a whitespace");
        } else {
          fail("No data, empty input");
        }
      }
    }
    module.exports.parse = function parseJSON(input, options) {
      if (typeof options === "function") {
        options = {
          reviver: options
        };
      }
      if (input === void 0) {
        return void 0;
      }
      if (typeof input !== "string")
        input = String(input);
      if (options == null)
        options = {};
      if (options.reserved_keys == null)
        options.reserved_keys = "ignore";
      if (options.reserved_keys === "throw" || options.reserved_keys === "ignore") {
        if (options.null_prototype == null) {
          options.null_prototype = true;
        }
      }
      try {
        return parse(input, options);
      } catch (err) {
        if (err instanceof SyntaxError && err.row != null && err.column != null) {
          var old_err = err;
          err = SyntaxError(old_err.message);
          err.column = old_err.column;
          err.row = old_err.row;
        }
        throw err;
      }
    };
    module.exports.tokenize = function tokenizeJSON(input, options) {
      if (options == null)
        options = {};
      options._tokenize = function(smth) {
        if (options._addstack)
          smth.stack.unshift.apply(smth.stack, options._addstack);
        tokens.push(smth);
      };
      var tokens = [];
      tokens.data = module.exports.parse(input, options);
      return tokens;
    };
  }
});

// node_modules/strip-json-comments/index.js
var require_strip_json_comments = _chunkBNJB64XRjs.__commonJS.call(void 0, {
  "node_modules/strip-json-comments/index.js"(exports, module) {
    "use strict";
    var singleComment = Symbol("singleComment");
    var multiComment = Symbol("multiComment");
    var stripWithoutWhitespace = () => "";
    var stripWithWhitespace = (string, start, end) => string.slice(start, end).replace(/\S/g, " ");
    var isEscaped = (jsonString, quotePosition) => {
      let index = quotePosition - 1;
      let backslashCount = 0;
      while (jsonString[index] === "\\") {
        index -= 1;
        backslashCount += 1;
      }
      return Boolean(backslashCount % 2);
    };
    module.exports = (jsonString, options = {}) => {
      if (typeof jsonString !== "string") {
        throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof jsonString}\``);
      }
      const strip = options.whitespace === false ? stripWithoutWhitespace : stripWithWhitespace;
      let insideString = false;
      let insideComment = false;
      let offset = 0;
      let result = "";
      for (let i = 0; i < jsonString.length; i++) {
        const currentCharacter = jsonString[i];
        const nextCharacter = jsonString[i + 1];
        if (!insideComment && currentCharacter === '"') {
          const escaped = isEscaped(jsonString, i);
          if (!escaped) {
            insideString = !insideString;
          }
        }
        if (insideString) {
          continue;
        }
        if (!insideComment && currentCharacter + nextCharacter === "//") {
          result += jsonString.slice(offset, i);
          offset = i;
          insideComment = singleComment;
          i++;
        } else if (insideComment === singleComment && currentCharacter + nextCharacter === "\r\n") {
          i++;
          insideComment = false;
          result += strip(jsonString, offset, i);
          offset = i;
          continue;
        } else if (insideComment === singleComment && currentCharacter === "\n") {
          insideComment = false;
          result += strip(jsonString, offset, i);
          offset = i;
        } else if (!insideComment && currentCharacter + nextCharacter === "/*") {
          result += jsonString.slice(offset, i);
          offset = i;
          insideComment = multiComment;
          i++;
          continue;
        } else if (insideComment === multiComment && currentCharacter + nextCharacter === "*/") {
          i++;
          insideComment = false;
          result += strip(jsonString, offset, i + 1);
          offset = i + 1;
          continue;
        }
      }
      return result + (insideComment ? strip(jsonString.slice(offset)) : jsonString.slice(offset));
    };
  }
});

// node_modules/sourcemap-codec/dist/sourcemap-codec.umd.js
var require_sourcemap_codec_umd = _chunkBNJB64XRjs.__commonJS.call(void 0, {
  "node_modules/sourcemap-codec/dist/sourcemap-codec.umd.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.sourcemapCodec = {}));
    })(exports, function(exports2) {
      "use strict";
      var charToInteger = {};
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      for (var i = 0; i < chars.length; i++) {
        charToInteger[chars.charCodeAt(i)] = i;
      }
      function decode(mappings) {
        var decoded = [];
        var line = [];
        var segment = [
          0,
          0,
          0,
          0,
          0
        ];
        var j = 0;
        for (var i2 = 0, shift = 0, value = 0; i2 < mappings.length; i2++) {
          var c = mappings.charCodeAt(i2);
          if (c === 44) {
            segmentify(line, segment, j);
            j = 0;
          } else if (c === 59) {
            segmentify(line, segment, j);
            j = 0;
            decoded.push(line);
            line = [];
            segment[0] = 0;
          } else {
            var integer = charToInteger[c];
            if (integer === void 0) {
              throw new Error("Invalid character (" + String.fromCharCode(c) + ")");
            }
            var hasContinuationBit = integer & 32;
            integer &= 31;
            value += integer << shift;
            if (hasContinuationBit) {
              shift += 5;
            } else {
              var shouldNegate = value & 1;
              value >>>= 1;
              if (shouldNegate) {
                value = value === 0 ? -2147483648 : -value;
              }
              segment[j] += value;
              j++;
              value = shift = 0;
            }
          }
        }
        segmentify(line, segment, j);
        decoded.push(line);
        return decoded;
      }
      function segmentify(line, segment, j) {
        if (j === 4)
          line.push([segment[0], segment[1], segment[2], segment[3]]);
        else if (j === 5)
          line.push([segment[0], segment[1], segment[2], segment[3], segment[4]]);
        else if (j === 1)
          line.push([segment[0]]);
      }
      function encode(decoded) {
        var sourceFileIndex = 0;
        var sourceCodeLine = 0;
        var sourceCodeColumn = 0;
        var nameIndex = 0;
        var mappings = "";
        for (var i2 = 0; i2 < decoded.length; i2++) {
          var line = decoded[i2];
          if (i2 > 0)
            mappings += ";";
          if (line.length === 0)
            continue;
          var generatedCodeColumn = 0;
          var lineMappings = [];
          for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var segment = line_1[_i];
            var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
            generatedCodeColumn = segment[0];
            if (segment.length > 1) {
              segmentMappings += encodeInteger(segment[1] - sourceFileIndex) + encodeInteger(segment[2] - sourceCodeLine) + encodeInteger(segment[3] - sourceCodeColumn);
              sourceFileIndex = segment[1];
              sourceCodeLine = segment[2];
              sourceCodeColumn = segment[3];
            }
            if (segment.length === 5) {
              segmentMappings += encodeInteger(segment[4] - nameIndex);
              nameIndex = segment[4];
            }
            lineMappings.push(segmentMappings);
          }
          mappings += lineMappings.join(",");
        }
        return mappings;
      }
      function encodeInteger(num) {
        var result = "";
        num = num < 0 ? -num << 1 | 1 : num << 1;
        do {
          var clamped = num & 31;
          num >>>= 5;
          if (num > 0) {
            clamped |= 32;
          }
          result += chars[clamped];
        } while (num > 0);
        return result;
      }
      exports2.decode = decode;
      exports2.encode = encode;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/magic-string/dist/magic-string.cjs.js
var require_magic_string_cjs = _chunkBNJB64XRjs.__commonJS.call(void 0, {
  "node_modules/magic-string/dist/magic-string.cjs.js"(exports, module) {
    "use strict";
    var sourcemapCodec = require_sourcemap_codec_umd();
    var BitSet = function BitSet2(arg) {
      this.bits = arg instanceof BitSet2 ? arg.bits.slice() : [];
    };
    BitSet.prototype.add = function add(n2) {
      this.bits[n2 >> 5] |= 1 << (n2 & 31);
    };
    BitSet.prototype.has = function has(n2) {
      return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
    };
    var Chunk = function Chunk2(start, end, content) {
      this.start = start;
      this.end = end;
      this.original = content;
      this.intro = "";
      this.outro = "";
      this.content = content;
      this.storeName = false;
      this.edited = false;
      Object.defineProperties(this, {
        previous: { writable: true, value: null },
        next: { writable: true, value: null }
      });
    };
    Chunk.prototype.appendLeft = function appendLeft(content) {
      this.outro += content;
    };
    Chunk.prototype.appendRight = function appendRight(content) {
      this.intro = this.intro + content;
    };
    Chunk.prototype.clone = function clone() {
      var chunk = new Chunk(this.start, this.end, this.original);
      chunk.intro = this.intro;
      chunk.outro = this.outro;
      chunk.content = this.content;
      chunk.storeName = this.storeName;
      chunk.edited = this.edited;
      return chunk;
    };
    Chunk.prototype.contains = function contains(index) {
      return this.start < index && index < this.end;
    };
    Chunk.prototype.eachNext = function eachNext(fn) {
      var chunk = this;
      while (chunk) {
        fn(chunk);
        chunk = chunk.next;
      }
    };
    Chunk.prototype.eachPrevious = function eachPrevious(fn) {
      var chunk = this;
      while (chunk) {
        fn(chunk);
        chunk = chunk.previous;
      }
    };
    Chunk.prototype.edit = function edit(content, storeName, contentOnly) {
      this.content = content;
      if (!contentOnly) {
        this.intro = "";
        this.outro = "";
      }
      this.storeName = storeName;
      this.edited = true;
      return this;
    };
    Chunk.prototype.prependLeft = function prependLeft(content) {
      this.outro = content + this.outro;
    };
    Chunk.prototype.prependRight = function prependRight(content) {
      this.intro = content + this.intro;
    };
    Chunk.prototype.split = function split(index) {
      var sliceIndex = index - this.start;
      var originalBefore = this.original.slice(0, sliceIndex);
      var originalAfter = this.original.slice(sliceIndex);
      this.original = originalBefore;
      var newChunk = new Chunk(index, this.end, originalAfter);
      newChunk.outro = this.outro;
      this.outro = "";
      this.end = index;
      if (this.edited) {
        newChunk.edit("", false);
        this.content = "";
      } else {
        this.content = originalBefore;
      }
      newChunk.next = this.next;
      if (newChunk.next) {
        newChunk.next.previous = newChunk;
      }
      newChunk.previous = this;
      this.next = newChunk;
      return newChunk;
    };
    Chunk.prototype.toString = function toString2() {
      return this.intro + this.content + this.outro;
    };
    Chunk.prototype.trimEnd = function trimEnd(rx) {
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) {
        return true;
      }
      var trimmed = this.content.replace(rx, "");
      if (trimmed.length) {
        if (trimmed !== this.content) {
          this.split(this.start + trimmed.length).edit("", void 0, true);
        }
        return true;
      } else {
        this.edit("", void 0, true);
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) {
          return true;
        }
      }
    };
    Chunk.prototype.trimStart = function trimStart(rx) {
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) {
        return true;
      }
      var trimmed = this.content.replace(rx, "");
      if (trimmed.length) {
        if (trimmed !== this.content) {
          this.split(this.end - trimmed.length);
          this.edit("", void 0, true);
        }
        return true;
      } else {
        this.edit("", void 0, true);
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) {
          return true;
        }
      }
    };
    var btoa = function() {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      btoa = function(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
      };
    } else if (typeof Buffer === "function") {
      btoa = function(str) {
        return Buffer.from(str, "utf-8").toString("base64");
      };
    }
    var SourceMap = function SourceMap2(properties) {
      this.version = 3;
      this.file = properties.file;
      this.sources = properties.sources;
      this.sourcesContent = properties.sourcesContent;
      this.names = properties.names;
      this.mappings = sourcemapCodec.encode(properties.mappings);
    };
    SourceMap.prototype.toString = function toString2() {
      return JSON.stringify(this);
    };
    SourceMap.prototype.toUrl = function toUrl() {
      return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
    };
    function guessIndent(code) {
      var lines = code.split("\n");
      var tabbed = lines.filter(function(line) {
        return /^\t+/.test(line);
      });
      var spaced = lines.filter(function(line) {
        return /^ {2,}/.test(line);
      });
      if (tabbed.length === 0 && spaced.length === 0) {
        return null;
      }
      if (tabbed.length >= spaced.length) {
        return "	";
      }
      var min = spaced.reduce(function(previous, current) {
        var numSpaces = /^ +/.exec(current)[0].length;
        return Math.min(numSpaces, previous);
      }, Infinity);
      return new Array(min + 1).join(" ");
    }
    function getRelativePath(from, to) {
      var fromParts = from.split(/[/\\]/);
      var toParts = to.split(/[/\\]/);
      fromParts.pop();
      while (fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
      }
      if (fromParts.length) {
        var i = fromParts.length;
        while (i--) {
          fromParts[i] = "..";
        }
      }
      return fromParts.concat(toParts).join("/");
    }
    var toString = Object.prototype.toString;
    function isObject(thing) {
      return toString.call(thing) === "[object Object]";
    }
    function getLocator(source) {
      var originalLines = source.split("\n");
      var lineOffsets = [];
      for (var i = 0, pos = 0; i < originalLines.length; i++) {
        lineOffsets.push(pos);
        pos += originalLines[i].length + 1;
      }
      return function locate(index) {
        var i2 = 0;
        var j = lineOffsets.length;
        while (i2 < j) {
          var m = i2 + j >> 1;
          if (index < lineOffsets[m]) {
            j = m;
          } else {
            i2 = m + 1;
          }
        }
        var line = i2 - 1;
        var column = index - lineOffsets[line];
        return { line, column };
      };
    }
    var Mappings = function Mappings2(hires) {
      this.hires = hires;
      this.generatedCodeLine = 0;
      this.generatedCodeColumn = 0;
      this.raw = [];
      this.rawSegments = this.raw[this.generatedCodeLine] = [];
      this.pending = null;
    };
    Mappings.prototype.addEdit = function addEdit(sourceIndex, content, loc, nameIndex) {
      if (content.length) {
        var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment.push(nameIndex);
        }
        this.rawSegments.push(segment);
      } else if (this.pending) {
        this.rawSegments.push(this.pending);
      }
      this.advance(content);
      this.pending = null;
    };
    Mappings.prototype.addUneditedChunk = function addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
      var originalCharIndex = chunk.start;
      var first = true;
      while (originalCharIndex < chunk.end) {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          this.rawSegments.push([this.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
        }
        if (original[originalCharIndex] === "\n") {
          loc.line += 1;
          loc.column = 0;
          this.generatedCodeLine += 1;
          this.raw[this.generatedCodeLine] = this.rawSegments = [];
          this.generatedCodeColumn = 0;
          first = true;
        } else {
          loc.column += 1;
          this.generatedCodeColumn += 1;
          first = false;
        }
        originalCharIndex += 1;
      }
      this.pending = null;
    };
    Mappings.prototype.advance = function advance(str) {
      if (!str) {
        return;
      }
      var lines = str.split("\n");
      if (lines.length > 1) {
        for (var i = 0; i < lines.length - 1; i++) {
          this.generatedCodeLine++;
          this.raw[this.generatedCodeLine] = this.rawSegments = [];
        }
        this.generatedCodeColumn = 0;
      }
      this.generatedCodeColumn += lines[lines.length - 1].length;
    };
    var n = "\n";
    var warned = {
      insertLeft: false,
      insertRight: false,
      storeName: false
    };
    var MagicString = function MagicString2(string, options) {
      if (options === void 0)
        options = {};
      var chunk = new Chunk(0, string.length, string);
      Object.defineProperties(this, {
        original: { writable: true, value: string },
        outro: { writable: true, value: "" },
        intro: { writable: true, value: "" },
        firstChunk: { writable: true, value: chunk },
        lastChunk: { writable: true, value: chunk },
        lastSearchedChunk: { writable: true, value: chunk },
        byStart: { writable: true, value: {} },
        byEnd: { writable: true, value: {} },
        filename: { writable: true, value: options.filename },
        indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
        sourcemapLocations: { writable: true, value: new BitSet() },
        storedNames: { writable: true, value: {} },
        indentStr: { writable: true, value: guessIndent(string) }
      });
      this.byStart[0] = chunk;
      this.byEnd[string.length] = chunk;
    };
    MagicString.prototype.addSourcemapLocation = function addSourcemapLocation(char) {
      this.sourcemapLocations.add(char);
    };
    MagicString.prototype.append = function append(content) {
      if (typeof content !== "string") {
        throw new TypeError("outro content must be a string");
      }
      this.outro += content;
      return this;
    };
    MagicString.prototype.appendLeft = function appendLeft(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byEnd[index];
      if (chunk) {
        chunk.appendLeft(content);
      } else {
        this.intro += content;
      }
      return this;
    };
    MagicString.prototype.appendRight = function appendRight(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byStart[index];
      if (chunk) {
        chunk.appendRight(content);
      } else {
        this.outro += content;
      }
      return this;
    };
    MagicString.prototype.clone = function clone() {
      var cloned = new MagicString(this.original, { filename: this.filename });
      var originalChunk = this.firstChunk;
      var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
      while (originalChunk) {
        cloned.byStart[clonedChunk.start] = clonedChunk;
        cloned.byEnd[clonedChunk.end] = clonedChunk;
        var nextOriginalChunk = originalChunk.next;
        var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
        if (nextClonedChunk) {
          clonedChunk.next = nextClonedChunk;
          nextClonedChunk.previous = clonedChunk;
          clonedChunk = nextClonedChunk;
        }
        originalChunk = nextOriginalChunk;
      }
      cloned.lastChunk = clonedChunk;
      if (this.indentExclusionRanges) {
        cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
      }
      cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
      cloned.intro = this.intro;
      cloned.outro = this.outro;
      return cloned;
    };
    MagicString.prototype.generateDecodedMap = function generateDecodedMap(options) {
      var this$1 = this;
      options = options || {};
      var sourceIndex = 0;
      var names = Object.keys(this.storedNames);
      var mappings = new Mappings(options.hires);
      var locate = getLocator(this.original);
      if (this.intro) {
        mappings.advance(this.intro);
      }
      this.firstChunk.eachNext(function(chunk) {
        var loc = locate(chunk.start);
        if (chunk.intro.length) {
          mappings.advance(chunk.intro);
        }
        if (chunk.edited) {
          mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
        } else {
          mappings.addUneditedChunk(sourceIndex, chunk, this$1.original, loc, this$1.sourcemapLocations);
        }
        if (chunk.outro.length) {
          mappings.advance(chunk.outro);
        }
      });
      return {
        file: options.file ? options.file.split(/[/\\]/).pop() : null,
        sources: [options.source ? getRelativePath(options.file || "", options.source) : null],
        sourcesContent: options.includeContent ? [this.original] : [null],
        names,
        mappings: mappings.raw
      };
    };
    MagicString.prototype.generateMap = function generateMap(options) {
      return new SourceMap(this.generateDecodedMap(options));
    };
    MagicString.prototype.getIndentString = function getIndentString() {
      return this.indentStr === null ? "	" : this.indentStr;
    };
    MagicString.prototype.indent = function indent(indentStr, options) {
      var pattern = /^[^\r\n]/gm;
      if (isObject(indentStr)) {
        options = indentStr;
        indentStr = void 0;
      }
      indentStr = indentStr !== void 0 ? indentStr : this.indentStr || "	";
      if (indentStr === "") {
        return this;
      }
      options = options || {};
      var isExcluded = {};
      if (options.exclude) {
        var exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
        exclusions.forEach(function(exclusion) {
          for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
            isExcluded[i] = true;
          }
        });
      }
      var shouldIndentNextCharacter = options.indentStart !== false;
      var replacer = function(match) {
        if (shouldIndentNextCharacter) {
          return "" + indentStr + match;
        }
        shouldIndentNextCharacter = true;
        return match;
      };
      this.intro = this.intro.replace(pattern, replacer);
      var charIndex = 0;
      var chunk = this.firstChunk;
      while (chunk) {
        var end = chunk.end;
        if (chunk.edited) {
          if (!isExcluded[charIndex]) {
            chunk.content = chunk.content.replace(pattern, replacer);
            if (chunk.content.length) {
              shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
            }
          }
        } else {
          charIndex = chunk.start;
          while (charIndex < end) {
            if (!isExcluded[charIndex]) {
              var char = this.original[charIndex];
              if (char === "\n") {
                shouldIndentNextCharacter = true;
              } else if (char !== "\r" && shouldIndentNextCharacter) {
                shouldIndentNextCharacter = false;
                if (charIndex === chunk.start) {
                  chunk.prependRight(indentStr);
                } else {
                  this._splitChunk(chunk, charIndex);
                  chunk = chunk.next;
                  chunk.prependRight(indentStr);
                }
              }
            }
            charIndex += 1;
          }
        }
        charIndex = chunk.end;
        chunk = chunk.next;
      }
      this.outro = this.outro.replace(pattern, replacer);
      return this;
    };
    MagicString.prototype.insert = function insert() {
      throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)");
    };
    MagicString.prototype.insertLeft = function insertLeft(index, content) {
      if (!warned.insertLeft) {
        console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
        warned.insertLeft = true;
      }
      return this.appendLeft(index, content);
    };
    MagicString.prototype.insertRight = function insertRight(index, content) {
      if (!warned.insertRight) {
        console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
        warned.insertRight = true;
      }
      return this.prependRight(index, content);
    };
    MagicString.prototype.move = function move(start, end, index) {
      if (index >= start && index <= end) {
        throw new Error("Cannot move a selection inside itself");
      }
      this._split(start);
      this._split(end);
      this._split(index);
      var first = this.byStart[start];
      var last = this.byEnd[end];
      var oldLeft = first.previous;
      var oldRight = last.next;
      var newRight = this.byStart[index];
      if (!newRight && last === this.lastChunk) {
        return this;
      }
      var newLeft = newRight ? newRight.previous : this.lastChunk;
      if (oldLeft) {
        oldLeft.next = oldRight;
      }
      if (oldRight) {
        oldRight.previous = oldLeft;
      }
      if (newLeft) {
        newLeft.next = first;
      }
      if (newRight) {
        newRight.previous = last;
      }
      if (!first.previous) {
        this.firstChunk = last.next;
      }
      if (!last.next) {
        this.lastChunk = first.previous;
        this.lastChunk.next = null;
      }
      first.previous = newLeft;
      last.next = newRight || null;
      if (!newLeft) {
        this.firstChunk = first;
      }
      if (!newRight) {
        this.lastChunk = last;
      }
      return this;
    };
    MagicString.prototype.overwrite = function overwrite(start, end, content, options) {
      if (typeof content !== "string") {
        throw new TypeError("replacement content must be a string");
      }
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      if (end > this.original.length) {
        throw new Error("end is out of bounds");
      }
      if (start === end) {
        throw new Error("Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead");
      }
      this._split(start);
      this._split(end);
      if (options === true) {
        if (!warned.storeName) {
          console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
          warned.storeName = true;
        }
        options = { storeName: true };
      }
      var storeName = options !== void 0 ? options.storeName : false;
      var contentOnly = options !== void 0 ? options.contentOnly : false;
      if (storeName) {
        var original = this.original.slice(start, end);
        this.storedNames[original] = true;
      }
      var first = this.byStart[start];
      var last = this.byEnd[end];
      if (first) {
        if (end > first.end && first.next !== this.byStart[first.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        first.edit(content, storeName, contentOnly);
        if (first !== last) {
          var chunk = first.next;
          while (chunk !== last) {
            chunk.edit("", false);
            chunk = chunk.next;
          }
          chunk.edit("", false);
        }
      } else {
        var newChunk = new Chunk(start, end, "").edit(content, storeName);
        last.next = newChunk;
        newChunk.previous = last;
      }
      return this;
    };
    MagicString.prototype.prepend = function prepend(content) {
      if (typeof content !== "string") {
        throw new TypeError("outro content must be a string");
      }
      this.intro = content + this.intro;
      return this;
    };
    MagicString.prototype.prependLeft = function prependLeft(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byEnd[index];
      if (chunk) {
        chunk.prependLeft(content);
      } else {
        this.intro = content + this.intro;
      }
      return this;
    };
    MagicString.prototype.prependRight = function prependRight(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byStart[index];
      if (chunk) {
        chunk.prependRight(content);
      } else {
        this.outro = content + this.outro;
      }
      return this;
    };
    MagicString.prototype.remove = function remove(start, end) {
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      if (start === end) {
        return this;
      }
      if (start < 0 || end > this.original.length) {
        throw new Error("Character is out of bounds");
      }
      if (start > end) {
        throw new Error("end must be greater than start");
      }
      this._split(start);
      this._split(end);
      var chunk = this.byStart[start];
      while (chunk) {
        chunk.intro = "";
        chunk.outro = "";
        chunk.edit("");
        chunk = end > chunk.end ? this.byStart[chunk.end] : null;
      }
      return this;
    };
    MagicString.prototype.lastChar = function lastChar() {
      if (this.outro.length) {
        return this.outro[this.outro.length - 1];
      }
      var chunk = this.lastChunk;
      do {
        if (chunk.outro.length) {
          return chunk.outro[chunk.outro.length - 1];
        }
        if (chunk.content.length) {
          return chunk.content[chunk.content.length - 1];
        }
        if (chunk.intro.length) {
          return chunk.intro[chunk.intro.length - 1];
        }
      } while (chunk = chunk.previous);
      if (this.intro.length) {
        return this.intro[this.intro.length - 1];
      }
      return "";
    };
    MagicString.prototype.lastLine = function lastLine() {
      var lineIndex = this.outro.lastIndexOf(n);
      if (lineIndex !== -1) {
        return this.outro.substr(lineIndex + 1);
      }
      var lineStr = this.outro;
      var chunk = this.lastChunk;
      do {
        if (chunk.outro.length > 0) {
          lineIndex = chunk.outro.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.outro.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.outro + lineStr;
        }
        if (chunk.content.length > 0) {
          lineIndex = chunk.content.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.content.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.content + lineStr;
        }
        if (chunk.intro.length > 0) {
          lineIndex = chunk.intro.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.intro.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.intro + lineStr;
        }
      } while (chunk = chunk.previous);
      lineIndex = this.intro.lastIndexOf(n);
      if (lineIndex !== -1) {
        return this.intro.substr(lineIndex + 1) + lineStr;
      }
      return this.intro + lineStr;
    };
    MagicString.prototype.slice = function slice(start, end) {
      if (start === void 0)
        start = 0;
      if (end === void 0)
        end = this.original.length;
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      var result = "";
      var chunk = this.firstChunk;
      while (chunk && (chunk.start > start || chunk.end <= start)) {
        if (chunk.start < end && chunk.end >= end) {
          return result;
        }
        chunk = chunk.next;
      }
      if (chunk && chunk.edited && chunk.start !== start) {
        throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
      }
      var startChunk = chunk;
      while (chunk) {
        if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
          result += chunk.intro;
        }
        var containsEnd = chunk.start < end && chunk.end >= end;
        if (containsEnd && chunk.edited && chunk.end !== end) {
          throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
        }
        var sliceStart = startChunk === chunk ? start - chunk.start : 0;
        var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
        result += chunk.content.slice(sliceStart, sliceEnd);
        if (chunk.outro && (!containsEnd || chunk.end === end)) {
          result += chunk.outro;
        }
        if (containsEnd) {
          break;
        }
        chunk = chunk.next;
      }
      return result;
    };
    MagicString.prototype.snip = function snip(start, end) {
      var clone = this.clone();
      clone.remove(0, start);
      clone.remove(end, clone.original.length);
      return clone;
    };
    MagicString.prototype._split = function _split(index) {
      if (this.byStart[index] || this.byEnd[index]) {
        return;
      }
      var chunk = this.lastSearchedChunk;
      var searchForward = index > chunk.end;
      while (chunk) {
        if (chunk.contains(index)) {
          return this._splitChunk(chunk, index);
        }
        chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
      }
    };
    MagicString.prototype._splitChunk = function _splitChunk(chunk, index) {
      if (chunk.edited && chunk.content.length) {
        var loc = getLocator(this.original)(index);
        throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + ' \u2013 "' + chunk.original + '")');
      }
      var newChunk = chunk.split(index);
      this.byEnd[index] = chunk;
      this.byStart[index] = newChunk;
      this.byEnd[newChunk.end] = newChunk;
      if (chunk === this.lastChunk) {
        this.lastChunk = newChunk;
      }
      this.lastSearchedChunk = chunk;
      return true;
    };
    MagicString.prototype.toString = function toString2() {
      var str = this.intro;
      var chunk = this.firstChunk;
      while (chunk) {
        str += chunk.toString();
        chunk = chunk.next;
      }
      return str + this.outro;
    };
    MagicString.prototype.isEmpty = function isEmpty() {
      var chunk = this.firstChunk;
      do {
        if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) {
          return false;
        }
      } while (chunk = chunk.next);
      return true;
    };
    MagicString.prototype.length = function length() {
      var chunk = this.firstChunk;
      var length2 = 0;
      do {
        length2 += chunk.intro.length + chunk.content.length + chunk.outro.length;
      } while (chunk = chunk.next);
      return length2;
    };
    MagicString.prototype.trimLines = function trimLines() {
      return this.trim("[\\r\\n]");
    };
    MagicString.prototype.trim = function trim(charType) {
      return this.trimStart(charType).trimEnd(charType);
    };
    MagicString.prototype.trimEndAborted = function trimEndAborted(charType) {
      var rx = new RegExp((charType || "\\s") + "+$");
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) {
        return true;
      }
      var chunk = this.lastChunk;
      do {
        var end = chunk.end;
        var aborted = chunk.trimEnd(rx);
        if (chunk.end !== end) {
          if (this.lastChunk === chunk) {
            this.lastChunk = chunk.next;
          }
          this.byEnd[chunk.end] = chunk;
          this.byStart[chunk.next.start] = chunk.next;
          this.byEnd[chunk.next.end] = chunk.next;
        }
        if (aborted) {
          return true;
        }
        chunk = chunk.previous;
      } while (chunk);
      return false;
    };
    MagicString.prototype.trimEnd = function trimEnd(charType) {
      this.trimEndAborted(charType);
      return this;
    };
    MagicString.prototype.trimStartAborted = function trimStartAborted(charType) {
      var rx = new RegExp("^" + (charType || "\\s") + "+");
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) {
        return true;
      }
      var chunk = this.firstChunk;
      do {
        var end = chunk.end;
        var aborted = chunk.trimStart(rx);
        if (chunk.end !== end) {
          if (chunk === this.lastChunk) {
            this.lastChunk = chunk.next;
          }
          this.byEnd[chunk.end] = chunk;
          this.byStart[chunk.next.start] = chunk.next;
          this.byEnd[chunk.next.end] = chunk.next;
        }
        if (aborted) {
          return true;
        }
        chunk = chunk.next;
      } while (chunk);
      return false;
    };
    MagicString.prototype.trimStart = function trimStart(charType) {
      this.trimStartAborted(charType);
      return this;
    };
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var Bundle = function Bundle2(options) {
      if (options === void 0)
        options = {};
      this.intro = options.intro || "";
      this.separator = options.separator !== void 0 ? options.separator : "\n";
      this.sources = [];
      this.uniqueSources = [];
      this.uniqueSourceIndexByFilename = {};
    };
    Bundle.prototype.addSource = function addSource(source) {
      if (source instanceof MagicString) {
        return this.addSource({
          content: source,
          filename: source.filename,
          separator: this.separator
        });
      }
      if (!isObject(source) || !source.content) {
        throw new Error("bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`");
      }
      ["filename", "indentExclusionRanges", "separator"].forEach(function(option) {
        if (!hasOwnProp.call(source, option)) {
          source[option] = source.content[option];
        }
      });
      if (source.separator === void 0) {
        source.separator = this.separator;
      }
      if (source.filename) {
        if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
          this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
          this.uniqueSources.push({ filename: source.filename, content: source.content.original });
        } else {
          var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
          if (source.content.original !== uniqueSource.content) {
            throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
          }
        }
      }
      this.sources.push(source);
      return this;
    };
    Bundle.prototype.append = function append(str, options) {
      this.addSource({
        content: new MagicString(str),
        separator: options && options.separator || ""
      });
      return this;
    };
    Bundle.prototype.clone = function clone() {
      var bundle = new Bundle({
        intro: this.intro,
        separator: this.separator
      });
      this.sources.forEach(function(source) {
        bundle.addSource({
          filename: source.filename,
          content: source.content.clone(),
          separator: source.separator
        });
      });
      return bundle;
    };
    Bundle.prototype.generateDecodedMap = function generateDecodedMap(options) {
      var this$1 = this;
      if (options === void 0)
        options = {};
      var names = [];
      this.sources.forEach(function(source) {
        Object.keys(source.content.storedNames).forEach(function(name) {
          if (!~names.indexOf(name)) {
            names.push(name);
          }
        });
      });
      var mappings = new Mappings(options.hires);
      if (this.intro) {
        mappings.advance(this.intro);
      }
      this.sources.forEach(function(source, i) {
        if (i > 0) {
          mappings.advance(this$1.separator);
        }
        var sourceIndex = source.filename ? this$1.uniqueSourceIndexByFilename[source.filename] : -1;
        var magicString = source.content;
        var locate = getLocator(magicString.original);
        if (magicString.intro) {
          mappings.advance(magicString.intro);
        }
        magicString.firstChunk.eachNext(function(chunk) {
          var loc = locate(chunk.start);
          if (chunk.intro.length) {
            mappings.advance(chunk.intro);
          }
          if (source.filename) {
            if (chunk.edited) {
              mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
            } else {
              mappings.addUneditedChunk(sourceIndex, chunk, magicString.original, loc, magicString.sourcemapLocations);
            }
          } else {
            mappings.advance(chunk.content);
          }
          if (chunk.outro.length) {
            mappings.advance(chunk.outro);
          }
        });
        if (magicString.outro) {
          mappings.advance(magicString.outro);
        }
      });
      return {
        file: options.file ? options.file.split(/[/\\]/).pop() : null,
        sources: this.uniqueSources.map(function(source) {
          return options.file ? getRelativePath(options.file, source.filename) : source.filename;
        }),
        sourcesContent: this.uniqueSources.map(function(source) {
          return options.includeContent ? source.content : null;
        }),
        names,
        mappings: mappings.raw
      };
    };
    Bundle.prototype.generateMap = function generateMap(options) {
      return new SourceMap(this.generateDecodedMap(options));
    };
    Bundle.prototype.getIndentString = function getIndentString() {
      var indentStringCounts = {};
      this.sources.forEach(function(source) {
        var indentStr = source.content.indentStr;
        if (indentStr === null) {
          return;
        }
        if (!indentStringCounts[indentStr]) {
          indentStringCounts[indentStr] = 0;
        }
        indentStringCounts[indentStr] += 1;
      });
      return Object.keys(indentStringCounts).sort(function(a, b) {
        return indentStringCounts[a] - indentStringCounts[b];
      })[0] || "	";
    };
    Bundle.prototype.indent = function indent(indentStr) {
      var this$1 = this;
      if (!arguments.length) {
        indentStr = this.getIndentString();
      }
      if (indentStr === "") {
        return this;
      }
      var trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
      this.sources.forEach(function(source, i) {
        var separator = source.separator !== void 0 ? source.separator : this$1.separator;
        var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
        source.content.indent(indentStr, {
          exclude: source.indentExclusionRanges,
          indentStart
        });
        trailingNewline = source.content.lastChar() === "\n";
      });
      if (this.intro) {
        this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function(match, index) {
          return index > 0 ? indentStr + match : match;
        });
      }
      return this;
    };
    Bundle.prototype.prepend = function prepend(str) {
      this.intro = str + this.intro;
      return this;
    };
    Bundle.prototype.toString = function toString2() {
      var this$1 = this;
      var body = this.sources.map(function(source, i) {
        var separator = source.separator !== void 0 ? source.separator : this$1.separator;
        var str = (i > 0 ? separator : "") + source.content.toString();
        return str;
      }).join("");
      return this.intro + body;
    };
    Bundle.prototype.isEmpty = function isEmpty() {
      if (this.intro.length && this.intro.trim()) {
        return false;
      }
      if (this.sources.some(function(source) {
        return !source.content.isEmpty();
      })) {
        return false;
      }
      return true;
    };
    Bundle.prototype.length = function length() {
      return this.sources.reduce(function(length2, source) {
        return length2 + source.content.length();
      }, this.intro.length);
    };
    Bundle.prototype.trimLines = function trimLines() {
      return this.trim("[\\r\\n]");
    };
    Bundle.prototype.trim = function trim(charType) {
      return this.trimStart(charType).trimEnd(charType);
    };
    Bundle.prototype.trimStart = function trimStart(charType) {
      var rx = new RegExp("^" + (charType || "\\s") + "+");
      this.intro = this.intro.replace(rx, "");
      if (!this.intro) {
        var source;
        var i = 0;
        do {
          source = this.sources[i++];
          if (!source) {
            break;
          }
        } while (!source.content.trimStartAborted(charType));
      }
      return this;
    };
    Bundle.prototype.trimEnd = function trimEnd(charType) {
      var rx = new RegExp((charType || "\\s") + "+$");
      var source;
      var i = this.sources.length - 1;
      do {
        source = this.sources[i--];
        if (!source) {
          this.intro = this.intro.replace(rx, "");
          break;
        }
      } while (!source.content.trimEndAborted(charType));
      return this;
    };
    MagicString.Bundle = Bundle;
    MagicString.SourceMap = SourceMap;
    MagicString.default = MagicString;
    module.exports = MagicString;
  }
});

// src/utils.ts
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _globby = require('globby'); var _globby2 = _interopRequireDefault(_globby);
var _resolvefrom = require('resolve-from'); var _resolvefrom2 = _interopRequireDefault(_resolvefrom);
function getBabel() {
  const p = _resolvefrom2.default.silent(process.cwd(), "@babel/core");
  return p && _chunkBNJB64XRjs.__require.call(void 0, p);
}
function getPostcss() {
  const p = _resolvefrom2.default.silent(process.cwd(), "postcss");
  return p && _chunkBNJB64XRjs.__require.call(void 0, p);
}
function localRequire(moduleName) {
  const p = _resolvefrom2.default.silent(process.cwd(), moduleName);
  return p && _chunkBNJB64XRjs.__require.call(void 0, p);
}
async function removeFiles(patterns, dir) {
  const files = await _globby2.default.call(void 0, patterns, {
    cwd: dir,
    absolute: true
  });
  await Promise.all(files.map((file) => _fs2.default.promises.unlink(file)));
}
function rewriteImportMetaUrl(input, filename) {
  const helper = `var __import_meta_url = typeof document === 'undefined' ? 'file://' + __filename : new URL('${filename}', document.baseURI).href;`;
  let injectHelper = false;
  input = input.replace(/\bimport\.meta\.url\b/g, () => {
    injectHelper = true;
    return "__import_meta_url";
  });
  if (injectHelper) {
    input = input.replace(`"use strict";`, (m) => m + helper);
  }
  return input;
}
function debouncePromise(fn, delay, onError) {
  let timeout;
  let promiseInFly;
  let callbackPending;
  return function debounced(...args) {
    if (promiseInFly) {
      callbackPending = () => {
        debounced(...args);
        callbackPending = void 0;
      };
    } else {
      if (timeout != null)
        clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = void 0;
        promiseInFly = fn(...args).catch(onError).finally(() => {
          promiseInFly = void 0;
          if (callbackPending)
            callbackPending();
        });
      }, delay);
    }
  };
}

// src/load.ts
var import_parse = _chunkBNJB64XRjs.__toModule.call(void 0, require_parse());
var import_strip_json_comments = _chunkBNJB64XRjs.__toModule.call(void 0, require_strip_json_comments());

var _joycon = require('joycon'); var _joycon2 = _interopRequireDefault(_joycon);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var joycon = new (0, _joycon2.default)();
var loadJson = async (filepath) => {
  try {
    const content = (0, import_strip_json_comments.default)(await _fs2.default.promises.readFile(filepath, "utf8"));
    return (0, import_parse.parse)(content);
  } catch (error) {
    throw new Error(`Failed to parse ${_path2.default.relative(process.cwd(), filepath)}: ${error.message}`);
  }
};
var jsonLoader = {
  test: /\.json$/,
  async load(filepath) {
    return loadJson(filepath);
  }
};
joycon.addLoader(jsonLoader);
function loadTsConfig(cwd) {
  return joycon.load(["tsconfig.build.json", "tsconfig.json"], cwd, _path2.default.dirname(cwd));
}
async function loadTsupConfig(cwd) {
  const configJoycon = new (0, _joycon2.default)();
  const configPath = await configJoycon.resolve([
    "tsup.config.ts",
    "tsup.config.js",
    "tsup.config.cjs",
    "tsup.config.mjs",
    "tsup.config.json",
    "package.json"
  ], cwd, _path2.default.dirname(cwd));
  if (configPath) {
    if (configPath.endsWith(".json")) {
      let data = await loadJson(configPath);
      if (configPath.endsWith("package.json")) {
        data = data.tsup;
      }
      if (data) {
        return { path: configPath, data };
      }
      return {};
    }
    const config = await bundleConfig(configPath);
    return { path: configPath, data: config };
  }
  return {};
}
function removeFile(filepath) {
  if (_fs2.default.existsSync(filepath)) {
    _fs2.default.unlinkSync(filepath);
  }
}
async function bundleConfig(configFile) {
  const { build } = await Promise.resolve().then(() => _chunkBNJB64XRjs.__toModule.call(void 0, _chunkBNJB64XRjs.__require.call(void 0, "esbuild")));
  const outFile = configFile.replace(/\.[a-z]+$/, ".bundled.cjs");
  const readConfig = () => {
    delete eval(`require.cache`)[outFile];
    const result = _chunkBNJB64XRjs.__require.call(void 0, outFile);
    removeFile(outFile);
    return result.tsup || result.default || result;
  };
  try {
    await build({
      entryPoints: [configFile],
      format: "cjs",
      outfile: outFile,
      platform: "node",
      bundle: true,
      plugins: [
        {
          name: "ignore",
          setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
              if (!_path2.default.isAbsolute(args.path) && !/^[\.\/]/.test(args.path)) {
                return { external: true };
              }
            });
            build.onLoad({ filter: /\.(js|ts|mjs|cjs|jsx|tsx)$/ }, async (args) => {
              const contents = await _fs2.default.promises.readFile(args.path, "utf8");
              const ext = _path2.default.extname(args.path);
              return {
                contents: contents.replace(/\b__dirname\b/g, JSON.stringify(_path2.default.dirname(args.path))).replace(/\b__filename\b/g, JSON.stringify(args.path)).replace(/\bimport\.meta\.url\b/g, JSON.stringify(`file://${args.path}`)),
                loader: ext === ".mjs" || ext === ".cjs" ? "js" : ext.slice(1)
              };
            });
          }
        }
      ]
    });
    const config = readConfig();
    return config;
  } catch (error) {
    removeFile(outFile);
    throw error;
  }
}
async function loadPkg(cwd) {
  const { data } = await joycon.load(["package.json"], cwd, _path2.default.dirname(cwd));
  return data || {};
}
async function getDeps(cwd) {
  const data = await loadPkg(cwd);
  const deps = Array.from(new Set([
    ...Object.keys(data.dependencies || {}),
    ...Object.keys(data.peerDependencies || {})
  ]));
  return deps;
}

// src/log.ts
var _chalk = require('chalk'); var _chalk2 = _interopRequireDefault(_chalk);
var makeLabel = (input, type) => _chalk2.default[type === "info" ? "bgBlue" : type === "error" ? "bgRed" : "bgGreen"](_chalk2.default.black(` ${input.toUpperCase()} `));
var silent = false;
function setSilent(isSilent) {
  silent = !!isSilent;
}
function log(label, type, ...data) {
  switch (type) {
    case "error": {
      return console.error(makeLabel(label, type), ...data);
    }
    default:
      if (silent)
        return;
      console.log(makeLabel(label, type), ...data);
  }
}















exports.require_magic_string_cjs = require_magic_string_cjs; exports.getBabel = getBabel; exports.getPostcss = getPostcss; exports.localRequire = localRequire; exports.removeFiles = removeFiles; exports.rewriteImportMetaUrl = rewriteImportMetaUrl; exports.debouncePromise = debouncePromise; exports.loadTsConfig = loadTsConfig; exports.loadTsupConfig = loadTsupConfig; exports.loadPkg = loadPkg; exports.getDeps = getDeps; exports.setSilent = setSilent; exports.log = log;
