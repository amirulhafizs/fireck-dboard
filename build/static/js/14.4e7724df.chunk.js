(this["webpackJsonpfireck-cms"]=this["webpackJsonpfireck-cms"]||[]).push([[14],{723:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return l}));var r=n(13),a=function(){var e=r.b.getState().user;return"Bearer "+(e?e.token:null)},c=function(e){var t=e.collectionId,n=e.orderBy,r=e.startAt,c=e.startAfter,o=e.where,i=e.limit,s=void 0===i?10:i,l=e.populateRef,u=void 0===l||l,d="".concat(window.location.origin,"/api/").concat(t,"?limit=").concat(s,"&populateRef=").concat(u).concat(n?"&orderBy=".concat(n):"").concat(r?"&startAt=".concat(r):c?"&startAfter=".concat(c):"").concat(o?"&where=".concat(o):"");return fetch(d,{headers:{Authorization:a()}}).then((function(e){return e.json()}))},o=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e),{method:"POST",headers:{Authorization:a()},body:JSON.stringify(t)}).then((function(e){return e.json()}))}catch(n){return{error:n}}},i=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"DELETE",headers:{Authorization:a()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},s=function(e,t){try{return fetch(window.location.origin+"/api/".concat(e).concat(t?"/".concat(t):"","?populateRef=false"),{headers:{Authorization:a()}}).then((function(e){return e.json()}))}catch(n){return{error:n}}},l=function(e,t,n){try{return fetch(window.location.origin+"/api/".concat(e,"/").concat(t),{method:"PUT",headers:{Authorization:a()},body:JSON.stringify(n)}).then((function(e){return e.json()}))}catch(r){return{error:r}}}},725:function(e,t,n){"use strict";var r=n(10),a=n(140),c=n(141),o=n.n(c),i=n(1);t.a=function(e){var t=e.className,n=Object(a.a)(e,["className"]);return Object(i.jsx)("div",Object(r.a)(Object(r.a)({},n),{},{className:o()("text-34px font-medium capitalize leading-none",t)}))}},730:function(e,t,n){"use strict";var r=n(44),a=n(1);t.a=function(e){var t=e.title,n=e.onCreate,c=e.buttonTitle;return Object(a.jsx)("div",{className:"h-96 bg-gray-300 rounded-md flex w-full p-12",children:Object(a.jsxs)("div",{className:"m-auto",children:[Object(a.jsx)("div",{className:"text-22px mb-5 font-medium text-center",children:t}),Object(a.jsx)(r.a,{className:"mx-auto bg-orange-300 hover:bg-orange-301 block",onClick:n,children:c})]})})}},733:function(e,t,n){"use strict";var r=n(7),a=n.n(r),c=n(14),o=n(6),i=n(144),s=n(253),l=n(0),u=n.n(l),d=n(1);t.a=function(e){var t=e.fetcher,n=e.onValue,r=e.limit,l=e.onError,f=void 0===l?function(){}:l,b=u.a.useState(!1),p=Object(o.a)(b,2),h=p[0],j=p[1];return Object(d.jsx)(s.a,{className:"w-full",onChange:function(){var e=Object(c.a)(a.a.mark((function e(c){var o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c||h){e.next=5;break}return e.next=3,t();case 3:"error"in(o=e.sent)?(f(o.error),j(!0)):(n(o),(!o.length||o.length<r)&&j(!0));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:h?"":Object(d.jsx)("div",{className:"flex justify-center py-3",children:Object(d.jsx)(i.a,{size:"small"})})})}},737:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return d}));var r=n(7),a=n.n(r),c=n(14),o=n(755),i=(n(13),n(904)),s=n(723),l=function(e){return new Promise((function(t,n){try{var r=o.a.storage(),a={contentType:e.type},c=e.name.split("."),s=Object(i.a)()+"."+c[c.length-1],l=r.ref(s).put(e,a);l.on("state_changed",(function(e){}),(function(e){t({error:e.message})}),(function(){l.snapshot.ref.getDownloadURL().then((function(e){t({downloadUrl:e,fileName:s})}))}))}catch(u){t({error:u})}}))},u=function(){var e=Object(c.a)(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l(t);case 3:if(!("error"in(n=e.sent))){e.next=8;break}return e.abrupt("return",n);case 8:return r={name:t.name,size:t.size,url:n.downloadUrl,storagePath:n.fileName},e.abrupt("return",Object(s.a)("FilesReservedCollection",r));case 10:e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(0),e.abrupt("return",{error:e.t0});case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),d=function(e,t){try{return o.a.storage().ref(t).delete(),Object(s.b)("FilesReservedCollection",e)}catch(n){return{error:n}}}},753:function(e,t,n){"use strict";n.r(t),n.d(t,"formatBytes",(function(){return B}));var r=n(19),a=n(96),c=n(7),o=n.n(c),i=n(14),s=n(6),l=n(44),u=n(251),d=n(0),f=n.n(d),b=n(737),p=n(13),h=n(733),j=n(714),m=n(736),x=n.n(m),v=n(739),g=n.n(v),O=n(142),w=n(78),y=n(725),N=n(730),k=n(723),A=n(1);function B(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(0===e)return"0 Bytes";var n=0>t?0:t,r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}t.default=function(){var e=f.a.useRef(null),t=f.a.useState([]),n=Object(s.a)(t,2),c=n[0],d=n[1],m=Object(w.b)();return f.a.useEffect((function(){Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p.b.dispatch({type:"SET_LOADING",payload:!0}),e.next=4,Object(k.c)({collectionId:"FilesReservedCollection",orderBy:"createdAt"});case 4:"error"in(t=e.sent)||d(t),p.b.dispatch({type:"SET_LOADING",payload:!1}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}),[]),Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:"flex justify-between flex-wrap mb-7",children:[Object(A.jsx)(y.a,{className:"mb-4 mr-4",children:"Media"}),Object(A.jsx)("input",{type:"file",multiple:!0,className:"hidden",ref:e,onChange:function(){var e=Object(i.a)(o.a.mark((function e(t){var n,c,i,s,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.target.files)||!n.length){e.next=21;break}p.b.dispatch({type:"SET_LOADING",payload:"Uploading ".concat(n.length," file").concat(n.length>1?"s":"","...")}),c=0,i=Object(a.a)(n),e.prev=5,l=o.a.mark((function e(){var t,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.value,e.next=3,Object(b.b)(t);case 3:"error"in(a=e.sent)?m("Permission denied. Try reload the app",{variant:"error"}):(c++,p.b.dispatch({type:"SET_LOADING",payload:"".concat(c,"/").concat(n.length," uploaded.")}),d((function(e){return[a].concat(Object(r.a)(e))})));case 5:case"end":return e.stop()}}),e)})),i.s();case 8:if((s=i.n()).done){e.next=12;break}return e.delegateYield(l(),"t0",10);case 10:e.next=8;break;case 12:e.next=17;break;case 14:e.prev=14,e.t1=e.catch(5),i.e(e.t1);case 17:return e.prev=17,i.f(),e.finish(17);case 20:p.b.dispatch({type:"SET_LOADING",payload:!1});case 21:case"end":return e.stop()}}),e,null,[[5,14,17,20]])})));return function(t){return e.apply(this,arguments)}}()}),Object(A.jsx)(l.a,{noMinWidth:!0,onClick:function(){return e.current.click()},className:"bg-orange-300 hover:bg-orange-301 mb-4",children:Object(A.jsxs)("div",{className:"flex items-center",children:[Object(A.jsx)(u.a,{className:"mr-2",size:18}),Object(A.jsx)("span",{children:"Upload"})]})})]}),c.length?Object(A.jsxs)("div",{className:"flex flex-wrap -mx-3",children:[c.map((function(e,t){return Object(A.jsx)("div",{className:"xl:w-3/12 lg:w-4/12 xs:w-6/12 w-full px-3 mb-6",children:Object(A.jsxs)("div",{className:"w-full relative rounded-sm overflow-hidden group",children:[Object(A.jsxs)("div",{className:"absolute top-0 left-0 justify-between p-3 w-full z-20 group-hover:opacity-100 opacity-0 transition duration-200 flex",children:[Object(A.jsx)(j.a,{onClick:function(){return window.open(e.url,"_blank")},className:"outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301",children:Object(A.jsx)(x.a,{fontSize:"small"})}),Object(A.jsx)(j.a,{className:"outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301",children:Object(A.jsx)(g.a,{fontSize:"small",onClick:Object(i.a)(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(O.a)({confirmation:"Do you really want to delete this file?"});case 2:if(!n.sent){n.next=8;break}return d((function(e){var n=Object(r.a)(e);return n.splice(t,1),n})),n.next=6,Object(b.a)(e.docId,e.storagePath);case 6:"error"in n.sent||m("File deleted!",{variant:"success"});case 8:case"end":return n.stop()}}),n)})))})})]}),Object(A.jsx)("div",{style:{paddingTop:"61%"},className:"bg-blue-300"}),Object(A.jsx)("div",{style:{paddingTop:"61%",backgroundImage:"url(".concat(e.url,")")},className:"bg-center bg-contain bg-no-repeat absolute left-0 top-0 z-10 w-full"}),Object(A.jsxs)("div",{className:"p-4 bg-gray-300",children:[Object(A.jsx)("div",{className:"line-clamp-1 font-medium mb-3",children:e.name}),Object(A.jsxs)("div",{className:"flex justify-between",children:[Object(A.jsx)("div",{children:B(e.size)}),Object(A.jsx)("div",{children:Object(A.jsx)("div",{className:"bg-orange-300 rounded px-2 py-0.5 text-sm",children:e.name.split(".").slice(-1).pop()})})]})]})]})},"asset-".concat(t))})),c.length?Object(A.jsx)(h.a,{limit:10,onValue:function(e){d((function(t){return[].concat(Object(r.a)(t),Object(r.a)(e))}))},fetcher:function(){return Object(k.c)({collectionId:"FilesReservedCollection",startAfter:c[c.length-1].createdAt,orderBy:"createdAt"})}}):null]}):Object(A.jsx)(N.a,{buttonTitle:"Upload",title:"There are no media files yet",onCreate:function(){return e.current.click()}})]})}}}]);
//# sourceMappingURL=14.4e7724df.chunk.js.map