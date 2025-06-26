import { Person } from "./Person";

export class Angpao {
  ask: (question: string) => Promise<string>;
  calcAmount: (balance: number) => number;
  owner!: Person;
  friends: Person[];

  constructor(
    ask: (question: string) => Promise<string>,
    calcAmount: (balance: number) => number
  ) {
    this.ask = ask;
    this.calcAmount = calcAmount;
    this.friends = [];
  }

  async init() {
    const name = await this.ask("What is your name? ");
    const wallet_balance = await this.ask(
      "What is your desired wallet balance? "
    );
    this.owner = new Person(name, Number(wallet_balance));
  }

  async initializeFriends() {
    console.log("Let's add your friends!");
    const name = await this.ask("What is your friend's name? ");

    this.friends.push(new Person(name));

    let repeat = await this.ask("Do you want to add more friends? (Y/N)");

    while (repeat.toLowerCase() === "y") {
      const name = await this.ask("What is your friend's name? ");

      this.friends.push(new Person(name));

      repeat = await this.ask("Do you want to add more friends? (Y/N)");
    }
  }
}
