import { Angpao } from "../Angpao";
import { CalcDistribution } from "../../utils/calcDistribution";

test("Angpao should ask for the owner's name and balance", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20");

  const AngpaoAlgo = new Angpao(mockAsk, CalcDistribution);
  await AngpaoAlgo.init();

  const owner = AngpaoAlgo.owner;
  expect(owner.name).toBe("Cloyd");
  expect(owner.wallet_balance).toBe(20);
});

test("Angpao should ask for the list of friends", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20")
    .mockResolvedValueOnce("Brew")
    .mockResolvedValueOnce("Y")
    .mockResolvedValueOnce("Lance")
    .mockResolvedValueOnce("y")
    .mockResolvedValueOnce("Martus")
    .mockResolvedValueOnce("N");

  const AngpaoAlgo = new Angpao(mockAsk, CalcDistribution);
  await AngpaoAlgo.init();
  await AngpaoAlgo.initializeFriends();

  const owner = AngpaoAlgo.owner;
  expect(owner.name).toBe("Cloyd");
  expect(owner.wallet_balance).toBe(20);
  expect(AngpaoAlgo.friends.length).toBe(3);
  expect(AngpaoAlgo.friends[0].name).toBe("Brew");
  expect(AngpaoAlgo.friends[1].name).toBe("Lance");
  expect(AngpaoAlgo.friends[2].name).toBe("Martus");
});

test("Angpao should throw error when amount to distribute is not a number", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20")
    .mockResolvedValueOnce("Brew")
    .mockResolvedValueOnce("Y")
    .mockResolvedValueOnce("Lance")
    .mockResolvedValueOnce("y")
    .mockResolvedValueOnce("Martus")
    .mockResolvedValueOnce("N")
    .mockResolvedValueOnce("2f0");
  const AngpaoAlgo = new Angpao(mockAsk, CalcDistribution);
  await AngpaoAlgo.init();
  await AngpaoAlgo.initializeFriends();
  expect(async () => {
    await AngpaoAlgo.distributeAmount();
  }).rejects.toThrow("Amount must be a number");
});

test("Angpao should throw error when amount to distribute is greater than current balance", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20")
    .mockResolvedValueOnce("Brew")
    .mockResolvedValueOnce("Y")
    .mockResolvedValueOnce("Lance")
    .mockResolvedValueOnce("y")
    .mockResolvedValueOnce("Martus")
    .mockResolvedValueOnce("N")
    .mockResolvedValueOnce("30");
  const AngpaoAlgo = new Angpao(mockAsk, CalcDistribution);
  await AngpaoAlgo.init();
  await AngpaoAlgo.initializeFriends();
  expect(async () => {
    await AngpaoAlgo.distributeAmount();
  }).rejects.toThrow("Amount must not be greater than your wallet balance");
});

test("Angpao should throw error when amount to distribute is less than 0", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20")
    .mockResolvedValueOnce("Brew")
    .mockResolvedValueOnce("Y")
    .mockResolvedValueOnce("Lance")
    .mockResolvedValueOnce("y")
    .mockResolvedValueOnce("Martus")
    .mockResolvedValueOnce("N")
    .mockResolvedValueOnce("0");
  const AngpaoAlgo = new Angpao(mockAsk, CalcDistribution);
  await AngpaoAlgo.init();
  await AngpaoAlgo.initializeFriends();
  expect(async () => {
    await AngpaoAlgo.distributeAmount();
  }).rejects.toThrow("Amount must not be less than 0");
});
