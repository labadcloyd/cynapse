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
   *
   * This loops through each friend, generates the random number
   * within the 3 decimal point, deducts the amount (specified to be distributed),
   * which is then given to the friend. To prevent having remaining funds, the last
   * friend in the loop will receive the remaining balance.
   *
   * Although this algorithm is fairly simple, there is a very likely the first few people
   * will receive the highest amounts since as the loop goes through, the remaining balance
   * becomes smaller and smaller.
   */
  async distributeAmount() {
    console.log("Let's distribute your money!");
    console.log(`Your total balance is: $${this.owner.wallet_balance}`);
    const raw_amount = await this.ask("How much do you want to distribute? ");
    // --- Data Validation
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

    // --- Deducting the amount to the owner
    this.owner.wallet_balance = this.owner.wallet_balance - balance;
    if (this.friends.length > 0) {
      // --- Looping through each friend
      this.friends.map((friend, i) => {
        const lastChild = i === this.friends.length - 1;
        // --- Last child receives the remaining balance
        if (lastChild) {
          friend.wallet_balance = balance;
          console.log(`Gave ${friend.name} $${balance}`);
          balance = 0;
          return friend;
        }
        // --- The random number generated is within 3 decimals (i.e. 2.412)
        const calculatedAmount = this.calcAmount(balance);
        console.log(`Gave ${friend.name} $${calculatedAmount}`);
        friend.wallet_balance = calculatedAmount;
        // --- The remaining balance gets reduced as the loop goes through
        // --- As this gets reduced, so does the possible amount to be given
        // to the next friend
        balance = balance - calculatedAmount;
        return friend;
      });
    }
    console.log();
    console.log(`Total amount given: $${raw_amount}`);
    console.log();
    console.log(
      `Hello ${this.owner.name}, Your remaining balance is: $${this.owner.wallet_balance}`
    );
  }
}
