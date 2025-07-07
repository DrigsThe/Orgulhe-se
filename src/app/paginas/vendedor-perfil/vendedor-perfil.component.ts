import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

interface Pedido {
  id: string;
  cliente: string;
  data: string;
  status: 'entregue' | 'processando' | 'enviado' | 'cancelado';
  total: string;
}

@Component({
  selector: 'app-vendedor-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './vendedor-perfil.component.html',
  styleUrls: ['./vendedor-perfil.component.css']
})
export class VendedorPerfilComponent {

  aba: string = 'dashboard';

  buscaPedido: string = '';

  pedidos: Pedido[] = [
    { id: '#123456', cliente: 'João Silva', data: '03/07/2025', status: 'entregue', total: 'R$ 150,00' },
    { id: '#123457', cliente: 'Maria Souza', data: '02/07/2025', status: 'processando', total: 'R$ 89,90' },
    { id: '#123458', cliente: 'Carlos Lima', data: '01/07/2025', status: 'enviado', total: 'R$ 210,00' },
    { id: '#123459', cliente: 'Fernanda Dias', data: '30/06/2025', status: 'cancelado', total: 'R$ 0,00' }
  ];

  get pedidosFiltrados() {
    const termo = this.buscaPedido.trim().toLowerCase();
    if (!termo) return this.pedidos;
    return this.pedidos.filter(p =>
      p.cliente.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo)
    );
  }


  meusProdutos = [
  {
    nome: 'Camiseta Orgulho',
    imagem: 'assets/camisa.png',
    estoque: 12,
    status: 'ativo'
  },
  {
    nome: 'Pulseira Colorida',
    imagem: 'assets/amy.png',
    estoque: 0,
    status: 'desativado'
  },
  {
    nome: 'Poster LGBT+',
    imagem: 'assets/avatar.jpg',
    estoque: 5,
    status: 'ativo'
  }
  // Adicione mais produtos conforme necessário
];

excluirProduto(produto: any) {
  this.meusProdutos = this.meusProdutos.filter(p => p !== produto);
  this.atualizarStatusProdutos();
}


atualizarStatusProdutos() {
  this.meusProdutos.forEach(produto => {
    if (produto.estoque === 0) {
      produto.status = 'desativado';
    } else if (produto.status === 'desativado' && produto.estoque > 0) {
      produto.status = 'ativo';
    }
  });
}


constructor() {
  this.atualizarStatusProdutos();
}



dashboard = {
  vendasHoje: 1200,
  vendasOntem: 1000,
  pedidosHoje: 15,
  pedidosOntem: 10,
  conversaoHoje: 0.25, // 25%
  conversaoOntem: 0.20 // 20%
};

get variacaoVendas() {
  const { vendasHoje, vendasOntem } = this.dashboard;
  if (vendasOntem === 0) return 100;
  return ((vendasHoje - vendasOntem) / vendasOntem) * 100;
}

get variacaoPedidos() {
  const { pedidosHoje, pedidosOntem } = this.dashboard;
  if (pedidosOntem === 0) return 100;
  return ((pedidosHoje - pedidosOntem) / pedidosOntem) * 100;
}

get variacaoConversao() {
  const { conversaoHoje, conversaoOntem } = this.dashboard;
  if (conversaoOntem === 0) return 100;
  return ((conversaoHoje - conversaoOntem) / conversaoOntem) * 100;

}

avaliacoes = [
  {
    nome: 'João Silva',
    foto: 'assets/hornet.png',
    estrelas: 4,
    comentario: 'Ótimo vendedor, entrega rápida e produto conforme anunciado!',
    data: '2 dias atrás'
  },
  {
    nome: 'Maria Souza',
    foto: 'assets/jujuba.png',
    estrelas: 5,
    comentario: 'Excelente atendimento, recomendo!',
    data: '1 semana atrás'
  }
];

vendedorNome: string = 'Nome do vendedor';
vendedorImagem: string = 'assets/Gary.jpg';

onNomeChange(event: any) {
  this.vendedorNome = event.target.value;
}

onImagemChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.vendedorImagem = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

}