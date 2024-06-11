const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const accounts = require("./accounts");

app.use(cors());
app.use(express.json());

app.get("/balance/:address", (req, res) => {
  
  const { address } = req.params;
  const balance = accounts[address].balance || 0;
  console.log({ address, balance });
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, transactionHash, sender, recipient, amount } = req.body;
  const signatureObj = JSON.parse(signature, 
    (_, value) => (typeof value === "string" ? BigInt(value) : value));
  const verification = secp256k1.verify(
    signatureObj, 
    transactionHash, 
    accounts[sender].publicKey
  );

  if (!verification) {
    res.status(400).send({ message: "Invalid signature!" });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (accounts[sender].balance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    accounts[sender].balance -= amount;
    accounts[recipient].balance += amount;
    res.send({ balance: accounts[sender].balance });
    console.log({ sender, balance: accounts[sender].balance});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!accounts[address]) {
    accounts[address].balance = 0;
  }
}
