import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho.service';
import { CarItem } from '../../interfaces/car-item';
import { FormsModule } from '@angular/forms';
import { DadosFinais } from '../../interfaces/dados-finais';
import { Produtos } from '../../interfaces/produtos';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  produtos: Produtos[] = [];
  private itemsSub: Subscription | null = null;

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
  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    // Subscribe to cart items and map to checkout produtos
    this.itemsSub = this.carrinhoService.items$.subscribe((items: CarItem[]) => {
      this.produtos = items.map(it => ({
        nome: it.nome,
        preco: it.preco,
        quantidade: it.quantidade,
        imagemUrl: it.imagem,
      } as Produtos));
      this.calcularSubtotal();
      this.alterarTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
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

  get totalItens(): number {
    return this.produtos.reduce((sum, p) => sum + (p.quantidade || 0), 0);
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
