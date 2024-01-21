import web3 from "@solana/web3.js";

// https://docs.solana.com/terminology

const 主要 = async () => {
  const 連線 = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

  const 插槽 = await 連線.getSlot();
  console.log("插槽", 插槽);

  const 區塊時間 = await 連線.getBlockTime(插槽);
  console.log("區塊時間", 區塊時間);

  const 區塊 = await 連線.getBlock(插槽, {
    maxSupportedTransactionVersion: 0,
  });
  console.log("區塊", 區塊);

  const 插槽領導者 = await 連線.getSlotLeader();
  console.log("插槽領導者", 插槽領導者);
};

主要();
