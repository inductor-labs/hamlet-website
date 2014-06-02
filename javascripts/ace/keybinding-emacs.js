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
define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"],function(e,n){var t=e("../lib/dom");e("../incremental_search");var o=e("../commands/incremental_search_commands"),a=function(e,n){var t=this.scroller.getBoundingClientRect(),o=Math.floor((e+this.scrollLeft-t.left-this.$padding)/this.characterWidth),a=Math.floor((n+this.scrollTop-t.top)/this.lineHeight);return this.session.screenToDocumentPosition(a,o)},r=e("./hash_handler").HashHandler;n.handler=new r,n.handler.isEmacs=!0;var i,s,c=!1;n.handler.attach=function(e){c||(c=!0,t.importCssString("            .emacs-mode .ace_cursor{                border: 2px rgba(50,250,50,0.8) solid!important;                -moz-box-sizing: border-box!important;                -webkit-box-sizing: border-box!important;                box-sizing: border-box!important;                background-color: rgba(0,250,0,0.9);                opacity: 0.5;            }            .emacs-mode .ace_cursor.ace_hidden{                opacity: 1;                background-color: transparent;            }            .emacs-mode .ace_overwrite-cursors .ace_cursor {                opacity: 1;                background-color: transparent;                border-width: 0 0 2px 2px !important;            }            .emacs-mode .ace_text-layer {                z-index: 4            }            .emacs-mode .ace_cursor-layer {                z-index: 2            }","emacsMode")),i=e.session.$selectLongWords,e.session.$selectLongWords=!0,s=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.$emacsMark=null,e.emacsMarkMode=function(){return this.session.$emacsMark},e.setEmacsMarkMode=function(e){this.session.$emacsMark=e},e.on("click",d),e.on("changeSession",l),e.renderer.screenToTextCoordinates=a,e.setStyle("emacs-mode"),e.commands.addCommands(g),n.handler.platform=e.commands.platform,e.$emacsModeHandler=this},n.handler.detach=function(e){delete e.renderer.screenToTextCoordinates,e.session.$selectLongWords=i,e.session.$useEmacsStyleLineStart=s,e.removeEventListener("click",d),e.removeEventListener("changeSession",l),e.unsetStyle("emacs-mode"),e.commands.removeCommands(g)};var l=function(e){e.oldSession&&(e.oldSession.$selectLongWords=i,e.oldSession.$useEmacsStyleLineStart=s),i=e.session.$selectLongWords,e.session.$selectLongWords=!0,s=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.hasOwnProperty("$emacsMark")||(e.session.$emacsMark=null)},d=function(e){e.editor.session.$emacsMark=null},m=e("../lib/keys").KEY_MODS,h={C:"ctrl",S:"shift",M:"alt",CMD:"command"},u=["C-S-M-CMD","S-M-CMD","C-M-CMD","C-S-CMD","C-S-M","M-CMD","S-CMD","S-M","C-CMD","C-M","C-S","CMD","M","S","C"];u.forEach(function(e){var n=0;e.split("-").forEach(function(e){n|=m[h[e]]}),h[n]=e.toLowerCase()+"-"}),n.handler.bindKey=function(e,n){if(e){var t=this.commmandKeyBinding;e.split("|").forEach(function(e){e=e.toLowerCase(),t[e]=n,e=e.split(" ")[0],t[e]||(t[e]="null")},this)}},n.handler.handleKeyboard=function(e,n,t){var o=e.editor;if(-1==n&&(o.setEmacsMarkMode(null),e.count)){var a=Array(e.count+1).join(t);return e.count=null,{command:"insertstring",args:a}}if("\x00"==t)return void 0;var r=h[n];if("c-"==r||e.universalArgument){var i=parseInt(t[t.length-1]);if(i)return e.count=i,{command:"null"}}e.universalArgument=!1,r&&(t=r+t),e.keyChain&&(t=e.keyChain+=" "+t);var s=this.commmandKeyBinding[t];if(e.keyChain="null"==s?t:"",!s)return void 0;if("null"===s)return{command:"null"};if("universalArgument"===s)return e.universalArgument=!0,{command:"null"};var c;if("string"!=typeof s&&(c=s.args,s.command&&(s=s.command),"goorselect"===s&&(s=o.emacsMarkMode()?c[1]:c[0],c=null)),"string"==typeof s&&(("insertstring"===s||"splitline"===s||"togglecomment"===s)&&o.setEmacsMarkMode(null),s=this.commands[s]||o.commands.commands[s],!s))return void 0;if(s.readonly||s.isYank||(e.lastCommand=null),e.count){var i=e.count;return e.count=0,{args:c,command:{exec:function(e,n){for(var t=0;i>t;t++)s.exec(e,n)}}}}return{command:s,args:c}},n.emacsKeys={"Up|C-p":{command:"goorselect",args:["golineup","selectup"]},"Down|C-n":{command:"goorselect",args:["golinedown","selectdown"]},"Left|C-b":{command:"goorselect",args:["gotoleft","selectleft"]},"Right|C-f":{command:"goorselect",args:["gotoright","selectright"]},"C-Left|M-b":{command:"goorselect",args:["gotowordleft","selectwordleft"]},"C-Right|M-f":{command:"goorselect",args:["gotowordright","selectwordright"]},"Home|C-a":{command:"goorselect",args:["gotolinestart","selecttolinestart"]},"End|C-e":{command:"goorselect",args:["gotolineend","selecttolineend"]},"C-Home|S-M-,":{command:"goorselect",args:["gotostart","selecttostart"]},"C-End|S-M-.":{command:"goorselect",args:["gotoend","selecttoend"]},"S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l":"recenterTopBottom","M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"C-Up":{command:"goorselect",args:["gotopageup","selectpageup"]},"PageDown|C-v":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"PageUp|M-v":{command:"goorselect",args:["gotopageup","selectpageup"]},"S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"iSearch","C-r":"iSearchBackwards","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:"\n"},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion","M-x":{command:"focusCommandLine",args:"M-x "}},n.handler.bindKeys(n.emacsKeys),n.handler.addCommands({recenterTopBottom:function(e){var n=e.renderer,t=n.$cursorLayer.getPixelPosition(),o=n.$size.scrollerHeight-n.lineHeight,a=n.scrollTop;a=Math.abs(t.top-a)<2?t.top-o:Math.abs(t.top-a-.5*o)<2?t.top:t.top-.5*o,e.session.setScrollTop(a)},selectRectangularRegion:function(e){e.multiSelect.toggleBlockSelection()},setMark:function(e){var n=e.emacsMarkMode();if(n){var t=e.getCursorPosition();if(e.selection.isEmpty()&&n.row==t.row&&n.column==t.column)return void e.setEmacsMarkMode(null)}n=e.getCursorPosition(),e.setEmacsMarkMode(n),e.selection.setSelectionAnchor(n.row,n.column)},exchangePointAndMark:{exec:function(e){var n=e.selection.getRange();e.selection.setSelectionRange(n,!e.selection.isBackwards())},readonly:!0,multiselectAction:"forEach"},killWord:{exec:function(e,t){e.clearSelection(),"left"==t?e.selection.selectWordLeft():e.selection.selectWordRight();var o=e.getSelectionRange(),a=e.session.getTextRange(o);n.killRing.add(a),e.session.remove(o),e.clearSelection()},multiselectAction:"forEach"},killLine:function(e){e.setEmacsMarkMode(null);var t=e.getCursorPosition();0==t.column&&0==e.session.doc.getLine(t.row).length?e.selection.selectLine():(e.clearSelection(),e.selection.selectLineEnd());var o=e.getSelectionRange(),a=e.session.getTextRange(o);n.killRing.add(a),e.session.remove(o),e.clearSelection()},yank:function(e){e.onPaste(n.killRing.get()),e.keyBinding.$data.lastCommand="yank"},yankRotate:function(e){"yank"==e.keyBinding.$data.lastCommand&&(e.undo(),e.onPaste(n.killRing.rotate()),e.keyBinding.$data.lastCommand="yank")},killRegion:function(e){n.killRing.add(e.getCopyText()),e.commands.byName.cut.exec(e)},killRingSave:function(e){n.killRing.add(e.getCopyText())},keyboardQuit:function(e){e.selection.clearSelection(),e.setEmacsMarkMode(null)},focusCommandLine:function(e,n){e.showCommandLine&&e.showCommandLine(n)}}),n.handler.addCommands(o.iSearchStartCommands);var g=n.handler.commands;g.yank.isYank=!0,g.yankRotate.isYank=!0,n.killRing={$data:[],add:function(e){e&&this.$data.push(e),this.$data.length>30&&this.$data.shift()},get:function(){return this.$data[this.$data.length-1]||""},pop:function(){return this.$data.length>1&&this.$data.pop(),this.get()},rotate:function(){return this.$data.unshift(this.$data.pop()),this.get()}}}),define("ace/incremental_search",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"],function(e,n){function t(){this.$options={wrap:!1,skipCurrent:!1},this.$keyboardHandler=new c(this)}var o=e("./lib/oop"),a=e("./range").Range,r=e("./search").Search,i=e("./search_highlight").SearchHighlight,s=e("./commands/incremental_search_commands"),c=s.IncrementalSearchKeyboardHandler;o.inherits(t,r),function(){this.activate=function(e,n){this.$editor=e,this.$startPos=this.$currentPos=e.getCursorPosition(),this.$options.needle="",this.$options.backwards=n,e.keyBinding.addKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler=e.addEventListener("mousedown",this.onMouseDown.bind(this)),this.selectionFix(e),this.statusMessage(!0)},this.deactivate=function(e){this.cancelSearch(e),this.$editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler&&(this.$editor.removeEventListener("mousedown",this.$mousedownHandler),delete this.$mousedownHandler),this.message("")},this.selectionFix=function(e){e.selection.isEmpty()&&!e.session.$emacsMark&&e.clearSelection()},this.highlight=function(e){var n=this.$editor.session,t=n.$isearchHighlight=n.$isearchHighlight||n.addDynamicMarker(new i(null,"ace_isearch-result","text"));t.setRegexp(e),n._emit("changeBackMarker")},this.cancelSearch=function(e){var n=this.$editor;return this.$prevNeedle=this.$options.needle,this.$options.needle="",e&&(n.moveCursorToPosition(this.$startPos),this.$currentPos=this.$startPos),this.highlight(null),a.fromPoints(this.$currentPos,this.$currentPos)},this.highlightAndFindWithNeedle=function(e,n){if(!this.$editor)return null;var t=this.$options;if(n&&(t.needle=n.call(this,t.needle||"")||""),0===t.needle.length)return this.statusMessage(!0),this.cancelSearch(!0);t.start=this.$currentPos;var o=this.$editor.session,r=this.find(o);return r&&(t.backwards&&(r=a.fromPoints(r.end,r.start)),this.$editor.moveCursorToPosition(r.end),e&&(this.$currentPos=r.end),this.highlight(t.re)),this.statusMessage(r),r},this.addChar=function(e){return this.highlightAndFindWithNeedle(!1,function(n){return n+e})},this.removeChar=function(){return this.highlightAndFindWithNeedle(!1,function(e){return e.length>0?e.substring(0,e.length-1):e})},this.next=function(e){return e=e||{},this.$options.backwards=!!e.backwards,this.$currentPos=this.$editor.getCursorPosition(),this.highlightAndFindWithNeedle(!0,function(n){return e.useCurrentOrPrevSearch&&0===n.length?this.$prevNeedle||"":n})},this.onMouseDown=function(){return this.deactivate(),!0},this.statusMessage=function(e){var n=this.$options,t="";t+=n.backwards?"reverse-":"",t+="isearch: "+n.needle,t+=e?"":" (not found)",this.message(t)},this.message=function(e){this.$editor.showCommandLine?(this.$editor.showCommandLine(e),this.$editor.focus()):console.log(e)}}.call(t.prototype),n.IncrementalSearch=t;var l=e("./lib/dom");l.importCssString&&l.importCssString(".ace_marker-layer .ace_isearch-result {  position: absolute;  z-index: 6;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  box-sizing: border-box;}div.ace_isearch-result {  border-radius: 4px;  background-color: rgba(255, 200, 0, 0.5);  box-shadow: 0 0 4px rgb(255, 200, 0);}.ace_dark div.ace_isearch-result {  background-color: rgb(100, 110, 160);  box-shadow: 0 0 4px rgb(80, 90, 140);}","incremental-search-highlighting");var d=e("./commands/command_manager");(function(){this.setupIncrementalSearch=function(e,n){if(this.usesIncrementalSearch!=n){this.usesIncrementalSearch=n;var t=s.iSearchStartCommands,o=n?"addCommands":"removeCommands";this[o](t)}}}).call(d.CommandManager.prototype);var m=e("./editor").Editor;e("./config").defineOptions(m.prototype,"editor",{useIncrementalSearch:{set:function(e){this.keyBinding.$handlers.forEach(function(n){n.setupIncrementalSearch&&n.setupIncrementalSearch(this,e)}),this._emit("incrementalSearchSettingChanged",{isEnabled:e})}}})}),define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"],function(e,n){function t(e){this.$iSearch=e}var o=e("../config"),a=e("../lib/oop"),r=e("../keyboard/hash_handler").HashHandler,i=e("./occur_commands").occurStartCommand;n.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e,n){o.loadModule(["core","ace/incremental_search"],function(t){var o=t.iSearch=t.iSearch||new t.IncrementalSearch;o.activate(e,n.backwards),n.jumpToFirstMatch&&o.next(n)})},readOnly:!0},{name:"iSearchBackwards",exec:function(e){e.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],n.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e){e.cancelSearch(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(e,n){n.useCurrentOrPrevSearch=!0,e.next(n)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(e,n){n.useCurrentOrPrevSearch=!0,n.backwards=!0,e.next(n)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTerm",exec:function(e,n){e.addChar(n)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTermSpace",bindKey:"space",exec:function(e){e.addChar(" ")},readOnly:!0,isIncrementalSearchCommand:!0},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(e){e.removeChar()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"confirmSearch",bindKey:"return",exec:function(e){e.deactivate()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(e){e.deactivate(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(e){var n=a.mixin({},e.$options);e.deactivate(),i.exec(e.$editor,n)},readOnly:!0,isIncrementalSearchCommand:!0}],a.inherits(t,r),function(){this.attach=function(e){var t=this.$iSearch;r.call(this,n.iSearchCommands,e.commands.platform),this.$commandExecHandler=e.commands.addEventListener("exec",function(e){return e.command.isIncrementalSearchCommand?(e.stopPropagation(),e.preventDefault(),e.command.exec(t,e.args||{})):void 0})},this.detach=function(e){this.$commandExecHandler&&(e.commands.removeEventListener("exec",this.$commandExecHandler),delete this.$commandExecHandler)};var e=this.handleKeyboard;this.handleKeyboard=function(n,t,o,a){var r=e.call(this,n,t,o,a);if(r.command)return r;if(-1==t){var i=this.commands.extendSearchTerm;if(i)return{command:i,args:o}}return{command:"null",passEvent:0==t||4==t}}}.call(t.prototype),n.IncrementalSearchKeyboardHandler=t}),define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"],function(e,n){function t(){}var o=(e("../config"),e("../occur").Occur),a={name:"occur",exec:function(e,n){var a=!!e.session.$occur,r=(new o).enter(e,n);r&&!a&&t.installIn(e)},readOnly:!0},r=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(e){var n=e.session.$occur;n&&(n.exit(e,{}),e.session.$occur||t.uninstallFrom(e))},readOnly:!0},{name:"occuraccept",bindKey:"enter",exec:function(e){var n=e.session.$occur;n&&(n.exit(e,{translatePosition:!0}),e.session.$occur||t.uninstallFrom(e))},readOnly:!0}],i=e("../keyboard/hash_handler").HashHandler,s=e("../lib/oop");s.inherits(t,i),function(){this.isOccurHandler=!0,this.attach=function(e){i.call(this,r,e.commands.platform),this.$editor=e};var e=this.handleKeyboard;this.handleKeyboard=function(n,t,o,a){var r=e.call(this,n,t,o,a);return r&&r.command?r:void 0}}.call(t.prototype),t.installIn=function(e){var n=new this;e.keyBinding.addKeyboardHandler(n),e.commands.addCommands(r)},t.uninstallFrom=function(e){e.commands.removeCommands(r);var n=e.getKeyboardHandler();n.isOccurHandler&&e.keyBinding.removeKeyboardHandler(n)},n.occurStartCommand=a}),define("ace/occur",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"],function(e,n){function t(){}var o=e("./lib/oop"),a=(e("./range").Range,e("./search").Search),r=e("./edit_session").EditSession,i=e("./search_highlight").SearchHighlight;o.inherits(t,a),function(){this.enter=function(e,n){if(!n.needle)return!1;var t=e.getCursorPosition();this.displayOccurContent(e,n);var o=this.originalToOccurPosition(e.session,t);return e.moveCursorToPosition(o),!0},this.exit=function(e,n){var t=n.translatePosition&&e.getCursorPosition(),o=t&&this.occurToOriginalPosition(e.session,t);return this.displayOriginalContent(e),o&&e.moveCursorToPosition(o),!0},this.highlight=function(e,n){var t=e.$occurHighlight=e.$occurHighlight||e.addDynamicMarker(new i(null,"ace_occur-highlight","text"));t.setRegexp(n),e._emit("changeBackMarker")},this.displayOccurContent=function(e,n){this.$originalSession=e.session;var t=this.matchingLines(e.session,n),o=t.map(function(e){return e.content}),a=new r(o.join("\n"));a.$occur=this,a.$occurMatchingLines=t,e.setSession(a),this.highlight(a,n.re),a._emit("changeBackMarker")},this.displayOriginalContent=function(e){e.setSession(this.$originalSession)},this.originalToOccurPosition=function(e,n){var t=e.$occurMatchingLines,o={row:0,column:0};if(!t)return o;for(var a=0;a<t.length;a++)if(t[a].row===n.row)return{row:a,column:n.column};return o},this.occurToOriginalPosition=function(e,n){var t=e.$occurMatchingLines;return t&&t[n.row]?{row:t[n.row].row,column:n.column}:n},this.matchingLines=function(e,n){if(n=o.mixin({},n),!e||!n.needle)return[];var t=new a;return t.set(n),t.findAll(e).reduce(function(n,t){var o=t.start.row,a=n[n.length-1];return a&&a.row===o?n:n.concat({row:o,content:e.getLine(o)})},[])}}.call(t.prototype);var s=e("./lib/dom");s.importCssString(".ace_occur-highlight {\n    border-radius: 4px;\n    background-color: rgba(87, 255, 8, 0.25);\n    position: absolute;\n    z-index: 4;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    box-shadow: 0 0 4px rgb(91, 255, 50);\n}\n.ace_dark .ace_occur-highlight {\n    background-color: rgb(80, 140, 85);\n    box-shadow: 0 0 4px rgb(60, 120, 70);\n}\n","incremental-occur-highlighting"),n.Occur=t});