const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        "latest"
    );

    let transaction = {
        to: '0x2F66e86502bdF5fC84fEF282212FF6FC88109dF0',
        value: Utils.parseEther('0.0001'),
        gasLimit: '28000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 11155111, // sepolia transaction
    }

    let rawTransaction = await wallet.signTransaction(transaction);
    console.log('Raw Transaction: ', rawTransaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main();