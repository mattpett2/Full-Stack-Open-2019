(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),l=t(2),o=t(3),i=t.n(o),m="/api/persons",s=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=(t(36),function(e){var n=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n})))}),g=function(e){var n=e.addNumber,t=e.handleNameChange,a=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.personRows;return r.a.createElement("ul",{className:"numlist"},n())},v=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"success"},n)},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),o=Object(l.a)(c,2),i=o[0],m=o[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],C=j[1],N=Object(a.useState)(""),k=Object(l.a)(N,2),y=k[0],S=k[1],D=Object(a.useState)(null),T=Object(l.a)(D,2),x=T[0],F=T[1],I=Object(a.useState)(null),J=Object(l.a)(I,2),L=J[0],R=J[1];Object(a.useEffect)((function(){s().then((function(e){u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:x}),r.a.createElement(p,{message:L}),r.a.createElement(b,{handleFilterChange:function(e){console.log(e.target.value),S(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(g,{handleNameChange:function(e){console.log(e.target.value),m(e.target.value)},handleNumberChange:function(e){console.log(e.target.value),C(e.target.value)},addNumber:function(e){e.preventDefault();var n={name:i,number:O};if(0===t.filter((function(e){return e.name===i})).length)f(n).then((function(e){u(t.concat(e)),F("Added ".concat(n.name)),setTimeout((function(){F(null)}),5e3),m(""),C("")}));else if(window.confirm("".concat(i," is already in phonebook. Would you like \n          to replace the existing number?"))){var a=t.find((function(e){return e.name===i})).id;d(a,n).then((function(e){u(t.map((function(e){return e.name!==i?e:n}))),m(""),C("")})).catch((function(e){R("Information of ".concat(i," has already been deleted"))})),setTimeout((function(){R(null)}),5e3)}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(E,{personRows:function(){return t.filter((function(e){return e.name.substring(0,y.length).toLowerCase()===y.toLowerCase()})).map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n=e.id,a=e.name,console.log("delete person ".concat(n)),void(window.confirm("Delete ".concat(a,"?"))&&h(n).then(u(t.filter((function(e){return e.id!==n})))).catch((function(e){alert("The number was already deleted")})));var n,a}},"Delete"))}))}}))};c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6b540094.chunk.js.map