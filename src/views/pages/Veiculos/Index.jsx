
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import VeiculoService from '../../../services/VeiculoService';
import MoradorService from '../../../services/MoradorService';
import { TipoMoradorEnum } from '../../../models/Enums/TipoMoradorEnum'; 
import { TipoVeiculoEnum } from '../../../models/Enums/TipoVeiculoEnum';
import ApartamentoService from '../../../services/ApartamentoService';
import BlocoService from '../../../services/BlocoService';
import servicesMorador from '../../../services/MoradorService';
import DeleteModal from '../../../components/DeleteModal'
import AlertContext from '../../../notifications/alerts/AlertContext';

const Veiculo = () => {
    const navigate = useNavigate();

    const [Veiculos, setVeiculos] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroPlaca, setFiltroPlaca] = useState('');
    const [filtroBloco, setFiltroBloco] = useState('');
    const [filtroApartamento, setFiltroApartamento] = useState(0);
    const [filtroTipoMorador, setFiltroTipoMorador] = useState(null);
    const [filtroTipoVeiculo, setFiltroTipoVeiculo] = useState(null);
    const [Bloco, SetBloco] = useState([]); 
    const [Morador, SetMorador] = useState([]); 
    const [Apartamento, SetApartamento] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVeiculoId, setSelectedVeiculoId] = useState(null);
    const addAlertContext = useContext(AlertContext);

    async function fetchVeiculos() {
        try {
            const VeiculosData = await VeiculoService.listarVeiculosComFiltro({
                nome: filtroNome,
                bloco: filtroBloco,
                apartamento: filtroApartamento,
                tipoMorador: filtroTipoMorador,
                tipoVeiculo: filtroTipoVeiculo,
                placa: filtroPlaca,
            });
            setVeiculos(VeiculosData);
        } catch (error) {
            console.error('Erro ao buscar Veiculos:', error);
        }
    } 

    useEffect(() => {

        async function fetchSelect() {
            const blocoData = await BlocoService.listarBloco();
            const apartamentoData = await ApartamentoService.listarApartamento();
            const MoradorData = await servicesMorador.listarMoradores();

            SetBloco(blocoData);
            SetMorador(MoradorData);
            SetApartamento(apartamentoData);
        }
        fetchSelect();


        fetchVeiculos();
    }, [filtroNome, filtroPlaca, filtroTipoVeiculo, filtroBloco, filtroApartamento, filtroTipoMorador]);

    const handlePesquisar = () => {
       
        fetchVeiculos();
    };

    const handleNovoVeiculo = () => {
        navigate('Cadastro');
    };

    const handleAlterarVeiculo = (id) => {
        navigate(`Cadastro/${id}`);
    };

    async function  buscarMorador(value){
        return await MoradorService.lerMorador(value);
    }

    const getTipoVeiculoLabel = (value) => {
        for (const key in TipoVeiculoEnum) {
            if (TipoVeiculoEnum[key].value === value) {
                return TipoVeiculoEnum[key].label;
            }
        }
        return '';
    };

    async function handleDeleteVeiculo(id) {
        try {
            await VeiculoService.excluirVeiculo(id);
            addAlertContext.addAlert('Veiculo excluída com sucesso', 'success');
            await fetchVeiculos();
        } catch (error) {
            addAlertContext.addAlert('Erro ao excluir veiculo', 'error');
            console.error('Erro ao excluir veiculo:', error);
        }
    }

    const openModal = (id) => {
        setSelectedVeiculoId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVeiculoId(null);
    };

    const confirmDelete = () => {
        if (selectedVeiculoId) {
            handleDeleteVeiculo(selectedVeiculoId);
            closeModal();
        }
    };

    return (
        <div>
            <h1>Lista de Veiculos</h1>
            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Nome do Morador</label>
                        <input type="text" placeholder="Nome do Morador" className="form-control"
                             onChange={(e) => setFiltroNome(e.target.value)} />
                    </div>
                    <div className="col-4">
                        <label className="form-label">Tipo de Morador</label>
                        <select  className="form-select" onChange={(e) => setFiltroTipoMorador(e.target.value)}>
                            <option value="">Selecione</option>
                            {Object.values(TipoMoradorEnum).map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Tipo de Veiculo</label>
                        <select className="form-select" onChange={(event) => setFiltroTipoVeiculo(event.target.value)}>
                            <option value="">Selecione</option>
                            {Object.values(TipoVeiculoEnum).map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Placa</label>
                        <input type="text" placeholder="Placa" className="form-control"
                            value={filtroPlaca} onChange={(e) => setFiltroPlaca(e.target.value)} />
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
            <button onClick={handleNovoVeiculo} className="btn btn-primary mt-3 mb-3">Novo Veiculo</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Bloco</th>
                        <th>Apartamento</th>
                        <th>Tipo de Veiculo</th>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {Veiculos.map(veiculo => {
                        const dataBloco = Bloco.find(b => b.ID === veiculo.IdBloco);
                        const dataMorador = Morador.find(m => m.id == veiculo.idMorador);
                        const dataApartamento = Apartamento.find(a => a.ID === veiculo.IdApartamento);

                        return (
                            <tr key={veiculo.id}>
                                <td>{veiculo.id}</td>
                                <td>{dataMorador ? dataMorador.nome : ''}</td>
                                <td>{dataBloco ? dataBloco.nome : 'Carregando...'}</td>
                                <td>{dataApartamento ? dataApartamento.nome : 'Carregando...'}</td>
                                <td>{getTipoVeiculoLabel(veiculo.tipoVeiculo)}</td>
                                <td>{veiculo.modelo}</td>
                                <td>{veiculo.placa}</td>
                                <td><button className="btn btn-primary" onClick={() => handleAlterarVeiculo(veiculo.id)}>Alterar</button></td>
                                <td><button className="btn btn-primary" onClick={() => openModal(veiculo.id)}>Excluir</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                mensagem="Você tem certeza que deseja excluir este veiculo?"
            />
        </div>
    );
}

export default Veiculo;