const axios = require('axios');

// const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/cBLRf4KFIl9TvLMvkjOoE8YcjhAOr-vC";

const PUBLIC_NODE = "https://eth-pokt.nodies.app";

axios.post(PUBLIC_NODE, {
    jsonrpc: "2.0",
    id: 1,
    method: "net_peerCount",
    params: [
      // "0x4c326BFf20E17E59a74B51fF7692614040221670", // block 46147
      // "latest"  // retrieve the full transaction object in transactions array
    ]
  }).then((response) => {
    console.log(response.data.result);
  });