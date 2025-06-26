import { Person } from "./Person";

export class Angpao {
  ask: (question: string) => Promise<string>;
  calcAmount: (balance: number) => number;
  owner!: Person;
  constructor(
    ask: (question: string) => Promise<string>,
    calcAmount: (balance: number) => number
  ) {
    this.ask = ask;
    this.calcAmount = calcAmount;
  }

  async init() {
    const name = await this.ask("What is your name? ");
    const wallet_balance = await this.ask(
      "What is your desired wallet balance? "
    );
    this.owner = new Person(name, Number(wallet_balance));
  }
}
