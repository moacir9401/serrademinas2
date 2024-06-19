import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputMask } from '@react-input/mask';
import servicesMorador from '../../../services/MoradorService';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import { EscolaridadeEnum } from '../../../models/Enums/EscolaridadeEnum'
import { EstadoCivilEnum } from '../../../models/Enums/EstadoCivilEnum'
import { TipoMoradorEnum } from '../../../models/Enums/TipoMoradorEnum'
import { ParentescoEnum } from '../../../models/Enums/ParentescoEnum'

import AlertContext from '../../../notifications/alerts/AlertContext';
import VoMorador from '../../../models/VoMorador'

const MoradorForm = () => {

    const { moradorId } = useParams();
    const addAlertContext = useContext(AlertContext);
    const [moradorData, setMoradorData] = useState(new VoMorador());
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

    const handleNovoVeiculo = () => {
        navigate(`/Veiculo/NovoCadastro/${moradorId}`);
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
        if (moradorId) {
            async function fetchMorador() {
                try {
                    const moradorData = await servicesMorador.lerMorador(moradorId);
                    if (moradorData.dataNascimento) {
                        moradorData.dataNascimento = new Date(moradorData.dataNascimento);

                        moradorData.idMorador = 14
                    }

                    setMoradorData(moradorData);
                } catch (error) {
                    console.error('Erro ao buscar morador:', error);
                }
            }
            fetchMorador();
        }
    }, [moradorId]);

    if (moradorData.tipoMorador === TipoMoradorEnum.TITULAR.value) {
        moradorData.parentesco = 0;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            Id: moradorData.id,
            nome: moradorData.nome,
            tipoMorador: moradorData.tipoMorador,
            telefone: moradorData.telefone,
            email: moradorData.email,
            estadoCivil: moradorData.estadoCivil,
            profissao: moradorData.profissao,
            parentesco: moradorData.parentesco,
            escolaridade: moradorData.escolaridade,
            idMorador: moradorData.idMorador,
            rg: moradorData.rg,
            cpf: moradorData.cpf,
            dataNascimento: moradorData.dataNascimento ? moradorData.dataNascimento.toISOString() : '',
            observacao: moradorData.observacao,
            idApartamento: moradorData.idApartamento,
            idBloco: moradorData.idBloco
        };

        setErrors({});

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (moradorId) {
                const response = await servicesMorador.atualizarMorador(moradorId, formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
            } else {
                const response = await servicesMorador.criarMorador(formData);
                addAlertContext.addAlert('Ação Realizada com sucesso', 'success');
                limparFormulario();
            }
        } catch (error) {
            console.error('Erro ao criar morador:', error);
        }
    };

    const validateForm = (formData) => {
        const errors = {};

        if (formData.nome === '') {
            errors.nome = 'O campo "Nome" é obrigatório.';
        }

        if (moradorData.tipoMorador != TipoMoradorEnum.TITULAR.value && moradorData.parentesco === 0) {
            errors.parentesco = 'O campo "parentesco" é obrigatório para moradores diferentes do tipo "Titular".';
        }

        if (moradorData.tipoMorador != TipoMoradorEnum.TITULAR.value && moradorData.idMorador === 0) {
            errors.idMorador = 'O campo "Morador" é obrigatório para moradores diferentes do tipo "Titular".';
        }

        return errors;
    };

    const limparFormulario = () => {
        setMoradorData(morador);
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
            <h2>Criar Morador</h2>
             
            {moradorId !== undefined && (
                <button onClick={handleNovoVeiculo} className="btn btn-primary mt-3 mb-3">Adicionar Veiculo</button>
                ) } 

            <form onSubmit={handleSubmit}>
                <div className="col-2">
                    <label className="form-label">id</label>
                    <span id="id" className="form-control">{moradorData.id ?? 0}</span>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                            id="nome" value={moradorData.nome}
                            onChange={(event) => setMoradorData({ ...moradorData, nome: event.target.value })} />
                        {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                    </div>
                    <div className="col-2">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={moradorData.dataNascimento ? moradorData.dataNascimento.toISOString().substring(0, 10) : ''}
                            onChange={(event) => setMoradorData({ ...moradorData, dataNascimento: new Date(event.target.value) })}
                            className={errors.dataNascimento ? 'form-control is-invalid' : 'form-control'}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <InputMask
                            mask="(__) _____-____" replacement={{ _: /\d/ }}
                            className="form-control"
                            id="telefone"
                            value={moradorData.telefone}
                            onChange={(event) => setMoradorData({ ...moradorData, telefone: event.target.value })}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={moradorData.email} onChange={(event) => setMoradorData({ ...moradorData, email: event.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="escolaridade" className="form-label">Escolaridade</label>
                        <select className="form-select" id="escolaridade" value={moradorData.escolaridade} onChange={(event) => setMoradorData({ ...moradorData, escolaridade: parseInt(event.target.value) })}>
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(EscolaridadeEnum)}
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="rg" className="form-label">RG</label>
                        <input type="text" className="form-control" id="rg" value={moradorData.rg} onChange={(event) => setRg(event.target.value)} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <InputMask
                            mask="___.___.___-__" replacement={{ _: /\d/ }}
                            className="form-control"
                            id="cpf"
                            value={moradorData.cpf}
                            onChange={(event) => setCpf(event.target.value)}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="estadoCivil" className="form-label">Estado Civil</label>
                        <select className="form-select" id="estadoCivil" value={moradorData.estadoCivil} onChange={(event) => setEstadoCivil(parseInt(event.target.value))}>
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(EstadoCivilEnum)}
                        </select>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        <label htmlFor="profissao" className="form-label">Profissão</label>
                        <input type="text" className="form-control" id="profissao" value={moradorData.profissao} onChange={(event) => setProfissao(event.target.value)} />
                    </div>
                    <div className="col-2">
                        <label htmlFor="idBloco" required className="form-label">Bloco</label>
                        <select className="form-select" id="idBloco" value={moradorData.idBloco} onChange={(event) => setMoradorData({ ...moradorData, idBloco: parseInt(event.target.value) })} >
                            <option value={0}>Selecione</option>
                            {
                                Bloco.map(bloco => (
                                    <option key={bloco.id} value={bloco.id}>{bloco.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="idApartamento" required className="form-label">Apartamento</label>
                        <select className="form-select" id="idApartamento" value={moradorData.idApartamento} onChange={(event) => setMoradorData({ ...moradorData, idApartamento: parseInt(event.target.value) })} >
                            <option value={0}>Selecione</option>
                            {
                                Apartamento.map(apartamento => (
                                    <option key={apartamento.id} value={apartamento.id}>{apartamento.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="tipoMorador" required className="form-label">Tipo de Morador</label>
                        <select className="form-select" id="tipoMorador" value={moradorData.tipoMorador}
                            onChange={(event) => setMoradorData({ ...moradorData, tipoMorador: parseInt(event.target.value) })}>
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(TipoMoradorEnum)}
                        </select>
                    </div>

                    <div className="col-3">
                        <label htmlFor="parentesco" className="form-label">Parentesco</label>
                        <select className={`form-select ${errors.parentesco ? 'is-invalid' : ''}`}
                            id="parentesco"
                            value={moradorData.parentesco}
                            onChange={(event) => setMoradorData({ ...moradorData, parentesco: parseInt(event.target.value) })}
                            disabled={moradorData.tipoMorador === TipoMoradorEnum.TITULAR.value}>
                            <option value={0}>Selecione</option>
                            {renderSelectOptions(ParentescoEnum)}
                        </select>
                        {errors.parentesco && <div className="invalid-feedback">{errors.parentesco}</div>}
                    </div>

                </div>

                <div className="row">

                    <div className="col-3">
                        <label htmlFor="moradorId" className="form-label">Morador</label>
                        <select className={`form-select ${errors.idMorador ? 'is-invalid' : ''}`}
                            id="morador"
                            value={moradorData.idMorador}
                            onChange={(event) => setMoradorData({ ...moradorData, idMorador: parseInt(event.target.value) })}
                            disabled={moradorData.tipoMorador === TipoMoradorEnum.TITULAR.value}>
                            <option value={0}>Selecione</option>
                            {
                                Moradores.map(morador => (
                                    <option key={morador.id} value={morador.id}>{morador.nome}</option>
                                ))
                            }
                        </select>
                        {errors.idMorador && <div className="invalid-feedback">{errors.idMorador}</div>}
                    </div>

                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="observacao" className="form-label">Observação</label>
                        <textarea className="form-control" rows="5" id="observacao" value={moradorData.observacao} onChange={(event) => setObservacao(event.target.value)} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Salvar</button>
            </form>
        </div >
    );
}


export default MoradorForm;
