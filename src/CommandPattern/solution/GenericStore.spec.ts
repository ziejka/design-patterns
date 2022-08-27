import {ShoppingCart} from './ShoppingCart';
import {CartActions} from './receiver/CartActions';
import {AddItemCommand} from './commands/AddItemCommand';
import {RemoveItemCommand} from './commands/RemoveItemCommand';
import {ClearCartCommand} from './commands/ClearCartCommand';
import {Item} from './Domain';

class TestItem implements Item {
  id: string;

  constructor(id: string) {
    this.id = id
  }
}

describe('FruitStore', () => {
  const itemsNames = ['1', '2', '3', '4', '5', '6']
  const items = itemsNames.map(name => new TestItem(name))


  it('should add single items to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))

    const expected = [items[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should add multiple items to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    const expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should add the same item only once', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))

    const expected = [items[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should revert add single items to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))

    let expected = [items[0]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should remove single items from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[2]))

    expected = [items[0], items[1]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should revert remove single items from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[2]))

    expected = [items[0], items[1]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should remove multiple items from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[2]))
    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[1]))

    expected = [items[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should do nothing if try to remove fruit from cart that is not there', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[2]))
    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, items[2]))

    expected = [items[0], items[1]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should clear the cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new ClearCartCommand(shoppingCart))

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should reverse clear the cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, items[2]))

    let expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new ClearCartCommand(shoppingCart))

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = [items[0], items[1], items[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })
})