
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesMorador from '../../../services/MoradorService';
import { TipoMoradorEnum } from '../../../models/Enums/TipoMoradorEnum';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import DeleteModal from '../../../components/DeleteModal'
import AlertContext from '../../../notifications/alerts/AlertContext';

const Morador = () => {
    const navigate = useNavigate();

    async function fetchMoradores() {
        try {
            const moradoresData = await servicesMorador.listarMoradoresComFiltro({
                nome: filtroNome,
                bloco: filtroBloco,
                apartamento: filtroApartamento,
                tipoMorador: filtroTipoMorador
            });
            setMoradores(moradoresData);
        } catch (error) {
            console.error('Erro ao buscar moradores:', error);
        }
    }

    const [moradores, setMoradores] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroBloco, setFiltroBloco] = useState('');
    const [filtroApartamento, setFiltroApartamento] = useState(0);
    const [filtroTipoMorador, setFiltroTipoMorador] = useState(0);
    const [Bloco, SetBloco] = useState([]);
    const [Apartamento, SetApartamento] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMoradorId, setSelectedMoradorId] = useState(null);
    const addAlertContext = useContext(AlertContext);

    useEffect(() => {

        async function fetchSelect() {
            const blocoData = await BlocoService.listarBloco();
            const apartamentoData = await ApartamentoService.listarApartamento(); 

            SetBloco(blocoData);
            SetApartamento(apartamentoData);
        }
        fetchSelect();

        fetchMoradores();
    }, [filtroNome, filtroBloco, filtroApartamento, filtroTipoMorador]);

    const handlePesquisar = () => {
        // Atualizar a lista de moradores com base nos filtros
        fetchMoradores();
    };

    const handleNovoMorador = () => {
        navigate('Cadastro');
    };

    const handleAlterarMorador = (id) => {
        navigate(`Cadastro/${id}`);
    };
    const getTipoMoradorLabel = (value) => {
        for (const key in TipoMoradorEnum) {
            if (TipoMoradorEnum[key].value === value) {
                return TipoMoradorEnum[key].label;
            }
        }
        return '';
    };

    async function handleDeleteMorador(id) {
        try {
            await servicesMorador.excluirMorador(id);
            addAlertContext.addAlert('Morador excluído com sucesso', 'success');
            await fetchMoradores();
        } catch (error) {
            addAlertContext.addAlert('Erro ao excluir morador', 'error');
            console.error('Erro ao excluir morador:', error);
        }
    }

    const openModal = (id) => {
        setSelectedMoradorId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMoradorId(null);
    };

    const confirmDelete = () => {
        if (selectedMoradorId) {
            handleDeleteMorador(selectedMoradorId);
            closeModal();
        }
    };
    return (
        <div>
            <h1>Lista de Moradores</h1>
            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Nome do Morador</label>
                        <input type="text" placeholder="Nome do Morador" className="form-control"
                            value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
                    </div>
                    <div className="col-4">
                        <label className="form-label">Tipo de Morador</label>
                        <select value={filtroTipoMorador} className="form-control" onChange={(e) => setFiltroTipoMorador(e.target.value)}>
                            <option value="">Selecione</option>
                            {Object.values(TipoMoradorEnum).map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                        </select> 
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
                </div>
                
              
            </div>
            <button onClick={handleNovoMorador} className="btn btn-primary mt-3 mb-3">Novo Morador</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Tipo de Morador</th>
                        <th>Bloco</th>
                        <th>Apartamento</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {moradores.map(morador => { 
                        const dataBloco = Bloco.find(b => b.ID === morador.IdBloco);
                        const dataApartamento = Apartamento.find(a => a.ID === morador.IdApartamento);

                    return (
                        <tr key={morador.id}>
                            <td>{morador.id}</td>
                            <td>{morador.nome}</td>
                            <td>{morador.telefone}</td>
                            <td>{getTipoMoradorLabel(morador.tipoMorador)}</td>
                            <td>{dataBloco ? dataBloco.nome : 'Carregando...'}</td>
                            <td>{dataApartamento ? dataApartamento.nome : 'Carregando...'}</td> 
                            <td><button className="btn btn-primary" onClick={() => handleAlterarMorador(morador.id)}>Alterar</button></td>
                            <td><button className="btn btn-primary" onClick={() => openModal(morador.id)}>Excluir</button></td>
                    </tr>
                    );
                    })}
                </tbody>
            </table>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                mensagem="Você tem certeza que deseja excluir este Morador?"
            />
        </div>
    );
}

export default Morador;