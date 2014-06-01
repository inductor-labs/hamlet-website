/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,o=e("../tokenizer").Tokenizer,i=e("./xml_highlight_rules").XmlHighlightRules,a=e("./behaviour/xml").XmlBehaviour,s=e("./folding/xml").FoldMode,u=function(){this.$tokenizer=new o((new i).getRules()),this.$behaviour=new a,this.foldingRules=new s};n.inherits(u,r),function(){this.blockComment={start:"<!--",end:"-->"}}.call(u.prototype),t.Mode=u}),define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./xml_util"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml-pe",regex:"<\\?.*?\\?>"},{token:"comment",regex:"<\\!--",next:"comment"},{token:"xml-pe",regex:"<\\!.*?>"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"constant.character.entity",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",regex:".+"}]},r.tag(this.$rules,"tag","start")};n.inherits(i,o),t.XmlHighlightRules=i}),define("ace/mode/xml_util",["require","exports","module"],function(e,t){function n(e){return[{token:"string",regex:'"',next:e+"_qqstring"},{token:"string",regex:"'",next:e+"_qstring"}]}function r(e,t){return[{token:"string",regex:e,next:t},{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{defaultToken:"string"}]}t.tag=function(e,t,o,i){e[t]=[{token:"text",regex:"\\s+"},{token:i?function(e){return i[e]?"meta.tag.tag-name."+i[e]:"meta.tag.tag-name"}:"meta.tag.tag-name",regex:"[-_a-zA-Z0-9:]+",next:t+"_embed_attribute_list"},{token:"empty",regex:"",next:t+"_embed_attribute_list"}],e[t+"_qstring"]=r("'",t+"_embed_attribute_list"),e[t+"_qqstring"]=r('"',t+"_embed_attribute_list"),e[t+"_embed_attribute_list"]=[{token:"meta.tag.r",regex:"/?>",next:o},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(n(t))}}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t){function n(e,t){var n=!0,r=e.type.split("."),o=t.split(".");return o.forEach(function(e){return-1==r.indexOf(e)?(n=!1,!1):void 0}),n}var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("./cstyle").CstyleBehaviour,a=e("../../token_iterator").TokenIterator,s=function(){this.inherit(i,["string_dquotes"]),this.add("autoclosing","insertion",function(e,t,r,o,i){if(">"==i){var s=r.getCursorPosition(),u=new a(o,s.row,s.column),l=u.getCurrentToken(),g=!1;if(l&&(n(l,"meta.tag")||n(l,"text")&&l.value.match("/")))g=!0;else do l=u.stepBackward();while(l&&(n(l,"string")||n(l,"keyword.operator")||n(l,"entity.attribute-name")||n(l,"text")));if(!l||!n(l,"meta.tag-name")||u.stepBackward().value.match("/"))return;var c=l.value;if(g)var c=c.substring(0,s.column-l.start);return{text:"></"+c+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,o){if("\n"==o){var i=n.getCursorPosition(),a=r.doc.getLine(i.row),s=a.substring(i.column,i.column+2);if("</"==s){var u=this.$getIndent(r.doc.getLine(i.row))+r.getTabString(),l=this.$getIndent(r.doc.getLine(i.row));return{text:"\n"+u+"\n"+l,selection:[1,u.length,1,u.length]}}}})};r.inherits(s,o),t.XmlBehaviour=s}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],u=0,l=-1,g="",c=0,d=-1,m="",f="",h=function(){h.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new o(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var i=new o(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",s)},h.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},h.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,g[0])||(u=0),l=r.row,g=n+o.substr(r.column),u++},h.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(c=0),d=r.row,m=o.substr(0,r.column)+n,f=o.substr(r.column),c++},h.isAutoInsertedClosing=function(e,t,n){return u>0&&e.row===l&&n===g[0]&&t.substr(e.column)===g},h.isMaybeInsertedClosing=function(e,t){return c>0&&e.row===d&&t.substr(e.column)===f&&t.substr(0,e.column)==m},h.popAutoInsertedClosing=function(){g=g.substr(1),u--},h.clearMaybeInsertedClosing=function(){c=0,d=-1},this.add("braces","insertion",function(e,t,n,r,o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row);if("{"==o){var u=n.getSelectionRange(),l=r.doc.getTextRange(u);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return{text:"{"+l+"}",selection:!1};if(h.isSaneInsertion(n,r))return/[\]\}\)]/.test(s[a.column])?(h.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(h.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){var g=s.substring(a.column,a.column+1);if("}"==g){var d=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&h.isAutoInsertedClosing(a,s,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else if("\n"==o||"\r\n"==o){var m="";h.isMaybeInsertedClosing(a,s)&&(m=i.stringRepeat("}",c),h.clearMaybeInsertedClosing());var g=s.substring(a.column,a.column+1);if("}"==g||""!==m){var f=r.findMatchingBracket({row:a.row,column:a.column},"}");if(!f)return null;var x=this.getNextLineIndent(e,s.substring(0,a.column),r.getTabString()),v=this.$getIndent(s);return{text:"\n"+x+"\n"+v+m,selection:[1,x.length,1,x.length]}}}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.end.column,o.end.column+1);if("}"==s)return o.end.column++,o;c--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if(")"==l){var g=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g&&h.isAutoInsertedClosing(s,u,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if("]"==l){var g=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==g&&h.isAutoInsertedClosing(s,u,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var u=n.getCursorPosition(),l=r.doc.getLine(u.row),g=l.substring(u.column-1,u.column);if("\\"==g)return null;for(var c,d=r.getTokens(a.start.row),m=0,f=-1,x=0;x<d.length&&(c=d[x],"string"==c.type?f=-1:0>f&&(f=c.value.indexOf(i)),!(c.value.length+m>a.start.column));x++)m+=d[x].value.length;if(!c||0>f&&"comment"!==c.type&&("string"!==c.type||a.start.column!==c.value.length+m-1&&c.value.lastIndexOf(i)===c.value.length-1)){if(!h.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(c&&"string"===c.type){var v=l.substring(u.column,u.column+1);if(v==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};n.inherits(h,r),t.CstyleBehaviour=h}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t){var n=e("../../lib/oop"),r=e("../../lib/lang"),o=e("../../range").Range,i=e("./fold_mode").FoldMode,a=e("../../token_iterator").TokenIterator,s=t.FoldMode=function(e){i.call(this),this.voidElements=e||{}};n.inherits(s,i),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?"markbeginend"==t?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]?"":r.selfClosing?"":-1!==r.value.indexOf("/"+r.tagName)?"":"start"},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),o="",i=0;i<n.length;i++){var a=n[i];o+=0===a.type.indexOf("meta.tag")?a.value:r.stringRepeat(" ",a.value.length)}return this._parseTag(o)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=this.tagRe.exec(e),n=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||"/>"==t[2]:!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,r="";do if(0===t.type.indexOf("meta.tag")){if(!n)var n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};if(r+=t.value,-1!==r.indexOf(">")){var o=this._parseTag(r);return o.start=n,o.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),o}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,r="";do if(0===t.type.indexOf("meta.tag")&&(n||(n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),r=t.value+r,-1!==r.indexOf("<"))){var o=this._parseTag(r);return o.end=n,o.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),o}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(t&&n.tagName!=t.tagName){if(this.voidElements[t.tagName])return;if(this.voidElements[n.tagName]){e.pop();continue}return null}return e.pop()}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var i,s=r.closing||r.selfClosing,u=[];if(s)for(var l=new a(e,n,r.column+r.match.length),g={row:n,column:r.column};i=this._readTagBackward(l);){if(i.selfClosing){if(u.length)continue;return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}if(i.closing)u.push(i);else if(this._pop(u,i),0==u.length)return i.start.column+=i.tagName.length+2,o.fromPoints(i.start,g)}else for(var l=new a(e,n,r.column),c={row:n,column:r.column+r.tagName.length+2};i=this._readTagForward(l);){if(i.selfClosing){if(u.length)continue;return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}if(i.closing){if(this._pop(u,i),0==u.length)return o.fromPoints(c,i.start)}else u.push(i)}}}.call(s.prototype)});