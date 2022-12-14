import readline from "readline";
import { Question } from "./types";
import { readLineAsync } from "./common/stdin";
// import Mensetsu from "../json/mensetsu.json";
// import Osce from "../json/osce.json";
import OsceDisease from "../json/osce-disease.json";
import Yokomoji from "../json/kokushi-yokomoji.json";

const question = (question: string): Promise<string> => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer: string) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

async function prompt(msg: string): Promise<string> {
  const answer: string = await question(msg);
  return answer.trim();
}

const main = async () => {
  console.log("実行するモードを選択してください");
  console.log("1: 国試対策（長い横文字）" + "\n2: OSCE（鑑別疾患）");
  let array: Array<Question>;
  switch (await readLineAsync(">> ")) {
    case "1":
      array = Yokomoji.kokushiYokomoji;
      break;
    case "2":
      array = OsceDisease.osce;
      break;
    default:
      console.log("番号を選択してください。");
      return;
  }
  console.log("");
  console.log("↓↓↓Enterキーを押して操作してください↓↓↓\n");
  for (;;) {
    const dialog = array[Math.floor(Math.random() * array.length)];
    await prompt("\x1b[36mQ." + dialog.question);
    console.log("\x1b[35mA.\x1b[0m");
    dialog.answer.forEach((answer: string) => {
      console.log(answer);
    });
    console.log("");
  }
};

// 起動
(async () => {
  await main();
})();
