import React from 'react';
import {useShoppingCart} from '../hooks/useShoppingCart';
import {Fruits} from './Fruits';
import {Cart} from './Cart';
import {Fruit} from '../Fruit';

const availableItems = ['apple 🍏', 'banana 🍌', 'cherry 🍒', 'pear 🍐', 'lemon 🍋', 'watermelon 🍉' , 'kiwi 🥝'].map(name => new Fruit(name))

export const FruitsStore: React.FC = () => {
  const {actions, items} = useShoppingCart<Fruit>()

  return (
    <div className="h-screen bg-gray-100">
      <h1 className="bg-white font-bold text-center text-3xl border-b py-2" >Fruit Store</h1 >
      <div className="flex w-1/2 mx-auto justify-center h-full" >
        <div className="border-r pr-3 pt-8 h-full">
          <p className="rounded-md border bg-white py-1 text-xl font-bold mb-3">Fruits</p>
          <Fruits fruits={availableItems} itemAction={actions.addItem} color="green" prefix="+"/>
        </div >
        <Cart fruits={items} removeItem={actions.removeItem} clearCart={actions.clearCart} revert={actions.revert} />
      </div >
    </div>
  )
}