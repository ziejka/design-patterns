import {Command} from '../commands/Command';

export interface Receiver {
  executeCommand(command: Command): void

  revertCommand(): void
}