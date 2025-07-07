import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DadosFinais } from '../../interfaces/dados-finais';
import { Produtos } from '../../interfaces/produtos'
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  produtos: Produtos[] = [
    {
      nome: 'Vestido Midi - Preta / M',
      preco: 148.75,
      quantidade: 1,
      imagemUrl: 'assets/jujuba.png',
      variant: 'Preta / M',
      originalPrice: 175.0,
      discountInfo: 'PRIDE10 (-26,25)',
    },
    {
      nome: 'Saia casual, social - Preta / P',
      preco: 194.65,
      quantidade: 1,
      imagemUrl: 'assets/hornet.png',
      variant: 'Preta / P',
      originalPrice: 229.0,
      discountInfo: 'PRIDE10 (-34,35)',
    },
    {
      nome: 'Brinde Exclusivo - Eco-bag',
      preco: 0,
      quantidade: 1,
      imagemUrl: 'assets/gato.png',
      variant: 'SEU PEDIDO INCLUIRÁ UMA ECO-BAG',
      isFree: true,
    },
  ];

  dadosFinais: DadosFinais = {
    contato: '',
    endereco: {
      logradouro: '',
      numero: '',
      cep: '',
      cidade: '',
      estado: '',
    },
    pagamento: '',
    entrega: 'padrão', 
    subtotal: 0, 
    total: 0, 
    cupom: '',
    desconto: 0,
    frete: 0,
  };

  message: { text: string; type: string } = { text: '', type: '' }; // Para mensagens de cupom
  showModal: boolean = false; // Para controlar a visibilidade do modal customizado
  modalContent: string = ''; // Conteúdo do modal customizado

  ngOnInit(): void {
    this.calcularSubtotal();
    this.alterarTotal();
  }

  calcularSubtotal(): void {
    this.dadosFinais.subtotal = this.produtos.reduce(
      (acc, produto) => acc + produto.preco * produto.quantidade,
      0
    );
  }

  /**
   * Exibe um modal customizado com a mensagem fornecida.
   * @param content A mensagem a ser exibida no modal.
   */

  showCustomModal(content: string): void {
    this.modalContent = content;
    this.showModal = true;
  }

  /**
   * Fecha o modal customizado.
   */
  closeModal(): void {
    this.showModal = false;
    this.modalContent = '';
  }

  /**
   * Aplica um cupom de desconto se o valor for 'PRIDE10'.
   * Atualiza o desconto e recalcula o total.
   */
  aplicarCupom(): void {
    let newDesconto = 0;
    if (this.dadosFinais.cupom.toUpperCase() === 'PRIDE10') {
      newDesconto = 60.6;
      this.message = {
        text: `Cupom aplicado: ${
          this.dadosFinais.cupom
        } - Economia de R$ ${newDesconto.toFixed(2)}`,
        type: 'success',
      };
    } else {
      newDesconto = 0;
      this.message = { text: 'Cupom inválido.', type: 'error' };
    }
    this.dadosFinais.desconto = newDesconto;
    this.alterarTotal();
  }

  /**
   * Altera o valor do frete e recalcula o total da compra.
   */
  alterarTotal(): void {
    this.dadosFinais.frete = this.dadosFinais.entrega === 'express' ? 20.2 : 0;
    this.dadosFinais.total =
      this.dadosFinais.subtotal - this.dadosFinais.desconto + this.dadosFinais.frete;
  }

  /**
   * Finaliza a compra, validando os campos obrigatórios.
   * Exibe um modal de sucesso ou erro.
   */
  finalizeCompra(): void {
    if (
      !this.dadosFinais.contato ||
      !this.dadosFinais.endereco.logradouro ||
      !this.dadosFinais.endereco.numero ||
      !this.dadosFinais.endereco.cep ||
      !this.dadosFinais.endereco.cidade ||
      !this.dadosFinais.endereco.estado
    ) {
      this.showCustomModal('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    this.showCustomModal('Compra finalizada com sucesso!');
  }
}
