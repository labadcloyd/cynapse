import { Angpao } from "./models/Angpao";
import { askQuestion } from "./utils/askQuestion";
import { CalcDistribution } from "./utils/calcDistribution";

(async () => {
  const AngpaoAlgo = new Angpao(askQuestion, CalcDistribution);
  await AngpaoAlgo.init();
  await AngpaoAlgo.initializeFriends();
  await AngpaoAlgo.distributeAmount();
})();
