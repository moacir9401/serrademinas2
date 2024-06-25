import{p as G,r as l,A as H,j as e}from"./index-Baw52cgS.js";import{T as c,V as A}from"./TipoVeiculoEnum-CNrsvCcv.js";import{s as J}from"./MoradorService-Ddrmdc0G.js";import{T as K}from"./TipoMoradorEnum-PsNxfakq.js";import{B as Q,A as U}from"./BlocoService-DNm1RMcC.js";import{D as W}from"./DeleteModal-ChgR_eH1.js";const le=()=>{const m=G(),[C,M]=l.useState([]),[u,g]=l.useState(""),[i,B]=l.useState(""),[n,y]=l.useState(""),[d,T]=l.useState(0),[h,D]=l.useState(null),[x,E]=l.useState(null),[j,F]=l.useState([]),[I,w]=l.useState([]),[p,O]=l.useState([]),[P,f]=l.useState(!1),[v,b]=l.useState(null),N=l.useContext(H);async function V(){try{const o=await A.listarVeiculosComFiltro({nome:u,bloco:n,apartamento:d,tipoMorador:h,tipoVeiculo:x,placa:i});M(o)}catch(o){console.error("Erro ao buscar Veiculos:",o)}}l.useEffect(()=>{async function o(){const t=await Q.listarBloco(),s=await U.listarApartamento(),r=await J.listarMoradores();F(t),w(r),O(s)}o(),V()},[u,i,x,n,d,h]);const k=()=>{m("Cadastro")},q=o=>{m(`Cadastro/${o}`)},L=o=>{for(const t in c)if(c[t].value===o)return c[t].label;return""};async function z(o){try{await A.excluirVeiculo(o),N.addAlert("Veiculo excluída com sucesso","success"),await V()}catch(t){N.addAlert("Erro ao excluir veiculo","error"),console.error("Erro ao excluir veiculo:",t)}}const R=o=>{b(o),f(!0)},S=()=>{f(!1),b(null)},$=()=>{v&&(z(v),S())};return e.jsxs("div",{children:[e.jsx("h1",{children:"Lista de Veiculos"}),e.jsxs("div",{children:[e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-4",children:[e.jsx("label",{className:"form-label",children:"Nome do Morador"}),e.jsx("input",{type:"text",placeholder:"Nome do Morador",className:"form-control",onChange:o=>g(o.target.value)})]}),e.jsxs("div",{className:"col-4",children:[e.jsx("label",{className:"form-label",children:"Tipo de Morador"}),e.jsxs("select",{className:"form-select",onChange:o=>D(o.target.value),children:[e.jsx("option",{value:"",children:"Selecione"}),Object.values(K).map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))]})]}),e.jsxs("div",{className:"col-4",children:[e.jsx("label",{className:"form-label",children:"Tipo de Veiculo"}),e.jsxs("select",{className:"form-select",onChange:o=>E(o.target.value),children:[e.jsx("option",{value:"",children:"Selecione"}),Object.values(c).map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))]})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-4",children:[e.jsx("label",{className:"form-label",children:"Placa"}),e.jsx("input",{type:"text",placeholder:"Placa",className:"form-control",value:i,onChange:o=>B(o.target.value)})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"filtroBloco",required:!0,className:"form-label",children:"Bloco"}),e.jsxs("select",{className:"form-select",id:"filtroBloco",value:n,onChange:o=>y(parseInt(o.target.value)),children:[e.jsx("option",{value:0,children:"Selecione"}),j.map(o=>e.jsx("option",{value:o.id,children:o.nome},o.id))]})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"filtroApartamento",required:!0,className:"form-label",children:"Apartamento"}),e.jsxs("select",{className:"form-select",id:"filtroApartamento",value:d,onChange:o=>T(parseInt(o.target.value)),children:[e.jsx("option",{value:0,children:"Selecione"}),p.map(o=>e.jsx("option",{value:o.id,children:o.nome},o.id))]})]})]})]}),e.jsx("button",{onClick:k,className:"btn btn-primary mt-3 mb-3",children:"Novo Veiculo"}),e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Código"}),e.jsx("th",{children:"Nome"}),e.jsx("th",{children:"Bloco"}),e.jsx("th",{children:"Apartamento"}),e.jsx("th",{children:"Tipo de Veiculo"}),e.jsx("th",{children:"Modelo"}),e.jsx("th",{children:"Placa"}),e.jsx("th",{children:"Alterar"}),e.jsx("th",{children:"Excluir"})]})}),e.jsx("tbody",{children:C.map(o=>{const t=j.find(a=>a.ID===o.IdBloco),s=I.find(a=>a.id==o.idMorador),r=p.find(a=>a.ID===o.IdApartamento);return e.jsxs("tr",{children:[e.jsx("td",{children:o.id}),e.jsx("td",{children:s?s.nome:""}),e.jsx("td",{children:t?t.nome:"Carregando..."}),e.jsx("td",{children:r?r.nome:"Carregando..."}),e.jsx("td",{children:L(o.tipoVeiculo)}),e.jsx("td",{children:o.modelo}),e.jsx("td",{children:o.placa}),e.jsx("td",{children:e.jsx("button",{className:"btn btn-primary",onClick:()=>q(o.id),children:"Alterar"})}),e.jsx("td",{children:e.jsx("button",{className:"btn btn-primary",onClick:()=>R(o.id),children:"Excluir"})})]},o.id)})})]}),e.jsx(W,{isOpen:P,onClose:S,onConfirm:$,mensagem:"Você tem certeza que deseja excluir este veiculo?"})]})};export{le as default};
