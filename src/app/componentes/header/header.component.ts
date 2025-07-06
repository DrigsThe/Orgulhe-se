import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  totalCarrinho = 0;
  showCart = false;
  public itensCarrinho: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.items$.subscribe((items: any[]) => {
      this.totalCarrinho = items.reduce((sum, item) => sum + item.quantidade, 0);
      this.itensCarrinho = items;
    });
  }

  searchTerm: string = '';
  filteredClothes: string[] = [];
  showSuggestions: boolean = false;

  clothingTypes = [
    'Camiseta', 'Calça', 'Vestido', 'Saia', 'Shorts', 'Blusa', 'Jaqueta', 
    'Casaco', 'Moletom', 'Regata', 'Polo', 'Camisa', 'Blazer', 'Colete',
    'Legging', 'Jeans', 'Bermuda', 'Maiô', 'Biquíni', 'Pijama', 'Lingerie',
    'Sutiã', 'Calcinha', 'Meia', 'Tênis', 'Sandália', 'Sapato', 'Bota',
    'Chinelo', 'Sapatilha', 'Scarpin', 'Boné', 'Chapéu', 'Óculos', 'Bolsa',
    'Mochila', 'Carteira', 'Cinto', 'Relógio', 'Colar', 'Pulseira', 'Brinco'
  ];

  onSearchChange() {
    if (this.searchTerm.length > 0) {
      this.filteredClothes = this.clothingTypes.filter(item =>
        item.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showSuggestions = this.filteredClothes.length > 0;
    } else {
      this.filteredClothes = [];
      this.showSuggestions = false;
    }
  }

  selectClothing(clothing: string) {
    this.searchTerm = clothing;
    this.showSuggestions = false;
    this.onSearch();
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Pesquisando por:', this.searchTerm);
    }
    this.showSuggestions = false;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
    }
  }

  onInputFocus() {
    if (this.searchTerm.length > 0) {
      this.onSearchChange();
    }
  }

  onInputBlur() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Adicione estas propriedades e métodos ao seu componente
carItens = [
  {
    nome: 'Vestido midi',
    cor: 'Preto',
    tamanho: 'M',
    quantidade: 1,
    preco: 999.90,
    precoOriginal: 999.99
  },
  {
    nome: 'Saia casual curta',
    cor: 'Preto',
    tamanho: 'P',
    quantidade: 1,
    preco: 194.65,
    precoOriginal: 229.00
  }
];

calcularSubtotal(): number {
  return this.itensCarrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

closeCart() {
    this.showCart = false;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll() {
    if (this.showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

}