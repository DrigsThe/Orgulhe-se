import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

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
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
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
    'assets/perfume_lgbt.png',
    'assets/botton_lgbt.jpg',
    'assets/anel_lgbt.png',
    'assets/cerveja_lgbt.png',
    'assets/sacola_lgbt.png',
    'assets/livro_lgbt.png',
    'assets/adesivos_lgbt.png',
    'assets/decoracao_lgbt.png',
    'assets/doritos_rainbow.png',
  ];

  // Dados dos produtos
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Livro "Esse Livro é Gay"',
      preco: 59.90,
      imagem: 'assets/livro_lgbt.png',
      categoria: ['Livros', 'Gay', 'LGBTQIA+']
    },
    {
      id: 2,
      nome: 'Kit 9 Adesivos Pride',
      preco: 10.00,
      imagem: 'assets/adesivos_lgbt.png',
      categoria: ['Decorações', 'LGBTQIA+', 'Adesivos']
    },
    {
      id: 3,
      nome: 'Anel do Orgulho',
      preco: 29.90,
      imagem: 'assets/anel_lgbt.png',
      categoria: ['Acessórios', 'LGBTQIA+']
    },
    {
      id: 4,
      nome: 'Bandeira LGBT',
      preco: 125.00,
      imagem: 'assets/bandeira_lgbt.png',
      categoria: ['Acessórios', 'Decorações', 'LGBTQIA+']
    },
    {
      id: 5,
      nome: 'Lata Skol Edição Limitada',
      preco: 100.00,
      imagem: 'assets/cerveja_lgbt.png',
      categoria: ['Decoraçôes', 'LGBTQIA+']
    },
    {
      id: 6,
      nome: 'Batman LEGO Lgbt',
      preco: 65.50,
      imagem: 'assets/batman_lgbt.png',
      categoria: ['Decorações']
    },
  ];

  // Categorias para filtros
  categorias: Categoria[] = [
    {
      nome: 'Tipo',
      itens: [
        { id: 'acesorios', nome: 'Acessórios' },
        { id: 'decoracoes', nome: 'Decorações' },
        { id: 'roupas', nome: 'Roupas' },
        { id: 'calcado', nome: 'Calçado' },
        { id: 'livros', nome: 'Livros' },
        { id: 'adesivos', nome: 'Adesivos' },
      ]
    },
    {
      nome: 'Bandeira',
      itens: [
        { id: 'lgbtqia', nome: 'LGBTQIA+' },
        { id: 'lesbica', nome: 'Lésbica' },
        { id: 'transgenero', nome: 'Transgênero' },
        { id: 'gay', nome: 'Gay' },
        { id: 'panssexual', nome: 'Panssexual' },
        { id: 'bissexual', nome: 'Bissexual' },
        { id: 'naobinario', nome: 'Não-Bínario' },
        { id: 'assexual', nome: 'Assexual' }
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