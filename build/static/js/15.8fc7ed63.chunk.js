(this["webpackJsonpfirebase-cms1"]=this["webpackJsonpfirebase-cms1"]||[]).push([[15],{724:function(e,t,n){"use strict";var r=n(10),a=n(140),c=n(141),s=n.n(c),i=n(1);t.a=function(e){var t=e.className,n=Object(a.a)(e,["className"]);return Object(i.jsx)("div",Object(r.a)(Object(r.a)({},n),{},{className:s()("text-34px font-medium capitalize leading-none",t)}))}},727:function(e,t,n){"use strict";var r=n(140),a=n(10),c=n(251),s=n(675),i=n(0),o=n.n(i),l=n(141),u=n.n(l),d=n(1),b=o.a.forwardRef((function(e,t){return Object(d.jsx)("div",Object(a.a)(Object(a.a)({},e),{},{ref:t,children:Object(d.jsx)(c.b,{className:"text-red-500",size:20})}))}));t.a=function(e){var t=e.className,n=void 0===t?"":t,c=e.options,i=e.error,o=e.white,l=void 0!==o&&o,f=Object(r.a)(e,["className","options","error","white"]);return Object(d.jsxs)("div",{className:"".concat(n," relative flex items-center"),children:[Object(d.jsx)("select",Object(a.a)(Object(a.a)({className:u()("px-3 h-34px border-2 border-solid w-full rounded outline-none",{"border-red-400":i,"focus:border-blue-300":!i,"border-gray-300 bg-gray-300":!l,"border-white bg-white":l})},f),{},{spellCheck:!1,children:c.map((function(e,t){return Object(d.jsx)("option",{value:e.value,children:e.label},"opt-"+t)}))})),i?Object(d.jsx)(s.a,{title:i,placement:"top",children:Object(d.jsx)(b,{className:"absolute right-2 my-auto w-auto"})}):null]})}},730:function(e,t,n){"use strict";var r=n(58),a=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(0)),s=(0,r(n(60)).default)(c.createElement("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"}),"AddRounded");t.default=s},773:function(e,t,n){"use strict";var r=n(58),a=n(59);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(0)),s=(0,r(n(60)).default)(c.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Create");t.default=s},925:function(e,t,n){"use strict";n.r(t);var r=n(19),a=n(7),c=n.n(a),s=n(14),i=n(6),o=n(44),l=n(0),u=n.n(l),d=n(730),b=n.n(d),f=n(727),j=n(10),m=n(924),p=n(13),h=function(){var e=p.b.getState().user;return"Bearer "+(e?e.token:null)},x=["find","find one","count","create","update","delete","type"],v=function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",fetch("".concat(window.location.origin,"/private/roles/"),{method:"POST",headers:{Authorization:h()},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 4:return e.prev=4,e.t0=e.catch(0),e.abrupt("return",{error:e.t0});case 7:case"end":return e.stop()}}),e,null,[[0,4]])})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",fetch("".concat(window.location.origin,"/private/roles/").concat(t.docId),{method:"PUT",headers:{Authorization:h()},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 4:return e.prev=4,e.t0=e.catch(0),e.abrupt("return",{error:e.t0});case 7:case"end":return e.stop()}}),e,null,[[0,4]])})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",fetch("".concat(window.location.origin,"/private/roles"),{headers:{Authorization:h()}}).then((function(e){return e.json()})));case 4:return e.prev=4,e.t0=e.catch(0),e.abrupt("return",{error:e.t0});case 7:case"end":return e.stop()}}),e,null,[[0,4]])})));return function(){return e.apply(this,arguments)}}(),w=n(773),N=n.n(w),k=n(189),y=n(1),S=function(e){var t=e.role,n=e.collections,r=e.onSave,a=e.setEditRole,l=u.a.useState(),d=Object(i.a)(l,2),b=d[0],f=d[1],p=u.a.useState(!1),h=Object(i.a)(p,2),v=h[0],O=h[1];u.a.useEffect((function(){t&&f(JSON.parse(JSON.stringify(t)))}),[t]);var g=!(JSON.stringify(t)===JSON.stringify(b));return b?Object(y.jsxs)("div",{className:"bg-gray-300 p-9 rounded",children:[Object(y.jsxs)("div",{className:"flex justify-between mb-3 flex-wrap",children:[Object(y.jsxs)("div",{className:"flex mr-3 mb-4 items-center",children:[Object(y.jsx)("div",{className:"text-2xl font-medium capitalize",children:b.name}),Object(y.jsx)(N.a,{onClick:function(){a(b)},className:"ml-3 text-lg cursor-pointer",fontSize:"inherit"})]}),Object(y.jsx)(o.a,{onClick:Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),e.next=3,r(b);case 3:O(!1);case 4:case"end":return e.stop()}}),e)}))),disabled:!g||v,className:"mb-4 ".concat(g||v?"bg-orange-300 hover:bg-orange-301":"bg-white cursor-default text-gray-500"),children:v?"Saving...":g?"Save":"Saved!"})]}),Object(y.jsx)(k.a,{className:"pb-4 scrollbar-dark",children:Object(y.jsxs)("table",{className:"w-full min-w-544px",children:[Object(y.jsx)("thead",{children:Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{}),x.map((function(e,t){return Object(y.jsx)("th",{className:"font-normal pb-2",children:e},e)}))]})}),Object(y.jsx)("tbody",{children:n.map((function(e,t){return Object(y.jsxs)("tr",{children:[Object(y.jsx)("td",{children:Object(y.jsx)("div",{className:" max-w-135px truncate",children:e.name})}),x.map((function(t,n){return Object(y.jsx)("td",{className:"text-center",children:Object(y.jsx)(m.a,{classes:{checked:"text-blue-400"},checked:!!b.permissions[e.docId]&&b.permissions[e.docId].includes(t),onChange:function(n){return f((function(r){if(null==r)return r;var a=n.target.checked,c=Object(j.a)({},r.permissions);if(a)e.docId in c?(c[e.docId].push(t),c[e.docId].sort((function(e,t){return e>t?1:e<t?-1:0}))):c[e.docId]=[t];else if(e.docId in c){var s=c[e.docId].findIndex((function(e){return e===t}));c[e.docId].splice(s,1),c[e.docId].length||delete c[e.docId]}return Object(j.a)(Object(j.a)({},r),{},{permissions:c})}))}})},t+e.docId)}))]},e.docId)}))})]})})]}):null},I=n(713),C=n(88),z=n(143),R=n(923),E=n(78),J=function(e){var t=e.open,n=e.onClose,a=e.editRole,i=Object(E.b)(),l=Object(z.a)({onSubmit:function(){var e=Object(s.a)(c.a.mark((function e(t){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.docId){e.next=6;break}return e.next=3,O(t);case 3:e.t0=e.sent,e.next=9;break;case 6:return e.next=8,v(t);case 8:e.t0=e.sent;case 9:"error"in(r=e.t0)?i(r.error,{variant:"error"}):(i(t.docId?"Role updated!":"Role created!",{variant:"success"}),n());case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),enableReinitialize:!0,initialValues:a||{name:"",defaultPermissions:[],permissions:{}},validate:function(e){var t={};return 0===e.name.length&&(t.name="required"),t}}),u=l.values,d=l.errors,b=l.isSubmitting,f=l.submitCount,j=l.handleChange,p=l.setFieldValue,h=l.handleSubmit;return Object(y.jsx)(I.a,{open:t,hideBackdrop:!0,children:Object(y.jsx)("div",{className:"w-full h-full flex overflow-auto bg-black bg-opacity-40",children:Object(y.jsxs)("div",{className:"m-auto rounded bg-white max-w-644px w-full p-9",children:[Object(y.jsx)("div",{className:"mb-9 font-medium text-2xl",children:u.docId?"Edit role":"Create role"}),Object(y.jsxs)("div",{className:"mb-9",children:[Object(y.jsx)("div",{className:"mb-2",children:"Role name"}),Object(y.jsx)(C.a,{disabled:["public","authenticated"].includes(u.name),onChange:j,name:"name",value:u.name,error:!!(d.name&&f>0)&&d.name})]}),Object(y.jsx)("div",{className:"mb-2",children:"Default permissions"}),Object(y.jsx)("div",{className:"flex flex-wrap mb-9",children:x.map((function(e,t){return Object(y.jsx)("div",{className:"sm:w-1/3 w-1/2",children:Object(y.jsx)(R.a,{classes:{label:"font-poppins line-clamp-1"},control:Object(y.jsx)(m.a,{classes:{checked:"text-blue-300"},className:"mr-3",checked:u.defaultPermissions.includes(e),onChange:function(t){var n=Object(r.a)(u.defaultPermissions);if(t.target.checked)n.push(e);else{var a=n.findIndex((function(t){return t===e}));n.splice(a,1)}p("defaultPermissions",n)}}),label:e})},e)}))}),Object(y.jsxs)("div",{className:"flex justify-between",children:[Object(y.jsx)(o.a,{onClick:function(){return n()},className:"bg-blue-300 hover:bg-blue-400 text-white",children:"Cancel"}),Object(y.jsx)(o.a,{onClick:function(){return h()},className:"bg-orange-300 hover:bg-orange-301",children:b?"Loading...":"Submit"})]})]})})})},P=n(22),A=n(724);t.default=function(){var e=u.a.useState(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],l=u.a.useState([]),d=Object(i.a)(l,2),j=d[0],m=d[1],p=u.a.useState(0),h=Object(i.a)(p,2),x=h[0],v=h[1],w=u.a.useState(),N=Object(i.a)(w,2),k=N[0],I=N[1],C=Object(P.d)((function(e){return e.collectionTypes})),z=Object(E.b)(),R=Object(P.c)();return u.a.useEffect((function(){Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n||!R){e.next=7;break}return R({type:"SET_LOADING",payload:!0}),e.next=5,g();case 5:"error"in(t=e.sent)||m(t);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:return e.prev=12,R({type:"SET_LOADING",payload:!1}),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})))()}),[n,R]),u.a.useEffect((function(){k&&a(!0)}),[k]),Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{className:"flex flex-wrap justify-between mb-6",children:[Object(y.jsx)(A.a,{className:"mb-4 mr-4",children:"Roles"}),Object(y.jsx)(o.a,{onClick:function(){return a(!0)},className:"bg-orange-300 hover:bg-orange-301 mb-4",children:Object(y.jsxs)("div",{className:"flex items-center",children:[Object(y.jsx)(b.a,{className:"mr-3 text-lg",fontSize:"inherit"}),Object(y.jsx)("span",{children:"Create role"})]})}),Object(y.jsx)(J,{editRole:k,open:n,onClose:function(){a(!1),I(void 0)}})]}),Object(y.jsxs)("div",{className:"flex flex-wrap lg:flex-nowrap",children:[Object(y.jsx)("div",{className:"max-w-192px mb-3 mr-4 block lg:hidden w-full",children:Object(y.jsx)(f.a,{onChange:function(e){return v(parseInt(e.target.value))},value:x,options:j.map((function(e,t){return{label:e.name,value:t}}))})}),Object(y.jsx)("div",{className:"min-w-192px flex-shrink-0 mr-4 hidden lg:block",children:j.map((function(e,t){return Object(y.jsx)("div",{onClick:function(){return v(t)},className:"mb-1 capitalize cursor-pointer ".concat(x===t?"bg-orange-300":"hover:bg-gray-300"," rounded h-34px leading-34px px-3"),children:e.name},"collection-".concat(t))}))}),x<j.length?Object(y.jsx)("div",{className:"lg:flex-grow w-full lg:w-0",children:Object(y.jsx)(S,{setEditRole:function(e){return I(e)},role:j[x],collections:C,onSave:function(){var e=Object(s.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(t);case 2:"error"in(n=e.sent)?z(n.error,{variant:"error"}):(m((function(e){var n=Object(r.a)(e);return n[x]=t,n})),z("Role updated!",{variant:"success"}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})}):null]})]})}}}]);
//# sourceMappingURL=15.8fc7ed63.chunk.js.map