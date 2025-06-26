import { askQuestion } from "../utils/askQuestion";
import { Person } from "./Person";

export class Angpao {
  ask: (question: string) => Promise<string>;
  owner!: Person;
  constructor(ask: (question: string) => Promise<string>) {
    this.ask = ask;
  }

  async init() {
    const name = await this.ask("What is your name? ");
    const wallet_balance = await this.ask(
      "What is your desired wallet balance? "
    );
    this.owner = new Person(name, Number(wallet_balance));
  }
}
