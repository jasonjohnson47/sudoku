(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{27:function(e,t,n){},29:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(14),o=n.n(a),i=(n(26),n(27),n(9)),l=n(5),u=n(11),s=n(10),h=n(1);var f=function(e){var t=e.row,n=e.column,r=e.value,c=e.isGiven,a=e.canBeSolved,o=e.isIncorrect,i=e.hasCandidate,l=e.isInGameMode,u=e.handleClick,f=e.handleKeyDown,d={value:[],disabled:!1},m="cell cell-row-".concat(t," cell-column-").concat(n).concat(c?" given":"").concat(a?" can-be-solved":"").concat(o?" incorrect":"").concat(i?" has-candidate":"");"number"===typeof r&&(d.value=r),c&&l&&(d.disabled=!0),"number"===typeof r&&!o&&l&&(d.disabled=!0);var v=[1,2,3,4,5,6,7,8,9].map((function(e){return Array.isArray(r)&&r.includes(e)?Object(h.jsx)("div",{children:e},"r".concat(t,"c").concat(n,"-p").concat(e)):Object(h.jsx)("div",{},"r".concat(t,"c").concat(n,"-p").concat(e))}));return Object(h.jsxs)("div",{id:"r".concat(t,"c").concat(n),className:m,children:[Object(h.jsx)("input",Object(s.a)({type:"text",maxLength:1,pattern:"[1-9]",inputMode:"none",onChange:function(){},onClick:function(e){return u([t,n],e)},onKeyDown:function(e){return f([t,n],e)}},d)),Array.isArray(r)&&Object(h.jsx)("div",{className:"candidates",children:v})]})},d=n(20),m=n(21);n(29);var v=function(e){var t=e.cellClicked,n=e.handleNumberPadButtonClick,c=e.handleCandidateButtonClick,a=e.hideNumberPad,o=e.isNumberPadActive,i=e.activeCellValue,u=e.completedGridCellValue,s=Object(r.useState)({top:"-9999px",bottom:"auto",left:"-9999px",right:"auto"}),f=Object(l.a)(s,2),v=f[0],g=f[1],b=Object(r.useState)(!1),p=Object(l.a)(b,2),j=p[0],y=p[1],O=t?t.parentElement:null,x=Object(r.useRef)(null);return Object(r.useEffect)((function(){var e=document.getElementById("grid"),t=x.current,n=function(n){var r=n.target;t.contains(r)||e.contains(r)||a()},r=function(e){"Escape"===e.key&&a()};return g(o&&null!==O?function(e,t){var n=document.getElementById("grid"),r=(null!==n?n.getBoundingClientRect():{x:0,y:0,width:454,height:454,top:0,bottom:454,left:0,right:454}).top+document.body.scrollTop,c=e.offsetHeight+e.offsetTop+r+t.offsetHeight,a=t.offsetWidth,o=e.offsetLeft+e.offsetWidth/2-a/2,i=o+a,l=document.documentElement.clientHeight,u=document.documentElement.clientWidth,s={top:e?e.offsetTop+e.offsetHeight:0,bottom:"auto",left:e?e.offsetLeft+e.offsetWidth/2-a/2:0,right:"auto"};return c>l&&(s.top="auto",s.bottom=n.offsetHeight-e.offsetTop),o<0&&(s.left=0),i>u&&(s.left="auto",s.right=0),s}(O,t):{top:"-9999px",bottom:"auto",left:"-9999px",right:"auto"}),document.addEventListener("mousedown",n),document.addEventListener("keyup",r),function(){document.removeEventListener("mousedown",n),document.removeEventListener("keyup",r)}}),[o,a,O]),Object(h.jsxs)("div",{className:o?"number-pad active":"number-pad",style:v,ref:x,children:[!1===j?function(){for(var e=[],t=1;t<10;t++)e.push(Object(h.jsx)("button",{type:"button",value:t,onClick:n,children:t},"numpad-".concat(t)));return e}():function(){var e=[];function t(e){if(null!==i&&"number"!==typeof i)return i.includes(e)}for(var n=1;n<10;n++)e.push(Object(h.jsx)(d.a,{toggle:!0,children:Object(h.jsx)(m.a,{type:"checkbox",value:n,checked:t(n),onChange:function(e){c(i,e)},children:n})},"candidate-button-".concat(n)));return e}(),function(){var e=Object(h.jsx)("button",{type:"button",value:"",className:"clear-button",onClick:n,children:"Clear"});if(null!==i){if("number"===typeof i&&i!==u)return e;if(Array.isArray(i)&&"number"===typeof u&&!i.includes(u))return e}}(),function(){if(null!==O&&O.classList.contains("can-be-solved"))return Object(h.jsx)("button",{type:"button",value:"",className:"solve-button",onClick:n,children:"Solve"})}(),Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"manage-candidates-mode",name:"manage-candidates-mode",checked:j,onChange:function(e){y(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"manage-candidates-mode",className:"form-check-label",children:"Edit Candidates"})]})]})},g=n(8),b=n.n(g);function p(e){return function(e){var t=[];return e.forEach((function(n,r){n.forEach((function(n,c){if(!N(e,r,c)){var a=function(e,t,n){if(!N(e,t,n)){var r=A(e,t,n),c=[];if(Array.isArray(r)&&1===r.length)return{row:t,column:n,value:r[0]};var a=O(e,t).filter((function(e,t){return t!==n})).filter((function(e){return Array.isArray(e)&&0!==e.length})),o=x(e,n).filter((function(e,n){return n!==t})).filter((function(e){return Array.isArray(e)&&0!==e.length}));if(a.length&&Array.isArray(r)&&r.forEach((function(e){a.some((function(t){return Array.isArray(t)?t.includes(e):t===e}))||c.push(e)})),o.length&&Array.isArray(r)&&r.forEach((function(e){o.some((function(t){return Array.isArray(t)?t.includes(e):t===e}))||c.push(e)})),1===(c=Array.from(new Set(c))).length)return{row:t,column:n,value:c[0]};if(c.length>1)return{row:t,column:n,value:c}}}(e,r,c);void 0!==a&&t.push(a)}}))})),M(j(e,t))}(function(e){for(var t=[],n=0;n<=6;n+=3)for(var r=0;r<=6;r+=3){var c=C(e,n,r);void 0!==c&&t.push(c)}return M(j(e,t))}(function(e){var t=b.a.cloneDeep(e),n=function(e){var t=[];function n(n,c,a){var o=[],i=[];n.forEach((function(e,t){Array.isArray(e)&&e.forEach((function(e){var r=0,l=[];n.forEach((function(n,i){Array.isArray(n)&&i>t&&(o.includes(e)||n.includes(e)&&(r++,"row"===a&&(l.push([c,t]),l.push([c,i])),"column"===a&&(l.push([t,c]),l.push([i,c]))))})),1===r&&i.push({axis:a,positions:l,value:e}),o.push(e)}))})),i.forEach((function(n){function c(e,r){var c=n.positions[0][0],o=n.positions[0][1],i=n.positions[1][1];"column"===a&&(c=n.positions[0][1],o=n.positions[0][0],i=n.positions[1][0]);var l=e[o],u=e[i],s=0,h=[];if(r>c&&Array.isArray(l)&&Array.isArray(u)&&l.includes(n.value)&&u.includes(n.value)&&(e.forEach((function(e){Array.isArray(e)&&e.includes(n.value)&&s++})),2===s)){"row"===a&&(h.push([r,o]),h.push([r,i])),"column"===a&&(h.push([o,r]),h.push([i,r]));var f=n.positions.concat(h);t.push({axis:n.axis,positions:f,value:n.value})}}"row"===a&&e.forEach((function(e,t){c(e,t)})),"column"===a&&e[0].forEach((function(t,n){c(r(e,n),n)}))}))}function r(e,t){var n=[];return e.forEach((function(e){n.push(e[t])})),n}return e.forEach((function(e,t){n(e,t,"row")})),e[0].forEach((function(t,c){n(r(e,c),c,"column")})),t}(t),r=[];return n.forEach((function(e){var n=e.positions.map((function(e){return e[0]}));n=n.filter((function(e,t){return n.indexOf(e)===t}));var c=e.positions.map((function(e){return e[1]}));c=c.filter((function(e,t){return c.indexOf(e)===t})),"column"===e.axis&&n.forEach((function(n){O(t,n).forEach((function(a,o){if(!c.includes(o)&&Array.isArray(a)){var i=G(t,n,o,e.value);void 0!==i&&(r.push(i),t[i.row][i.column]=i.value)}}))})),"row"===e.axis&&c.forEach((function(c){x(t,c).forEach((function(a,o){if(!n.includes(o)&&Array.isArray(a)){var i=G(t,o,c,e.value);void 0!==i&&(r.push(i),t[i.row][i.column]=i.value)}}))}))})),j(e,r)}(function(e){var t=[],n=b.a.cloneDeep(e);n.forEach((function(e,r){var c=I(E(3,e),e,{row:r},"row"),a=I(E(4,e),e,{row:r},"row");void 0!==c&&(t.push.apply(t,Object(i.a)(c)),c.forEach((function(e){n[e.row][e.column]=e.value}))),void 0!==a&&(t.push.apply(t,Object(i.a)(a)),a.forEach((function(e){n[e.row][e.column]=e.value})))})),n[0].forEach((function(e,r){var c=x(n,r),a=I(E(3,c),c,{column:r},"column"),o=I(E(4,c),c,{column:r},"column");void 0!==a&&(t.push.apply(t,Object(i.a)(a)),a.forEach((function(e){n[e.row][e.column]=e.value}))),void 0!==o&&(t.push.apply(t,Object(i.a)(o)),o.forEach((function(e){n[e.row][e.column]=e.value})))}));for(var r=0;r<=6;r+=3)for(var c=0;c<=6;c+=3){var a=k(n,r,c),o=I(E(3,a),a,{row:r,column:c},"nonet"),l=I(E(4,a),a,{row:r,column:c},"nonet");void 0!==o&&(t.push.apply(t,Object(i.a)(o)),o.forEach((function(e){n[e.row][e.column]=e.value}))),void 0!==l&&(t.push.apply(t,Object(i.a)(l)),l.forEach((function(e){n[e.row][e.column]=e.value})))}return j(e,t)}(function(e){for(var t=[],n=b.a.cloneDeep(e),r=0;r<=6;r+=3)for(var c=0;c<=6;c+=3){var a=H(n,r,c,"row"),o=H(n,r,c,"column");void 0!==a&&(t.push.apply(t,Object(i.a)(a)),a.forEach((function(e){n[e.row][e.column]=e.value}))),void 0!==o&&(t.push.apply(t,Object(i.a)(o)),o.forEach((function(e){n[e.row][e.column]=e.value})))}return j(e,t)}(e)))))}function j(e,t){var n=b.a.cloneDeep(e);return t.forEach((function(e){n[e.row][e.column]=e.value})),n}function y(e,t,n){for(var r=[],c=t;c<t+3;c++)for(var a=n;a<n+3;a++)r.push(e[c][a]);return r}function O(e,t){var n=[];return e[t].forEach((function(e){n.push(e)})),n}function x(e,t){var n=[];return e.forEach((function(e){n.push(e[t])})),n}function k(e,t,n){return t<=2&&n<=2?y(e,0,0):t<=2&&n>=3&&n<=5?y(e,0,3):t<=2&&n>=6?y(e,0,6):t>=3&&t<=5&&n<=2?y(e,3,0):t>=3&&t<=5&&n>=3&&n<=5?y(e,3,3):t>=3&&t<=5&&n>=6?y(e,3,6):y(e,6,t>=6&&n<=2?0:t>=6&&n>=3&&n<=5?3:6)}function w(e){var t=e,n=e+1,r=e+2;return 1!==e&&4!==e&&7!==e||(t=e-1,n=e,r=e+1),2!==e&&5!==e&&8!==e||(t=e-2,n=e-1,r=e),[t,n,r]}function N(e,t,n){if("number"===typeof e[t][n])return!0}function C(e,t,n){var r=k(e,t,n),c=[1,2,3,4,5,6,7,8,9].filter((function(e){return!r.includes(e)})),a=[],o=w(t),i=w(n);if(c.forEach((function(c){var l=r.map((function(e){return Array.isArray(e)?"o":e}));l.forEach((function(t,n){var r,a;n<=2&&(r=O(e,o[0])),n>=3&&n<=5&&(r=O(e,o[1])),r=O(e,o[2]),0!==n&&3!==n&&6!==n||(a=x(e,i[0])),1!==n&&4!==n&&7!==n||(a=x(e,i[1])),a=x(e,i[2]),"o"===t&&(r.includes(c)&&(l[n]="x"),a.includes(c)&&(l[n]="x"))}));var u=0;l.forEach((function(e){"o"===e&&u++}));var s=S(l.indexOf("o"),t,n);1===u&&a.push([s[0],s[1],c])})),1===a.length)return{row:a[0][0],column:a[0][1],value:a[0][2]}}function S(e,t,n){var r=t,c=n;return 1===e&&(c=n+1),2===e&&(c=n+2),3===e&&(r=t+1),4===e&&(r=t+1,c=n+1),5===e&&(r=t+1,c=n+2),6===e&&(r=t+2),7===e&&(r=t+2,c=n+1),8===e&&(r=t+2,c=n+2),[r,c]}function A(e,t,n){var r,c,a=Array.from(new Set(k(e,t,n).concat(O(e,t)).concat(x(e,n)))).filter((function(e){return"number"===typeof e||Array.isArray(e)&&0!==e.length}));return c=e[t][n],r=Array.isArray(c)&&0===c.length?[1,2,3,4,5,6,7,8,9]:e[t][n],Array.isArray(r)?r.filter((function(e){return!a.includes(e)})):r}function E(e,t){var n=t.slice(0),r=0,c=[];function a(t){var n=t.filter((function(e){return Array.isArray(e)})),a=[],o=0;r=0,c=t.reduce((function(t,c){if(Array.isArray(c)){var i=Array.from(new Set(t.concat(c)));return i.length>e?(o++,r=n.length-o,a):(r=n.length-o,a=i,i)}return t}),[])}for(;n.length>0;){if(r===e&&c.length===e)return c;a(n),n.shift()}}function I(e,t,n,r){var c=[];if(e&&t.forEach((function(t,a){if(Array.isArray(t)){var o=t.filter((function(t){return!e.includes(t)}));if(0!==o.length&&!b.a.isEqual(o,t)&&("row"===r&&c.push({row:n.row,column:a,value:o}),"column"===r&&c.push({row:a,column:n.column,value:o}),"nonet"===r)){var i=S(a,n.row,n.column);c.push({row:i[0],column:i[1],value:o})}}})),0!==c.length)return c}function G(e,t,n,r){var c=function(e,t,n){return e[t][n]}(e,t,n);if(Array.isArray(c)&&c.includes(r))return{row:t,column:n,value:c.filter((function(e){return e!==r}))}}function H(e,t,n,r){var c=k(e,t,n),a=[],o=[c.filter((function(e,t){return"row"===r?t<=2:0===t||3===t||6===t})).filter((function(e){return Array.isArray(e)})),c.filter((function(e,t){return"row"===r?t>=3&&t<=5:1===t||4===t||7===t})).filter((function(e){return Array.isArray(e)})),c.filter((function(e,t){return"row"===r?t>=6:2===t||5===t||8===t})).filter((function(e){return Array.isArray(e)}))],i=[];if(o.forEach((function(e){if(0===e.length)i.push([]);else{var t=e.reduce((function(e,t){return e.concat(t)}),[]);t=Array.from(new Set(t)),i.push(t)}})),i.forEach((function(c,i){var l=i+1,u=i+2;1===i&&(l=i-1,u=i+1),2===i&&(l=i-2,u=i-1);var s,h,f,d=c.filter((function(e){return!o[l].concat(o[u]).reduce((function(e,t){return e.concat(t)}),[]).includes(e)}));"row"===r?(h=O(e,s=t+i),0===n&&(f=[3,4,5,6,7,8]),3===n&&(f=[0,1,2,6,7,8]),6===n&&(f=[0,1,2,3,4,5])):(h=x(e,s=n+i),0===t&&(f=[3,4,5,6,7,8]),3===t&&(f=[0,1,2,6,7,8]),6===t&&(f=[0,1,2,3,4,5])),h.forEach((function(e,t){if(f.includes(t)&&Array.isArray(e)&&e.length>1){var n=e.filter((function(e){return!d.includes(e)}));"row"===r&&n.length<e.length&&a.push({row:s,column:t,value:n}),"column"===r&&n.length<e.length&&a.push({row:t,column:s,value:n})}}))})),0!==a.length)return a}function M(e){var t=[];return e.forEach((function(n,r){n.forEach((function(n,c){if(!N(e,r,c)){var a=A(e,r,c);void 0!==a&&t.push({row:r,column:c,value:a})}}))})),j(e,t)}function D(e){var t=[],n=[],r=e.every((function(e){return e.every((function(e){return"number"===typeof e&&[1,2,3,4,5,6,7,8,9].includes(e)}))}));e[0].forEach((function(n,r){t.push(x(e,r))}));for(var c=t.every((function(e){return e.every((function(e){return"number"===typeof e&&[1,2,3,4,5,6,7,8,9].includes(e)}))})),a=0;a<=6;a+=3)for(var o=0;o<=6;o+=3)n.push(k(e,a,o));var i=n.every((function(e){return e.every((function(e){return"number"===typeof e&&[1,2,3,4,5,6,7,8,9].includes(e)}))}));if(r&&c&&i)return!0}n(32);var J=function(e){var t=e.currentGridValues,n=e.currentGridNoIncorrect,c=e.completedGrid,a=e.updateGame,o=e.givens,u=e.nextPossibleAnswers,s=e.showCandidates,d=e.highlightGivens,m=e.highlightSolvableCells,g=e.highlightIncorrectCells,p=e.highlightCellValue,j=e.isInGameMode,y=e.showAnswers,O=Object(r.useState)(null),x=Object(l.a)(O,2),k=x[0],w=x[1],N=Object(r.useState)(null),C=Object(l.a)(N,2),S=C[0],A=C[1],E=Object(r.useState)(!1),I=Object(l.a)(E,2),G=I[0],H=I[1],D=function(){H(!0)},J=function(){H(!1)};function B(e,t){k===t.target&&G?J():D(),w(t.target),A(e),t.target.select()}function V(e,r){var o=b.a.cloneDeep(t),i=e[0],l=e[1];!j||"Backspace"!==r.key&&"Delete"!==r.key?j||"Backspace"!==r.key&&"Delete"!==r.key?RegExp("[1-9]").test(r.key)?o[i][l]=Number(r.key):r.preventDefault():o[i][l]=[]:o[i][l]=M(n)[i][l];var u=o[i][l]===c[i][l];a(u?M(o):o),J()}function L(e,t){var n=u[e][t];return!(!Array.isArray(n)||1!==n.length)||!!Number.isInteger(n)}function T(e,n){var r=t[e][n],a=c[e][n];return!!j&&(!(!Number.isInteger(r)||r===c[e][n])||!(!Array.isArray(r)||"number"!==typeof a||r.includes(a)))}function F(e,n){return Object(h.jsx)(f,{row:e,column:n,value:!0===y?c[e][n]:t[e][n],handleClick:B,handleKeyDown:V,isGiven:Number.isInteger(o[e][n]),canBeSolved:L(e,n),isIncorrect:T(e,n),hasCandidate:Array.isArray(t[e][n])&&t[e][n].includes(parseInt(p,10)),isInGameMode:j},"r".concat(e,"c").concat(n))}var P="grid".concat(!1===s?" hide-candidates":"").concat(!0===d?" highlight-givens":"").concat(!0===m&&!0===j?" highlight-solvable-cells":"").concat(!0===g?" highlight-incorrect-cells":"");return Object(h.jsxs)("div",{className:"grid-wrapper",children:[Object(h.jsx)("div",{id:"grid",className:P,children:function(){for(var e=[],t=0;t<9;t++)for(var n=0;n<9;n++)e.push(F(t,n));return e}()}),Object(h.jsx)(v,{cellClicked:k,handleNumberPadButtonClick:function(e){var r=b.a.cloneDeep(t),o=null!==S?S[0]:null,i=null!==S?S[1]:null,l=e.target,u=!1;null!==o&&null!==i&&(j&&"clear-button"===l.className?r[o][i]=M(n)[o][i]:j||"clear-button"!==l.className?"solve-button"===l.className?r[o][i]=c[o][i]:r[o][i]=Number(l.value):r[o][i]=[],u=r[o][i]===c[o][i]),a(u?M(r):r),J()},handleCandidateButtonClick:function(e,n){var r=b.a.cloneDeep(t),o=null!==S?S[0]:null,l=null!==S?S[1]:null,u=n.target,s=Number(u.value);if(null!==o&&null!==l){var h=r[o][l],f=c[o][l];if(Array.isArray(h)){var d=[];if(d=h.includes(s)?h.filter((function(e){return e!==s})):[].concat(Object(i.a)(h),[s]),r[o][l]=d,"number"===typeof f){var m=!h.includes(f);a(m?M(r):r)}}}},hideNumberPad:J,isNumberPadActive:G,activeCellValue:null!==S?t[S[0]][S[1]]:null,completedGridCellValue:null!==S?c[S[0]][S[1]]:null})]})},B={easy:[[[[],[],[],[],[],3,1,[],4],[2,6,[],5,[],4,[],[],[]],[[],3,9,[],[],[],8,5,[]],[7,[],3,[],4,6,[],[],[]],[[],[],[],3,[],8,[],[],[]],[[],[],[],7,1,[],4,[],3],[[],4,2,[],[],[],7,3,[]],[[],[],[],4,[],5,[],1,9],[9,[],6,8,[],[],[],[],[]]],[[[],[],4,7,[],[],5,[],6],[[],[],1,[],[],4,[],[],2],[2,[],[],[],1,[],[],[],8],[1,[],9,[],7,3,[],[],[]],[[],6,[],1,[],5,[],2,[]],[[],[],[],6,9,[],7,[],1],[5,[],[],[],2,[],[],[],7],[7,[],[],3,[],[],2,[],[]],[9,[],2,[],[],7,8,[],[]]],[[9,5,[],3,1,[],[],[],[]],[[],[],[],9,[],[],1,[],[]],[[],[],[],[],[],2,9,[],3],[6,[],4,5,[],[],[],[],9],[5,8,[],2,[],1,[],7,6],[1,[],[],[],[],8,3,[],5],[4,[],9,1,[],[],[],[],[]],[[],[],5,[],[],9,[],[],[]],[[],[],[],[],4,3,[],9,2]],[[1,4,[],[],2,[],9,5,[]],[[],[],2,[],[],4,[],[],3],[8,[],[],[],[],[],[],[],2],[[],[],[],8,[],1,5,[],7],[9,[],[],2,[],7,[],[],6],[7,[],8,5,[],6,[],[],[]],[3,[],[],[],[],[],[],[],9],[6,[],[],4,[],[],2,[],[]],[[],8,5,[],7,[],[],6,1]],[[[],[],[],[],4,[],[],[],[]],[3,9,[],[],[],[],4,6,5],[7,[],4,[],[],9,[],2,3],[[],[],[],7,3,1,[],[],2],[[],[],[],4,[],2,[],[],[]],[2,[],[],8,9,5,[],[],[]],[8,2,[],5,[],[],7,[],9],[4,5,7,[],[],[],[],1,8],[[],[],[],[],8,[],[],[],[]]],[[5,[],6,3,4,[],1,[],8],[3,[],9,[],7,[],[],4,[]],[[],[],1,6,[],[],[],[],[]],[7,[],[],[],[],8,[],[],9],[[],[],3,[],[],[],4,[],[]],[6,[],[],4,[],[],[],[],3],[[],[],[],[],[],4,2,[],[]],[[],4,[],[],2,[],8,[],5],[1,[],2,[],5,7,9,[],4]]],medium:[[[3,[],[],[],6,[],[],[],[]],[[],1,4,[],[],[],9,[],7],[6,5,[],[],[],7,[],[],[]],[[],8,[],[],2,5,[],[],[]],[1,[],9,[],[],[],6,[],2],[[],[],[],6,9,[],[],8,[]],[[],[],[],4,[],[],[],7,6],[4,[],1,[],[],[],5,9,[]],[[],[],[],[],7,[],[],[],8]],[[[],[],[],[],1,[],[],6,9],[[],[],[],[],[],8,[],3,7],[[],[],[],[],[],[],8,[],[]],[4,[],[],3,2,1,9,[],[]],[[],[],7,[],9,[],5,[],[]],[[],[],2,7,5,6,[],[],3],[[],[],8,[],[],[],[],[],[]],[5,3,[],2,[],[],[],[],[]],[9,2,[],[],4,[],[],[],[]]],[[[],3,[],[],1,8,[],[],[]],[8,[],9,[],3,[],[],7,[]],[[],[],6,[],9,[],3,5,[]],[[],[],[],[],[],7,[],[],6],[[],8,[],[],[],[],[],4,[]],[6,[],[],9,[],[],[],[],[]],[[],5,3,[],6,[],4,[],[]],[[],4,[],[],5,[],8,[],2],[[],[],[],4,7,[],[],3,[]]],[[[],4,[],2,[],[],1,[],[]],[9,7,[],[],3,[],[],6,2],[[],1,2,8,[],[],[],[],[]],[7,[],[],[],[],[],8,[],[]],[[],8,[],[],[],[],[],9,[]],[[],[],9,[],[],[],[],[],7],[[],[],[],[],[],4,6,3,[]],[6,9,[],[],5,[],[],2,1],[[],[],5,[],[],7,[],4,[]]],[[[],[],[],6,[],5,[],[],7],[5,[],[],[],9,[],[],[],6],[[],7,[],3,[],[],4,9,[]],[[],[],[],[],[],[],5,[],8],[[],[],[],2,8,4,[],[],[]],[1,[],6,[],[],[],[],[],[]],[[],1,4,[],[],3,[],6,[]],[2,[],[],[],7,[],[],[],3],[9,[],[],8,[],1,[],[],[]]]],hard:[[[[],7,[],[],[],[],[],[],[]],[[],[],[],[],[],[],8,[],[]],[2,[],6,[],9,1,4,[],[]],[[],[],[],9,[],[],[],6,[]],[[],1,5,[],[],7,[],4,[]],[[],8,[],[],5,[],[],9,[]],[[],3,[],4,[],[],[],[],[]],[[],[],8,[],6,[],7,[],[]],[7,[],[],[],3,[],[],1,9]],[[5,[],3,7,6,[],[],[],[]],[[],2,6,[],[],[],7,[],[]],[[],[],[],1,[],[],[],8,[]],[7,[],[],[],4,[],[],[],1],[[],[],4,[],[],[],[],[],6],[[],1,[],[],[],6,[],7,3],[9,[],[],[],[],[],[],[],8],[[],[],[],[],[],5,[],[],[]],[[],[],[],6,[],3,1,9,[]]],[[[],6,[],[],[],5,[],[],[]],[[],7,[],[],[],[],[],[],1],[[],[],[],[],6,3,4,[],[]],[[],[],3,[],8,[],[],[],[]],[2,1,[],[],9,[],[],[],5],[4,[],[],[],[],7,8,[],[]],[[],[],1,6,[],[],[],8,4],[[],[],[],[],[],[],[],5,[]],[8,[],[],[],4,[],6,1,[]]],[[[],[],5,7,[],[],[],[],[]],[[],[],7,[],[],9,6,[],8],[[],8,[],[],[],2,[],1,[]],[[],3,[],[],[],[],[],[],[]],[5,[],[],2,6,1,[],7,[]],[[],[],[],8,[],[],1,[],9],[[],[],[],1,[],[],[],[],3],[3,[],9,[],2,[],[],8,[]],[[],[],[],[],4,[],[],[],[]]],[[[],3,[],[],[],5,[],[],[]],[5,1,[],[],3,[],8,[],7],[[],[],[],4,[],[],[],[],1],[[],6,[],2,[],[],[],1,[]],[[],[],1,[],[],[],7,[],[]],[[],9,[],[],[],1,[],4,[]],[4,[],[],[],[],9,[],[],[]],[1,[],9,[],8,[],[],7,5],[[],[],[],3,[],[],[],8,[]]],[[[],[],[],[],[],8,[],7,[]],[[],[],5,[],6,9,[],[],[]],[[],[],[],[],[],5,8,9,2],[[],[],1,6,[],[],[],3,[]],[4,[],[],[],[],[],[],[],1],[[],9,[],[],[],1,4,[],[]],[7,4,3,9,[],[],[],[],[]],[[],[],[],4,2,[],3,[],[]],[[],8,[],5,[],[],[],[],[]]],[[[],[],2,1,8,6,[],[],[]],[[],[],[],[],[],[],2,[],[]],[[],3,[],9,[],[],[],[],[]],[2,[],3,6,[],[],8,9,[]],[4,[],[],[],5,[],[],[],1],[[],6,8,[],[],2,7,[],5],[[],[],[],[],[],9,[],5,[]],[[],[],4,[],[],[],[],[],[]],[[],[],[],3,6,7,9,[],[]]],[[6,[],[],[],9,2,[],[],[]],[[],[],8,5,[],6,[],[],2],[3,[],[],4,[],[],[],[],[]],[2,[],4,[],[],[],[],8,[]],[[],[],5,[],[],[],[],[],1],[[],[],[],9,[],[],6,[],5],[[],[],[],[],1,[],3,[],[]],[4,[],[],[],[],[],[],9,[]],[[],1,[],7,8,[],[],[],6]],[[9,6,[],[],1,[],[],[],3],[3,1,[],[],8,[],2,[],[]],[[],[],[],[],[],[],8,[],[]],[[],4,9,[],[],6,[],[],[]],[1,[],[],[],9,8,[],[],[]],[[],[],6,5,[],[],[],3,7],[[],3,[],[],[],[],[],2,6],[[],9,[],1,[],[],[],[],[]],[[],7,4,[],2,5,[],9,[]]],[[6,[],[],[],[],[],[],3,[]],[[],[],1,[],[],[],5,[],7],[[],7,[],2,[],4,[],8,[]],[7,[],2,4,[],6,[],[],[]],[[],[],[],[],[],[],3,[],[]],[9,1,[],[],[],[],2,7,4],[[],6,7,8,9,[],1,4,3],[1,4,[],[],3,[],[],9,[]],[[],[],[],[],4,[],[],[],2]]],expert:[[[[],[],[],9,[],2,[],[],5],[[],[],[],[],[],5,1,3,[]],[[],[],9,[],[],[],[],2,[]],[[],5,3,[],[],[],[],[],6],[4,[],[],[],8,[],[],[],1],[9,[],[],[],[],[],4,7,[]],[[],6,[],[],[],[],7,[],[]],[[],9,1,4,[],[],[],[],[]],[8,[],[],5,[],7,[],[],[]]],[[[],[],[],9,[],2,[],[],5],[[],[],[],[],[],5,1,3,[]],[[],[],9,[],[],[],[],2,[]],[[],5,3,[],[],[],[],[],6],[4,[],[],[],8,[],[],[],1],[9,[],[],[],[],[],4,7,[]],[[],6,[],[],[],[],7,[],[]],[[],9,1,4,[],[],[],[],[]],[8,[],[],5,[],7,[],[],[]]],[[[],[],[],8,[],[],[],1,[]],[[],[],[],2,[],[],8,9,6],[[],[],[],[],6,[],[],[],2],[2,[],[],[],[],[],3,[],[]],[[],[],8,3,[],1,4,[],[]],[[],[],7,[],[],[],[],[],9],[6,[],[],[],7,[],[],[],[]],[9,7,2,[],[],3,[],[],[]],[[],3,[],[],[],4,[],[],[]]],[[[],9,1,[],[],[],[],[],5],[[],[],[],[],9,4,3,[],[]],[[],3,[],6,[],[],[],[],[]],[[],[],[],[],[],[],[],7,9],[2,[],[],1,[],7,[],[],6],[8,5,[],[],[],[],[],[],[]],[[],[],[],[],[],1,[],5,[]],[[],[],2,4,3,[],[],[],[]],[5,[],[],[],[],[],2,4,[]]],[[[],[],[],[],[],1,[],[],[]],[[],6,[],[],[],[],4,[],[]],[[],9,[],5,3,[],[],[],8],[[],4,[],[],5,3,[],[],7],[[],8,[],[],[],[],[],5,[]],[7,[],[],1,2,[],[],6,[]],[8,[],[],[],1,6,[],2,[]],[[],[],5,[],[],[],[],9,[]],[[],[],[],8,[],[],[],[],[]]],[[[],[],[],[],[],7,3,[],[]],[[],7,[],[],8,[],5,[],9],[6,[],1,[],[],[],[],[],7],[[],[],5,[],[],6,[],9,[]],[[],[],[],[],4,[],[],[],[]],[[],6,[],5,[],[],2,[],[]],[2,[],[],[],[],[],9,[],1],[1,[],9,[],5,[],[],7,[]],[[],[],3,8,[],[],[],[],[]]],[[3,[],[],[],[],2,[],[],6],[[],[],[],[],[],[],[],[],[]],[[],[],[],6,4,[],7,3,5],[[],1,[],[],2,[],[],6,[]],[6,[],[],4,[],7,[],[],1],[[],9,[],[],3,[],[],2,[]],[5,2,3,[],6,1,[],[],[]],[[],[],[],[],[],[],[],[],[]],[7,[],[],5,[],[],[],[],2]],[[7,[],[],1,4,[],[],[],9],[1,[],[],2,[],[],[],4,[]],[[],5,[],[],3,[],[],[],[]],[[],[],[],[],2,[],1,[],4],[[],[],6,[],7,[],8,[],[]],[5,[],1,[],9,[],[],[],[]],[[],[],[],[],5,[],[],6,[]],[[],3,[],[],[],4,[],[],7],[2,[],[],[],8,6,[],[],1]],[[[],[],[],[],5,4,3,8,[]],[[],[],5,9,8,[],[],[],2],[[],8,[],[],3,[],[],[],[]],[5,[],[],6,[],[],[],7,[]],[3,[],4,[],7,[],2,[],9],[[],7,[],[],[],9,[],[],1],[[],[],[],[],1,[],[],2,[]],[7,[],[],[],9,3,6,[],[]],[[],5,1,7,6,[],[],[],[]]],[[[],[],[],[],[],[],6,8,[]],[[],[],[],[],7,3,[],[],9],[3,[],9,[],[],[],[],4,5],[4,9,[],[],[],[],[],[],[]],[8,[],3,[],5,[],9,[],2],[[],[],[],[],[],[],[],3,6],[9,6,[],[],[],[],3,[],8],[7,[],[],6,8,[],[],[],[]],[[],2,8,[],[],[],[],[],[]]],[[6,[],[],1,7,[],[],[],5],[[],[],[],[],4,[],[],2,[]],[[],[],[],[],[],[],8,9,[]],[[],3,7,8,[],[],[],[],2],[5,[],[],[],[],1,[],[],9],[[],[],2,[],[],[],[],[],[]],[[],[],5,[],2,4,[],[],[]],[[],[],[],[],1,[],6,[],[]],[7,[],[],3,[],[],[],[],[]]],[[[],[],[],1,[],[],6,[],3],[[],8,7,[],4,[],[],[],5],[9,[],3,[],[],[],[],[],[]],[[],[],5,[],[],6,[],[],[]],[7,[],[],[],[],1,[],[],[]],[[],9,[],[],[],3,[],5,[]],[1,6,[],[],[],[],[],[],[]],[5,[],[],[],[],[],7,[],4],[[],[],[],[],8,[],[],[],2]],[[[],[],[],6,[],[],[],8,[]],[[],[],2,[],[],5,[],4,[]],[[],[],3,[],2,[],[],1,[]],[[],2,6,[],[],7,1,[],[]],[9,[],[],[],[],[],[],[],5],[[],[],4,9,[],[],2,7,[]],[[],1,[],[],5,[],3,[],[]],[[],6,[],3,[],[],8,[],[]],[[],9,[],[],[],1,[],[],[]]],[[[],[],[],3,[],[],6,5,[]],[[],[],1,[],2,[],[],8,[]],[5,3,[],6,9,[],[],1,[]],[[],[],5,[],[],2,1,3,[]],[[],[],[],9,5,[],2,4,[]],[7,[],[],[],[],[],8,[],[]],[[],[],7,8,[],[],5,[],3],[8,[],[],[],3,[],[],7,[]],[2,4,3,[],1,7,[],6,[]]]]};function V(e){return Math.floor(Math.random()*Math.floor(e))}var L=function(e){var t=Object(r.useState)("Easy"),n=Object(l.a)(t,2),c=n[0],a=n[1],o=e.createNewGame,i=e.createCustomGame,u=e.toggleMenu;return Object(h.jsxs)("div",{className:"new-game-panel",children:[Object(h.jsxs)("div",{className:"form-group",children:[Object(h.jsx)("label",{htmlFor:"difficulty-selector",children:"Difficulty: "}),Object(h.jsxs)("select",{id:"difficulty-selector",className:"form-control",value:c,onChange:function(e){a(e.target.value)},children:[Object(h.jsx)("option",{value:"Easy",children:"Easy"}),Object(h.jsx)("option",{value:"Medium",children:"Medium"}),Object(h.jsx)("option",{value:"Hard",children:"Hard"}),Object(h.jsx)("option",{value:"Expert",children:"Expert"})]})]}),Object(h.jsx)("button",{className:"btn btn-block btn-primary",onClick:function(){"Easy"===c&&o(B.easy[V(B.easy.length)]),"Medium"===c&&o(B.medium[V(B.medium.length)]),"Hard"===c&&o(B.hard[V(B.hard.length)]),"Expert"===c&&o(B.expert[V(B.expert.length)]),u()},children:"Generate Game"}),Object(h.jsx)("button",{className:"btn btn-block btn-primary",onClick:function(){i(),u()},children:"Create Custom Game"})]})};var T=function(e){var t=e.showCandidates,n=e.setShowCandidates,r=e.highlightGivens,c=e.setHighlightGivens,a=e.highlightSolvableCells,o=e.setHighlightSolvableCells,i=e.highlightIncorrectCells,l=e.setHighlightIncorrectCells,u=e.darkMode,s=e.setDarkMode;return Object(h.jsxs)("div",{className:"game-settings",children:[Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"show-candidates",name:"show-candidates",checked:t,onChange:function(e){n(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"show-candidates",className:"form-check-label",children:"Show Candidates"})]}),Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"highlight-givens",name:"highlight-givens",checked:r,onChange:function(e){c(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"highlight-givens",className:"form-check-label",children:"Highlight Givens"})]}),Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"highlight-solvable",name:"highlight-solvable",checked:a,onChange:function(e){o(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"highlight-solvable",className:"form-check-label",children:"Highlight Solvable Cells"})]}),Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"highlight-incorrect-cells",name:"highlight-incorrect-cells",checked:i,onChange:function(e){l(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"highlight-incorrect-cells",className:"form-check-label",children:"Highlight Incorrect Cells"})]}),Object(h.jsxs)("div",{className:"form-group form-check",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-check-input",id:"dark-mode",name:"dark-mode",checked:u,onChange:function(e){s(e.target.checked)}}),Object(h.jsx)("label",{htmlFor:"dark-mode",className:"form-check-label",children:"Dark Mode"})]})]})};n(33);var F=function(e){var t=e.history,n=e.jumpToStepInHistory,r=e.currentStep,c=e.heading,a=t.length,o={onClick:function(){return n(r-1)},disabled:!1,className:"btn btn-primary"};0===r&&(o.disabled=!0);var i={onClick:function(){return n(r+1)},disabled:!1,className:"btn btn-primary"};return a-1===r&&(i.disabled=!0),Object(h.jsxs)("div",{className:"history",children:[Object(h.jsx)("h2",{className:"text-center",children:c}),Object(h.jsxs)("div",{className:"history-nav d-flex justify-content-center",children:[Object(h.jsxs)("button",Object(s.a)(Object(s.a)({},o),{},{children:[Object(h.jsx)("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"caret-left",className:"svg-inline--fa fa-caret-left fa-w-6",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 192 512",children:Object(h.jsx)("path",{fill:"currentColor",d:"M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"})}),Object(h.jsx)("span",{className:"sr-only",children:"Previous Step"})]})),Object(h.jsxs)("span",{className:"history-current-step",children:[Object(h.jsx)("label",{htmlFor:"current-step",className:"sr-only",children:"Current Step"}),Object(h.jsx)("input",{className:"form-control",id:"current-step",name:"current-step",type:"text",value:r,onChange:function(e){var t=parseInt(e.currentTarget.value,10);n(t)},onClick:function(e){e.currentTarget.select()},onKeyDown:function(e){"Backspace"!==e.key&&"Delete"!==e.key||(e.currentTarget.select(),e.preventDefault())}}),"\xa0/\xa0",a-1]}),Object(h.jsxs)("button",Object(s.a)(Object(s.a)({},i),{},{children:[Object(h.jsx)("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"caret-right",className:"svg-inline--fa fa-caret-right fa-w-6",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 192 512",children:Object(h.jsx)("path",{fill:"currentColor",d:"M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"})}),Object(h.jsx)("span",{className:"sr-only",children:"Next Step"})]}))]})]})};n(34);var P=function(e){var t=e.highlightCellValue,n=e.setHighlightCellValue;return Object(h.jsxs)("div",{className:"highlight-cell-options",children:[Object(h.jsx)("h2",{className:"text-center",children:"Highlight Cells"}),Object(h.jsxs)("div",{className:"form-inline justify-content-center",children:[Object(h.jsx)("label",{htmlFor:"highlight-cell-selector",className:"mr-2",children:"Show me the: "}),Object(h.jsxs)("select",{id:"highlight-cell-selector",className:"form-control",value:t,onChange:function(e){n(e.target.value)},children:[Object(h.jsx)("option",{value:"off",children:"Select"}),Object(h.jsx)("option",{value:"1",children:"Ones"}),Object(h.jsx)("option",{value:"2",children:"Twos"}),Object(h.jsx)("option",{value:"3",children:"Threes"}),Object(h.jsx)("option",{value:"4",children:"Fours"}),Object(h.jsx)("option",{value:"5",children:"Fives"}),Object(h.jsx)("option",{value:"6",children:"Sixes"}),Object(h.jsx)("option",{value:"7",children:"Sevens"}),Object(h.jsx)("option",{value:"8",children:"Eights"}),Object(h.jsx)("option",{value:"9",children:"Nines"})]})]})]})};var z=function(){function e(){for(var e=[],t=0;t<9;t++)e.push(Array(9).fill([]));return e}function t(e){!0===function(e){return e.flat().every((function(e){return Number.isInteger(e)}))}(e)&&(b.a.isEqual(e,he)?!0===D(e)&&alert("Congrats! Sudoku game completed successfully!"):alert("Sorry, some numbers aren't where they should be."))}var n=localStorage.getItem("sudokuHistory"),c=Object(r.useState)(null!==n?JSON.parse(n):[{grid:e()}]),a=Object(l.a)(c,2),o=a[0],s=a[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuHistory",JSON.stringify(o))}),[o]);var f=localStorage.getItem("sudokuStepNumber"),d=Object(r.useState)(null!==f?JSON.parse(f):0),m=Object(l.a)(d,2),v=m[0],g=m[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuStepNumber",JSON.stringify(v))}),[v]);var j=localStorage.getItem("sudokuShowCandidates"),y=Object(r.useState)(null!==j&&JSON.parse(j)),O=Object(l.a)(y,2),x=O[0],k=O[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuShowCandidates",JSON.stringify(x))}),[x]);var w=localStorage.getItem("sudokuHighlightGivens"),N=Object(r.useState)(null===w||JSON.parse(w)),C=Object(l.a)(N,2),S=C[0],A=C[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuHighlightGivens",JSON.stringify(S))}),[S]);var E=localStorage.getItem("sudokuHighlightSolvableCells"),I=Object(r.useState)(null===E||JSON.parse(E)),G=Object(l.a)(I,2),H=G[0],B=G[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuHighlightSolvableCells",JSON.stringify(H))}),[H]);var V=localStorage.getItem("sudokuHighlightIncorrectCells"),z=Object(r.useState)(null===V||JSON.parse(V)),W=Object(l.a)(z,2),K=W[0],R=W[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuHighlightIncorrectCells",JSON.stringify(K))}),[K]);var q=localStorage.getItem("sudokuDarkMode"),Q=Object(r.useState)(null!==q?JSON.parse(q):window.matchMedia("(prefers-color-scheme: dark)").matches),U=Object(l.a)(Q,2),X=U[0],Y=U[1];Object(r.useEffect)((function(){localStorage.setItem("sudokuDarkMode",JSON.stringify(X))}),[X]),X?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode");var Z=Object(r.useState)(!0),$=Object(l.a)(Z,2),_=$[0],ee=$[1],te=Object(r.useState)(!1),ne=Object(l.a)(te,2),re=ne[0],ce=ne[1],ae=Object(r.useState)(!1),oe=Object(l.a)(ae,2),ie=oe[0],le=oe[1];function ue(){le(!ie)}var se,he=_?function(e){var t=[],n=0;return function e(r){n++,!0!==D(r)&&(n>81?console.log("Cannot solve sudoku puzzle"):e(t=p(r)))}(e),t}(o[0].grid):e(),fe=b.a.cloneDeep(o),de=o[0].grid,me=o[v].grid,ve=b.a.cloneDeep(me).map((function(e,t){return e.map((function(e,n){var r=me[t][n],c=he[t][n];return"number"===typeof r?r===c?r:de[t][n]:Array.isArray(r)?"number"===typeof c&&r.includes(c)?r:de[t][n]:r}))})),ge=p(ve),be=(se=ve,ge.map((function(e,t){return e.map((function(e,n){var r=se[t][n];return Number.isInteger(e)&&r!==e||Array.isArray(e)&&1===e.length&&r!==e?e:[]}))}))),pe=Object(r.useState)("off"),je=Object(l.a)(pe,2),ye=je[0],Oe=je[1];function xe(e){s([{grid:M(e)}]),g(0),ee(!0)}return Object(h.jsxs)("div",{className:"app-wrapper",onClick:function(){le(!1)},children:[Object(h.jsxs)(u.a,{id:"dropdown-game-menu",className:"text-right",show:ie,children:[Object(h.jsx)("h2",{children:"Menu"}),Object(h.jsxs)(u.a.Toggle,{variant:"primary",id:"game-menu",onClick:function(e){e.stopPropagation(),ue()},children:[Object(h.jsx)("span",{className:"sr-only",children:"Menu"}),Object(h.jsx)("span",{className:"navbar-toggler-icon"})]}),Object(h.jsxs)(u.a.Menu,{className:"p-4",onClick:function(e){e.stopPropagation()},children:[Object(h.jsx)("h2",{children:"Start a New Game"}),Object(h.jsx)(L,{createNewGame:xe,createCustomGame:function(){s([{grid:e()}]),g(0),ee(!1)},toggleMenu:ue}),Object(h.jsx)(u.a.Divider,{}),Object(h.jsx)("h2",{children:"Settings"}),Object(h.jsx)(T,{showCandidates:x,setShowCandidates:k,highlightGivens:S,setHighlightGivens:A,highlightSolvableCells:H,setHighlightSolvableCells:B,highlightIncorrectCells:K,setHighlightIncorrectCells:R,darkMode:X,setDarkMode:Y}),Object(h.jsx)(u.a.Divider,{}),Object(h.jsx)("button",{className:"btn btn-block btn-primary",onClick:function(){ue(),ce(!re)},children:!0===re?"Hide Answers":"Show Answers"})]})]}),Object(h.jsxs)("div",{className:!0===_?"custom-game-instructions d-none":"custom-game-instructions",children:[Object(h.jsx)("p",{children:'Enter your starting numbers ("givens") in the cells to create your own game. When you have finished entering all the givens, click "Start Game" to start solving the puzzle.'}),Object(h.jsx)("button",{className:"btn btn-primary",onClick:function(){xe(me)},children:"Start Game"})]}),Object(h.jsx)(J,{currentGridValues:me,currentGridNoIncorrect:ve,completedGrid:he,updateGame:function(e){var n;_?(n={grid:e},s([].concat(Object(i.a)(fe),[n])),g(o.length)):s([{grid:e}]),t(e)},givens:o[0].grid,highlightGivens:S,highlightSolvableCells:H,highlightIncorrectCells:K,highlightCellValue:ye,showCandidates:x,nextPossibleAnswers:be,isInGameMode:_,showAnswers:re}),Object(h.jsx)(P,{highlightCellValue:ye,setHighlightCellValue:Oe}),Object(h.jsx)(F,{history:o,jumpToStepInHistory:function(e){e>=0&&e<=o.length-1&&g(e)},currentStep:v,heading:"Game History"})]})};o.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(z,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.9daff2cb.chunk.js.map