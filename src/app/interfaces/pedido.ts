export interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  active: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  credits: number;
  donations: number;
  products: Product[];
  tracking: TrackingStep[];
  deliveryAddress: string;
  paymentMethod: string;
}