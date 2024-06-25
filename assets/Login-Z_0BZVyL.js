import{r as p,_ as u,R as d,a as f,c as v,P as a,b as K,i as re,p as le,j as c}from"./index-Baw52cgS.js";import{a as te,c as W,d as ne,b as $}from"./cil-user-Cw43hAGO.js";var w=p.forwardRef(function(e,o){var r,s=e.children,n=e.className,l=e.color,i=e.textBgColor,t=e.textColor,m=u(e,["children","className","color","textBgColor","textColor"]);return d.createElement("div",f({className:v("card",(r={},r["bg-".concat(l)]=l,r["text-".concat(t)]=t,r["text-bg-".concat(i)]=i,r),n)},m,{ref:o}),s)});w.propTypes={children:a.node,className:a.string,color:K,textBgColor:K,textColor:a.string};w.displayName="CCard";var O=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=u(e,["children","className"]);return d.createElement("div",f({className:v("card-body",s)},n,{ref:o}),r)});O.propTypes={children:a.node,className:a.string};O.displayName="CCardBody";var M=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=u(e,["children","className"]);return d.createElement("div",f({className:v("card-group",s)},n,{ref:o}),r)});M.propTypes={children:a.node,className:a.string};M.displayName="CCardGroup";var A=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=e.validated,l=u(e,["children","className","validated"]);return d.createElement("form",f({className:v({"was-validated":n},s)||void 0},l,{ref:o}),r)});A.propTypes={children:a.node,className:a.string,validated:a.bool};A.displayName="CForm";var x=p.forwardRef(function(e,o){var r,s=e.children,n=e.as,l=n===void 0?"div":n,i=e.className,t=e.invalid,m=e.tooltip,h=e.valid,b=u(e,["children","as","className","invalid","tooltip","valid"]);return d.createElement(l,f({className:v((r={},r["invalid-".concat(m?"tooltip":"feedback")]=t,r["valid-".concat(m?"tooltip":"feedback")]=h,r),i)},b,{ref:o}),s)});x.propTypes={as:a.elementType,children:a.node,className:a.string,invalid:a.bool,tooltip:a.bool,valid:a.bool};x.displayName="CFormFeedback";var z=function(e){var o=e.describedby,r=e.feedback,s=e.feedbackInvalid,n=e.feedbackValid,l=e.invalid,i=e.tooltipFeedback,t=e.valid;return d.createElement(d.Fragment,null,r&&(t||l)&&d.createElement(x,f({},l&&{id:o},{invalid:l,tooltip:i,valid:t}),r),s&&d.createElement(x,{id:o,invalid:!0,tooltip:i},s),n&&d.createElement(x,{valid:!0,tooltip:i},n))};z.propTypes={describedby:a.string,feedback:a.oneOfType([a.node,a.string]),feedbackValid:a.oneOfType([a.node,a.string]),feedbackInvalid:a.oneOfType([a.node,a.string]),invalid:a.bool,tooltipFeedback:a.bool,valid:a.bool};z.displayName="CFormControlValidation";var I=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=e.customClassName,l=u(e,["children","className","customClassName"]);return d.createElement("label",f({className:n??v("form-label",s)},l,{ref:o}),r)});I.propTypes={children:a.node,className:a.string,customClassName:a.string};I.displayName="CFormLabel";var D=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=u(e,["children","className"]);return d.createElement("div",f({className:v("form-floating",s)},n,{ref:o}),r)});D.propTypes={children:a.node,className:a.string};D.displayName="CFormFloating";var R=p.forwardRef(function(e,o){var r=e.children,s=e.as,n=s===void 0?"div":s,l=e.className,i=u(e,["children","as","className"]);return d.createElement(n,f({className:v("form-text",l)},i,{ref:o}),r)});R.propTypes={as:a.elementType,children:a.node,className:a.string};R.displayName="CFormText";var G=function(e){var o=e.children,r=e.describedby,s=e.feedback,n=e.feedbackInvalid,l=e.feedbackValid,i=e.floatingClassName,t=e.floatingLabel,m=e.id,h=e.invalid,b=e.label,N=e.text,T=e.tooltipFeedback,k=e.valid,F=function(){return d.createElement(z,{describedby:r,feedback:s,feedbackInvalid:n,feedbackValid:l,floatingLabel:t,invalid:h,tooltipFeedback:T,valid:k})};return t?d.createElement(D,{className:i},o,d.createElement(I,{htmlFor:m},b||t),N&&d.createElement(R,{id:r},N),d.createElement(F,null)):d.createElement(d.Fragment,null,b&&d.createElement(I,{htmlFor:m},b),o,N&&d.createElement(R,{id:r},N),d.createElement(F,null))};G.propTypes=f({children:a.node,floatingClassName:a.string,floatingLabel:a.oneOfType([a.node,a.string]),label:a.oneOfType([a.node,a.string]),text:a.oneOfType([a.node,a.string])},z.propTypes);G.displayName="CFormControlWrapper";var V=p.forwardRef(function(e,o){var r,s=e.children,n=e.className,l=e.delay,i=l===void 0?!1:l,t=e.feedback,m=e.feedbackInvalid,h=e.feedbackValid,b=e.floatingClassName,N=e.floatingLabel,T=e.id,k=e.invalid,F=e.label,E=e.onChange,Q=e.plainText,H=e.size,_=e.text,ee=e.tooltipFeedback,U=e.type,X=U===void 0?"text":U,Y=e.valid,Z=u(e,["children","className","delay","feedback","feedbackInvalid","feedbackValid","floatingClassName","floatingLabel","id","invalid","label","onChange","plainText","size","text","tooltipFeedback","type","valid"]),q=p.useState(),P=q[0],ae=q[1];return p.useEffect(function(){var j=setTimeout(function(){return P&&E&&E(P)},typeof i=="number"?i:500);return function(){return clearTimeout(j)}},[P]),d.createElement(G,{describedby:Z["aria-describedby"],feedback:t,feedbackInvalid:m,feedbackValid:h,floatingClassName:b,floatingLabel:N,id:T,invalid:k,label:F,text:_,tooltipFeedback:ee,valid:Y},d.createElement("input",f({className:v(Q?"form-control-plaintext":"form-control",(r={},r["form-control-".concat(H)]=H,r["form-control-color"]=X==="color",r["is-invalid"]=k,r["is-valid"]=Y,r),n),id:T,type:X,onChange:function(j){return i?ae(j):E&&E(j)}},Z,{ref:o}),s))});V.propTypes=f({className:a.string,id:a.string,delay:a.oneOfType([a.bool,a.number]),plainText:a.bool,size:a.oneOf(["sm","lg"]),type:a.oneOfType([a.oneOf(["color","file","text"]),a.string])},G.propTypes);V.displayName="CFormInput";var L=p.forwardRef(function(e,o){var r,s=e.children,n=e.className,l=e.size,i=u(e,["children","className","size"]);return d.createElement("div",f({className:v("input-group",(r={},r["input-group-".concat(l)]=l,r),n)},i,{ref:o}),s)});L.propTypes={children:a.node,className:a.string,size:a.oneOf(["sm","lg"])};L.displayName="CInputGroup";var B=p.forwardRef(function(e,o){var r=e.children,s=e.as,n=s===void 0?"span":s,l=e.className,i=u(e,["children","as","className"]);return d.createElement(n,f({className:v("input-group-text",l)},i,{ref:o}),r)});B.propTypes={as:a.elementType,children:a.node,className:a.string};B.displayName="CInputGroupText";var se=["xxl","xl","lg","md","sm","xs"],C=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=u(e,["children","className"]),l=[];return se.forEach(function(i){var t=n[i];delete n[i];var m=i==="xs"?"":"-".concat(i);(typeof t=="number"||typeof t=="string")&&l.push("col".concat(m,"-").concat(t)),typeof t=="boolean"&&l.push("col".concat(m)),t&&typeof t=="object"&&((typeof t.span=="number"||typeof t.span=="string")&&l.push("col".concat(m,"-").concat(t.span)),typeof t.span=="boolean"&&l.push("col".concat(m)),(typeof t.order=="number"||typeof t.order=="string")&&l.push("order".concat(m,"-").concat(t.order)),typeof t.offset=="number"&&l.push("offset".concat(m,"-").concat(t.offset)))}),d.createElement("div",f({className:v(l.length>0?l:"col",s)},n,{ref:o}),r)}),J=a.oneOfType([a.bool,a.number,a.string,a.oneOf(["auto"])]),y=a.oneOfType([J,a.shape({span:J,offset:a.oneOfType([a.number,a.string]),order:a.oneOfType([a.oneOf(["first","last"]),a.number,a.string])})]);C.propTypes={children:a.node,className:a.string,xs:y,sm:y,md:y,lg:y,xl:y,xxl:y};C.displayName="CCol";var oe=["xxl","xl","lg","md","sm","xs"],S=p.forwardRef(function(e,o){var r=e.children,s=e.className,n=u(e,["children","className"]),l=[];return oe.forEach(function(i){var t=n[i];delete n[i];var m=i==="xs"?"":"-".concat(i);typeof t=="object"&&(t.cols&&l.push("row-cols".concat(m,"-").concat(t.cols)),typeof t.gutter=="number"&&l.push("g".concat(m,"-").concat(t.gutter)),typeof t.gutterX=="number"&&l.push("gx".concat(m,"-").concat(t.gutterX)),typeof t.gutterY=="number"&&l.push("gy".concat(m,"-").concat(t.gutterY)))}),d.createElement("div",{className:v("row",l,s),ref:o},r)}),g=a.shape({cols:a.oneOfType([a.oneOf(["auto"]),a.number,a.string]),gutter:a.oneOfType([a.string,a.number]),gutterX:a.oneOfType([a.string,a.number]),gutterY:a.oneOfType([a.string,a.number])});S.propTypes={children:a.node,className:a.string,xs:g,sm:g,md:g,lg:g,xl:g,xxl:g};S.displayName="CRow";var ie=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"];const me=()=>{const{login:e}=re(),o=le(),[r,s]=p.useState({username:"",password:""}),[n,l]=p.useState(""),i=m=>{s({...r,[m.target.name]:m.target.value})},t=async m=>{m.preventDefault();const{username:h,password:b}=r;try{await e(h,b),o("/")}catch{l("Usuário ou senha incorretos")}};return c.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:c.jsx(te,{children:c.jsx(S,{className:"justify-content-center",children:c.jsx(C,{md:8,children:c.jsxs(M,{children:[c.jsx(w,{className:"p-4",children:c.jsx(O,{children:c.jsxs(A,{onSubmit:t,children:[c.jsx("h1",{children:"Login"}),c.jsx("p",{className:"text-body-secondary",children:"Faça login em sua conta"}),c.jsxs(L,{className:"mb-3",children:[c.jsx(B,{children:c.jsx(W,{icon:ne})}),c.jsx(V,{type:"text",placeholder:"Username",autoComplete:"username",name:"username",value:r.username,onChange:i,required:!0})]}),c.jsxs(L,{className:"mb-4",children:[c.jsx(B,{children:c.jsx(W,{icon:ie})}),c.jsx(V,{type:"password",placeholder:"Senha",autoComplete:"current-password",name:"password",value:r.password,onChange:i,required:!0})]}),n&&c.jsx("p",{className:"text-danger",children:n}),c.jsxs(S,{children:[c.jsx(C,{xs:6,children:c.jsx($,{color:"primary",className:"px-4",type:"submit",children:"Login"})}),c.jsx(C,{xs:6,className:"text-right",children:c.jsx($,{color:"link",className:"px-0"})})]})]})})}),c.jsx(w,{className:"text-white bg-primary py-5",style:{width:"44%"},children:c.jsx(O,{className:"text-center pt-5 mt-3",children:c.jsxs("div",{children:[c.jsx("h1",{className:"display-5",children:"Condominio"}),c.jsx("h2",{className:"display-6",children:"Serra de Minas 2"})]})})})]})})})})})};export{me as default};
