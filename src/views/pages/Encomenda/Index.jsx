
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesMorador from '../../../services/MoradorService';
import servicesEncomenda from '../../../services/EncomendaService';
import { StatusEncomendaEnum } from '../../../models/Enums/StatusEncomendaEnum';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import { format } from 'date-fns';
import DeleteModal from '../../../components/DeleteModal'
import AlertContext from '../../../notifications/alerts/AlertContext';

const Encomenda = () => {
    const navigate = useNavigate();
     
    const addAlertContext = useContext(AlertContext);
    const [encomendas, setEncomendas] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroBloco, setFiltroBloco] = useState('');
    const [filtroApartamento, setFiltroApartamento] = useState(0);
    const [filtroStatusEncomenda, setFiltroStatusEncomenda] = useState(null);
    const [Bloco, SetBloco] = useState([]);
    const [Apartamento, SetApartamento] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEncomendaId, setSelectedEncomendaId] = useState(null); 


    async function fetchEncomendas() {
        try {
            const encomendasData = await servicesEncomenda.listarEncomendasComFiltro({
                nome: filtroNome,
                bloco: filtroBloco,
                apartamento: filtroApartamento,
                StatusEncomenda: filtroStatusEncomenda == "Selecione" ? null : filtroStatusEncomenda
            });
            setEncomendas(encomendasData);
        } catch (error) {
            console.error('Erro ao buscar moradores:', error);
        }
    }



    useEffect(() => {

        async function fetchSelect() {
            const blocoData = await BlocoService.listarBloco();
            const apartamentoData = await ApartamentoService.listarApartamento();

            SetBloco(blocoData);
            SetApartamento(apartamentoData);
        }
        fetchSelect();


        fetchEncomendas();
    }, [filtroNome, filtroBloco, filtroApartamento, filtroStatusEncomenda]);

    const handlePesquisar = () => {
        fetchEncomendas();
    };

    const handleNovoEncomendas = () => {
        navigate('Cadastro');
    };

    const handleAlterarEncomenda = (id) => {
        navigate(`Cadastro/${id}`);
    };
    async function handleEntregarEncomenda(id) {
        var encomenda = await servicesEncomenda.lerEncomenda(id);
        encomenda.dataEntregue = new Date();
        encomenda.statusEncomenda = StatusEncomendaEnum.Entregue.value;
        await servicesEncomenda.atualizarEncomenda(id,encomenda);
        addAlertContext.addAlert('Entrega realizada com sucesso', 'success');
         
        await fetchEncomendas();
         
    };
    const getStatusEncomendaLabel = (value) => {
        for (const key in StatusEncomendaEnum) {
            if (StatusEncomendaEnum[key].value === value) {
                return StatusEncomendaEnum[key].label;
            }
        }
        return '';
    };

    async function handleDeleteEncomenda(id) {
        try {
            await servicesEncomenda.excluirEncomenda(id);
            addAlertContext.addAlert('Encomenda excluída com sucesso', 'success');
            await fetchEncomendas();
        } catch (error) {
            addAlertContext.addAlert('Erro ao excluir encomenda', 'error');
            console.error('Erro ao excluir encomenda:', error);
        }
    }

    const openModal = (id) => {
        setSelectedEncomendaId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEncomendaId(null);
    };

    const confirmDelete = () => {
        if (selectedEncomendaId) {
            handleDeleteEncomenda(selectedEncomendaId);
            closeModal();
        }
    };

    return (
        <div>
            <h1>Lista de Encomendas</h1>
            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Nome do Morador</label>
                        <input type="text" placeholder="Nome do Morador" className="form-control"
                            value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
                    </div>
                    <div className="col-2">
                        <label htmlFor="filtroBloco" required className="form-label">Bloco</label>
                        <select className="form-select" id="filtroBloco" value={filtroBloco} onChange={(event) => setFiltroBloco(parseInt(event.target.value))} >
                            <option value={0}>Selecione</option>
                            {
                                Bloco.map(bloco => (
                                    <option key={bloco.id} value={bloco.id}>{bloco.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="filtroApartamento" required className="form-label">Apartamento</label>
                        <select className="form-select" id="filtroApartamento" value={filtroApartamento} onChange={(event) => setFiltroApartamento(parseInt(event.target.value))} >
                            <option value={0}>Selecione</option>
                            {
                                Apartamento.map(apartamento => (
                                    <option key={apartamento.id} value={apartamento.id}>{apartamento.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Status Encomenda</label>
                        <select value={filtroStatusEncomenda} className="form-control" onChange={(e) => setFiltroStatusEncomenda(e.target.value)}>
                            <option value={null}>Selecione</option>
                            {Object.values(StatusEncomendaEnum).map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                        </select>
                    </div>
                </div>


            </div>
            <button onClick={handleNovoEncomendas} className="btn btn-primary mt-3 mb-3">Nova Encomenda</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Status da Encomenda</th>
                        <th>Código da Encomenda</th>
                        <th>Data Recebida</th>
                        <th>Data Entregue</th>
                        <th>Alterar</th>
                        <th>Entregar</th>
                    </tr>
                </thead>
                <tbody>
                    {encomendas.map(encomenda => {

                        return (
                            <tr key={encomenda.id}>
                                <td>{encomenda.nomeDestinatario}</td>
                                <td>{getStatusEncomendaLabel(encomenda.statusEncomenda)}</td>
                                <td>{encomenda.codBarra}</td>
                                <td>{encomenda.dataRecebida == null?  "": format(new Date(encomenda.dataRecebida), 'dd/MM/yyyy')}</td>
                                <td>{encomenda.dataRecebida == null? "" : format(new Date(encomenda.dataEntregue), 'dd/MM/yyyy')}</td> 
                                <td><button className="btn btn-primary" onClick={() => handleAlterarEncomenda(encomenda.id)}>Alterar</button></td>
                                <td><button className="btn btn-primary" onClick={() => handleEntregarEncomenda(encomenda.id)}>Entregar</button></td>
                                <td><button className="btn btn-primary" onClick={() => openModal(encomenda.id)}>Excluir</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                mensagem="Você tem certeza que deseja excluir esta encomenda?"
            />
        </div>
    );
}

export default Encomenda;