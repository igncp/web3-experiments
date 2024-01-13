import {
  QueryClient,
  StargateClient,
  setupBankExtension,
  setupGovExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import 區塊鏈資訊 from "chain-registry";

const crescent = 區塊鏈資訊.chains.find((區塊鏈) =>
  區塊鏈.chain_id.includes("crescent")
);

// Crescent 介紹: https://docs.crescent.network/introduction/crescent-dex
// https://docs.cometbft.com/v0.37/rpc/#
const rpc端點 = crescent?.apis?.rpc?.[0].address;

const 主要 = async () => {
  if (!rpc端點) {
    console.error("找不到端點");
    process.exit(1);
  }

  const 客戶端 = await StargateClient.connect(rpc端點);

  await 客戶端.getBlock().then((區塊回覆) => {
    console.log("區塊標識符", 區塊回覆.id);
    console.log("區塊創建時間", 區塊回覆.header.time);
  });

  await fetch(rpc端點 + "/net_info")
    .then((回應) => 回應.json())
    .then((網路資訊) => {
      console.log("網路資訊", 網路資訊);

      console.log(
        "debug: 取得區塊一般資訊 - 第一個 API 節點",
        網路資訊.result.peers[0]
      );
    });

  await fetch(rpc端點 + "/abci_info")
    .then((回應) => 回應.json())
    .then((應用程式資訊) => {
      console.log("應用程式資訊", 應用程式資訊);
    });

  const comet客戶端 = await Tendermint34Client.connect(rpc端點);

  const 銀行客戶端 = QueryClient.withExtensions(
    comet客戶端,
    setupBankExtension
  );

  await 銀行客戶端.bank.totalSupply().then((總供應量) => {
    console.log("總供應量", 總供應量);
  });

  await 銀行客戶端.bank.denomsMetadata().then((總供應量) => {
    console.log("總供應量", 總供應量);
  });

  const 治理客戶端 = QueryClient.withExtensions(comet客戶端, setupGovExtension);

  治理客戶端.gov.params("deposit").then((訂金) => {
    console.log("訂金", 訂金);
  });

  治理客戶端.gov.params("voting").then((投票) => {
    console.log("投票", 投票);
  });

  客戶端.disconnect();
};

主要();
