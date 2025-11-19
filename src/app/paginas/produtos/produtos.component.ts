import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service'
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  @ViewChild('toastCarrinho', { static: false }) toastCarrinho!: ElementRef;

  imagens: string[] = [
    'assets/perfume_lgbt.png',
    'assets/camisa.png',
    'assets/avatar.jpg',
    'assets/gato.png',
    'assets/clash.jpg',
    'assets/jujuba.png',
  ];
  imagemSelecionada: number = 0;

  cores: { nome: string, valor: string }[] = [
    { nome: 'Preto', valor: 'black' },
    { nome: 'Branco', valor: 'white' },
    { nome: 'Azul', valor: 'blue' },
    { nome: 'Vermelho', valor: 'red' }
  ];
  corSelecionada: { nome: string, valor: string } = this.cores[0];

  quantidade: number = 1;

  aumentarQuantidade() {
    this.quantidade++;
  }

  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  constructor(private carrinhoService: CarrinhoService){}

  comprar() {
    if (this.toastCarrinho) {
      // Adicionar classe show para exibir o toast
      this.toastCarrinho.nativeElement.classList.add('show');
      
      // Remover a classe após 2 segundos
      setTimeout(() => {
        if (this.toastCarrinho) {
          this.toastCarrinho.nativeElement.classList.remove('show');
        }
      }, 2000);
    }
    // Aqui você pode adicionar lógica para adicionar ao carrinho
  }

  fecharToast() {
    if (this.toastCarrinho) {
      this.toastCarrinho.nativeElement.classList.remove('show');
    }

    this.carrinhoService.addToCart({
      id: 123456,
      nome: 'Produto Lindo',
      preco: 149,
      imagem: this.imagens[this.imagemSelecionada],
      quantidade: this.quantidade
    });
  }

}
