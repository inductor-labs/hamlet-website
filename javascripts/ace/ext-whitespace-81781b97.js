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
define("ace/ext/whitespace",["require","exports","module","ace/lib/lang"],function(e,t){var n=e("../lib/lang");t.$detectIndentation=function(e){function t(e){for(var t=0,r=e;r<n.length;r+=e)t+=n[r]||0;return t}for(var n=[],r=[],a=0,i=0,s=Math.min(e.length,1e3),o=0;s>o;o++){var c=e[o];if(/^\s*[^*+\-\s]/.test(c)){{c.match(/^\t*/)[0].length}"	"==c[0]&&a++;var g=c.match(/^ */)[0].length;if(g&&"	"!=c[g]){var h=g-i;!(h>0)||i%h||g%h||(r[h]=(r[h]||0)+1),n[g]=(n[g]||0)+1}for(i=g;"\\"==c[c.length-1];)c=e[o++]}}for(var l=r.reduce(function(e,t){return e+t},0),f={score:0,length:0},v=0,o=1;12>o;o++){if(1==o){v=t(o);var u=1}else var u=t(o)/v;r[o]&&(u+=r[o]/l),u>f.score&&(f={score:u,length:o})}if(f.score&&f.score>1.4)var d=f.length;return a>v+1?{ch:"	",length:d}:v+1>a?{ch:" ",length:d}:void 0},t.detectIndentation=function(e){var n=e.getLines(0,1e3),r=t.$detectIndentation(n)||{};return r.ch&&e.setUseSoftTabs(" "==r.ch),r.length&&e.setTabSize(r.length),r},t.trimTrailingSpace=function(e){for(var t=e.getDocument(),n=t.getAllLines(),r=0,a=n.length;a>r;r++){var i=n[r],s=i.search(/\s+$/);-1!==s&&t.removeInLine(r,s,i.length)}},t.convertIndentation=function(e,t,r){var a=e.getTabString()[0],i=e.getTabSize();r||(r=i),t||(t=a);for(var s="	"==t?t:n.stringRepeat(t,r),o=e.doc,c=o.getAllLines(),g={},h={},l=0,f=c.length;f>l;l++){var v=c[l],u=v.match(/^\s*/)[0];if(u){var d=e.$getStringScreenWidth(u)[0],m=Math.floor(d/i),p=d%i,S=g[m]||(g[m]=n.stringRepeat(s,m));S+=h[p]||(h[p]=n.stringRepeat(" ",p)),S!=u&&(o.removeInLine(l,0,u.length),o.insertInLine({row:l,column:0},S))}}e.setTabSize(r),e.setUseSoftTabs(" "==t)},t.$parseStringArg=function(e){var t={};/t/.test(e)?t.ch="	":/s/.test(e)&&(t.ch=" ");var n=e.match(/\d+/);return n&&(t.length=parseInt(n[0])),t},t.$parseArg=function(e){return e?"string"==typeof e?t.$parseStringArg(e):"string"==typeof e.text?t.$parseStringArg(e.text):e:{}},t.commands=[{name:"detectIndentation",exec:function(e){t.detectIndentation(e.session)}},{name:"trimTrailingSpace",exec:function(e){t.trimTrailingSpace(e.session)}},{name:"convertIndentation",exec:function(e,n){t.$parseArg(n);t.convertIndentation(e.session,n.ch,n.length)}},{name:"setIndentation",exec:function(e,n){var r=t.$parseArg(n);r.length&&e.session.setTabSize(r.length),r.ch&&e.session.setUseSoftTabs(" "==r.ch)}}]});