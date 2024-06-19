import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { InputMask } from '@react-input/mask';
import servicesMorador from '../../../services/MoradorService';
import servicesVeiculo from '../../../services/VeiculoService';
import { TipoVeiculoEnum } from '../../../models/Enums/TipoVeiculoEnum'

import AlertContext from '../../../notifications/alerts/AlertContext';
import VoVeiculo from '../../../models/VoVeiculo'

const VeiculoForm = () => {

    const { veiculoId,moradorId } = useParams();
    const addAlertContext = useContext(AlertContext);
    const [VeiculoData, setVeiculoData] = useState(new VoVeiculo());
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [Moradores, SetMoradores] = useState([]);

    const handleSaveSuccess = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    useEffect(() => {

        async function fetchSelect() {
            const MoradoresData = await servicesMorador.listarMoradores();

            SetMoradores(MoradoresData);
        }
        fetchSelect();
        if (veiculoId) {
            async function fetchVeiculo() {
                try {
                    const veiculoData = await servicesVeiculo.lerVeiculo(veiculoId);

                    setVeiculoData(veiculoData);

                } catch (error) {
                    console.error('Erro ao buscar morador:', error);
                }
            }
            fetchVeiculo();
        }

        if (moradorId) {
            setVeiculoData({...setVeiculoData, idMorador: moradorId});
        }
    }, [veiculoId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            Id: VeiculoData.id,
            tipoVeiculo: VeiculoData.tipoVeiculo,
            Modelo: VeiculoData.modelo,
            Marca: VeiculoData.marca,
            Placa: VeiculoData.placa,
            idMorador: VeiculoData.idMorador,
            Observacao: VeiculoData.observacao
        };

        setErrors({});

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);


            return;
        }

        try {
            if (veiculoId) {
                const response = await servicesVeiculo.atualizarVeiculo(veiculoId, formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
            } else {
                const response = await servicesVeiculo.criarVeiculo(formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
                limparFormulario();
            }
        } catch (error) {
            console.error('Erro ao criar morador:', error);
        }
    };

    const validateForm = (formData) => {
        const errors = {};

        if (formData.tipoVeiculo === 0) {
            errors.tipoVeiculo = 'O campo "Tipo veiculo" é obrigatório.';
        }




        return errors;
    };

    const limparFormulario = () => {
        setVeiculoData(morador);
    };

    const renderSelectOptions = (enumObj) => {
        return Object.keys(enumObj).map((key) => (
            <option key={enumObj[key].value} value={enumObj[key].value}>
                {enumObj[key].label}
            </option>
        ));
    };

    return (
        <div className="container">
            <h2>Criar Veiculo</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-2">
                    <label className="form-label">id</label>
                    <span id="id" className="form-control">{VeiculoData.id}</span>
                </div>

                <div className="row">
                    <div className="col-3">
                        <label htmlFor="nome" className="form-label">Tipo Veiculo</label>
                        <select id="tipoVeiculo"
                            className={`form-select ${errors.tipoVeiculo ? 'is-invalid' : ''}`}
                            value={VeiculoData.tipoVeiculo}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, tipoVeiculo: parseInt(event.target.value) })}
                        > 
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(TipoVeiculoEnum)}
                        </select>
                        {errors.tipoVeiculo && <div className="invalid-feedback">{errors.tipoVeiculo}</div>}
                    </div>
                    <div className="col-3">
                        <label htmlFor="modelo" className="form-label">Modelo</label>
                        <input
                            id="modelo"
                            type="text"
                            className={`form-control ${errors.modelo ? 'is-invalid' : ''}`}
                            value={VeiculoData.modelo}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, modelo: event.target.value })}></input>
                    </div>
                    <div className="col-3">
                        <label htmlFor="marca" className="form-label">Marca</label>
                        <input
                            id="marca"
                            type="text"
                            className={`form-control ${errors.marca ? 'is-invalid' : ''}`}
                            value={VeiculoData.marca}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, marca: event.target.value })}></input>
                    </div>
                    <div className="col-3">
                        <label htmlFor="placa" className="form-label">Placa</label>
                        <InputMask
                            mask="aaa-9999"
                            id="placa"
                            type="text"
                            className={`form-control ${errors.placa ? 'is-invalid' : ''}`}
                            value={VeiculoData.placa}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, placa: event.target.value })}></InputMask>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="Morador" className="form-label">Morador </label>
                        <select
                            id="Morador"
                            type="text" 
                            disabled={moradorId !== undefined}
                            className={`form-control ${errors.morador ? 'is-invalid' : ''}`}
                            value={VeiculoData.idMorador}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, idMorador: event.target.value })}>
                            <option value={0}>Selecione</option>
                            {Moradores.map((morador) => (
                                <option key={morador.id} value={morador.id}>
                                    {morador.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="observacao" className="form-label">Observação</label>
                        <input
                            id="observacao"
                            type="text"
                            className={`form-control ${errors.observacao ? 'is-invalid' : ''}`}
                            value={VeiculoData.observacao}
                            onChange={(event) => setVeiculoData({ ...VeiculoData, observacao: event.target.value })}></input>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Salvar</button>
            </form>
        </div>
    );
}


export default VeiculoForm;
