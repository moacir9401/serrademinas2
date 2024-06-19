
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesOcorrencia from '../../../services/OcorrenciaService'; 
import { TipoOcorrenciaEnum } from '../../../models/Enums/TipoOcorrenciaEnum';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import { format } from 'date-fns';
import DeleteModal from '../../../components/DeleteModal'
import AlertContext from '../../../notifications/alerts/AlertContext';

const Ocorrencia = () => {
    const navigate = useNavigate();

    const [Ocorrencias, setOcorrencia] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroTipoOcorrencia, setFiltroTipoOcorrencia] = useState(0);
    const [filtroBloco, setFiltroBloco] = useState('');
    const [filtroApartamento, setFiltroApartamento] = useState(0); 
    const [Bloco, SetBloco] = useState([]);
    const [Apartamento, SetApartamento] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOcorrenciaId, setSelectedOcorrenciaId] = useState(null);
    const addAlertContext = useContext(AlertContext);

    async function fetchOcorrencias() {
        try {
            const ocorrenciasData = await servicesOcorrencia.listarOcorrenciasComFiltro({
                nome: filtroNome,
                bloco: filtroBloco,
                apartamento: filtroApartamento,
                tipoOcorrencia: (filtroTipoOcorrencia === "Selecione" ? null : filtroTipoOcorrencia)
            });
            setOcorrencia(ocorrenciasData);
        } catch (error) {
            console.error('Erro ao buscar ocorrencias:', error);
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

        fetchOcorrencias();
    }, [filtroNome, filtroBloco, filtroApartamento, filtroTipoOcorrencia]);

    const handlePesquisar = () => { 
        fetchOcorrencias();
    };

    const handleNovaOcorrencia = () => {
        navigate('Cadastro');
    };

    const handleAlterarOcorrencia = (id) => {
        navigate(`Cadastro/${id}`);
    };
    const getTipoOcorrenciaLabel = (value) => {
        for (const key in TipoOcorrenciaEnum) {
            if (TipoOcorrenciaEnum[key].value === value) {
                return TipoOcorrenciaEnum[key].label;
            }
        }
        return '';
    };

    async function handleDeleteOcorrencia(id) {
        try {
            await servicesOcorrencia.excluirOcorrencia(id);
            addAlertContext.addAlert('Ocorrência excluída com sucesso', 'success');
            await fetchOcorrencias();
        } catch (error) {
            addAlertContext.addAlert('Erro ao excluir ocorrência', 'error');
            console.error('Erro ao excluir ocorrência:', error);
        }
    }

    const openModal = (id) => {
        setSelectedOcorrenciaId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOcorrenciaId(null);
    };

    const confirmDelete = () => {
        if (selectedOcorrenciaId) {
            handleDeleteOcorrencia(selectedOcorrenciaId);
            closeModal();
        }
    };
    return (
        <div>
            <h1>Lista de Ocorrências</h1>
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
                        <label className="form-label">Tipo de Ocorrência</label>
                        <select value={filtroTipoOcorrencia} className="form-control" onChange={(e) => setFiltroTipoOcorrencia(e.target.value)}>
                            <option value={undefined}>Selecione</option>
                            {Object.values(TipoOcorrenciaEnum).map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
              
            </div>
            <button onClick={handleNovaOcorrencia} className="btn btn-primary mt-3 mb-3">Nova ocorrência</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Tipo de Ocorrência</th>
                        <th>Data</th>
                        <th>Descrição</th> 
                        <th>Alterar</th> 
                    </tr>
                </thead>
                <tbody>
                    {Ocorrencias.map(ocorrencia => { 
                        const dataBloco = Bloco.find(b => b.ID === ocorrencia.IdBloco);
                        const dataApartamento = Apartamento.find(a => a.ID === ocorrencia.IdApartamento);

                    return (
                        <tr key={ocorrencia.id}>
                            <td>{ocorrencia.id}</td>
                            <td>{getTipoOcorrenciaLabel(ocorrencia.tipoOcorrencia)}</td>
                            <td>{format(new Date(ocorrencia.data), 'dd/MM/yyyy')}</td>
                            <td>{ocorrencia.descricao}</td> 
                            <td><button className="btn btn-primary" onClick={() => handleAlterarOcorrencia(ocorrencia.id)}>Alterar</button></td>
                            <td><button className="btn btn-primary" onClick={() => openModal(ocorrencia.id)}>Excluir</button></td>
                    </tr>
                    );
                    })}
                </tbody>
            </table>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                mensagem="Você tem certeza que deseja excluir esta ocorrência?"
            />
        </div>
    );
}

export default Ocorrencia;