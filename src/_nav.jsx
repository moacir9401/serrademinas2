import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilDrop,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilUser,
    cilCarAlt,
    cilInfo,
    cilWarning,
    cilSend,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [ 
    {
        component: CNavTitle,
        name: 'Menu',
    },
    {
        component: CNavItem,
        name: 'Morador',
        to: '/Morador',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Veiculo',
        to: '/Veiculo',
        icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Ocorrência',
        to: '/Ocorrencia',
        icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Log',
        to: '/Log',
        icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
    },,
    {
        component: CNavItem,
        name: 'Encomenda',
        to: '/Encomenda',
        icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
    } 
]

export default _nav
