/*
 * r.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * This program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */
define("ace/mode/r",["require","exports","module","ace/range","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/r_highlight_rules","ace/mode/matching_brace_outdent","ace/unicode"],function(e,t){var n=e("../range").Range,r=e("../lib/oop"),o=e("./text").Mode,i=e("../tokenizer").Tokenizer,a=(e("./text_highlight_rules").TextHighlightRules,e("./r_highlight_rules").RHighlightRules),s=e("./matching_brace_outdent").MatchingBraceOutdent,g=e("../unicode"),c=function(){this.$tokenizer=new i((new a).getRules()),this.$outdent=new s};r.inherits(c,o),function(){this.tokenRe=new RegExp("^["+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"._]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+g.packages.L+g.packages.Mn+g.packages.Mc+g.packages.Nd+g.packages.Pc+"._]|s])+","g"),this.$complements={"(":")","[":"]",'"':'"',"'":"'","{":"}"},this.$reOpen=/^[(["'{]$/,this.$reClose=/^[)\]"'}]$/,this.getNextLineIndent=function(e,t,n,r,o){return this.codeModel.getNextLineIndent(o,t,e,n,r)},this.allowAutoInsert=this.smartAllowAutoInsert,this.checkOutdent=function(e,t,n){return/^\s+$/.test(t)?/^\s*[\{\}\)]/.test(n):!1},this.getIndentForOpenBrace=function(e){return this.codeModel.getIndentForOpenBrace(e)},this.autoOutdent=function(e,t,r){if(0==r)return 0;var o=t.getLine(r),i=o.match(/^(\s*[\}\)])/);if(i){var a=i[1].length,s=t.findMatchingBracket({row:r,column:a});if(!s||s.row==r)return 0;var g=this.codeModel.getIndentForOpenBrace(s);t.replace(new n(r,0,r,a-1),g)}if(i=o.match(/^(\s*\{)/)){var a=i[1].length,g=this.codeModel.getBraceIndent(r-1);t.replace(new n(r,0,r,a-1),g)}},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""},this.transformAction=function(e,t,n,r,o){if("insertion"===t&&"\n"===o){var i=n.getSelectionRange().start,a=/^((\s*#+')\s*)/.exec(r.doc.getLine(i.row));if(a&&n.getSelectionRange().start.column>=a[2].length)return{text:"\n"+a[1]}}return!1}}.call(c.prototype),t.Mode=c}),define("ace/mode/r_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/tex_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("../lib/lang"),o=e("./text_highlight_rules").TextHighlightRules,i=e("./tex_highlight_rules").TexHighlightRules,a=function(){var e=r.arrayToMap("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass".split("|")),t=r.arrayToMap("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|NA_complex_".split("|"));this.$rules={start:[{token:"comment.sectionhead",regex:"#+(?!').*(?:----|====|####)\\s*$"},{token:"comment",regex:"#+'",next:"rd-start"},{token:"comment",regex:"#.*$"},{token:"string",regex:'["]',next:"qqstring"},{token:"string",regex:"[']",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+[Li]?\\b"},{token:"constant.numeric",regex:"\\d+L\\b"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.numeric",regex:"\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"},{token:"constant.language.boolean",regex:"(?:TRUE|FALSE|T|F)\\b"},{token:"identifier",regex:"`.*?`"},{onMatch:function(n){return e[n]?"keyword":t[n]?"constant.language":"..."==n||n.match(/^\.\.\d+$/)?"variable.language":"identifier"},regex:"[a-zA-Z.][a-zA-Z0-9._]*\\b"},{token:"keyword.operator",regex:"%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"},{token:"keyword.operator",regex:"%.*?%"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]};for(var n=new i("comment").getRules(),o=0;o<n.start.length;o++)n.start[o].token+=".virtual-comment";this.addRules(n,"rd-"),this.$rules["rd-start"].unshift({token:"text",regex:"^",next:"start"}),this.$rules["rd-start"].unshift({token:"keyword",regex:"@(?!@)[^ ]*"}),this.$rules["rd-start"].unshift({token:"comment",regex:"@@"}),this.$rules["rd-start"].push({token:"comment",regex:"[^%\\\\[({\\])}]+"})};n.inherits(a,o),t.RHighlightRules=a}),define("ace/mode/tex_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=(e("../lib/lang"),e("./text_highlight_rules").TextHighlightRules),o=function(e){e||(e="text"),this.$rules={start:[{token:"comment",regex:"%.*$"},{token:e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",next:"nospell"},{token:"keyword",regex:"\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])}]"},{token:e,regex:"\\s+"}],nospell:[{token:"comment",regex:"%.*$",next:"start"},{token:"nospell."+e,regex:"\\\\[$&%#\\{\\}]"},{token:"keyword",regex:"\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"},{token:"keyword",regex:"\\\\(?:[a-zA-z0-9]+|[^a-zA-z0-9])",next:"start"},{token:"paren.keyword.operator",regex:"[[({]"},{token:"paren.keyword.operator",regex:"[\\])]"},{token:"paren.keyword.operator",regex:"}",next:"start"},{token:"nospell."+e,regex:"\\s+"},{token:"nospell."+e,regex:"\\w+"}]}};n.inherits(o,r),t.TexHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r});