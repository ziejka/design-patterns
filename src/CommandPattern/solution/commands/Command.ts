export interface Command {
  execute(): void

  revert(): void
}