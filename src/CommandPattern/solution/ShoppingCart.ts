import {Cart, Item} from './Domain';

export class ShoppingCart<T extends Item> implements Cart<T> {
  private items: T[] = []

  addItem(item: T): void {
    if (this.isItemInCart(item)) return
    this.items.push(item)
  }

  clearCart(): void {
    this.items = []
  }

  getItems(): T[] {
    return this.items
  }

  removeItem(item: T): void {
    this.items = this.items.filter(i => item.id !== i.id)
  }

  private isItemInCart(item: T) {
    return !!this.items.find(i => i.id === item.id)
  }

}