import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string[];
}

interface CategoriaItem {
  id: string;
  nome: string;
}

interface Categoria {
  nome: string;
  itens: CategoriaItem[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Carrossel principal
  currentSlide = 0;
  slides = [1, 2, 3]; // Array para indicadores
  carouselInterval: any;

  // Imagens do carrossel de destaques
  imagens: string[] = [
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
    'assets/jujuba.png',
  ];

  // Dados dos produtos
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Vestido Midi Elegante',
      preco: 148.75,
      imagem: 'assets/jujuba.png',
      categoria: ['Vestidos', 'Feminino', 'Elegante']
    },
    {
      id: 2,
      nome: 'Saia Casual Social',
      preco: 194.65,
      imagem: 'assets/jujuba.png',
      categoria: ['Saias', 'Feminino', 'Casual']
    },
    {
      id: 3,
      nome: 'Blusa Estampada',
      preco: 89.90,
      imagem: 'assets/jujuba.png',
      categoria: ['Blusas', 'Feminino', 'Estampada']
    },
    {
      id: 4,
      nome: 'Calça Skinny',
      preco: 125.00,
      imagem: 'assets/jujuba.png',
      categoria: ['Calças', 'Feminino', 'Skinny']
    },
    {
      id: 5,
      nome: 'Jaqueta Jeans',
      preco: 180.00,
      imagem: 'assets/jujuba.png',
      categoria: ['Jaquetas', 'Feminino', 'Jeans']
    },
    {
      id: 6,
      nome: 'Shorts Comfort',
      preco: 65.50,
      imagem: 'assets/jujuba.png',
      categoria: ['Shorts', 'Feminino', 'Comfort']
    },
    {
      id: 7,
      nome: 'Macaquinho Floral',
      preco: 135.75,
      imagem: 'assets/jujuba.png',
      categoria: ['Macacões', 'Feminino', 'Floral']
    },
    {
      id: 8,
      nome: 'Cardigan Tricot',
      preco: 98.90,
      imagem: 'assets/jujuba.png',
      categoria: ['Cardigans', 'Feminino', 'Tricot']
    }
  ];

  // Categorias para filtros
  categorias: Categoria[] = [
    {
      nome: 'Tipo',
      itens: [
        { id: 'vestidos', nome: 'Vestidos' },
        { id: 'saias', nome: 'Saias' },
        { id: 'blusas', nome: 'Blusas' },
        { id: 'calcas', nome: 'Calças' },
        { id: 'jaquetas', nome: 'Jaquetas' },
        { id: 'shorts', nome: 'Shorts' },
        { id: 'macacoes', nome: 'Macacões' },
        { id: 'cardigans', nome: 'Cardigans' }
      ]
    },
    {
      nome: 'Estilo',
      itens: [
        { id: 'elegante', nome: 'Elegante' },
        { id: 'casual', nome: 'Casual' },
        { id: 'estampada', nome: 'Estampada' },
        { id: 'skinny', nome: 'Skinny' },
        { id: 'jeans', nome: 'Jeans' },
        { id: 'comfort', nome: 'Comfort' },
        { id: 'floral', nome: 'Floral' },
        { id: 'tricot', nome: 'Tricot' }
      ]
    },
    {
      nome: 'Preço',
      itens: [
        { id: 'ate-100', nome: 'Até R$ 100' },
        { id: '100-150', nome: 'R$ 100 - R$ 150' },
        { id: '150-200', nome: 'R$ 150 - R$ 200' },
        { id: 'acima-200', nome: 'Acima de R$ 200' }
      ]
    }
  ];

  // Filtros selecionados
  filtrosSelecionados: string[] = [];
  produtosFiltrados: Produto[] = [];

  // Toast notification
  showToast = false;
  toastTimeout: any;

  ngOnInit(): void {
    this.produtosFiltrados = [...this.produtos];
    this.startCarouselAutoplay();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  // Métodos do carrossel principal
  startCarouselAutoplay(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Método para filtrar produtos
  onCategoriaChange(event: any): void {
    const valor = event.target.value.toLowerCase();
    const checked = event.target.checked;

    if (checked) {
      this.filtrosSelecionados.push(valor);
    } else {
      this.filtrosSelecionados = this.filtrosSelecionados.filter(f => f !== valor);
    }

    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    if (this.filtrosSelecionados.length === 0) {
      this.produtosFiltrados = [...this.produtos];
      return;
    }

    this.produtosFiltrados = this.produtos.filter(produto => {
      return this.filtrosSelecionados.some(filtro => {
        // Verifica se o filtro está nas categorias do produto
        if (produto.categoria.some(cat => cat.toLowerCase().includes(filtro))) {
          return true;
        }

        // Verifica filtros de preço
        if (filtro === 'ate-100' && produto.preco <= 100) {
          return true;
        }
        if (filtro === '100-150' && produto.preco > 100 && produto.preco <= 150) {
          return true;
        }
        if (filtro === '150-200' && produto.preco > 150 && produto.preco <= 200) {
          return true;
        }
        if (filtro === 'acima-200' && produto.preco > 200) {
          return true;
        }

        return false;
      });
    });
  }

  constructor(private carrinhoService: CarrinhoService) {}

  // Método para comprar produto
  comprar(produto: Produto): void {
    this.carrinhoService.addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
    console.log('Produto adicionado ao carrinho:', produto);
    this.showToastNotification();
  }

  // Métodos do toast
  showToastNotification(): void {
    this.showToast = true;
    
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
    this.toastTimeout = setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast(): void {
    this.showToast = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }
}