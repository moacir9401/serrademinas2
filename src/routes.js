import React from 'react'

const Morador = React.lazy(() => import('./views/pages/Morador/Index'))
const MoradorForm = React.lazy(() => import('./views/pages/Morador/MoradorForm'))
const Veiculos = React.lazy(() => import('./views/pages/Veiculos/Index'))
const VeiculosForm = React.lazy(() => import('./views/pages/Veiculos/VeiculosForm'))
const Ocorrencia = React.lazy(() => import('./views/pages/Ocorrencia/Index'))
const OcorrenciaForm = React.lazy(() => import('./views/pages/Ocorrencia/OcorrenciaForm'))
const Log = React.lazy(() => import('./views/pages/Log/Index'))
const Encomenda = React.lazy(() => import('./views/pages/Encomenda/Index'))
const EncomendaForm = React.lazy(() => import('./views/pages/Encomenda/EncomendaForm'))
const routes = [
    { path: '/', exact: true, name: 'Home' }, 
    { path: '/Morador', name: 'Morador', element: Morador },
    { path: '/Veiculo', name: 'Veiculo', element: Veiculos },
    { path: '/Morador/Cadastro', name: 'Cadastro', element: MoradorForm },
    { path: '/Morador/Cadastro/:moradorId', name: 'Alterar', element: MoradorForm },
    { path: '/Veiculo/Cadastro', name: 'Cadastro', element: VeiculosForm },
    { path: '/Veiculo/Cadastro/:veiculoId', name: 'Cadastro', element: VeiculosForm },
    { path: '/Veiculo/NovoCadastro/:moradorId', name: 'Cadastro', element: VeiculosForm },
    { path: '/Ocorrencia', name: 'Ocorrência', element: Ocorrencia },
    { path: '/Ocorrencia/Cadastro', name: 'Cadastro', element: OcorrenciaForm },
    { path: '/Ocorrencia/Cadastro/:ocorrenciaId', name: 'Alterar', element: OcorrenciaForm },
    { path: '/Log', name: 'Log', element: Log },
    { path: '/Encomenda', name: 'Encomenda', element: Encomenda },
    { path: '/Encomenda/Cadastro', name: 'Cadastro', element: EncomendaForm },
    { path: '/Encomenda/Cadastro/:encomendaId', name: 'Cadastro', element: EncomendaForm },
]

export default routes
