(this["webpackJsonpfullstackopen.part2"]=this["webpackJsonpfullstackopen.part2"]||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var o=n(14),c=n.n(o),a=n(3),r=n(2),u=n(0),i=function(e){return Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{onChange:e.handleChange})]})},s=function(e){return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.valueNewName,onChange:e.handlePersonNameChange}),"phone: ",Object(u.jsx)("input",{value:e.valueNewPhone,onChange:e.handlePersonPhoneChange})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})})},l=function(e){var t=e.persons,n=e.filterString,o=e.handlePersonDelete,c=t.filter((function(e){return e.name.includes(n)})).map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number," ",Object(u.jsx)("input",{type:"button",value:"delete",id:e.id,onClick:o})]},e.name)}));return Object(u.jsx)("div",{children:c})},d=function(e){var t=e.status,n=e.content,o={color:"ok"===t?"green":"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return n?Object(u.jsx)("li",{style:o,children:n}):Object(u.jsx)("div",{})},h=n(4),j=n.n(h),f="http://localhost:3001/api/persons",b=function(){return j.a.get(f).then((function(e){return e.data}))},m=function(e){return j.a.post(f,e).then((function(e){return e.data}))},O=function(e,t){return j.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},p=function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},v=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),h=Object(a.a)(c,2),j=h[0],f=h[1],v=Object(r.useState)(""),g=Object(a.a)(v,2),x=g[0],w=g[1],k=Object(r.useState)(""),S=Object(a.a)(k,2),P=S[0],y=S[1],C=Object(r.useState)({content:null,status:"ok"}),N=Object(a.a)(C,2),D=N[0],A=N[1];Object(r.useEffect)((function(){b().then((function(e){o(e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(d,{status:D.status,content:D.content}),Object(u.jsx)(i,{handleChange:function(e){f(e.target.value)}}),Object(u.jsx)("h2",{children:"add a new"}),Object(u.jsx)(s,{handleSubmit:function(e){e.preventDefault();var t={name:x,number:P};if(n.filter((function(e){return e.name===x})).length>0){if(window.confirm("".concat(x," is already added to phonebook. Replace the old number with the new one?"))){var c=n.filter((function(e){return e.name===x}));O(c[0].id,t).then((function(e){o(n.map((function(e){return e.name!==t.name?e:t})))})).catch((function(e){A({content:"Information of ".concat(t.name," has already been removed from the server"),status:"ko"}),setTimeout((function(){A({content:null,status:"ok"})}),5e3)}))}}else m(t).then((function(e){o(n.concat(t)),A({content:"Added ".concat(t.name),status:"ok"}),setTimeout((function(){A({content:null,status:"ok"})}),5e3)}))},valueNewName:x,valueNewPhone:P,handlePersonNameChange:function(e){w(e.target.value)},handlePersonPhoneChange:function(e){y(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(l,{persons:n,filterString:j,handlePersonDelete:function(e){window.confirm("Are you sure you wish to delete this person?")&&p(e.target.id).then((function(t){o(n.filter((function(t){return t.id.toString()!==e.target.id})))}))}})]})};n(38);c.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.694ac755.chunk.js.map