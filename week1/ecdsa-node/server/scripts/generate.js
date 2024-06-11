const fs = require('node:fs');
const readline = require('node:readline');


const secp = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak.js") ;

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

let BALANCES = [];

rl.question('Enter number of accounts: ', (answer) => {
    BALANCES = Array.from(
        {length: answer}, 
        () => Math.floor(Math.random() * 200)
    );
    console.log(`Generating ${answer} accounts...`);
    generateAccounts();
    rl.close();
})

/**
 * Creates an object of accounts with randomly generated private keys, 
 * public keys, and balances based on the BALANCES array.
 *
 * @return {Object} An object with keys as Ethereum addresses and values as 
 * objects containing privateKey, balance, and publicKey.
 */
function createAccounts() {
    const accounts = {}
    
    for (let i = 0; i < BALANCES.length; i++) {
        const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey())
        const publicKeyUncomp = secp.secp256k1.getPublicKey(privateKey, false);
        const address = ethAddress(publicKeyUncomp);
        accounts[address] = {
            privateKey,
            balance: BALANCES[i],
            publicKey: toHex(publicKeyUncomp)
        }
    }

    return accounts
}

/**
 * Generates an Ethereum address from a public key.
 *
 * @param {string} publicKey - The public key to generate the address from.
 * @return {string} The Ethereum address generated from the public key.
 */
function ethAddress(publicKey) {
    // The first byte indicates whether the key is compressed or not
    return '0x' + toHex(
        keccak256(publicKey.slice(1)).slice(-20)
    )
}

/**
 * Generates a set of Ethereum accounts and writes them to a file named "accounts.json".
 *
 * @return {void} This function does not return anything.
 */
function generateAccounts() {
    const accounts = createAccounts()
    console.log(accounts);
    fs.writeFile(
        "accounts.json", 
        JSON.stringify(accounts), (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    })

}