import{v as e}from"./index-CwLXHay1.js";const t={criarOcorrencia:async o=>{try{return(await e.post("Ocorrencia/AddOcorrencia",o)).data}catch(r){throw console.log(r),r}},lerOcorrencia:async o=>{try{return(await e.get(`Ocorrencia/${o}`)).data}catch(r){throw console.log(r),r}},listarOcorrenciasComFiltro:async o=>{try{return(await e.get("Ocorrencia/GetOcorrenciaFiltro/",{params:o})).data}catch(r){throw console.log(r),r}},listarOcorrencias:async()=>{try{return(await e.get("Ocorrencia/GetAll")).data}catch(o){throw console.log(o),o}},atualizarOcorrencia:async(o,r)=>{try{return(await e.put(`Ocorrencia/${o}`,r)).data}catch(a){throw console.log(a),a}},excluirOcorrencia:async o=>{try{return(await e.delete(`Ocorrencia/${o}`)).data}catch(r){throw console.log(r),r}}},n={Morador:{value:1,label:"Morador"},Bloco:{value:2,label:"Bloco"},Apartamento:{value:3,label:"Apartamento"}};export{n as T,t as s};
