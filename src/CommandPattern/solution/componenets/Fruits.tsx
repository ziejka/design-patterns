import {Fruit} from '../Fruit';
import React from 'react';
import {ItemAction} from '../hooks/useShoppingCart';
import {Button} from './Button';

type PropsType = {
  fruits: Fruit[]
  itemAction: ItemAction<Fruit>
  color: 'green' | 'red'
  prefix: '+' | '-'

}
export const Fruits: React.FC<PropsType> = ({fruits, itemAction, prefix, color}) => {
  return (
    <div className="space-y-2" >
      {fruits.map(fruit => <Button color={color} onClick={() => itemAction(fruit)} text={`${prefix} ${fruit.name}`} />)}
    </div >
  )
}