import{v as o}from"./index-3AItk43U.js";const t={criarEncomenda:async n=>{try{return(await o.post("Encomenda/AddEncomenda",n)).data}catch(e){throw console.log(e),e}},lerEncomenda:async n=>{try{return(await o.get(`Encomenda/${n}`)).data}catch(e){throw console.log(e),e}},listarEncomendasComFiltro:async n=>{try{return(await o.get("Encomenda/GetEncomendaFiltro/",{params:n})).data}catch(e){throw console.log(e),e}},listarEncomendas:async()=>{try{return(await o.get("Encomenda/GetAll")).data}catch(n){throw console.log(n),n}},atualizarEncomenda:async(n,e)=>{try{return(await o.put(`Encomenda/${n}`,e)).data}catch(r){throw console.log(r),r}},excluirEncomenda:async n=>{try{return(await o.delete(`Encomenda/${n}`)).data}catch(e){throw console.log(e),e}}},s={Pendente:{value:1,label:"Pendente"},Entregue:{value:2,label:"Entregue"}};export{s as S,t as s};
