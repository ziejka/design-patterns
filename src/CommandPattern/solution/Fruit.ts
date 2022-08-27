import {Item} from './Domain';

export class Fruit implements Item {
  id: string = 'id' + Date.now() + Math.floor(Math.random() * 1000000)
  name: string;

  constructor(name: string) {
    this.name = name
  }
}