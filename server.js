require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const { encode, decode } = require("./utils/converter");

const Moralis = require("moralis/node");
const serverUrl = "https://fb5qdogo473c.usemoralis.com:2053/server";
const appId = "ahsSC5MWcmf8ZeCzR1IlFeXI64WdRQuym1BSj1bK";
Moralis.start({
    serverUrl,
    appId,
    masterKey: process.env.MORALIS_MASTER_KEY,
});
console.log("Moralis initialized", Moralis);

const web3 = new Web3("http://localhost:7545");
const abi = require("./assets/abi.json");

const app = express();
const port = 3000;

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
    const balance = await web3.eth.getBalance(account.address);
    res.send("Hello World! " + balance);
});

app.get("/start", async (req, res) => {
    const Challenge = Moralis.Object.extend("Challenge");
    const query = new Moralis.Query(Challenge);

    // 1GPzZ2ku5cDbMWFJaYeq8SNc

    query.equalTo("objectId", req.body.challengeObjectId);
    const challenge = (await query.get("1GPzZ2ku5cDbMWFJaYeq8SNc")).attributes;
    intGameId = encode(req.body.challengeObjectId);

    const players = challenge.players;
    // const transaction = await contract.methods.startGame(intGameId, players.w, players.pw, challenge, players.b, players.pb, challenge).send({
    //     from: account.address,
    //     gas: 1000000,
    // });
    res.send(transaction);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
