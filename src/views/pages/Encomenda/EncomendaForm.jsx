import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputMask } from '@react-input/mask';
import servicesEncomenda from '../../../services/EncomendaService';
import servicesMorador from '../../../services/MoradorService';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import { StatusEncomendaEnum } from '../../../models/Enums/StatusEncomendaEnum' 

import AlertContext from '../../../notifications/alerts/AlertContext';
import VoEncomenda from '../../../models/VoEncomenda'

const MoradorForm = () => {

    const { encomendaId } = useParams();
    const addAlertContext = useContext(AlertContext);
    const [encomendaData, setEncomendaData] = useState(new VoEncomenda());
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [Bloco, SetBloco] = useState([]);
    const [Moradores, SetMoradores] = useState([]);
    const [Apartamento, SetApartamento] = useState([]);

    const navigate = useNavigate();

    const handleSaveSuccess = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };


    useEffect(() => {

        async function fetchSelect() {
            const blocoData = await BlocoService.listarBloco();
            const apartamentoData = await ApartamentoService.listarApartamento();
            const MoradoresData = await servicesMorador.listarMoradores();

            SetBloco(blocoData);
            SetApartamento(apartamentoData);
            SetMoradores(MoradoresData);
        }
        fetchSelect();
        if (encomendaId) {
            async function fetchEncomenda() {
                try {
                    const encomendaData = await servicesEncomenda.lerEncomenda(encomendaId);

                    if (encomendaData.dataEntregue) encomendaData.dataEntregue = new Date(encomendaData.dataEntregue);
                    if (encomendaData.dataRecebida) encomendaData.dataRecebida = new Date(encomendaData.dataRecebida); 

                    setEncomendaData(encomendaData);
                } catch (error) {
                    console.error('Erro ao buscar morador:', error);
                }
            }
            fetchEncomenda();
        } else {

            setEncomendaData({ ...encomendaData, statusEncomenda: StatusEncomendaEnum.Pendente.value });
        }
    }, [encomendaId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            id: encomendaData.id ,
            idMorador: encomendaData.IdMorador === 0 ? null : encomendaData.idMorador,
            idBloco: encomendaData.idBloco,
            idApartamento: encomendaData.idApartamento,
            nomeDestinatario: encomendaData.nomeDestinatario,
            codBarra: encomendaData.codBarra,
            dataEntregue: encomendaData.dataEntregue,
            dataRecebida: encomendaData.dataRecebida,
            observacao: encomendaData.observacao,
            statusEncomenda: encomendaData.statusEncomenda,
        };

        setErrors({});

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (encomendaId) {
                const response = await servicesEncomenda.atualizarEncomenda(encomendaId, formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
            } else {
                const response = await servicesEncomenda.criarEncomenda(formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
                limparFormulario();
            }
        } catch (error) {
            console.error('Erro ao criar morador:', error);
        }
    };

    const validateForm = (formData) => {
        const errors = {};

        if (formData.idMorador === null || formData.idMorador === 0) {
            errors.morador = 'O campo "Morador" é obrigatório.';
        }
        if (formData.idBloco === null) {
            errors.bloco = 'O campo "Bloco" é obrigatório.';
        }
        if (formData.idApartamento === null) {
            errors.apartamento = 'O campo "Apartamento" é obrigatório.';
        }
        if (formData.nomeDestinatario === '') {
            errors.nomeDestinatario = 'O campo "Nome" é obrigatório.';
        }


        return errors;
    };

    const limparFormulario = () => {
        setEncomendaData(encomenda);
    };

    const renderSelectOptions = (enumObj) => {
        return Object.keys(enumObj).map((key) => (
            <option key={enumObj[key].value} value={enumObj[key].value}>
                {enumObj[key].label}
            </option>
        ));
    };
    
    const SetMorador = (event) => {     
        const selectedNome = event.target.options[event.target.selectedIndex].text;
         

        setEncomendaData({
            ...encomendaData, idMorador: parseInt(event.target.value),
            nomeDestinatario: event.target.value === '0' ? "" : selectedNome
        });
    };

    return (
        <div className="container">
            <h2>Criar Encomenda</h2>

            <form onSubmit={handleSubmit}>
                <div className="col-2">
                    <label className="form-label">id</label>
                    <span id="id" className="form-control">{encomendaData.id ?? 0}</span>
                </div>

                <div className="row">

                    <div className="col-4">
                        <label htmlFor="escolaridade" className="form-label">Morador</label>
                        <select className={`form-control ${errors.morador ? 'is-invalid' : ''}`}
                            id="escolaridade" value={encomendaData.idMorador}
                            onChange={(event) => SetMorador(event)}>
                            <option value={0}>Selecione</option>
                            {Moradores.map((morador) => (
                                <option key={morador.id} value={morador.id}>{morador.nome}</option>
                            ))}
                        </select> 
                        {errors.morador && <div className="invalid-feedback">{errors.morador}</div>}
                    </div>
                    <div className="col-4">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className={`form-control ${errors.nomeDestinatario ? 'is-invalid' : ''}`}
                            id="NomeDestinatario" value={encomendaData.nomeDestinatario}
                            onChange={(event) => setEncomendaData({ ...encomendaData, nomeDestinatario: event.target.value })} />
                        {errors.nomeDestinatario && <div className="invalid-feedback">{errors.nomeDestinatario}</div>}
                    </div>
                    <div className="col-2">
                        <label htmlFor="idBloco" required className="form-label">Bloco</label>
                        <select className={`form-control ${errors.bloco ? 'is-invalid' : ''}`}
                            id="idBloco" value={encomendaData.idBloco} onChange={(event) => setEncomendaData({ ...encomendaData, idBloco: parseInt(event.target.value) })} >
                            <option value={0}>Selecione</option>
                            {
                                Bloco.map(bloco => (
                                    <option key={bloco.id} value={bloco.id}>{bloco.nome}</option>
                                ))
                            }
                        </select>
                        {errors.bloco && <div className="invalid-feedback">{errors.bloco}</div>}
                    </div>
                    <div className="col-2">
                        <label htmlFor="idApartamento" required className="form-label">Apartamento</label>
                        <select className={`form-control ${errors.apartamento ? 'is-invalid' : ''}`}
                            id="idApartamento" value={encomendaData.idApartamento}
                            onChange={(event) => setEncomendaData({ ...encomendaData, idApartamento: parseInt(event.target.value) })} >
                            <option value={0}>Selecione</option>
                            {
                                Apartamento.map(apartamento => (
                                    <option key={apartamento.id} value={apartamento.id}>{apartamento.nome}</option>
                                ))
                            }
                        </select>
                        {errors.apartamento && <div className="invalid-feedback">{errors.apartamento}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <label htmlFor="CodBarra" className="form-label">Código da encomenda</label>
                        <input type="text" className="form-control" id="CodBarra"
                            value={encomendaData.codBarra}
                            onChange={(event) => setEncomendaData({ ...encomendaData, codBarra: event.target.value })} />
                    </div> 
                    <div className="col-3">
                        <label htmlFor="StatusEncomenda" className="form-label">Status Encomenda</label>
                        <select className="form-select" id="StatusEncomenda" value={encomendaData.statusEncomenda}
                            onChange={(event) => setEncomendaData({ ...encomendaData, statusEncomenda: parseInt(event.target.value) })}>
                            {renderSelectOptions(StatusEncomendaEnum)}
                        </select>
                    </div> 
                    <div className="col-2">
                        <label htmlFor="dataRecebida" className="form-label">Data Recebida</label>
                        <input
                            type="date"
                            id="dataRecebida"
                            name="dataRecebida"
                            value={encomendaData.dataRecebida ? encomendaData.dataRecebida.toISOString().substring(0, 10) : ''}
                            onChange={(event) => setEncomendaData({ ...encomendaData, dataRecebida: new Date(event.target.value) })}
                            className={errors.dataRecebida ? 'form-control is-invalid' : 'form-control'}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="dataNascimento" className="form-label">Data Entregue</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={encomendaData.dataEntregue ? encomendaData.dataEntregue.toISOString().substring(0, 10) : ''}
                            onChange={(event) => setEncomendaData({ ...encomendaData, dataEntregue: new Date(event.target.value) })}
                            className={errors.dataEntregue ? 'form-control is-invalid' : 'form-control'}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="Observacao" className="form-label">Observação</label>
                        <textarea className="form-control" rows="5" id="Observacao" value={encomendaData.observacao}
                            onChange={(event) => setEncomendaData({ ...encomendaData, observacao: event.target.value })} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Salvar</button>
            </form>
        </div >
    );
}


export default MoradorForm;
