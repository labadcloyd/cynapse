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
