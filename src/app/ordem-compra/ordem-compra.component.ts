import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // controles de validação

  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  // estados primitivos (pristine)

  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  // controle do Botão de confirmarCompra

  public formEstado: string = 'disabled';


  constructor() { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string): void {
    this.enderecoEstadoPrimitivo = false;
    this.endereco = endereco;
    this.enderecoValido = (this.endereco.length > 3);
    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numeroEstadoPrimitivo = false;
    this.numero = numero;
    this.numeroValido = this.numero.length > 0;
    this.habilitaForm();
  }

  public atualizaComplemento(complemento: string): void {
    this.complementoEstadoPrimitivo = false;
    this.complemento = complemento;
    this.complementoValido = (this.complemento.length > 0);
    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamentoEstadoPrimitivo = false;
    this.formaPagamento = formaPagamento;
    this.formaPagamentoValido = (this.formaPagamento.length > 0);
    this.habilitaForm();
  }

  public habilitaForm(): void {
    if (this.enderecoValido &&
        this.numeroValido &&
        this.formaPagamento) {
          this.formEstado = '';
        } else {
          this.formEstado = 'disabled';
        }
  }

}
