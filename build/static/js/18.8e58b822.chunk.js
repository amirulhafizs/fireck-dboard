(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[18],{1027:function(e,t,n){"use strict";n.r(t);var c=n(4),a=n(17),r=n(1),i=n.n(r),o=n(5),s=n(12),l=n(26),u=function(){var e=l.a.getState().user;return"Bearer "+(e?e.token:null)};function p(e,t){var n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),c=document.createElement("a");c.setAttribute("href",n),c.setAttribute("download",t+".json"),document.body.appendChild(c),c.click(),c.remove()}var d=function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(window.location.origin+"/private/import-export/export",{method:"POST",headers:{Authorization:u()},body:JSON.stringify(t)}).then((function(e){return e.json()}));case 2:p(e.sent,"FireckDatabaseSchema");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(e){return fetch(window.location.origin+"/private/import-export/import",{method:"POST",headers:{Authorization:u()},body:JSON.stringify(e)}).then((function(e){return e.json()}))},b=n(0),m=n(91),j=n(53),x=n(788),h=n(1025),O=n(999),v=n(804),k=n(298),w=n.n(k),N=n(42),g=n(2);t.default=function(){var e=Object(b.useRef)(null),t=Object(m.b)(),n=[{title:"Export JSON",btnText:"Export",description:"Export database JSON schema. This JSON file is meant to be imported into other Fireck app",onClick:function(){return k(!0)}},{title:"Import JSON",btnText:"Import",description:"Import database JSON schema file that was exported from other Fireck app.",onClick:function(){e.current.click()}}],r=Object(b.useState)(!1),u=Object(s.a)(r,2),p=u[0],k=u[1],y=Object(b.useState)({collections:!0,collectionTypes:!0,roles:!0,appearance:!0}),S=Object(s.a)(y,2),T=S[0],C=S[1],J=Object(b.useState)(!1),E=Object(s.a)(J,2),A=E[0],I=E[1];return Object(g.jsxs)("div",{children:[Object(g.jsx)(v.a,{className:"mb-12",children:"Import & Export"}),Object(g.jsx)("input",{className:"hidden",ref:e,type:"file",onChange:function(e){var n=e.target.files;if(n&&n.length){var c=new FileReader;c.onload=Object(o.a)(i.a.mark((function e(){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.a.dispatch({type:"SET_LOADING",payload:"Importing database..."}),n=JSON.parse(c.result),e.next=4,f(n);case 4:a=e.sent,l.a.dispatch({type:"SET_LOADING",payload:!1}),a.error||(t("Database imported!",{variant:"success"}),N.a.fetchCollectionTypes(),N.a.fetchAppearance());case 7:case"end":return e.stop()}}),e)}))),c.readAsText(n[0])}}}),p?Object(g.jsx)(x.a,{open:p,hideBackdrop:!0,children:Object(g.jsx)("div",{className:"w-full h-full overflow-auto flex bg-black bg-opacity-40",onMouseDown:function(){return k(!1)},children:Object(g.jsxs)("div",{className:"bg-white p-7 rounded m-auto animate-littlemoveup relative",onMouseDown:function(e){return e.stopPropagation()},children:[Object(g.jsx)(w.a,{className:"absolute top-0 right-0 cursor-pointer",onClick:function(){return k(!1)}}),Object(g.jsx)("div",{className:"flex flex-wrap max-w-422px w-full mb-9",children:Object.keys(T).map((function(e){return Object(g.jsx)("div",{className:"flex w-1/2 px-2 items-center select-none",children:Object(g.jsx)(h.a,{classes:{label:"font-poppins line-clamp-1"},control:Object(g.jsx)(O.a,{classes:{root:"text-fireck-1"},className:"mr-3",checked:T[e],onChange:function(t){C((function(n){return Object(a.a)(Object(a.a)({},n),{},Object(c.a)({},e,t.target.checked))})),"collections"===e&&t.target.checked?C((function(e){return Object(a.a)(Object(a.a)({},e),{},{collectionTypes:!0})})):"collectionTypes"!==e||t.target.checked||C((function(e){return Object(a.a)(Object(a.a)({},e),{},{collections:!1})}))}}),label:e})},e)}))}),Object(g.jsx)("div",{className:"flex justify-end",children:Object(g.jsx)(j.a,{onClick:Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,d(T);case 3:I(!1),k(!1);case 5:case"end":return e.stop()}}),e)}))),className:"bg-fireck-4 hover:bg-fireck-4-hover h-34px",children:A?"Exporting...":"Export"})})]})})}):null,Object(g.jsx)("div",{className:"flex flex-wrap",children:n.map((function(e,t){return Object(g.jsxs)("div",{className:"p-7 bg-fireck-3 text-white rounded mr-3 mb-3 max-w-sm w-full flex flex-col",children:[Object(g.jsx)("div",{className:"font-medium text-lg mb-2",children:e.title}),Object(g.jsx)("div",{className:"mb-7 text-sm",children:e.description}),Object(g.jsx)("div",{className:"flex justify-end flex-grow items-end",children:Object(g.jsx)(j.a,{onClick:e.onClick,className:"bg-fireck-4 min-w-unset hover:bg-fireck-4-hover h-34px w-140px text-black",children:e.btnText})})]},"section-".concat(t))}))})]})}},804:function(e,t,n){"use strict";var c=n(17),a=n(172),r=n(102),i=n.n(r),o=n(2),s=["className"];t.a=function(e){var t=e.className,n=Object(a.a)(e,s);return Object(o.jsx)("div",Object(c.a)(Object(c.a)({},n),{},{className:i()("text-27px text-white font-medium capitalize leading-none",t)}))}}}]);
//# sourceMappingURL=18.8e58b822.chunk.js.map