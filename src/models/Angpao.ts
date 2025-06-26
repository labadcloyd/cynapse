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

  /**
   * The core algorithm behind the distribution of money
   */
  async distributeAmount() {
    console.log("Let's distribute your money!");
    const raw_amount = await this.ask("How much do you want to distribute? ");
    if (Number.isNaN(Number(raw_amount))) {
      throw new Error("Amount must be a number");
    }
    let balance = Number(raw_amount);

    if (balance > this.owner.wallet_balance) {
      throw new Error("Amount must not be greater than your wallet balance");
    }
    if (balance <= 0) {
      throw new Error("Amount must not be less than 0");
    }

    this.owner.wallet_balance = this.owner.wallet_balance - balance;
    if (this.friends.length > 0) {
      this.friends.map((friend, i) => {
        const lastChild = i === this.friends.length - 1;
        if (lastChild) {
          friend.wallet_balance = balance;
          console.log(`Gave ${friend.name} $${balance}`);
          balance = 0;
          return friend;
        }
        const calculatedAmount = this.calcAmount(balance);
        console.log(`Gave ${friend.name} $${calculatedAmount}`);
        friend.wallet_balance = calculatedAmount;
        balance = balance - calculatedAmount;
        return friend;
      });
    }
  }
}
