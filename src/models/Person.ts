export class Person {
  name: string;
  wallet_balance: number;

  constructor(name: string, wallet_balance?: number) {
    if (name.length < 2) {
      throw new Error("Name should be longer than 2 characters");
    }
    if (name.length > 20) {
      throw new Error("Name should not be longer than 20 characters");
    }
    this.name = name;
    this.wallet_balance = wallet_balance || 0;
  }
}
