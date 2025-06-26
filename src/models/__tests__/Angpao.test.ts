import { Angpao } from "../Angpao";

test("Angpao should ask for the owner's name and balance", async () => {
  const mockAsk = jest
    .fn()
    .mockResolvedValueOnce("Cloyd")
    .mockResolvedValueOnce("20");

  const AngpaoAlgo = new Angpao(mockAsk);
  await AngpaoAlgo.init();

  const owner = AngpaoAlgo.owner;
  expect(owner.name).toBe("Cloyd");
  expect(owner.wallet_balance).toBe(20);
});
