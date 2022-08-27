import {ShoppingCart} from './ShoppingCart';
import {CartActions} from './CartActions';
import {AddItemCommand} from './commands/AddItemCommand';
import {Fruit} from './Fruit';
import {RemoveItemCommand} from './commands/RemoveItemCommand';
import {ClearCartCommand} from './commands/ClearCartCommand';

describe('FruitStore', () => {
  const fruitsNames = ['apple', 'banana', 'cherry', 'tangelo', 'carambola', 'pomelo']
  const fruits = fruitsNames.map(name => new Fruit(name))


  it('should add single fruits to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))

    const expected = [fruits[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should add multiple fruits to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    const expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should add the same item only once', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))

    const expected = [fruits[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should revert add single fruits to cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))

    let expected = [fruits[0]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should remove single fruits from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[2]))

    expected = [fruits[0], fruits[1]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should revert remove single fruits from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[2]))

    expected = [fruits[0], fruits[1]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should remove multiple fruits from cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[2]))
    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[1]))

    expected = [fruits[0]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should do nothing if try to remove fruit from cart that is not there', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[2]))
    cartActions.executeCommand(new RemoveItemCommand(shoppingCart, fruits[2]))

    expected = [fruits[0], fruits[1]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should clear the cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new ClearCartCommand(shoppingCart))

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)
  })

  it('should reverse clear the cart', () => {
    const shoppingCart = new ShoppingCart()
    const cartActions = new CartActions()

    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[0]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[1]))
    cartActions.executeCommand(new AddItemCommand(shoppingCart, fruits[2]))

    let expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.executeCommand(new ClearCartCommand(shoppingCart))

    expected = []
    expect(shoppingCart.getItems()).toEqual(expected)

    cartActions.revertCommand()

    expected = [fruits[0], fruits[1], fruits[2]]
    expect(shoppingCart.getItems()).toEqual(expected)
  })
})