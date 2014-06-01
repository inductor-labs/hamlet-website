define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),o=e("./text").Mode,r=e("../tokenizer").Tokenizer,i=e("./csharp_highlight_rules").CSharpHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./behaviour/cstyle").CstyleBehaviour,c=e("./folding/cstyle").FoldMode,u=function(){this.$tokenizer=new r((new i).getRules()),this.$outdent=new a,this.$behaviour=new s,this.foldingRules=new c};n.inherits(u,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),r=this.$tokenizer.getLineTokens(t,e),i=r.tokens;if(i.length&&"comment"==i[i.length-1].type)return o;if("start"==e){var a=t.match(/^.*[\{\(\[]\s*$/);a&&(o+=n)}return o},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(){return null}}.call(u.prototype),t.Mode=u}),define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./doc_comment_highlight_rules").DocCommentHighlightRules,r=e("./text_highlight_rules").TextHighlightRules,i=function(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"abstract|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic","constant.language":"null|true|false"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))'/},{token:"string",start:'"',end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"string",start:'@"',end:'"',next:[{token:"constant.language.escape",regex:'""'}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}]},this.embedRules(o,"doc-",[o.getEndRule("start")]),this.normalizeRules()};n.inherits(i,r),t.CSharpHighlightRules=i}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(r,o),r.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},r.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=r}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var o=e.getLine(t),r=o.match(/^(\s*\})/);if(!r)return 0;var i=r[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),o=e("../behaviour").Behaviour,r=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],c=0,u=-1,l="",g=0,d=-1,h="",f="",m=function(){m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),o=new r(t,n.row,n.column);if(!this.$matchTokenType(o.getCurrentToken()||"text",a)){var i=new r(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return o.stepForward(),o.getCurrentTokenRow()!==n.row||this.$matchTokenType(o.getCurrentToken()||"text",s)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,r,l[0])||(c=0),u=o.row,l=n+r.substr(o.column),c++},m.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,r)||(g=0),d=o.row,h=r.substr(0,o.column)+n,f=r.substr(o.column),g++},m.isAutoInsertedClosing=function(e,t,n){return c>0&&e.row===u&&n===l[0]&&t.substr(e.column)===l},m.isMaybeInsertedClosing=function(e,t){return g>0&&e.row===d&&t.substr(e.column)===f&&t.substr(0,e.column)==h},m.popAutoInsertedClosing=function(){l=l.substr(1),c--},m.clearMaybeInsertedClosing=function(){g=0,d=-1},this.add("braces","insertion",function(e,t,n,o,r){var a=n.getCursorPosition(),s=o.doc.getLine(a.row);if("{"==r){var c=n.getSelectionRange(),u=o.doc.getTextRange(c);if(""!==u&&"{"!==u&&n.getWrapBehavioursEnabled())return{text:"{"+u+"}",selection:!1};if(m.isSaneInsertion(n,o))return/[\]\}\)]/.test(s[a.column])?(m.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==r){var l=s.substring(a.column,a.column+1);if("}"==l){var d=o.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&m.isAutoInsertedClosing(a,s,r))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else if("\n"==r||"\r\n"==r){var h="";m.isMaybeInsertedClosing(a,s)&&(h=i.stringRepeat("}",g),m.clearMaybeInsertedClosing());var l=s.substring(a.column,a.column+1);if("}"==l||""!==h){var f=o.findMatchingBracket({row:a.row,column:a.column},"}");if(!f)return null;var p=this.getNextLineIndent(e,s.substring(0,a.column),o.getTabString()),x=this.$getIndent(s);return{text:"\n"+p+"\n"+x+h,selection:[1,p.length,1,p.length]}}}}),this.add("braces","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"{"==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.end.column,r.end.column+1);if("}"==s)return r.end.column++,r;g--}}),this.add("parens","insertion",function(e,t,n,o,r){if("("==r){var i=n.getSelectionRange(),a=o.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(m.isSaneInsertion(n,o))return m.recordAutoInsert(n,o,")"),{text:"()",selection:[1,1]}}else if(")"==r){var s=n.getCursorPosition(),c=o.doc.getLine(s.row),u=c.substring(s.column,s.column+1);if(")"==u){var l=o.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==l&&m.isAutoInsertedClosing(s,c,r))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"("==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(")"==s)return r.end.column++,r}}),this.add("brackets","insertion",function(e,t,n,o,r){if("["==r){var i=n.getSelectionRange(),a=o.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(m.isSaneInsertion(n,o))return m.recordAutoInsert(n,o,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){var s=n.getCursorPosition(),c=o.doc.getLine(s.row),u=c.substring(s.column,s.column+1);if("]"==u){var l=o.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==l&&m.isAutoInsertedClosing(s,c,r))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"["==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if("]"==s)return r.end.column++,r}}),this.add("string_dquotes","insertion",function(e,t,n,o,r){if('"'==r||"'"==r){var i=r,a=n.getSelectionRange(),s=o.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var c=n.getCursorPosition(),u=o.doc.getLine(c.row),l=u.substring(c.column-1,c.column);if("\\"==l)return null;for(var g,d=o.getTokens(a.start.row),h=0,f=-1,p=0;p<d.length&&(g=d[p],"string"==g.type?f=-1:0>f&&(f=g.value.indexOf(i)),!(g.value.length+h>a.start.column));p++)h+=d[p].value.length;if(!g||0>f&&"comment"!==g.type&&("string"!==g.type||a.start.column!==g.value.length+h-1&&g.value.lastIndexOf(i)===g.value.length-1)){if(!m.isSaneInsertion(n,o))return;return{text:i+i,selection:[1,1]}}if(g&&"string"===g.type){var x=u.substring(c.column,c.column+1);if(x==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&('"'==i||"'"==i)){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(s==i)return r.end.column++,r}})};n.inherits(m,o),t.CstyleBehaviour=m}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),o=(e("../../range").Range,e("./fold_mode").FoldMode),r=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(r,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var o=e.getLine(n),r=o.match(this.foldingStartMarker);if(r){var i=r.index;return r[1]?this.openingBracketBlock(e,r[1],n,i):e.getCommentFoldRange(n,i+r[0].length,1)}if("markbeginend"===t){var r=o.match(this.foldingStopMarker);if(r){var i=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,i):e.getCommentFoldRange(n,i,-1)}}}}.call(r.prototype)});