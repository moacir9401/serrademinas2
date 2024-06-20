import{p as k,r as t,A as q,j as r}from"./index-CwLXHay1.js";import{T as s,s as v}from"./TipoOcorrenciaEnum-DdWLzl8q.js";import{B as L,A as z}from"./BlocoService-BUm11ggR.js";import{D as R}from"./DeleteModal-CMdjUVNU.js";import{f as V}from"./format-cwXK75ha.js";const P=()=>{const i=k(),[b,O]=t.useState([]),[c,N]=t.useState(""),[o,A]=t.useState(0),[l,S]=t.useState(""),[n,C]=t.useState(0),[d,y]=t.useState([]),[m,g]=t.useState([]),[D,h]=t.useState(!1),[u,x]=t.useState(null),j=t.useContext(q);async function p(){try{const e=await v.listarOcorrenciasComFiltro({nome:c,bloco:l,apartamento:n,tipoOcorrencia:o==="Selecione"?null:o});O(e)}catch(e){console.error("Erro ao buscar ocorrencias:",e)}}t.useEffect(()=>{async function e(){const a=await L.listarBloco(),T=await z.listarApartamento();y(a),g(T)}e(),p()},[c,l,n,o]);const B=()=>{i("Cadastro")},E=e=>{i(`Cadastro/${e}`)},I=e=>{for(const a in s)if(s[a].value===e)return s[a].label;return""};async function M(e){try{await v.excluirOcorrencia(e),j.addAlert("Ocorrência excluída com sucesso","success"),await p()}catch(a){j.addAlert("Erro ao excluir ocorrência","error"),console.error("Erro ao excluir ocorrência:",a)}}const w=e=>{x(e),h(!0)},f=()=>{h(!1),x(null)},F=()=>{u&&(M(u),f())};return r.jsxs("div",{children:[r.jsx("h1",{children:"Lista de Ocorrências"}),r.jsx("div",{children:r.jsxs("div",{className:"row",children:[r.jsxs("div",{className:"col-4",children:[r.jsx("label",{className:"form-label",children:"Nome do Morador"}),r.jsx("input",{type:"text",placeholder:"Nome do Morador",className:"form-control",value:c,onChange:e=>N(e.target.value)})]}),r.jsxs("div",{className:"col-2",children:[r.jsx("label",{htmlFor:"filtroBloco",required:!0,className:"form-label",children:"Bloco"}),r.jsxs("select",{className:"form-select",id:"filtroBloco",value:l,onChange:e=>S(parseInt(e.target.value)),children:[r.jsx("option",{value:0,children:"Selecione"}),d.map(e=>r.jsx("option",{value:e.id,children:e.nome},e.id))]})]}),r.jsxs("div",{className:"col-2",children:[r.jsx("label",{htmlFor:"filtroApartamento",required:!0,className:"form-label",children:"Apartamento"}),r.jsxs("select",{className:"form-select",id:"filtroApartamento",value:n,onChange:e=>C(parseInt(e.target.value)),children:[r.jsx("option",{value:0,children:"Selecione"}),m.map(e=>r.jsx("option",{value:e.id,children:e.nome},e.id))]})]}),r.jsxs("div",{className:"col-4",children:[r.jsx("label",{className:"form-label",children:"Tipo de Ocorrência"}),r.jsxs("select",{value:o,className:"form-control",onChange:e=>A(e.target.value),children:[r.jsx("option",{value:void 0,children:"Selecione"}),Object.values(s).map(e=>r.jsx("option",{value:e.value,children:e.label},e.value))]})]})]})}),r.jsx("button",{onClick:B,className:"btn btn-primary mt-3 mb-3",children:"Nova ocorrência"}),r.jsxs("table",{className:"table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Código"}),r.jsx("th",{children:"Tipo de Ocorrência"}),r.jsx("th",{children:"Data"}),r.jsx("th",{children:"Descrição"}),r.jsx("th",{children:"Alterar"}),r.jsx("th",{children:"Excluir"})]})}),r.jsx("tbody",{children:b.map(e=>(d.find(a=>a.ID===e.IdBloco),m.find(a=>a.ID===e.IdApartamento),r.jsxs("tr",{children:[r.jsx("td",{children:e.id}),r.jsx("td",{children:I(e.tipoOcorrencia)}),r.jsx("td",{children:V(new Date(e.data),"dd/MM/yyyy")}),r.jsx("td",{children:e.descricao}),r.jsx("td",{children:r.jsx("button",{className:"btn btn-primary",onClick:()=>E(e.id),children:"Alterar"})}),r.jsx("td",{children:r.jsx("button",{className:"btn btn-primary",onClick:()=>w(e.id),children:"Excluir"})})]},e.id)))})]}),r.jsx(R,{isOpen:D,onClose:f,onConfirm:F,mensagem:"Você tem certeza que deseja excluir esta ocorrência?"})]})};export{P as default};
