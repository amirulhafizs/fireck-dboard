(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[10],{723:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return o})),n.d(t,"e",(function(){return s}));var c=n(13),r=function(){var e=c.b.getState().user;return"Bearer "+(e?e.token:null)},a=function(e){var t=e.collectionId,n=e.orderBy,c=e.startAt,a=e.startAfter,i=e.where,l=e.limit,o=void 0===l?10:l,s=e.populateRef,u=void 0===s||s,d="".concat(window.location.origin,"/api/").concat(t,"?limit=").concat(o,"&populateRef=").concat(u).concat(n?"&orderBy=".concat(n):"").concat(c?"&startAt=".concat(c):a?"&startAfter=".concat(a):"").concat(i?"&where=".concat(i):"");return fetch(d,{headers:{Authorization:r()}}).then((function(e){return e.json()}))},i=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e),{method:"POST",headers:{Authorization:r()},body:JSON.stringify(t)}).then((function(e){return e.json()}))}catch(n){return{error:n}}},l=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"DELETE",headers:{Authorization:r()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},o=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e).concat(t?"/".concat(t):"","?populateRef=false"),{headers:{Authorization:r()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},s=function(e,t,n){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"PUT",headers:{Authorization:r()},body:JSON.stringify(n)}).then((function(e){return e.json()}))}catch(c){return{error:c}}}},726:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(10),r=n(45),a=n.n(r),i=(n(0),n(22)),l=n(13),o=n(1);function s(e){var t=e.Component,n=e.props;return new Promise((function(e,r){var s,u=null===(s=document.getElementById("root"))||void 0===s?void 0:s.appendChild(document.createElement("div"));u&&a.a.render(Object(o.jsx)(i.a,{store:l.b,children:Object(o.jsx)(t,Object(c.a)(Object(c.a)({},n),{},{proceed:function(t){var n;a.a.unmountComponentAtNode(u),null===(n=u.parentNode)||void 0===n||n.removeChild(u),e(t)}}))}),u)}))}},728:function(e,t,n){"use strict";var c=n(140),r=n(10),a=n(251),i=n(675),l=n(0),o=n.n(l),s=n(141),u=n.n(s),d=n(1),f=o.a.forwardRef((function(e,t){return Object(d.jsx)("div",Object(r.a)(Object(r.a)({},e),{},{ref:t,children:Object(d.jsx)(a.b,{className:"text-red-500",size:20})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.options,l=e.error,o=e.white,s=void 0!==o&&o,j=Object(c.a)(e,["className","options","error","white"]);return Object(d.jsxs)("div",{className:"".concat(n," relative flex items-center"),children:[Object(d.jsx)("select",Object(r.a)(Object(r.a)({className:u()("px-3 h-34px border-2 border-solid w-full rounded outline-none",{"border-red-400":l,"focus:border-blue-300":!l,"border-gray-300 bg-gray-300":!s,"border-white bg-white":s})},j),{},{spellCheck:!1,children:a.map((function(e,t){return Object(d.jsx)("option",{value:e.value,children:e.label},"opt-"+t)}))})),l?Object(d.jsx)(i.a,{title:l,placement:"top",children:Object(d.jsx)(f,{className:"absolute right-2 my-auto w-auto"})}):null]})}},729:function(e,t,n){"use strict";var c=n(10),r=n(140),a=n(714),i=n(1);t.a=function(e){var t=e.className,n=void 0===t?"":t,l=e.variant,o=void 0===l?"standard":l,s=Object(r.a)(e,["className","variant"]);return Object(i.jsx)(a.a,Object(c.a)(Object(c.a)({},s),{},{className:"outline-none h-26px w-26px rounded ".concat("standard"===o?"bg-orange-300 hover:bg-orange-301":"hover:bg-black hover:bg-opacity-5","  ")+n}))}},731:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"}),"AddRounded");t.default=i},732:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"}),"DeleteOutlineOutlined");t.default=i},733:function(e,t,n){"use strict";var c=n(7),r=n.n(c),a=n(14),i=n(6),l=n(144),o=n(253),s=n(0),u=n.n(s),d=n(1);t.a=function(e){var t=e.fetcher,n=e.onValue,c=e.limit,s=e.onError,f=void 0===s?function(){}:s,j=u.a.useState(!1),b=Object(i.a)(j,2),h=b[0],m=b[1];return Object(d.jsx)(o.a,{className:"w-full",onChange:function(){var e=Object(a.a)(r.a.mark((function e(a){var i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a||h){e.next=5;break}return e.next=3,t();case 3:"error"in(i=e.sent)?(f(i.error),m(!0)):(n(i),(!i.length||i.length<c)&&m(!0));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:h?"":Object(d.jsx)("div",{className:"flex justify-center py-3",children:Object(d.jsx)(l.a,{size:"small"})})})}},734:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}),"EditOutlined");t.default=i},735:function(e,t,n){"use strict";var c=n(10),r=n(0),a=n.n(r),i=n(255),l=n.n(i),o=n(675),s=n(1),u=a.a.forwardRef((function(e,t){return Object(s.jsx)("div",Object(c.a)(Object(c.a)({},e),{},{ref:t,children:Object(s.jsx)(l.a,{className:"text-red-500 text-xl",fontSize:"inherit"})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,c=e.children,r=e.error;return Object(s.jsxs)("div",{className:"flex justify-between relative ".concat(n),children:[Object(s.jsx)("div",{children:c}),r?Object(s.jsx)(o.a,{title:r,placement:"top",children:Object(s.jsx)(u,{className:"absolute right-2 my-auto w-auto"})}):null]})}},736:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),"OpenInNew");t.default=i},743:function(e,t,n){"use strict";var c=n(6),r=n(10),a=n(140),i=n(0),l=n.n(i),o=n(1),s=function(e){var t=e.url,n=e.className,c=void 0===n?"":n,i=Object(a.a)(e,["url","className"]);return Object(o.jsxs)("div",Object(r.a)(Object(r.a)({},i),{},{className:"bg-white rounded-full border-2 border-white box-content "+c,children:[Object(o.jsx)("div",{className:"w-full h-full rounded-full bg-center bg-cover",style:{backgroundImage:"url(".concat(t,")")}}),Object(o.jsx)("img",{src:t,alt:"",className:"hidden"})]}))};t.a=function(e){var t=e.files,n=e.file,r=l.a.useRef(Math.random()),a=l.a.useState(-1),i=Object(c.a)(a,2),u=i[0],d=i[1];return Object(o.jsxs)("div",{className:"flex justify-center",children:[(t||(n?[n]:[])).slice(0,4).map((function(e,t){return Object(o.jsxs)("div",{style:{marginLeft:0===t?0:"-10px"},className:"relative",children:[Object(o.jsx)(s,{className:"w-7 h-7",onMouseEnter:function(){return d(t)},onMouseLeave:function(){return d(-1)},url:e}),Object(o.jsx)("div",{className:"".concat(u===t?"":"hidden"," absolute bottom-full flex justify-center w-9"),children:Object(o.jsx)(s,{url:e,className:"w-16 h-16 flex-shrink-0 -translate-y-7"})})]},"".concat(r,"-file-").concat(t))})),t&&t.length>4?Object(o.jsx)("div",{style:{marginLeft:"-10px"},className:"relative",children:Object(o.jsxs)("div",{className:"w-7 h-7 rounded-full bg-blue-300 text-sm text-white flex items-center justify-center border-2 box-content border-white",children:[t.length-4,"+"]})}):null]})}},763:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z"}),"FilterListRounded");t.default=i},764:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}),"SettingsOutlined");t.default=i},765:function(e,t,n){"use strict";var c=n(58),r=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(60)).default)(a.createElement("path",{d:"M15.88 9.29L12 13.17 8.12 9.29a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"}),"ExpandMoreRounded");t.default=i},778:function(e,t,n){"use strict";var c=n(10),r=n(19),a=n(6),i=n(7),l=n.n(i),o=n(14),s=n(252),u=n(723),d=n(743),f=n(733),j=n(0),b=n.n(j),h=n(765),m=n.n(h),x=n(24),v=n(142),p=n(13),O=n(713),g=n(88),w=n(728),N=n(44),y=n(763),k=n.n(y),I=n(143),C=n(735),M=n(1),z=function(e){var t=e.collectionType,n=e.onValue,c=b.a.useState(!1),i=Object(a.a)(c,2),s=i[0],u=i[1],d=Object(I.a)({onSubmit:function(){var e=Object(o.a)(l.a.mark((function e(t,c){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=c.resetForm,n(t),u(!1),r();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),initialValues:{value:"",operator:"",fieldId:""},validate:function(e){var t={};return Object.keys(e).forEach((function(n){e[n]||(t[n]="Required")})),t}}),f=d.values,j=d.errors,h=d.handleChange,m=d.submitCount,x=d.handleSubmit,v=d.isSubmitting;return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsxs)(N.a,{noMinWidth:!0,onClick:function(){return u(!0)},className:"bg-gray-300 hover:bg-gray-301 flex items-center justify-center",children:[Object(M.jsx)(k.a,{className:"mr-3"}),Object(M.jsx)("div",{children:"Filters"})]}),Object(M.jsx)(O.a,{open:s,children:Object(M.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex",onMouseDown:function(){return u(!1)},children:Object(M.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7  m-auto",children:[Object(M.jsxs)("div",{className:"flex flex-wrap -mx-2 mb-4",children:[Object(M.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(M.jsx)(C.a,{className:"mb-2",error:m>0?j.fieldId:null,children:"Field"}),Object(M.jsx)(w.a,{name:"fieldId",onChange:h,value:f.fieldId,options:[{value:"",label:"Select"}].concat(Object(r.a)(t.fields.map((function(e){return{value:e.id,label:e.id}}))))})]}),Object(M.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(M.jsx)(C.a,{className:"mb-2",error:m>0?j.operator:null,children:"Operator"}),Object(M.jsx)(w.a,{name:"operator",onChange:h,value:f.operator,options:[{value:"",label:"Select"}].concat(Object(r.a)(["<","<=","==",">",">=","!=","array-contains","array-contains-any","in","not-in"].map((function(e){return{value:e,label:e}}))))})]}),Object(M.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(M.jsx)(C.a,{className:"mb-2",error:m>0?j.value:null,children:"Value"}),Object(M.jsx)(g.a,{placeholder:["in","not in","array-contains-any"].includes(f.operator)?"value, value, value":"value",className:"placeholder-black",value:f.value,onChange:h,name:"value"})]})]}),Object(M.jsx)("div",{className:"flex justify-end",children:Object(M.jsx)(N.a,{disabled:v,onClick:function(){return x()},noMinWidth:!0,className:"bg-orange-300 hover:bg-orange-301",children:"Add"})})]})})})]})},S=n(726),E=function(e){var t=e.proceed,n=e.url;return Object(M.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex bg-black bg-opacity-40",onMouseDown:function(){return t(!1)},children:Object(M.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7  m-auto",children:[Object(M.jsx)("div",{className:"mb-12",children:"This query requires creating an index."}),Object(M.jsxs)("div",{className:"flex justify-between",children:[Object(M.jsx)(N.a,{noMinWidth:!0,className:"bg-blue-300 hover:bg-blue-400 text-white",onClick:function(){return t(!1)},children:"Later"}),Object(M.jsx)(N.a,{noMinWidth:!0,className:"bg-orange-300 hover:bg-orange-301",onClick:function(){window.open(n,"_blank"),t(!1)},children:"Create"})]})]})})},A=n(78),D=n(924),T=n(923),P=function(e){var t=e.fields,n=e.proceed,c=b.a.useState([]),i=Object(a.a)(c,2),l=i[0],o=i[1];return b.a.useEffect((function(){o(t)}),[t]),Object(M.jsx)("div",{style:{zIndex:999999},className:"fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40",onMouseDown:function(){return n({fields:l})},children:Object(M.jsxs)("div",{className:"m-auto rounded bg-white max-w-sm w-full relative p-7",onMouseDown:function(e){return e.stopPropagation()},children:[Object(M.jsx)("div",{className:"flex flex-wrap -mx-2 mb-7",children:l.map((function(e,t){return Object(M.jsx)("div",{className:"flex w-1/2 px-2 items-center",children:Object(M.jsx)(T.a,{classes:{label:"font-poppins line-clamp-1"},control:Object(M.jsx)(D.a,{classes:{root:"text-blue-300"},className:"mr-3",checked:e.displayOnTable,onChange:function(e){return o((function(n){var c=Object(r.a)(n);return c[t].displayOnTable=e.target.checked,c}))}}),label:e.id})},"fld-".concat(t))}))}),Object(M.jsx)("div",{className:"flex justify-center",children:Object(M.jsx)(N.a,{onClick:function(){return n({fields:l})},className:"bg-orange-300 hover:bg-orange-301",children:"Save"})})]})})},_=function(){var e=Object(o.a)(l.a.mark((function e(t){var n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.fields,c=t.callback,e.next=3,Object(S.a)({Component:P,props:{fields:n}});case 3:r=e.sent,c(r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=n(189),L=n(141),R=n.n(L),B=function(e){var t=e.docs,n=e.onSelect,c=e.selected,r=e.selectAll,a=e.hoveredRow;return Object(M.jsxs)("div",{className:"absolute left-0 top-0 z-10",children:[Object(M.jsx)("div",{className:"h-48px bg-gray-300 flex items-center w-12 justify-center",children:Object(M.jsx)(D.a,{size:"small",classes:{checked:"text-blue-400"},checked:c.length===t.length,onChange:function(e){return r(e.target.checked)}})}),t.map((function(e,t){return Object(M.jsx)("div",{className:R()("h-48px flex items-center w-12 justify-center",{"bg-gray-300":a===t,"bg-white":a!==t}),children:Object(M.jsx)(D.a,{size:"small",classes:{checked:"text-blue-400"},checked:c.includes(e.docId),onClick:function(e){return e.stopPropagation()},onChange:function(t){return n(e.docId,t.target.checked)}})},"checkbox-".concat(e.docId))}))]})},H=n(764),F=n.n(H),W=n(729),J=n(734),q=n.n(J),U=n(732),G=n.n(U),K=function(e){var t=e.configureView,n=e.docs,c=e.onlySelect,r=void 0!==c&&c,a=e.onEdit,i=e.onDelete,l=e.hoveredRow;return Object(M.jsxs)("div",{className:"absolute top-0 right-3 z-10",children:[Object(M.jsx)("div",{className:"h-48px bg-gray-300",children:Object(M.jsx)("div",{className:"flex justify-end px-2 items-center h-full",children:Object(M.jsx)(W.a,{variant:"transparent",onClick:function(){return t()},className:"cursor-pointer",children:Object(M.jsx)(F.a,{fontSize:"small"})})})}),n.map((function(e,t){return Object(M.jsx)("div",{className:R()("h-48px bg-white",{"bg-gray-300":l===t},{"bg-white":l!==t}),children:r?null:Object(M.jsxs)("div",{className:"flex justify-end px-2 items-center h-full",children:[Object(M.jsx)(W.a,{variant:"transparent",onClick:function(t){t.stopPropagation(),a(e)},className:"cursor-pointer",children:Object(M.jsx)(q.a,{fontSize:"small"})}),Object(M.jsx)(W.a,{variant:"transparent",className:"cursor-pointer",onClick:function(t){t.stopPropagation(),i(e)},children:Object(M.jsx)(G.a,{fontSize:"small"})})]})},e.docId)}))]})};t.a=function(e){var t=e.collectionType,n=e.onSelect,i=e.blackList,j=void 0===i?[]:i,h=(e.singleSelect,function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:_({fields:t.fields,callback:ce});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),O=Object(x.k)(),g=Object(A.b)(),w=b.a.useState([]),y=Object(a.a)(w,2),k=y[0],I=y[1],C=b.a.useState([]),D=Object(a.a)(C,2),T=D[0],P=D[1],L=t.fields.filter((function(e){return e.displayOnTable})),H=b.a.useState([]),F=Object(a.a)(H,2),W=F[0],J=F[1],q=b.a.useState(),U=Object(a.a)(q,2),G=U[0],Q=U[1],X=b.a.useState(-1),Y=Object(a.a)(X,2),Z=Y[0],$=Y[1];b.a.useEffect((function(){P([])}),[G,k]);var ee=function(e){O.push("/collections/".concat(t.id,"/edit/").concat(e.docId))},te=function(){var e=Object(o.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.a)({confirmation:"Do you really want to delete the document?"});case 2:if(!e.sent){e.next=5;break}Object(u.b)(t.id,n.docId),P((function(e){var t=Object(r.a)(e),c=t.findIndex((function(e){return e.docId===n.docId}));return t.splice(c,1),t}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ne=function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.a)({confirmation:"Do you really want to delete ".concat(W.length," documents?")});case 2:if(!e.sent){e.next=6;break}W.forEach((function(e){Object(u.b)(t.id,e)})),P((function(e){return e.filter((function(e){return!W.includes(e.docId)}))})),J([]);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ce=function(e){var n=e.fields,r=e.displayDocIdOnTable,a=null==r||r;Object(s.d)(t.docId,Object(c.a)(Object(c.a)({},t),{},{fields:n})),p.b.dispatch({type:"UPDATE_COLLECTION",docId:t.docId,payload:{fields:n,displayDocIdOnTable:a}})},re=function(e){return(null===G||void 0===G?void 0:G.fieldId)!==e.id?function(){Q({fieldId:e.id,direction:"asc"})}:"asc"!==(null===G||void 0===G?void 0:G.direction)?function(){return Q(void 0)}:function(){return Q({fieldId:e.id,direction:"desc"})}};return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsxs)("div",{className:"flex justify-between mb-3",children:[Object(M.jsx)(z,{collectionType:t,onValue:function(e){return I((function(t){return[e].concat(Object(r.a)(t))}))}}),n?Object(M.jsx)(N.a,{onClick:function(){return n(T.filter((function(e){return W.includes(e.docId)})))},className:"".concat(0===W.length?"bg-gray-300 text-gray-500 cursor-default":"bg-blue-300 hover:bg-blue-400 text-white"," "),children:"Select"}):Object(M.jsx)(N.a,{noMinWidth:!0,onClick:ne,disabled:0===W.length,className:"px-10 ".concat(0===W.length?"bg-gray-300 text-gray-500 cursor-default":"bg-blue-300 hover:bg-blue-400 text-white"," "),children:"Delete"})]}),Object(M.jsx)("div",{className:"flex flex-wrap text-sm",children:k.map((function(e,t){return Object(M.jsxs)("div",{className:"text-blue-400 rounded h-34px leading-34px pl-5 pr-3 flex mr-3 mb-3 relative",children:[Object(M.jsx)("div",{className:"absolute left-0 top-0 w-full h-full bg-blue-400 opacity-10 rounded pointer-events-none"}),e.fieldId," ",e.operator," ",e.value," ",Object(M.jsx)("span",{onClick:function(){return I((function(e){var n=Object(r.a)(e);return n.splice(t,1),n}))},className:"text-xs leading-34px ml-3 cursor-pointer",children:"\u2715"})]},"f-".concat(t))}))}),Object(M.jsxs)(V.a,{className:"relative scrollbar-dark md:max-h-40vw max-h-96 -mr-3",children:[Object(M.jsx)(B,{hoveredRow:Z,docs:T,onSelect:function(e,t){J(t?function(t){return[].concat(Object(r.a)(t),[e])}:function(t){var n=Object(r.a)(t),c=n.findIndex((function(t){return t===e}));return null!=c&&n.splice(c,1),n})},selectAll:function(e){return J(e?T.map((function(e){return e.docId})):[])},selected:W}),Object(M.jsx)(K,{hoveredRow:Z,docs:T,onEdit:ee,onDelete:te,onlySelect:null!=n,configureView:h}),Object(M.jsxs)(V.a,{className:"overflow-auto fireck-table pb-3 mr-3",autoHide:!1,children:[Object(M.jsxs)("table",{className:"w-full text-center",style:{minWidth:142*(L.length+2)},children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{className:"bg-gray-300 h-48px rounded",children:[Object(M.jsx)("th",{className:"w-12",children:Object(M.jsx)("div",{className:"w-12"})}),L.map((function(e,t){return Object(M.jsx)("th",{className:"font-medium",children:Object(M.jsxs)("div",{className:"flex items-center justify-center",children:[Object(M.jsx)("div",{className:"w-5"}),Object(M.jsx)("div",{className:"cursor-pointer select-none",onClick:re(e),children:e.id}),Object(M.jsx)("div",{className:"w-5",children:(null===G||void 0===G?void 0:G.fieldId)===e.id?Object(M.jsx)(m.a,{fontSize:"small",className:"".concat("desc"===(null===G||void 0===G?void 0:G.direction)?"transform rotate-180":"")}):null})]})},"th-".concat(t))})),Object(M.jsx)("th",{className:"w-20",children:Object(M.jsx)("div",{className:"w-20"})})]})}),Object(M.jsx)("tbody",{children:T.map((function(e,t){return j.includes(e.docId)?null:Object(M.jsxs)("tr",{onMouseEnter:function(){return $(t)},onMouseLeave:function(){return $(-1)},onClick:function(){return ee(e)},className:R()("h-48px cursor-pointer",{"bg-gray-300":Z===t}),children:[Object(M.jsx)("td",{className:"w-12",children:Object(M.jsx)("div",{className:"w-12"})}),L.map((function(n,c){return Object(M.jsx)("td",{className:"px-2",children:e[n.id]?"media"===n.type?n.mediaSingle?Object(M.jsx)(d.a,{file:e[n.id]}):Object(M.jsx)(d.a,{files:e[n.id]}):Object(M.jsx)("div",{className:"whitespace-nowrap",children:e[n.id].toString().substring(0,40)}):null},"row-".concat(t,"-col-").concat(c))})),Object(M.jsx)("td",{className:"w-20",children:Object(M.jsx)("div",{className:"w-20"})})]},"row-".concat(t))}))})]}),Object(M.jsx)(f.a,{limit:10,onValue:function(e){return P((function(t){return[].concat(Object(r.a)(t),Object(r.a)(e))}))},onError:function(e){var t;e.includes("FAILED_PRECONDITION")?(t=e.split("it here:")[1],Object(S.a)({Component:E,props:{url:t}})):g(e,{variant:"error"})},fetcher:function(){var e={collectionId:t.id,where:"",orderBy:""};return k.forEach((function(t,n){e.where+=(n>0?";":"")+t.fieldId+","+t.operator+","+t.value,G&&G.fieldId!==t.fieldId&&(e.orderBy+=(e.orderBy?";":"")+t.fieldId)})),G&&(e.orderBy+=(e.orderBy?";":"")+"".concat(G.fieldId,",").concat(G.direction)),G||k.length||(e.orderBy="createdAt,asc"),T.length&&(e.startAfter=T[T.length-1][G?G.fieldId:"createdAt"]),e.populateRef=!1,Object(u.c)(e)}},(G?G.fieldId+G.direction:"no-order")+k.length)]}),Object(M.jsx)("div",{})]})]})}},914:function(e,t,n){"use strict";n.r(t);n(0);var c=n(22),r=n(44),a=n(731),i=n.n(a),l=n(24),o=n(778),s=n(736),u=n.n(s),d=n(1);t.default=function(e){var t=e.match.params.id,n=Object(c.d)((function(e){return{collectionType:e.collectionTypes.find((function(e){return e.id===t}))}})).collectionType,a=Object(l.k)();return Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"flex flex-wrap justify-between mb-7",children:[Object(d.jsx)("div",{className:"mr-3 mb-3 text-36px font-medium capitalize leading-none",children:n?Object(d.jsxs)(d.Fragment,{children:[n.name,Object(d.jsx)("div",{onClick:function(){return window.open(window.location.origin+"/api/".concat(n.id),"_blank")},className:"hover:bg-gray-301 rounded h-8 w-8 ml-3 inline-flex cursor-pointer",children:Object(d.jsx)(u.a,{className:"m-auto"})})]}):null}),Object(d.jsx)(r.a,{onClick:function(){return a.push("/collections/".concat(t,"/add"))},className:"bg-orange-300 hover:bg-orange-301 mb-3",children:Object(d.jsxs)("div",{className:"flex items-center",children:[Object(d.jsx)(i.a,{fontSize:"inherit",className:"text-lg mr-3"}),"Add Document"]})})]}),n?Object(d.jsx)(o.a,{collectionType:n},n.id):null]})}}}]);
//# sourceMappingURL=10.80e102e0.chunk.js.map