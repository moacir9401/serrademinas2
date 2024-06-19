import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { InputMask } from '@react-input/mask';
import servicesMorador from '../../../services/MoradorService';
import servicesOcorrencia from '../../../services/OcorrenciaService';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService'; 
import { TipoOcorrenciaEnum } from '../../../models/Enums/TipoOcorrenciaEnum' 

import AlertContext from '../../../notifications/alerts/AlertContext';
import VoOcorrencia from '../../../models/VoOcorrencia'

const OcorrenciaForm = () => {

    const { ocorrenciaId } = useParams();
    const addAlertContext = useContext(AlertContext);
    const [ocorrenciaData, setOcorrenciaData] = useState(new VoOcorrencia());
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [Bloco, SetBloco] = useState([]);
    const [Moradores, SetMoradores] = useState([]);
    const [Apartamento, SetApartamento] = useState([]);


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
        try {
            fetchSelect();
        } catch (e) {
            console.error('Erro ao buscar Ocorrência:', error);
        }
        if (ocorrenciaId) {
            async function fetchOcorrencia() {
                try {
                    const ocorrenciaData = await servicesOcorrencia.lerOcorrencia(ocorrenciaId);
                    if (ocorrenciaData.data) {
                        ocorrenciaData.data = new Date(ocorrenciaData.data);

                    }

                    setOcorrenciaData(ocorrenciaData);
                } catch (error) {
                    console.error('Erro ao buscar Ocorrência:', error);
                }
            }
            fetchOcorrencia();
        }


    }, [ocorrenciaId]);


    if (ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Morador.value) {
        ocorrenciaData.idBloco = null;
        ocorrenciaData.idApartamento = null;
    }
    else if (ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Bloco.value) {
        ocorrenciaData.idMorador = null;
        ocorrenciaData.idApartamento = null;
    }
    else if (ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Apartamento.value) {
        ocorrenciaData.idMorador = null;
        ocorrenciaData.idBloco = null;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            id: ocorrenciaData.id,
            idMorador: ocorrenciaData.idMorador,
            idBloco: ocorrenciaData.idBloco,
            idApartamento: ocorrenciaData.idApartamento,
            tipoOcorrencia: ocorrenciaData.tipoOcorrencia,
            data: ocorrenciaData.Data,
            descricao: ocorrenciaData.descricao,
        };

        setErrors({});

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (ocorrenciaId) {
                const response = await servicesOcorrencia.atualizarOcorrencia(ocorrenciaId, formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
            } else {
                const response = await servicesOcorrencia.criarOcorrencia(formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
                limparFormulario();
            }
        } catch (error) {
            console.error('Erro ao criar ocorrência:', error);
        }
    };


    const validateForm = (formData) => {
        const errors = {};

        //if (formData.Descricao === '') {
        //    errors.Descricao = 'O campo "Descrição" é obrigatório.';

        //    return errors;
        //};

        return errors;
    }

    const limparFormulario = () => {
        setOcorrenciaData(ocorrencia);
    };

        const renderSelectOptions = (enumObj) => {
            return Object.keys(enumObj).map((key) => (
                <option key={enumObj[key].value} value={enumObj[key].value}>
                    {enumObj[key].label}
                </option>
            ));
        };

   

    const getTipoOcorrencia = (value) => {
        for (const key in TipoOcorrenciaEnum) {
            if (TipoOcorrenciaEnum[key].value === value) {
                return TipoOcorrenciaEnum[key];
            }
        }
        return '';
    };
     
    return (
        <div className="container">
            <h2>Criar Ocorrência</h2>

            <form onSubmit={handleSubmit}>
                <div className="col-2">
                    <label className="form-label">id</label>
                    <span id="id" className="form-control">{ocorrenciaData.id ?? 0}</span>
                </div>

                <div className="row">

                    <div className="col-4">
                        <label className="form-label">Tipo de Ocorrência</label>
                        <select value={ocorrenciaData.tipoOcorrencia} className="form-control" id="tipoOcorrencia"
                            onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, tipoOcorrencia: parseInt(event.target.value) })} >
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(TipoOcorrenciaEnum)}
                        </select>
                    </div> 
                    {
                        ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Morador.value && (
                            <div className="col-3">
                                <label htmlFor="ocorrenciaId" className="form-label">Morador</label>
                                <select value={ocorrenciaData.idMorador} className="form-control" id="idMorador"
                                    onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, idMorador: parseInt(event.target.value) })} >
                                    <option value={0}>Selecione</option>
                                    {Moradores.map(morador => (
                                        <option key={morador.id} value={morador.id}>{morador.nome}</option>
                                    ))}
                                </select>
                            {errors.idMorador && <div className="invalid-feedback">{errors.idMorador}</div>}
                        </div>
                        )}
                    {
                        ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Bloco.value && (
                            <div className="col-3">
                                <label htmlFor="IdBloco" className="form-label">Bloco</label>
                                <select value={ocorrenciaData.idBloco} className="form-control" id="idBloco"
                                    onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, idBloco: parseInt(event.target.value) })} >
                                    <option value={0}>Selecione</option>
                                    {Bloco.map(bloco => (
                                        <option key={bloco.id} value={bloco.id}>{bloco.nome}</option>
                                    ))}
                                </select>
                            {errors.idMorador && <div className="invalid-feedback">{errors.idMorador}</div>}
                        </div>
                        )}  {
                        ocorrenciaData.tipoOcorrencia === TipoOcorrenciaEnum.Apartamento.value && (
                            <div className="col-3">
                                <label htmlFor="IdApartamento" className="form-label">Apartamento</label>
                                <select value={ocorrenciaData.idApartamento} className="form-control" id="idApartamento"
                                    onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, idApartamento: parseInt(event.target.value) })} >
                                    <option value={0}>Selecione</option>
                                    {Apartamento.map(apartamento => (
                                        <option key={apartamento.id} value={apartamento.id}>{apartamento.nome}</option>
                                    ))}
                                </select>
                            {errors.idMorador && <div className="invalid-feedback">{errors.idMorador}</div>}
                        </div>
                    )}  
                    <div className="col-2">
                        <label htmlFor="dataNascimento" className="form-label">Data</label>
                        <input
                            type="date"
                            id="data"
                            name="data"
                            value={ocorrenciaData.data ? ocorrenciaData.data.toISOString().substring(0, 10) : ''}
                            onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, data: new Date(event.target.value) })}
                            className={errors.data ? 'form-control is-invalid' : 'form-control'}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea className="form-control" rows="5" id="descricao"
                            value={ocorrenciaData.descricao} onChange={(event) => setOcorrenciaData({ ...ocorrenciaData, descricao: event.target.value })} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Salvar</button>
            </form >
        </div >
    );
}


export default OcorrenciaForm;
