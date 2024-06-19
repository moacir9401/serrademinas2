 
import { EscolaridadeEnum } from './/Enums/EscolaridadeEnum'
import { EstadoCivilEnum } from './Enums/EstadoCivilEnum'
import { TipoVeiculoEnum } from './Enums/TipoVeiculoEnum'
import { ParentescoEnum } from './Enums/ParentescoEnum'

export default class VoVeiculo {
    constructor(
        Id = '', 
        TipoVeiculo = TipoVeiculoEnum,
        Modelo = '',
        Marca = '', 
        Placa = '', 
        Observacao = '', 
        IdMorador = 0, 
    ) {
        this.Id = Id; 
        this.TipoVeiculo = TipoVeiculo;
        this.Modelo = Modelo;
        this.Marca = Marca;
        this.Placa = Placa;
        this.Observacao = Observacao;
        this.IdMorador = IdMorador;
    }
}
