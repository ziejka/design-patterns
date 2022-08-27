import {Command} from './commands/Command';

export class CartActions {
  private commands: Command[] = []

  executeCommand(command: Command) {
    this.commands.push(command)
    command.execute()
  }

  revertCommand() {
    this.commands.pop()?.revert()
  }
}