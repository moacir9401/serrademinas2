
import { StatusEncomendaEnum } from './/Enums/StatusEncomendaEnum'
import { EstadoCivilEnum } from './Enums/EstadoCivilEnum'
import { TipoMoradorEnum } from './Enums/TipoMoradorEnum'
import { ParentescoEnum } from './Enums/ParentescoEnum'

export default class VoEncomenda {
    constructor(
        id = 0,
        idMorador = null,
        idBloco = null,
        idApartamento = null,
        nomeDestinatario = '',
        codBarra = '',
        dataEntregue = new Date(),
        dataRecebida = new Date(),
        observacao = '',
        statusEncomenda = StatusEncomendaEnum
    ) {
        this.id = id,
            this.idMorador = idMorador,
            this.idBloco = idBloco,
            this.idApartamento = idApartamento,
            this.nomeDestinatario = nomeDestinatario,
            this.codBarra = codBarra,
            this.dataEntregue = new Date(dataEntregue),
            this.dataRecebida = new Date(dataRecebida),
            this.observacao = observacao,
            this.statusEncomenda = statusEncomenda
    }
}
