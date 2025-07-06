export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: string[];
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: string;
  pronouns: string;
  avatar?: string;
}

export interface Review {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: string;
}

export interface OrderFilter {
  label: string;
  value: string;
}

export interface StatusMap {
  [key: string]: string;
}
