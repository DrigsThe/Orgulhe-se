import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, UserData, Review, Tab, OrderFilter, StatusMap } from '../../interfaces/perfil';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent {
  activeTab = signal('orders');
  activeOrderFilter = signal('all');
  isEditing = signal(false);

  userData = signal<UserData>({
    name: 'João da Silva',
    email: 'joao@email.com',
    phone: '(11) 91234-5678',
    cpf: '123.456.789-00',
    birthDate: '1990-01-01',
    gender: 'homem-cis',
    pronouns: 'ele/dele'
  });

  orders = signal<Order[]>([
    {
      id: '12345',
      date: '2024-01-15',
      status: 'delivered',
      total: 189.90,
      items: ['Camiseta Pride', 'Bandeira Trans']
    },
    {
      id: '12346',
      date: '2024-01-10',
      status: 'shipped',
      total: 79.90,
      items: ['Pin LGBT+']
    },
    {
      id: '12347',
      date: '2024-01-05',
      status: 'processing',
      total: 299.90,
      items: ['Conjunto Pride', 'Adesivos']
    }
  ]);

  reviews = signal<Review[]>([
    {
      id: '1',
      productName: 'Camiseta Pride Rainbow',
      rating: 5,
      comment: 'Produto incrível! Qualidade excelente e chegou rapidinho. Super recomendo!',
      date: '2024-01-20'
    },
    {
      id: '2',
      productName: 'Bandeira Trans',
      rating: 4,
      comment: 'Muito bonita, material resistente. Só achei que poderia ser um pouco maior.',
      date: '2024-01-18'
    }
  ]);

  tabs: Tab[] = [
    { id: 'orders', label: 'Meus Pedidos', icon: '📦' },
    { id: 'data', label: 'Meus Dados', icon: '👤' },
    { id: 'reviews', label: 'Avaliações', icon: '⭐' }
  ];

  orderFilters: OrderFilter[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Pendentes', value: 'pending' },
    { label: 'Processando', value: 'processing' },
    { label: 'Enviados', value: 'shipped' },
    { label: 'Entregues', value: 'delivered' }
  ];

  private statusMap: StatusMap = {
    'pending': 'Pendente',
    'processing': 'Processando',
    'shipped': 'Enviado',
    'delivered': 'Entregue'
  };

  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  setOrderFilter(filter: string): void {
    this.activeOrderFilter.set(filter);
  }

  filteredOrders(): Order[] {
    const filter = this.activeOrderFilter();
    if (filter === 'all') {
      return this.orders();
    }
    return this.orders().filter(order => order.status === filter);
  }

  toggleEdit(): void {
    this.isEditing.set(!this.isEditing());
  }

  saveUserData(): void {
    this.isEditing.set(false);
    // Aqui você implementaria a lógica para salvar os dados
    console.log('Dados salvos:', this.userData());
  }

  getStatusText(status: string): string {
    return this.statusMap[status] || status;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  averageRating(): number {
    const reviews = this.reviews();
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        // Atualiza a imagem do perfil com a nova imagem
        this.userData.update(data => ({
          ...data,
          avatar: e.target.result
        }));
      };
      
      reader.readAsDataURL(file);
    }
  }

  // Método para disparar o clique no input file
  triggerFileInput(): void {
    const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
    fileInput.click();
  }

  becomeSeller(): void {
  // Lógica para transformar o usuário em vendedor
  console.log('Usuário quer se tornar vendedor');
  // Exemplo: this.router.navigate(['/seller-registration']);
}
}