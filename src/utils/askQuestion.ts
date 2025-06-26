import readline from "readline";

export async function askQuestion(question: string): Promise<string> {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    r1.question(question, (answer) => {
      r1.close();
      resolve(answer);
    });
  });
}
