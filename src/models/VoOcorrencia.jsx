 
import { EscolaridadeEnum } from './/Enums/EscolaridadeEnum'
import { EstadoCivilEnum } from './Enums/EstadoCivilEnum'
import { TipoOcorrenciaEnum } from './Enums/TipoOcorrenciaEnum'
import { ParentescoEnum } from './Enums/ParentescoEnum'

export default class VoOcorrencia {
    constructor(
        Id = 0,
        idMorador = '',
        idBloco = '',
        idApartamento = '',
        tipoOcorrencia = TipoOcorrenciaEnum,
        Data = new Date(),
        descricao = '', 
    ) {
        this.Id = Id;
        this.idMorador = idMorador; 
        this.idBloco = idBloco; 
        this.idApartamento = idApartamento; 
        this.tipoOcorrencia = tipoOcorrencia; 
        this.Data = Data; 
        this.descricao = descricao; 
    }
}
