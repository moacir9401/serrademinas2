import{v as t}from"./index-Baw52cgS.js";const a={lerApartamento:async o=>{try{return(await t.get(`Apartamento/${o}`)).data}catch(r){throw console.log(r),r}},listarApartamento:async()=>{try{return(await t.get("Apartamento/GetAll")).data}catch(o){throw console.log(o),o}}},s={lerBloco:async o=>{try{return(await t.get(`Bloco/${o}`)).data}catch(r){throw console.log(r),r}},listarBloco:async()=>{try{return(await t.get("Bloco/GetAll")).data}catch(o){throw console.log(o),o}}};export{a as A,s as B};
