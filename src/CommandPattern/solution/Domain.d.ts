export interface Item {
  id: string
}

export interface Cart<T extends Item> {
  getItems(): T[]

  addItem(item: T): void

  removeItem(item: T): void

  clearCart(): void
}

