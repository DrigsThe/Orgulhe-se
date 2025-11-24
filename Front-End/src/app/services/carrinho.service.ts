import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarItem } from '../interfaces/car-item';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itemsSubject = new BehaviorSubject<CarItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items(): CarItem[] {
    return this.itemsSubject.value;
  }

  addToCart(item: CarItem) {
    const items = [...this.items];
    const index = items.findIndex(i => i.id === item.id);
    if (index > -1) {
      items[index].quantidade += item.quantidade;
    } else {
      items.push(item);
    }
    this.itemsSubject.next(items);
  }

  getTotalCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantidade, 0);
  }

  constructor() { }
}
