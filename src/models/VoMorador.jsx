 
import { EscolaridadeEnum } from './/Enums/EscolaridadeEnum'
import { EstadoCivilEnum } from './Enums/EstadoCivilEnum'
import { TipoMoradorEnum } from './Enums/TipoMoradorEnum'
import { ParentescoEnum } from './Enums/ParentescoEnum'

export default class VoMorador {
    constructor(
        Id = '',
        nome = '',
        tipoMorador = TipoMoradorEnum,
        telefone = '',
        email = '',
        estadoCivil = EstadoCivilEnum,
        profissao = '',
        parentesco = ParentescoEnum,
        escolaridade = EscolaridadeEnum,
        idMorador = 1,
        rg = '',
        cpf = '',
        dataNascimento = new Date(),
        observacao = '',
        idApartamento = 1,
        idBloco = 1
    ) {
        this.Id = Id;
        this.nome = nome;
        this.tipoMorador = tipoMorador;
        this.telefone = telefone;
        this.email = email;
        this.estadoCivil = estadoCivil;
        this.profissao = profissao;
        this.parentesco = parentesco;
        this.escolaridade = escolaridade;
        this.idMorador = idMorador;
        this.rg = rg;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.observacao = observacao;
        this.idApartamento = idApartamento;
        this.idBloco = idBloco;
    }
}
