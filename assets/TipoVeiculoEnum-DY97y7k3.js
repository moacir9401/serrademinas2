import{v as r}from"./index-3AItk43U.js";const l={criarVeiculo:async o=>{try{return(await r.post("Veiculo/AddVeiculo",o)).data}catch(e){throw console.log(e),e}},lerVeiculo:async o=>{try{return(await r.get(`Veiculo/${o}`)).data}catch(e){throw console.log(e),e}},listarVeiculosComFiltro:async o=>{try{return(await r.get("Veiculo/GetVeiculoFiltro/",{params:o})).data}catch(e){throw console.log(e),e}},listarVeiculos:async()=>{try{return(await r.get("Veiculo/GetAll")).data}catch(o){throw console.log(o),o}},atualizarVeiculo:async(o,e)=>{try{return(await r.put(`Veiculo/${o}`,e)).data}catch(a){throw console.log(a),a}},excluirVeiculo:async o=>{try{return(await r.delete(`Veiculo/${o}`)).data}catch(e){throw console.log(e),e}}},s={CARRO:{value:1,label:"Carro"},MOTO:{value:2,label:"Moto"},CAMINHAO:{value:3,label:"Caminh�o"},ONIBUS:{value:4,label:"�nibus"},BICICLETA:{value:5,label:"Biciclieta"}};export{s as T,l as V};
