import {Command} from './Command';
import {Cart, Item} from '../Domain';

export class AddItemCommand<T extends Item> implements Command {
  private readonly cart: Cart<T>;
  private readonly item: T;

  constructor(cart: Cart<T>, item: T) {
    this.cart = cart
    this.item = item;
  }

  execute(): void {
    this.cart.addItem(this.item)
  }

  revert(): void {
    this.cart.removeItem(this.item)
  }
}