import{w as r,r as o,j as a}from"./index-LZNP7tki.js";import{f as m}from"./format-cwXK75ha.js";const x={lerLog:async e=>{try{return(await r.get(`Log/${e}`)).data}catch(s){throw console.log(s),s}},listarLogsComFiltro:async e=>{try{return(await r.get("Log/GetLogFiltro/",{params:e})).data}catch(s){throw console.log(s),s}},listarLogs:async()=>{try{return(await r.get("Log/GetAll")).data}catch(e){throw console.log(e),e}}},p=()=>{const[e,s]=o.useState(new Date),[c,n]=o.useState(new Date),[i,l]=o.useState([]);async function d(){try{const t=await x.listarLogsComFiltro({dataInicio:e,dataFim:c});l(t)}catch(t){console.error("Erro ao buscar logs:",t)}}const h=()=>{d()};return a.jsxs("div",{children:[a.jsx("h1",{children:"Lista de Logs"}),a.jsx("div",{children:a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"col-4",children:[a.jsx("label",{className:"form-label",children:"Data Inicio"}),a.jsx("input",{type:"date",placeholder:"DataInicio",className:"form-control",onChange:t=>s(new Date(t.target.value))})]}),a.jsxs("div",{className:"col-4",children:[a.jsx("label",{className:"form-label",children:"Data Termino"}),a.jsx("input",{type:"date",placeholder:"DataInicio",className:"form-control",onChange:t=>n(new Date(t.target.value))})]}),a.jsx("div",{className:"mt-3 col-4",children:a.jsx("button",{onClick:h,className:"btn btn-primary mt-3 mb-3",children:"Pesquisar"})})]})}),a.jsxs("table",{className:"table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"C�digo"}),a.jsx("th",{children:"Data"}),a.jsx("th",{children:"Descri��o"})]})}),a.jsx("tbody",{children:i.map(t=>a.jsxs("tr",{children:[a.jsx("td",{children:t.id}),a.jsx("td",{children:m(new Date(t.data),"dd/MM/yyyy")}),a.jsx("td",{children:t.descricao})]},t.id))})]})]})};export{p as default};
