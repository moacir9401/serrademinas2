import{q as A,r as l,A as B,p as w,j as e}from"./index-Baw52cgS.js";import"./InputMask-D__sfL1O.js";import{S as u,s as j}from"./StatusEncomendaEnum-DzZaMVXf.js";import{s as M}from"./MoradorService-Ddrmdc0G.js";import{B as R,A as C}from"./BlocoService-DNm1RMcC.js";class F{constructor(d=0,o=null,r=null,s=null,m="",h="",v=new Date,b=new Date,p="",x=u){this.id=d,this.idMorador=o,this.idBloco=r,this.idApartamento=s,this.nomeDestinatario=m,this.codBarra=h,this.dataEntregue=new Date(v),this.dataRecebida=new Date(b),this.observacao=p,this.statusEncomenda=x}}const q=()=>{const{encomendaId:i}=A(),d=l.useContext(B),[o,r]=l.useState(new F),[s,m]=l.useState({});l.useState(!1);const[h,v]=l.useState([]),[b,p]=l.useState([]),[x,N]=l.useState([]);w(),l.useEffect(()=>{async function a(){const t=await R.listarBloco(),n=await C.listarApartamento(),c=await M.listarMoradores();v(t),N(n),p(c)}if(a(),i){async function t(){try{const n=await j.lerEncomenda(i);n.dataEntregue&&(n.dataEntregue=new Date(n.dataEntregue)),n.dataRecebida&&(n.dataRecebida=new Date(n.dataRecebida)),r(n)}catch(n){console.error("Erro ao buscar morador:",n)}}t()}else r({...o,statusEncomenda:u.Pendente.value})},[i]);const f=async a=>{a.preventDefault();const t={id:o.id,idMorador:o.IdMorador===0?null:o.idMorador,idBloco:o.idBloco,idApartamento:o.idApartamento,nomeDestinatario:o.nomeDestinatario,codBarra:o.codBarra,statusEncomenda:o.statusEncomenda,dataEntregue:o.statusEncomenda==u.Pendente.value?null:o.dataEntregue,dataRecebida:o.dataRecebida,observacao:o.observacao};m({});const n=g(t);if(Object.keys(n).length>0){m(n);return}try{if(i){const c=await j.atualizarEncomenda(i,t);d.addAlert("Ação Realizada com sucesso","success")}else{const c=await j.criarEncomenda(t);d.addAlert("Ação Realizada com sucesso","success"),E()}}catch(c){console.error("Erro ao criar morador:",c)}},g=a=>{const t={};return(a.idMorador===null||a.idMorador===0)&&(t.morador='O campo "Morador" é obrigatório.'),a.idBloco===null&&(t.bloco='O campo "Bloco" é obrigatório.'),a.idApartamento===null&&(t.apartamento='O campo "Apartamento" é obrigatório.'),a.nomeDestinatario===""&&(t.nomeDestinatario='O campo "Nome" é obrigatório.'),t},E=()=>{r(encomenda)},S=a=>Object.keys(a).map(t=>e.jsx("option",{value:a[t].value,children:a[t].label},a[t].value)),D=a=>{const t=a.target.options[a.target.selectedIndex].text;r({...o,idMorador:parseInt(a.target.value),nomeDestinatario:a.target.value==="0"?"":t})};return e.jsxs("div",{className:"container",children:[e.jsx("h2",{children:"Criar Encomenda"}),e.jsxs("form",{onSubmit:f,children:[e.jsxs("div",{className:"col-2",children:[e.jsx("label",{className:"form-label",children:"id"}),e.jsx("span",{id:"id",className:"form-control",children:o.id??0})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-4",children:[e.jsx("label",{htmlFor:"escolaridade",className:"form-label",children:"Morador"}),e.jsxs("select",{className:`form-control ${s.morador?"is-invalid":""}`,id:"escolaridade",value:o.idMorador,onChange:a=>D(a),children:[e.jsx("option",{value:0,children:"Selecione"}),b.map(a=>e.jsx("option",{value:a.id,children:a.nome},a.id))]}),s.morador&&e.jsx("div",{className:"invalid-feedback",children:s.morador})]}),e.jsxs("div",{className:"col-4",children:[e.jsx("label",{htmlFor:"nome",className:"form-label",children:"Nome"}),e.jsx("input",{type:"text",className:`form-control ${s.nomeDestinatario?"is-invalid":""}`,id:"NomeDestinatario",value:o.nomeDestinatario,onChange:a=>r({...o,nomeDestinatario:a.target.value})}),s.nomeDestinatario&&e.jsx("div",{className:"invalid-feedback",children:s.nomeDestinatario})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"idBloco",required:!0,className:"form-label",children:"Bloco"}),e.jsxs("select",{className:`form-control ${s.bloco?"is-invalid":""}`,id:"idBloco",value:o.idBloco,onChange:a=>r({...o,idBloco:parseInt(a.target.value)}),children:[e.jsx("option",{value:0,children:"Selecione"}),h.map(a=>e.jsx("option",{value:a.id,children:a.nome},a.id))]}),s.bloco&&e.jsx("div",{className:"invalid-feedback",children:s.bloco})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"idApartamento",required:!0,className:"form-label",children:"Apartamento"}),e.jsxs("select",{className:`form-control ${s.apartamento?"is-invalid":""}`,id:"idApartamento",value:o.idApartamento,onChange:a=>r({...o,idApartamento:parseInt(a.target.value)}),children:[e.jsx("option",{value:0,children:"Selecione"}),x.map(a=>e.jsx("option",{value:a.id,children:a.nome},a.id))]}),s.apartamento&&e.jsx("div",{className:"invalid-feedback",children:s.apartamento})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-5",children:[e.jsx("label",{htmlFor:"CodBarra",className:"form-label",children:"Código da encomenda"}),e.jsx("input",{type:"text",className:"form-control",id:"CodBarra",value:o.codBarra,onChange:a=>r({...o,codBarra:a.target.value})})]}),e.jsxs("div",{className:"col-3",children:[e.jsx("label",{htmlFor:"StatusEncomenda",className:"form-label",children:"Status Encomenda"}),e.jsx("select",{className:"form-select",id:"StatusEncomenda",value:o.statusEncomenda,onChange:a=>r({...o,statusEncomenda:parseInt(a.target.value)}),children:S(u)})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"dataRecebida",className:"form-label",children:"Data Recebida"}),e.jsx("input",{type:"date",id:"dataRecebida",name:"dataRecebida",value:o.dataRecebida?o.dataRecebida.toISOString().substring(0,10):"",onChange:a=>r({...o,dataRecebida:new Date(a.target.value)}),className:s.dataRecebida?"form-control is-invalid":"form-control"})]}),e.jsxs("div",{className:"col-2",children:[e.jsx("label",{htmlFor:"dataNascimento",className:"form-label",children:"Data Entregue"}),e.jsx("input",{type:"date",id:"dataNascimento",name:"dataNascimento",value:o.dataEntregue?o.dataEntregue.toISOString().substring(0,10):"",onChange:a=>r({...o,dataEntregue:new Date(a.target.value)}),className:s.dataEntregue?"form-control is-invalid":"form-control"})]})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsx("label",{htmlFor:"Observacao",className:"form-label",children:"Observação"}),e.jsx("textarea",{className:"form-control",rows:"5",id:"Observacao",value:o.observacao,onChange:a=>r({...o,observacao:a.target.value})})]})}),e.jsx("button",{type:"submit",className:"btn btn-primary mt-3",children:"Salvar"})]})]})};export{q as default};
