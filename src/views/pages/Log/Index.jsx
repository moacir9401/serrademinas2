
import React, { useState } from 'react';
import servicesLog from '../../../services/LogService';
import { format } from 'date-fns';

const Log = () => {

    const [filtroDataInicio, setFiltroDataInicio] = useState(new Date());
    const [filtroDataFim, setFiltroDataFim] = useState(new Date());
    const [logsData, setLogsData] = useState([]);


    async function fetchLogs() {
        try {
            const logs = await servicesLog.listarLogsComFiltro({
                dataInicio: filtroDataInicio,
                dataFim: filtroDataFim,
            });
            setLogsData(logs);
        } catch (error) {
            console.error('Erro ao buscar logs:', error);
        }
    }

    const handlePesquisar = () => {
        fetchLogs();
    };

    return (
        <div>
            <h1>Lista de Logs</h1>
            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Data Inicio</label>
                        <input type="date" placeholder="DataInicio" className="form-control"
                            onChange={(e) => setFiltroDataInicio(new Date(e.target.value))} />
                    </div>
                    <div className="col-4">
                        <label className="form-label">Data Termino</label>
                        <input type="date" placeholder="DataInicio" className="form-control"
                            onChange={(e) => setFiltroDataFim(new Date(e.target.value))} />
                    </div>
                    <div className="mt-3 col-4">
                        <button onClick={handlePesquisar} className="btn btn-primary mt-3 mb-3">Pesquisar</button>
                    </div>
                </div>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {logsData.map(log => {

                        return (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{format(new Date(log.data), 'dd/MM/yyyy')}</td>
                                <td>{log.descricao}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Log;