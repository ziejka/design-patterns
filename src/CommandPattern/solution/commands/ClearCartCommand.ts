import {Command} from './Command';
import {Cart, Item} from '../Domain';

export class ClearCartCommand<T extends Item> implements Command {
  private readonly cart: Cart<T>;
  private readonly items: T[];

  constructor(cart: Cart<T>) {
    this.cart = cart
    this.items = cart.getItems();
  }

  execute(): void {
    this.cart.clearCart()
  }

  revert(): void {
    this.items.forEach(item => this.cart.addItem(item))
  }
}