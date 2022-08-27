import {Command} from '../commands/Command';
import {Receiver} from './Receiver';

export class CartActions implements Receiver {
  private commands: Command[] = []

  executeCommand(command: Command) {
    this.commands.push(command)
    command.execute()
  }

  revertCommand() {
    this.commands.pop()?.revert()
  }
}