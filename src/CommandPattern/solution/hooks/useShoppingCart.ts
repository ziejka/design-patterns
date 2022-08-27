import {useRef, useState} from 'react';
import {AddItemCommand} from '../commands/AddItemCommand';
import {RemoveItemCommand} from '../commands/RemoveItemCommand';
import {ClearCartCommand} from '../commands/ClearCartCommand';
import {ShoppingCart} from '../ShoppingCart';
import {CartActions} from '../receiver/CartActions';
import {Item} from '../Domain';

export type ItemAction<T extends Item> = (item: T) => void
export type CartAction = () => void

export type ShoppingCartActions<T extends Item> = {
  addItem: ItemAction<T>
  removeItem: ItemAction<T>
  clearCart: CartAction
  revert: CartAction
}

type UseFruitsStore<T extends Item> = {
  items: T[]
  actions: ShoppingCartActions<T>
}

export function useShoppingCart<T extends Item>(): UseFruitsStore<T> {
  const shoppingCart = useRef(new ShoppingCart<T>())
  const cartActions = useRef(new CartActions())
  const [items, setItems] = useState(shoppingCart.current.getItems())

  const addItem = (item: T) => {
    cartActions.current.executeCommand(new AddItemCommand(shoppingCart.current, item))
    setItems([...shoppingCart.current.getItems()])
  }

  const removeItem = (item: T) => {
    cartActions.current.executeCommand(new RemoveItemCommand(shoppingCart.current, item))
    setItems([...shoppingCart.current.getItems()])
  }

  const clearCart = () => {
    cartActions.current.executeCommand(new ClearCartCommand(shoppingCart.current))
    setItems([...shoppingCart.current.getItems()])
  }

  const revert = () => {
    cartActions.current.revertCommand()
    setItems([...shoppingCart.current.getItems()])
  }

  return {
    items,
    actions: {
      addItem,
      removeItem,
      clearCart,
      revert,
    }
  }
}