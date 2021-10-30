(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[17],{728:function(e,t,n){"use strict";var c=n(10),a=n(141),r=n(122),o=n.n(r),s=n(1);t.a=function(e){var t=e.className,n=Object(a.a)(e,["className"]);return Object(s.jsx)("div",Object(c.a)(Object(c.a)({},n),{},{className:o()("text-34px font-medium capitalize leading-none",t)}))}},923:function(e,t,n){"use strict";n.r(t);var c=n(15),a=n(10),r=n(7),o=n.n(r),s=n(14),i=n(5),l=n(13),u=function(){var e=l.b.getState().user;return"Bearer "+(e?e.token:null)};function p(e,t){var n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),c=document.createElement("a");c.setAttribute("href",n),c.setAttribute("download",t+".json"),document.body.appendChild(c),c.click(),c.remove()}var d=function(){var e=Object(s.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(window.location.origin+"/private/import-export/export",{method:"POST",headers:{Authorization:u()},body:JSON.stringify(t)}).then((function(e){return e.json()}));case 2:p(e.sent,"FireckDatabaseSchema");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(e){return fetch(window.location.origin+"/private/import-export/import",{method:"POST",headers:{Authorization:u()},body:JSON.stringify(e)}).then((function(e){return e.json()}))},f=n(0),j=n(78),m=n(251),x=n(47),h=n(715),O=n(906),v=n(907),N=n(64),g=n(377),w=n(728),k=n(1);t.default=function(){var e=Object(f.useRef)(null),t=Object(j.b)(),n=[{title:"Export JSON",btnText:"Export",description:"Export database JSON schema. This JSON file is meant to be imported into other Fireck app",onClick:function(){return y(!0)}},{title:"Import JSON",btnText:"Import",description:"Import database JSON schema file that was exported from other Fireck app.",onClick:function(){e.current.click()}}],r=Object(f.useState)(!1),u=Object(i.a)(r,2),p=u[0],y=u[1],S=Object(f.useState)({collections:!0,collectionTypes:!0,roles:!0,appearance:!0}),E=Object(i.a)(S,2),T=E[0],A=E[1],C=Object(f.useState)(!1),J=Object(i.a)(C,2),I=J[0],P=J[1];return Object(k.jsxs)("div",{children:[Object(k.jsx)(w.a,{className:"mb-12",children:"Import & Export"}),Object(k.jsx)("input",{className:"hidden",ref:e,type:"file",onChange:function(e){var n=e.target.files;if(n&&n.length){var c=new FileReader;c.onload=Object(s.a)(o.a.mark((function e(){var n,a,r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.b.dispatch({type:"SET_LOADING",payload:"Importing database..."}),n=JSON.parse(c.result),e.next=4,b(n);case 4:if(a=e.sent,l.b.dispatch({type:"SET_LOADING",payload:!1}),a.error){e.next=16;break}return t("Database imported!",{variant:"success"}),e.next=10,Object(m.c)();case 10:return(r=e.sent).error||l.b.dispatch({type:"SET_COLLECTION_TYPES",payload:r}),e.next=14,Object(N.c)();case 14:(s=e.sent).error||(l.b.dispatch({type:"SET_APPEARANCE",payload:s}),l.b.dispatch({type:"SET_NEW_APPEARANCE",payload:s}),Object(g.b)(s.colors));case 16:case"end":return e.stop()}}),e)}))),c.readAsText(n[0])}}}),Object(k.jsx)(h.a,{open:p,hideBackdrop:!0,children:Object(k.jsx)("div",{className:"w-full h-full overflow-auto flex bg-black bg-opacity-40",onMouseDown:function(){return y(!1)},children:Object(k.jsxs)("div",{className:"bg-white p-9 rounded m-auto",onMouseDown:function(e){return e.stopPropagation()},children:[Object(k.jsx)("div",{className:"flex flex-wrap max-w-422px w-full mb-9",children:Object.keys(T).map((function(e){return Object(k.jsx)("div",{className:"flex w-1/2 px-2 items-center select-none",children:Object(k.jsx)(O.a,{classes:{label:"font-poppins line-clamp-1"},control:Object(k.jsx)(v.a,{classes:{root:"text-blue-300"},className:"mr-3",checked:T[e],onChange:function(t){A((function(n){return Object(a.a)(Object(a.a)({},n),{},Object(c.a)({},e,t.target.checked))})),"collections"===e&&t.target.checked?A((function(e){return Object(a.a)(Object(a.a)({},e),{},{collectionTypes:!0})})):"collectionTypes"!==e||t.target.checked||A((function(e){return Object(a.a)(Object(a.a)({},e),{},{collections:!1})}))}}),label:e})},e)}))}),Object(k.jsx)("div",{className:"flex justify-end",children:Object(k.jsx)(x.a,{onClick:Object(s.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(!0),e.next=3,d(T);case 3:P(!1),y(!1);case 5:case"end":return e.stop()}}),e)}))),className:"bg-orange-300 hover:bg-orange-301",children:I?"Exporting...":"Export"})})]})})}),Object(k.jsx)("div",{className:"flex flex-wrap",children:n.map((function(e,t){return Object(k.jsxs)("div",{className:"p-7 bg-gray-300 rounded mr-3 mb-3 max-w-sm w-full flex flex-col",children:[Object(k.jsx)("div",{className:"font-medium text-lg mb-2",children:e.title}),Object(k.jsx)("div",{className:"mb-7 text-sm",children:e.description}),Object(k.jsx)("div",{className:"flex justify-end flex-grow items-end",children:Object(k.jsx)(x.a,{noMinWidth:!0,onClick:e.onClick,className:"bg-orange-300 hover:bg-orange-301 w-140px",children:e.btnText})})]},"section-".concat(t))}))})]})}}}]);
//# sourceMappingURL=17.1a072da6.chunk.js.map