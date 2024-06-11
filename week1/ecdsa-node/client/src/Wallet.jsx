import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js"
import { keccak256 } from "ethereum-cryptography/keccak.js"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey.length === 64) {
      const publicKeyUncomp = secp256k1.getPublicKey(privateKey, false)
      const address = '0x' + toHex(
        keccak256(publicKeyUncomp.slice(1)).slice(-20)
      ) 
      setAddress(address)
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
      setAddress("0x");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>
      <p>Address: {address}</p>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
