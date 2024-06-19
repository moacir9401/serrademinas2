import{q as z,r as t,A as L,j as a}from"./index-LZNP7tki.js";import{S as s,s as l}from"./StatusEncomendaEnum-CaLgyegW.js";import{B as V,A as $}from"./BlocoService-CmrOoeTA.js";import{D as G}from"./DeleteModal-Clhh1VOJ.js";import{f}from"./format-cwXK75ha.js";const T=()=>{const u=z(),r=t.useContext(L),[p,v]=t.useState([]),[c,b]=t.useState(""),[d,S]=t.useState(""),[i,N]=t.useState(0),[o,g]=t.useState(null),[y,A]=t.useState([]),[C,D]=t.useState([]),[w,h]=t.useState(!1),[x,j]=t.useState(null);async function m(){try{const e=await l.listarEncomendasComFiltro({nome:c,bloco:d,apartamento:i,StatusEncomenda:o=="Selecione"?null:o});v(e)}catch(e){console.error("Erro ao buscar moradores:",e)}}t.useEffect(()=>{async function e(){const n=await V.listarBloco(),O=await $.listarApartamento();A(n),D(O)}e(),m()},[c,d,i,o]);const B=()=>{u("Cadastro")},M=e=>{u(`Cadastro/${e}`)};async function F(e){var n=await l.lerEncomenda(e);n.dataEntregue=new Date,n.statusEncomenda=s.Entregue.value,await l.atualizarEncomenda(e,n),r.addAlert("Entrega realizada com sucesso","success"),await m()}const k=e=>{for(const n in s)if(s[n].value===e)return s[n].label;return""};async function I(e){try{await l.excluirEncomenda(e),r.addAlert("Encomenda exclu�da com sucesso","success"),await m()}catch(n){r.addAlert("Erro ao excluir encomenda","error"),console.error("Erro ao excluir encomenda:",n)}}const R=e=>{j(e),h(!0)},E=()=>{h(!1),j(null)},q=()=>{x&&(I(x),E())};return a.jsxs("div",{children:[a.jsx("h1",{children:"Lista de Encomendas"}),a.jsx("div",{children:a.jsxs("div",{className:"row",children:[a.jsxs("div",{className:"col-4",children:[a.jsx("label",{className:"form-label",children:"Nome do Morador"}),a.jsx("input",{type:"text",placeholder:"Nome do Morador",className:"form-control",value:c,onChange:e=>b(e.target.value)})]}),a.jsxs("div",{className:"col-2",children:[a.jsx("label",{htmlFor:"filtroBloco",required:!0,className:"form-label",children:"Bloco"}),a.jsxs("select",{className:"form-select",id:"filtroBloco",value:d,onChange:e=>S(parseInt(e.target.value)),children:[a.jsx("option",{value:0,children:"Selecione"}),y.map(e=>a.jsx("option",{value:e.id,children:e.nome},e.id))]})]}),a.jsxs("div",{className:"col-2",children:[a.jsx("label",{htmlFor:"filtroApartamento",required:!0,className:"form-label",children:"Apartamento"}),a.jsxs("select",{className:"form-select",id:"filtroApartamento",value:i,onChange:e=>N(parseInt(e.target.value)),children:[a.jsx("option",{value:0,children:"Selecione"}),C.map(e=>a.jsx("option",{value:e.id,children:e.nome},e.id))]})]}),a.jsxs("div",{className:"col-4",children:[a.jsx("label",{className:"form-label",children:"Status Encomenda"}),a.jsxs("select",{value:o,className:"form-control",onChange:e=>g(e.target.value),children:[a.jsx("option",{value:null,children:"Selecione"}),Object.values(s).map(e=>a.jsx("option",{value:e.value,children:e.label},e.value))]})]})]})}),a.jsx("button",{onClick:B,className:"btn btn-primary mt-3 mb-3",children:"Nova Encomenda"}),a.jsxs("table",{className:"table",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"Nome"}),a.jsx("th",{children:"Status da Encomenda"}),a.jsx("th",{children:"C�digo da Encomenda"}),a.jsx("th",{children:"Data Recebida"}),a.jsx("th",{children:"Data Entregue"}),a.jsx("th",{children:"Alterar"}),a.jsx("th",{children:"Entregar"})]})}),a.jsx("tbody",{children:p.map(e=>a.jsxs("tr",{children:[a.jsx("td",{children:e.nomeDestinatario}),a.jsx("td",{children:k(e.statusEncomenda)}),a.jsx("td",{children:e.codBarra}),a.jsx("td",{children:e.dataRecebida==null?"":f(new Date(e.dataRecebida),"dd/MM/yyyy")}),a.jsx("td",{children:e.dataRecebida==null?"":f(new Date(e.dataEntregue),"dd/MM/yyyy")}),a.jsx("td",{children:a.jsx("button",{className:"btn btn-primary",onClick:()=>M(e.id),children:"Alterar"})}),a.jsx("td",{children:a.jsx("button",{className:"btn btn-primary",onClick:()=>F(e.id),children:"Entregar"})}),a.jsx("td",{children:a.jsx("button",{className:"btn btn-primary",onClick:()=>R(e.id),children:"Excluir"})})]},e.id))})]}),a.jsx(G,{isOpen:w,onClose:E,onConfirm:q,mensagem:"Voc� tem certeza que deseja excluir esta encomenda?"})]})};export{T as default};
