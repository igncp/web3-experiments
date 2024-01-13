import { StargateClient } from "@cosmjs/stargate";
import 區塊鏈資訊 from "chain-registry";

const crescent = 區塊鏈資訊.chains.find((區塊鏈) =>
  區塊鏈.chain_id.includes("crescent")
);

const 端點 = crescent?.apis?.rpc?.[0].address;

// 此函數接收一個位址並傳回餘額
// 它使用Crescent網絡
const 主要 = async () => {
  const 地址 = process.argv[2];

  if (!地址) {
    console.error("請輸入帳戶地址");
    process.exit(1);
  }

  if (!端點) {
    console.error("找不到端點");
    process.exit(1);
  }

  const 客戶端 = await StargateClient.connect(端點);

  const 回覆 = await 客戶端.getAllBalances(地址);

  console.log("帳戶餘額: ", 回覆);

  客戶端.disconnect();
};

主要();
