import {Fruit} from '../Fruit';
import React from 'react';
import {CartAction, ItemAction} from '../hooks/useShoppingCart';
import {Button} from './Button';
import {Fruits} from './Fruits';

type PropsType = {
  fruits: Fruit[]
  removeItem: ItemAction<Fruit>
  revert: CartAction
  clearCart: CartAction
}

export const Cart: React.FC<PropsType> = ({fruits, revert, clearCart, removeItem}) => {
  return (
    <div className="ml-3 space-y-4 w-1/3 pt-8" >
      <p className="rounded-md border bg-white py-1 text-xl font-bold mb-3" >Cart 🛒 ${fruits.length}</p >
      <div className="flex w-full justify-around" >
        <Button onClick={revert} color="orange" text="Revert" />
        <Button onClick={clearCart} color="red" text="Clear" />
      </div >
      <Fruits fruits={fruits} itemAction={removeItem} color="red" prefix="-" />
    </div >
  )
}