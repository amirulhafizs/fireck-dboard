(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[12],{727:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return s}));var c=n(13),r=function(){var e=c.b.getState().user;return"Bearer "+(e?e.token:null)},a=function(e){var t=e.collectionId,n=e.orderBy,c=e.startAt,a=e.startAfter,i=e.where,o=e.limit,l=void 0===o?10:o,s=e.populateRef,u=void 0===s||s,d="".concat(window.location.origin,"/api/").concat(t,"?limit=").concat(l,"&populateRef=").concat(u).concat(n?"&orderBy=".concat(n):"").concat(c?"&startAt=".concat(c):a?"&startAfter=".concat(a):"").concat(i?"&where=".concat(i):"");return fetch(d,{headers:{Authorization:r()}}).then((function(e){return e.json()}))},i=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e),{method:"POST",headers:{Authorization:r()},body:JSON.stringify(t)}).then((function(e){return e.json()}))}catch(n){return{error:n}}},o=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"DELETE",headers:{Authorization:r()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},l=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e).concat(t?"/".concat(t):"","?populateRef=false"),{headers:{Authorization:r()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},s=function(e,t,n){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"PUT",headers:{Authorization:r()},body:JSON.stringify(n)}).then((function(e){return e.json()}))}catch(c){return{error:c}}}},729:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(10),r=n(48),a=n.n(r),i=(n(0),n(22)),o=n(13),l=n(1);function s(e){var t=e.Component,n=e.props;return new Promise((function(e,r){var s,u=null===(s=document.getElementById("root"))||void 0===s?void 0:s.appendChild(document.createElement("div"));u&&a.a.render(Object(l.jsx)(i.a,{store:o.b,children:Object(l.jsx)(t,Object(c.a)(Object(c.a)({},n),{},{proceed:function(t){var n;a.a.unmountComponentAtNode(u),null===(n=u.parentNode)||void 0===n||n.removeChild(u),e(t)}}))}),u)}))}},730:function(e,t,n){"use strict";var c=n(141),r=n(10),a=n(734),i=n(677),o=n(0),l=n.n(o),s=n(122),u=n.n(s),d=n(1),f=l.a.forwardRef((function(e,t){return Object(d.jsx)("div",Object(r.a)(Object(r.a)({},e),{},{ref:t,children:Object(d.jsx)(a.b,{className:"text-red-500",size:20})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.options,o=e.error,l=e.white,s=void 0!==l&&l,b=Object(c.a)(e,["className","options","error","white"]);return Object(d.jsxs)("div",{className:"".concat(n," relative flex items-center"),children:[Object(d.jsx)("select",Object(r.a)(Object(r.a)({className:u()("px-3 h-34px border-2 border-solid w-full rounded outline-none",{"border-red-400":o,"focus:border-blue-300":!o,"border-gray-300 bg-gray-300":!s,"border-white bg-white":s})},b),{},{spellCheck:!1,children:a.map((function(e,t){return Object(d.jsx)("option",{"data-testid":"select-option-".concat(e.value),value:e.value,children:e.label},"opt-"+t)}))})),o?Object(d.jsx)(i.a,{title:o,placement:"top",children:Object(d.jsx)(f,{className:"absolute right-2 my-auto w-auto"})}):null]})}},732:function(e,t,n){"use strict";var c=n(39),r=n(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(41)).default)(a.createElement("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"}),"AddRounded");t.default=i},735:function(e,t,n){"use strict";var c=n(39),r=n(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(41)).default)(a.createElement("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),"OpenInNew");t.default=i},739:function(e,t,n){"use strict";var c=n(10),r=n(0),a=n.n(r),i=n(254),o=n.n(i),l=n(677),s=n(1),u=a.a.forwardRef((function(e,t){return Object(s.jsx)("div",Object(c.a)(Object(c.a)({},e),{},{ref:t,children:Object(s.jsx)(o.a,{className:"text-red-500 text-xl",fontSize:"inherit"})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,c=e.children,r=e.error;return Object(s.jsxs)("div",{className:"flex justify-between text-white relative ".concat(n),children:[Object(s.jsx)("div",{children:c}),r?Object(s.jsx)(l.a,{title:r,placement:"top",children:Object(s.jsx)(u,{className:"absolute right-2 my-auto w-auto"})}):null]})}},757:function(e,t,n){"use strict";var c=n(5),r=n(10),a=n(141),i=n(0),o=n.n(i),l=n(1),s=function(e){var t=e.url,n=e.className,c=void 0===n?"":n,i=Object(a.a)(e,["url","className"]);return Object(l.jsxs)("div",Object(r.a)(Object(r.a)({},i),{},{className:"bg-white rounded-full border-2 border-white box-content "+c,children:[Object(l.jsx)("div",{className:"w-full h-full rounded-full bg-center bg-cover",style:{backgroundImage:"url(".concat(t,")")}}),Object(l.jsx)("img",{src:t,alt:"",className:"hidden"})]}))};t.a=function(e){var t=e.files,n=e.file,r=o.a.useRef(Math.random()),a=o.a.useState(-1),i=Object(c.a)(a,2),u=i[0],d=i[1];return Object(l.jsxs)("div",{className:"flex justify-center",children:[(t||(n?[n]:[])).slice(0,4).map((function(e,t){return Object(l.jsxs)("div",{style:{marginLeft:0===t?0:"-10px"},className:"relative",children:[Object(l.jsx)(s,{className:"w-7 h-7",onMouseEnter:function(){return d(t)},onMouseLeave:function(){return d(-1)},url:e}),Object(l.jsx)("div",{className:"".concat(u===t?"":"hidden"," absolute bottom-full flex justify-center w-9"),children:Object(l.jsx)(s,{url:e,className:"w-16 h-16 flex-shrink-0 -translate-y-7"})})]},"".concat(r,"-file-").concat(t))})),t&&t.length>4?Object(l.jsx)("div",{style:{marginLeft:"-10px"},className:"relative",children:Object(l.jsxs)("div",{className:"w-7 h-7 rounded-full bg-blue-300 text-sm text-white flex items-center justify-center border-2 box-content border-white",children:[t.length-4,"+"]})}):null]})}},770:function(e,t,n){"use strict";var c=n(39),r=n(40);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(41)).default)(a.createElement("path",{d:"M15.88 9.29L12 13.17 8.12 9.29a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"}),"ExpandMoreRounded");t.default=i},779:function(e,t,n){"use strict";var c=n(19),r=(n(10),n(5)),a=n(7),i=n.n(a),o=n(14),l=(n(251),n(727)),s=n(757),u=n(0),d=n.n(u),f=n(770),b=n.n(f),j=n(24),h=n(142),x=(n(13),n(715)),m=n(88),v=n(730),p=n(47),O=n(143),g=n(739),w=n(1),N=function(e){var t=e.collectionType,n=e.onValue,a=d.a.useState(!1),l=Object(r.a)(a,2),s=l[0],u=l[1],f=Object(O.a)({onSubmit:function(){var e=Object(o.a)(i.a.mark((function e(t,c){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=c.resetForm,n(t),u(!1),r();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),initialValues:{value:"",operator:"",fieldId:""},validate:function(e){var t={};return Object.keys(e).forEach((function(n){e[n]||(t[n]="Required")})),t}}),b=f.values,j=f.errors,h=f.handleChange,N=f.submitCount,y=f.handleSubmit,k=f.isSubmitting;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(p.a,{noMinWidth:!0,onClick:function(){return u(!0)},className:"bg-fireck-4 hover:bg-fireck-4-hover flex items-center justify-center h-28px px-7 rounded text-sm mr-3 mb-3",children:"Filters"}),Object(w.jsx)(x.a,{open:s,children:Object(w.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex",onMouseDown:function(){return u(!1)},children:Object(w.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7  m-auto",children:[Object(w.jsxs)("div",{className:"flex flex-wrap -mx-2 mb-4",children:[Object(w.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(w.jsx)(g.a,{className:"mb-2",error:N>0?j.fieldId:null,children:"Field"}),Object(w.jsx)(v.a,{name:"fieldId",onChange:h,value:b.fieldId,options:[{value:"",label:"Select"}].concat(Object(c.a)(t.fields.map((function(e){return{value:e.id,label:e.id}}))))})]}),Object(w.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(w.jsx)(g.a,{className:"mb-2",error:N>0?j.operator:null,children:"Operator"}),Object(w.jsx)(v.a,{name:"operator",onChange:h,value:b.operator,options:[{value:"",label:"Select"}].concat(Object(c.a)(["<","<=","==",">",">=","!=","array-contains","array-contains-any","in","not-in"].map((function(e){return{value:e,label:e}}))))})]}),Object(w.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(w.jsx)(g.a,{className:"mb-2",error:N>0?j.value:null,children:"Value"}),Object(w.jsx)(m.a,{placeholder:["in","not in","array-contains-any"].includes(b.operator)?"value, value, value":"value",className:"placeholder-black",value:b.value,onChange:h,name:"value"})]})]}),Object(w.jsx)("div",{className:"flex justify-end",children:Object(w.jsx)(p.a,{disabled:k,onClick:function(){return y()},noMinWidth:!0,className:"bg-orange-300 hover:bg-orange-301",children:"Add"})})]})})})]})},y=n(907),k=(n(906),n(729)),I=n(144),C=n(122),E=n.n(C),S=n(78),M=function(e){var t=e.proceed,n=e.url;return Object(w.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex bg-black bg-opacity-40",onMouseDown:function(){return t(!1)},children:Object(w.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7  m-auto",children:[Object(w.jsx)("div",{className:"mb-12",children:"This query requires creating an index."}),Object(w.jsxs)("div",{className:"flex justify-between",children:[Object(w.jsx)(p.a,{noMinWidth:!0,className:"bg-blue-300 hover:bg-blue-400 text-white h-28px",onClick:function(){return t(!1)},children:"Later"}),Object(w.jsx)(p.a,{noMinWidth:!0,className:"bg-fireck-4 hover:bg-fireck-4-hover h-28px",onClick:function(){window.open(n,"_blank"),t(!1)},children:"Create"})]})]})})},z=function(e,t,n,a){var s=Object(u.useState)([]),d=Object(r.a)(s,2),f=d[0],b=d[1],j=Object(u.useRef)(!1),h=Object(u.useRef)(!1),x=Object(S.b)();console.log("in view, orderBy, filters",a,n,t);var m=Object(u.useCallback)((function(c){var r={collectionId:e,where:"",orderBy:""};return t.forEach((function(e,t){r.where+=(t>0?";":"")+e.fieldId+","+e.operator+","+e.value,n&&n.fieldId!==e.fieldId&&(r.orderBy+=(r.orderBy?";":"")+e.fieldId)})),n&&(r.orderBy+=(r.orderBy?";":"")+"".concat(n.fieldId,",").concat(n.direction)),n||t.length||(r.orderBy="createdAt,asc"),c.length&&(r.startAfter=c[c.length-1][n?n.fieldId:"createdAt"]),r.populateRef=!1,r}),[n,t,e]),v=function(e){var t;e.includes("FAILED_PRECONDITION")?(t=e.split("it here:")[1],Object(k.a)({Component:M,props:{url:t}})):x(e,{variant:"error"})};return Object(u.useEffect)((function(){Object(o.a)(i.a.mark((function e(){var c,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!n&&!t.length){e.next=8;break}return h.current=!1,c=m([]),e.next=6,Object(l.c)(c);case 6:(r=e.sent).error?v(r.error):(b(r),r.length<(c.limit||10)&&(h.current=!0));case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()}),[n,t]),Object(u.useEffect)((function(){j.current=a,function(){var e=Object(o.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h.current||!j.current){e.next=8;break}return t=m(f),console.log(t),e.next=5,Object(l.c)(t);case 5:((n=e.sent).length&&f.length&&n[n.length-1].docId!==f[f.length-1].docId||!f.length)&&b((function(e){return[].concat(Object(c.a)(e),Object(c.a)(n))})),n.length<(t.limit||10)&&(h.current=!0);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[a,f]),{docs:f,setDocs:b}},A=n(253);t.a=function(e){var t=e.collectionType,n=e.onPick,a=e.blackList,u=void 0===a?[]:a,f=e.singleSelect,x=void 0!==f&&f;console.log("SINGLE SELCT",x);var m=Object(j.k)(),v=d.a.useState([]),O=Object(r.a)(v,2),g=O[0],k=O[1],C=t.fields.filter((function(e){return e.displayOnTable})),S=d.a.useState([]),M=Object(r.a)(S,2),T=M[0],R=M[1],D=d.a.useState(),B=Object(r.a)(D,2),L=B[0],P=B[1],F=d.a.useState(!1),V=Object(r.a)(F,2),_=V[0],W=V[1],H=z(t.id,g,L,_),J=H.docs,q=H.setDocs;console.log(t,J);var G=function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.a)({confirmation:"Do you really want to delete ".concat(T.length," documents?")});case 2:if(!e.sent){e.next=6;break}T.forEach((function(e){Object(l.b)(t.id,e)})),q((function(e){return e.filter((function(e){return!T.includes(e.docId)}))})),R([]);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(e){return(null===L||void 0===L?void 0:L.fieldId)!==e.id?function(){P({fieldId:e.id,direction:"asc"})}:"asc"!==(null===L||void 0===L?void 0:L.direction)?function(){return P(void 0)}:function(){return P({fieldId:e.id,direction:"desc"})}},K=function(e,t){R(t?x?[e]:function(t){return[].concat(Object(c.a)(t),[e])}:function(t){var n=Object(c.a)(t),r=n.findIndex((function(t){return t===e}));return null!=r&&n.splice(r,1),n})};return Object(w.jsxs)("div",{className:"h-full w-full flex-col flex",children:[Object(w.jsxs)("div",{className:"flex justify-between mb-3",children:[Object(w.jsxs)("div",{className:"flex flex-wrap",children:[Object(w.jsx)(N,{collectionType:t,onValue:function(e){return k((function(t){return[e].concat(Object(c.a)(t))}))}}),g.map((function(e,t){return Object(w.jsxs)("div",{className:"text-white border border-white rounded min-h-28px leading-28px pl-3 text-sm pr-3 flex mr-3 mb-3 relative",children:[e.fieldId," ",e.operator," ",e.value," ",Object(w.jsx)("span",{onClick:function(){return k((function(e){var n=Object(c.a)(e);return n.splice(t,1),n}))},className:"text-xs leading-28px ml-3 cursor-pointer",children:"\u2715"})]},"f-".concat(t))}))]}),n?Object(w.jsx)(p.a,{noMinWidth:!0,onClick:function(){return n(J.filter((function(e){return T.includes(e.docId)})))},className:"h-28px px-7 ".concat(0===T.length?"bg-gray-300 text-gray-500 cursor-default":"bg-fireck-4 hover:bg-fireck-4-hover"," "),children:"Select"}):Object(w.jsx)(p.a,{noMinWidth:!0,onClick:G,disabled:0===T.length,className:"px-7 h-28px ".concat(0===T.length?"bg-gray-E1E1E1 text-gray-6C6C6C cursor-default":"bg-red-FF0000 hover:bg-red-FF0000-hover text-white"," "),children:"Delete"})]}),Object(w.jsx)("div",{className:"flex-grow h-0 -mt-3 bg-white rounded overflow-hidden",children:Object(w.jsxs)(I.a,{className:"relative scrollbar-light h-full",autoHide:!1,children:[Object(w.jsxs)("table",{className:"w-full text-center",children:[Object(w.jsx)("thead",{children:Object(w.jsxs)("tr",{className:"whitespace-nowrap",children:[Object(w.jsx)("th",{className:"sticky top-0 bg-gray-E1E1E1 z-10 px-1",children:x?null:Object(w.jsx)(y.a,{size:"small",classes:{checked:"text-fireck-1",root:"p-0"},checked:T.length===J.length,onChange:function(e){return t=e.target.checked,R(t?J.map((function(e){return e.docId})):[]);var t}})}),C.map((function(e,t){return Object(w.jsx)("th",{className:"font-semibold sticky top-0 bg-gray-E1E1E1",children:Object(w.jsxs)("div",{className:"flex items-center justify-center",children:[Object(w.jsx)("div",{className:"w-5"}),Object(w.jsx)("div",{className:"cursor-pointer select-none",onClick:U(e),children:e.id}),Object(w.jsx)("div",{className:"w-5",children:(null===L||void 0===L?void 0:L.fieldId)===e.id?Object(w.jsx)(b.a,{fontSize:"small",className:"".concat("desc"===(null===L||void 0===L?void 0:L.direction)?"transform rotate-180":"")}):null})]})},"th-".concat(t))}))]})}),Object(w.jsx)("tbody",{children:J.map((function(e,c){return u.includes(e.docId)?null:Object(w.jsxs)("tr",{onClick:function(){return n?K(e.docId,!T.includes(e.docId)):function(e){m.push("/collections/".concat(t.id,"/edit/").concat(e.docId))}(e)},className:E()("cursor-pointer bg-white hover:bg-fireck-4"),children:[Object(w.jsx)("td",{className:"px-1",children:Object(w.jsx)(y.a,{size:"small",classes:{checked:"text-fireck-1",root:"p-0"},checked:T.includes(e.docId),onClick:function(e){return e.stopPropagation()},onChange:function(t){return K(e.docId,t.target.checked)}})}),C.map((function(t,n){return Object(w.jsx)("td",{className:"px-2",children:e[t.id]?"media"===t.type?t.mediaSingle?Object(w.jsx)(s.a,{file:e[t.id]}):Object(w.jsx)(s.a,{files:e[t.id]}):Object(w.jsx)("div",{className:"whitespace-nowrap",children:e[t.id].toString().substring(0,40)}):null},"row-".concat(c,"-col-").concat(n))}))]},"row-".concat(c))}))})]}),Object(w.jsx)(A.a,{onChange:function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:W(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:Object(w.jsx)("div",{className:"w-full"})}),Object(w.jsx)("div",{})]})})]})}},913:function(e,t,n){"use strict";n.r(t);n(0);var c=n(22),r=n(47),a=n(732),i=n.n(a),o=n(24),l=n(779),s=n(735),u=n.n(s),d=n(1);t.default=function(e){var t=e.match.params.id,n=Object(c.d)((function(e){return{collectionType:e.collectionTypes.find((function(e){return e.id===t}))}})).collectionType,a=Object(o.k)();return Object(d.jsxs)("div",{className:"h-full flex flex-col w-full",children:[Object(d.jsxs)("div",{className:"flex flex-wrap justify-between mb-5",children:[Object(d.jsx)("div",{className:"mr-3 mb-3 text-27px font-medium capitalize leading-none text-white",children:n?Object(d.jsxs)("div",{className:"flex items-center",children:[n.name,Object(d.jsx)("div",{onClick:function(){return window.open(window.location.origin+"/api/".concat(n.id),"_blank")},className:"hover:bg-fireck-1-hover rounded h-8 w-8 ml-3 inline-flex cursor-pointer",children:Object(d.jsx)(u.a,{className:"m-auto"})})]}):null}),Object(d.jsx)(r.a,{noMinWidth:!0,onClick:function(){return a.push("/collections/".concat(t,"/add"))},className:"bg-fireck-4 hover:bg-fireck-4-hover mb-3 h-34px",children:Object(d.jsxs)("div",{className:"flex items-center",children:[Object(d.jsx)(i.a,{fontSize:"inherit",className:"text-lg sm:mr-3"}),Object(d.jsx)("span",{className:"sm:block hidden",children:"Add Document"})]})})]}),n?Object(d.jsx)("div",{className:"flex-grow h-0",children:Object(d.jsx)(l.a,{collectionType:n},n.id)}):null]})}}}]);
//# sourceMappingURL=12.e13498da.chunk.js.map