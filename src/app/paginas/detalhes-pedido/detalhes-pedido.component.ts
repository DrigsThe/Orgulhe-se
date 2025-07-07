import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/pedido';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {
  order: Order = {
    id: '#12345',
    date: '14/01/2024',
    status: 'ENTREGUE',
    total: 189.90,
    subtotal: 169.90,
    shipping: 20.00,
    discount: 0.00,
    credits: 0.00,
    donations: 0.00,
    products: [
      {
        id: '1',
        name: 'Console PlayStation 5 Slim Sony',
        image: 'assets/ps5-console.jpg',
        quantity: 1,
        price: 169.90
      }
    ],
    tracking: [
      {
        title: 'Pedido recebido',
        description: '',
        date: '11/12/2024',
        time: '20:17',
        completed: true,
        active: false
      },
      {
        title: 'Enviado para a transportadora',
        description: '',
        date: '12/12/2024',
        time: '10:30',
        completed: true,
        active: false
      },
      {
        title: 'Recebido pela transportadora',
        description: '',
        date: '12/12/2024',
        time: '15:50',
        completed: true,
        active: false
      },
      {
        title: 'Mercadoria em trânsito',
        description: '',
        date: '13/12/2024',
        time: '08:00',
        completed: true,
        active: false
      },
      {
        title: 'Pedido entregue',
        description: '',
        date: '14/12/2024',
        time: '16:30',
        completed: true,
        active: true
      }
    ],
    deliveryAddress: 'Salvador, BA',
    paymentMethod: 'CARTÃO DE CRÉDITO'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Aqui você pode carregar os dados do pedido baseado no ID da rota
    const orderId = this.route.snapshot.params['id'];
    // Implementar lógica para buscar dados do pedido
  }

  goBack(): void {
    window.history.back();
  }

  rateProducts(): void {
    // Implementar lógica para avaliar produtos
    console.log('Avaliar produtos');
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'entregue':
        return 'status-delivered';
      case 'enviado':
        return 'status-shipped';
      case 'processando':
        return 'status-processing';
      default:
        return 'status-pending';
    }
  }
}