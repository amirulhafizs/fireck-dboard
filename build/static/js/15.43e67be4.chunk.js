(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[15],{1019:function(e,t,n){"use strict";n.r(t);n(0);var c=n(37),r=n(53),a=n(802),i=n.n(a),l=n(30),o=n(800),s=n(875),u=n.n(s),d=n(2);t.default=function(e){var t=e.match.params.id,n=Object(c.e)((function(e){return{collectionType:e.collectionTypes.find((function(e){return e.id===t}))}})).collectionType,a=Object(l.k)();return Object(d.jsxs)("div",{className:"h-full flex flex-col w-full",children:[Object(d.jsxs)("div",{className:"flex flex-wrap justify-between mb-5",children:[Object(d.jsx)("div",{className:"mr-3 mb-3 text-27px font-medium capitalize leading-none text-white",children:n?Object(d.jsxs)("div",{className:"flex items-center",children:[n.name,Object(d.jsx)("div",{onClick:function(){return window.open(window.location.origin+"/api/".concat(n.id),"_blank")},className:"hover:bg-fireck-1-hover rounded h-8 w-8 ml-3 inline-flex cursor-pointer",children:Object(d.jsx)(u.a,{className:"m-auto"})})]}):null}),Object(d.jsx)(r.a,{onClick:function(){return a.push("/collections/".concat(t,"/add"))},className:"bg-fireck-4 hover:bg-fireck-4-hover mb-3 h-34px min-w-unset",children:Object(d.jsxs)("div",{className:"flex items-center",children:[Object(d.jsx)(i.a,{fontSize:"inherit",className:"text-lg sm:mr-3"}),Object(d.jsx)("span",{className:"sm:block hidden",children:"Add Document"}),Object(d.jsx)("span",{className:"sm:hidden",children:"Add"})]})})]}),n?Object(d.jsx)("div",{className:"flex-grow h-0",children:Object(d.jsx)(o.a,{groundColor:"black",collectionType:n},n.id)}):null]})}},797:function(e,t,n){"use strict";var c=n(172),r=n(17),a=n(808),i=n(739),l=n(0),o=n.n(l),s=n(102),u=n.n(s),d=n(2),b=["className","options","error","groundColor"],j=o.a.forwardRef((function(e,t){return Object(d.jsx)("div",Object(r.a)(Object(r.a)({},e),{},{ref:t,children:Object(d.jsx)(a.a,{className:"text-red-FF0000",size:20})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.options,l=e.error,o=e.groundColor,s=Object(c.a)(e,b);return Object(d.jsxs)("div",{className:"".concat(n," relative flex items-center"),children:[Object(d.jsx)("select",Object(r.a)(Object(r.a)({className:u()("px-3 h-full border-2 border-solid w-full rounded outline-none",{"border-red-FF0000":l,"focus:border-fireck-4":!l,"border-gray-300 bg-gray-300":"white"===o,"border-white bg-white":"black"===o})},s),{},{spellCheck:!1,children:a.map((function(e,t){return Object(d.jsx)("option",{"data-testid":"select-option-".concat(e.value),value:e.value,children:e.label},"opt-"+t)}))})),l?Object(d.jsx)(i.a,{title:l,placement:"top",children:Object(d.jsx)(j,{className:"absolute right-2 my-auto w-auto"})}):null]})}},798:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var c=n(17),r=n(33),a=n.n(r),i=(n(0),n(37)),l=n(26),o=n(91),s=n(2);function u(e){var t=e.Component,n=e.props;return new Promise((function(e,r){var u,d=null===(u=document.getElementById("root"))||void 0===u?void 0:u.appendChild(document.createElement("div"));d&&a.a.render(Object(s.jsx)(i.a,{store:l.a,children:Object(s.jsx)(o.a,{children:Object(s.jsx)(t,Object(c.a)(Object(c.a)({},n),{},{proceed:function(t){var n;a.a.unmountComponentAtNode(d),null===(n=d.parentNode)||void 0===n||n.removeChild(d),e(t)}}))})}),d)}))}},799:function(e,t,n){"use strict";var c=n(17),r=n(0),a=n.n(r),i=n(302),l=n.n(i),o=n(739),s=n(102),u=n.n(s),d=n(2),b=a.a.forwardRef((function(e,t){return Object(d.jsx)("div",Object(c.a)(Object(c.a)({},e),{},{ref:t,children:Object(d.jsx)(l.a,{className:"text-red-500 text-xl",fontSize:"inherit"})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,c=e.children,r=e.error,a=e.groundColor;return Object(d.jsxs)("div",{className:u()("flex justify-between relative ".concat(n),{"text-white":"black"===a,"text-black":"white"===a}),children:[Object(d.jsx)("div",{children:c}),r?Object(d.jsx)(o.a,{title:r,placement:"top",children:Object(d.jsx)(b,{className:"absolute right-2 my-auto w-auto"})}):null]})}},800:function(e,t,n){"use strict";var c=n(19),r=n(1),a=n.n(r),i=n(5),l=n(12),o=n(225),s=n(805),u=n(0),d=n.n(u),b=n(812),j=n.n(b),f=n(30),h=n(173),x=n(803),m=n(53),p=n(174),v=n(102),O=n.n(v),g=n(91),w=n(798),N=n(2),k=function(e){var t=e.proceed,n=e.url;return Object(N.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex bg-black bg-opacity-40",onMouseDown:function(){return t(!1)},children:Object(N.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7  m-auto",children:[Object(N.jsx)("div",{className:"mb-12",children:"This query requires creating an index."}),Object(N.jsxs)("div",{className:"flex justify-between",children:[Object(N.jsx)(m.a,{className:"bg-fireck-5 hover:bg-fireck-5-hover min-w-unset text-white h-28px",onClick:function(){return t(!1)},children:"Later"}),Object(N.jsx)(m.a,{className:"bg-fireck-4 hover:bg-fireck-4-hover min-w-unset h-28px",onClick:function(){window.open(n,"_blank"),t(!1)},children:"Create"})]})]})})},y=function(e){var t=e.collectionId,n=e.filters,r=void 0===n?[]:n,s=e.orderBy,d=e.inView,b=Object(u.useState)([]),j=Object(l.a)(b,2),f=j[0],h=j[1],x=Object(u.useRef)(!1),m=Object(u.useRef)(!1),p=Object(u.useRef)(!1),v=Object(g.b)(),O=Object(u.useState)(!1),N=Object(l.a)(O,2),y=N[0],C=N[1],I=Object(u.useRef)(new AbortController),E=Object(u.useState)(0),S=Object(l.a)(E,2),D=S[0],F=S[1],R=Object(u.useCallback)((function(e){var n={collectionId:t,where:"",orderBy:""};return r.forEach((function(e,t){n.where+=(t>0?";":"")+e.fieldId+","+e.operator+","+e.value,s&&s.fieldId!==e.fieldId&&(n.orderBy+=(n.orderBy?";":"")+e.fieldId)})),s&&(n.orderBy+=(n.orderBy?";":"")+"".concat(s.fieldId,",").concat(s.direction)),s||r.length||(n.orderBy="createdAt,asc"),e.length&&(n.startAfter=e[e.length-1][s?s.fieldId:"createdAt"]),n.populateRef=!1,n}),[s,r,t]),z=function(e){var t;e.includes("FAILED_PRECONDITION")?(t=e.split("it here:")[1],Object(w.a)({Component:k,props:{url:t}})):v(e,{variant:"error"})};return Object(u.useEffect)((function(){x.current=d;var e=function(){var e=Object(i.a)(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(!m.current&&x.current||p.current)){e.next=10;break}return t=p.current,p.current=!1,n=R(t?[]:f),C(!0),e.next=7,Object(o.c)(n,I.current.signal);case 7:(r=e.sent).error?"aborted"!==r.error&&z(r.error):(h((function(e){return t?r:[].concat(Object(c.a)(e),Object(c.a)(r))})),r.length<(n.limit||10)&&(m.current=!0)),C(!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){I.current.abort(),I.current=new AbortController}}),[d,f,D]),Object(u.useEffect)((function(){p.current=!0,m.current=!1,F((function(e){return e+1}))}),[r,s]),{docs:f,setDocs:h,loading:y}},C=n(300),I=n(999),E=n(811),S=n.n(E);t.a=function(e){var t=e.collectionType,n=e.onPick,r=e.blackList,b=void 0===r?[]:r,v=e.singleSelect,g=void 0!==v&&v,w=e.valueFormatters,k=e.groundColor,E=e.filters,D=void 0===E?[]:E,F=e.onEdit,R=e.hideFilters,z=void 0!==R&&R,A=Object(f.k)(),M=d.a.useState([]),T=Object(l.a)(M,2),V=T[0],B=T[1],P=t.fields.filter((function(e){return e.displayOnTable})),H=d.a.useState([]),_=Object(l.a)(H,2),L=_[0],Y=_[1],q=d.a.useState(),J=Object(l.a)(q,2),K=J[0],W=J[1],G=d.a.useState(!1),Q=Object(l.a)(G,2),U=Q[0],X=Q[1],Z=y({collectionId:t.id,filters:V,orderBy:K,inView:U}),$=Z.docs,ee=Z.setDocs,te=function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(h.a)({confirmation:"Delete ".concat(L.length," documents?")});case 2:if(!e.sent){e.next=6;break}L.forEach((function(e){Object(o.b)(t.id,e)})),ee((function(e){return e.filter((function(e){return!L.includes(e.docId)}))})),Y([]);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=F||function(e){A.push("/collections/".concat(t.id,"/edit/").concat(e.docId))},ce=function(e){return(null===K||void 0===K?void 0:K.fieldId)!==e.id?function(){W({fieldId:e.id,direction:"asc"})}:"asc"!==(null===K||void 0===K?void 0:K.direction)?function(){return W(void 0)}:function(){return W({fieldId:e.id,direction:"desc"})}},re=function(e,t){Y(t?g?[e]:function(t){return[].concat(Object(c.a)(t),[e])}:function(t){var n=Object(c.a)(t),r=n.findIndex((function(t){return t===e}));return null!=r&&n.splice(r,1),n})},ae=function(e,t){return"date"===e.type?S()(t).format("YYYY-MM-DD HH:mm"):w&&e.id in w?w[e.id](t):t.toString().substring(0,40)};return Object(u.useEffect)((function(){D.length&&B((function(e){return[].concat(Object(c.a)(e),Object(c.a)(D))}))}),[D]),Object(N.jsxs)("div",{className:"h-full w-full flex-col flex",children:[Object(N.jsxs)("div",{className:"flex justify-between mb-3",children:[z?null:Object(N.jsxs)("div",{className:"flex flex-wrap",children:[Object(N.jsx)(x.a,{collectionType:t,onValue:function(e){return B((function(t){return[e].concat(Object(c.a)(t))}))}}),V.map((function(e,t){return e.hidden?null:Object(N.jsxs)("div",{className:O()("rounded min-h-28px border leading-28px pl-3 text-sm pr-3 flex mr-3 mb-3 relative",{"text-white border-white":"black"===k},{"text-black border-black":"white"===k}),children:[e.fieldId," ",e.operator," ",e.value," ",Object(N.jsx)("span",{onClick:function(){return B((function(e){var n=Object(c.a)(e);return n.splice(t,1),n}))},className:"text-xs leading-28px ml-3 cursor-pointer",children:"\u2715"})]},"f-".concat(t))}))]}),n?Object(N.jsx)(m.a,{onClick:function(){return n($.filter((function(e){return L.includes(e.docId)})))},className:"h-28px min-w-unset mb-3 px-7 ".concat(0===L.length?"bg-gray-300 text-gray-500 cursor-default":"bg-fireck-4 hover:bg-fireck-4-hover"," "),children:"Select"}):Object(N.jsx)(m.a,{onClick:te,disabled:0===L.length,className:"px-7 mb-3 min-w-unset h-28px ".concat(0===L.length?"bg-gray-E1E1E1 text-gray-6C6C6C cursor-default":"bg-red-FF0000 hover:bg-red-FF0000-hover text-white"," "),children:"Delete"})]}),Object(N.jsx)("div",{className:O()("flex-grow h-0 -mt-3 rounded overflow-hidden bg-white",{"shadow-border-gray":"white"===k}),children:Object(N.jsxs)(p.a,{className:"relative scrollbar-light h-full",autoHide:!1,children:[Object(N.jsxs)("table",{className:"w-full text-center",children:[Object(N.jsx)("thead",{children:Object(N.jsxs)("tr",{className:"whitespace-nowrap",children:[Object(N.jsx)("th",{className:"sticky top-0 bg-gray-E1E1E1 z-10 px-1",children:g?null:Object(N.jsx)(I.a,{size:"small",classes:{checked:"text-fireck-1",root:"p-0"},checked:L.length===$.length,onChange:function(e){return t=e.target.checked,Y(t?$.map((function(e){return e.docId})):[]);var t}})}),P.map((function(e,t){return Object(N.jsx)("th",{className:"font-semibold sticky top-0 bg-gray-E1E1E1",children:Object(N.jsxs)("div",{className:"flex items-center justify-center",children:[Object(N.jsx)("div",{className:"w-5"}),Object(N.jsx)("div",{className:"cursor-pointer select-none",onClick:ce(e),children:e.id}),Object(N.jsx)("div",{className:"w-5",children:(null===K||void 0===K?void 0:K.fieldId)===e.id?Object(N.jsx)(j.a,{fontSize:"small",className:"".concat("asc"===(null===K||void 0===K?void 0:K.direction)?"transform rotate-180":"")}):null})]})},"th-".concat(t))}))]})}),Object(N.jsxs)("tbody",{children:[$.map((function(e,t){return b.includes(e.docId)?null:Object(N.jsxs)("tr",{onClick:function(){return n?re(e.docId,!L.includes(e.docId)):ne(e)},className:"cursor-pointer hover:bg-fireck-4",children:[Object(N.jsx)("td",{className:"px-1",onClick:function(e){return e.stopPropagation()},children:Object(N.jsx)(I.a,{size:"small",classes:{checked:"text-fireck-1",root:"p-0"},checked:L.includes(e.docId),onChange:function(t){return re(e.docId,t.target.checked)}})}),P.map((function(n,c){return Object(N.jsx)("td",{className:"px-2",children:null!=e[n.id]?"media"===n.type?n.mediaSingle?Object(N.jsx)(s.a,{file:e[n.id]}):Object(N.jsx)(s.a,{files:e[n.id]}):Object(N.jsx)("div",{className:"whitespace-nowrap",children:ae(n,e[n.id])}):null},"row-".concat(t,"-col-").concat(c))}))]},"row-".concat(t))})),Object(N.jsx)("tr",{children:Object(N.jsx)("td",{colSpan:P.length+1,children:Object(N.jsx)(C.a,{onChange:function(){var e=Object(i.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:X(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:Object(N.jsx)("div",{className:"w-full"})})})})]})]}),Object(N.jsx)("div",{})]})})]})}},803:function(e,t,n){"use strict";var c=n(19),r=n(1),a=n.n(r),i=n(5),l=n(12),o=n(788),s=n(104),u=n(797),d=n(53),b=n(0),j=n.n(b),f=n(175),h=n(799),x=n(298),m=n.n(x),p=n(2);t.a=function(e){var t=e.collectionType,n=e.onValue,r=e.groundColor,b=void 0===r?"white":r,x=j.a.useState(!1),v=Object(l.a)(x,2),O=v[0],g=v[1],w=Object(f.a)({onSubmit:function(){var e=Object(i.a)(a.a.mark((function e(t,c){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=c.resetForm,n(t),g(!1),r();case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),initialValues:{value:"",operator:"",fieldId:""},validate:function(e){var t={};return Object.keys(e).forEach((function(n){e[n]||(t[n]="Required")})),t}}),N=w.values,k=w.errors,y=w.handleChange,C=w.submitCount,I=w.handleSubmit,E=w.isSubmitting;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(d.a,{onClick:function(){return g(!0)},className:"bg-fireck-4 hover:bg-fireck-4-hover min-w-unset flex items-center justify-center h-28px px-7 rounded text-sm mr-3 mb-3",children:"Filters"}),O?Object(p.jsx)(o.a,{open:O,children:Object(p.jsx)("div",{className:"fixed left-0 top-0 w-full h-full flex p-7",onMouseDown:function(){return g(!1)},children:Object(p.jsxs)("div",{onMouseDown:function(e){return e.stopPropagation()},className:"bg-white rounded p-7 m-auto relative animate-littlemoveup",style:{maxWidth:600},children:[Object(p.jsx)(m.a,{className:"absolute top-0 right-0 cursor-pointer",onClick:function(){return g(!1)}}),Object(p.jsxs)("div",{className:"flex flex-wrap -mx-2 mb-4",children:[Object(p.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(p.jsx)(h.a,{groundColor:b,className:"mb-2",error:C>0?k.fieldId:null,children:"Field"}),Object(p.jsx)(u.a,{className:"h-34px",groundColor:"white",name:"fieldId",onChange:y,value:N.fieldId,options:[{value:"",label:"Select"}].concat(Object(c.a)(t.fields.map((function(e){return{value:e.id,label:e.id}}))))})]}),Object(p.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(p.jsx)(h.a,{groundColor:b,className:"mb-2",error:C>0?k.operator:null,children:"Operator"}),Object(p.jsx)(u.a,{className:"h-34px",groundColor:"white",name:"operator",onChange:y,value:N.operator,options:[{value:"",label:"Select"}].concat(Object(c.a)(["<","<=","==",">",">=","!=","array-contains","array-contains-any","in","not-in"].map((function(e){return{value:e,label:e}}))))})]}),Object(p.jsxs)("div",{className:"sm:w-1/3 w-full mb-3 px-2",children:[Object(p.jsx)(h.a,{groundColor:b,className:"mb-2 text-black",error:C>0?k.value:null,children:"Value"}),Object(p.jsx)(s.a,{onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),I())},groundColor:"white",placeholder:["in","not in","array-contains-any"].includes(N.operator)?"value, value, value":"value",className:"placeholder-black h-34px",value:N.value,onChange:y,name:"value"})]})]}),Object(p.jsx)("div",{className:"flex justify-end",children:Object(p.jsx)(d.a,{disabled:E,onClick:function(){return I()},className:"bg-fireck-4 hover:bg-fireck-4-hover h-34px",children:"Add"})})]})})}):null]})}},805:function(e,t,n){"use strict";var c=n(0),r=n.n(c),a=n(17),i=n(2),l=Object(c.forwardRef)((function(e,t){return Object(i.jsx)("div",Object(a.a)(Object(a.a)({},e),{},{ref:t}))})),o=n(739),s=function(e){var t=e.src;return Object(i.jsx)(o.a,{arrow:!0,title:Object(i.jsx)("div",{className:"p-1",children:Object(i.jsx)("img",{src:t,className:"max-w-136px max-h-136px w-auto h-auto",alt:""})}),placement:"top",classes:{tooltip:"font-poppins text-xs p-0 rounded bg-fireck-1",arrow:"text-fireck-1"},children:Object(i.jsx)(l,{children:Object(i.jsx)("div",{className:"group w-4 h-4 relative flex items-center justify-center rounded hover:bg-gray-535371 hover:bg-opacity-5 cursor-pointer",children:Object(i.jsx)("div",{className:"relative w-4 h-4 rounded-full bg-center bg-cover pointer-events-none",style:{backgroundImage:"url(".concat(t,")")}})})})})};t.a=function(e){var t=e.files,n=e.file,c=r.a.useRef(Math.random());return Object(i.jsxs)("div",{className:"flex justify-center",children:[(t||(n?[n]:[])).slice(0,4).map((function(e,t){return Object(i.jsx)("div",{className:"mr-0.5",children:Object(i.jsx)(s,{src:e})},"".concat(c,"-file-").concat(t))})),t&&t.length>4?Object(i.jsx)("div",{className:"relative",children:Object(i.jsxs)("div",{className:"w-4 h-4 rounded-full bg-fireck-4 text-10px flex items-center justify-center",children:[t.length-4,"+"]})}):null]})}},875:function(e,t,n){"use strict";var c=n(63),r=n(226);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),i=(0,c(n(227)).default)(a.createElement("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),"OpenInNew");t.default=i}}]);
//# sourceMappingURL=15.43e67be4.chunk.js.map