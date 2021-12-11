require("dotenv").config();
const express = require("express");
const Web3 = require("web3");
const getNFT = require("./nftGenerator");
const bodyParser = require("body-parser");

const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/cdd2c782833f3dba40a1603b/polygon/mumbai");
const abi = require("./assets/abi");

const app = express();
const port = 8080;

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: account.address,
    gas: 1000000,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.post("/", async (req, res) => {
//     const balance = await web3.eth.getBalance(account.address);
//     res.send("Hello World! " + balance);
// });

app.post("/start", async (req, res) => {
    if (req.body.api != process.env.SERVER_API_KEY) {
        res.sendStatus(401);
        return;
    }
    const { id, w, b } = req.body;
    // const intGameId = encode(game.id);
    const startGameSend = async (id, w, b) => {
        return await contract.methods
            .startGame(id, w, b)
            .send()
            .then(r => {
                return true;
            })
            .catch(err => {
                // console.error(err);
                return false;
            });
    };
    res.sendStatus((await startGameSend(id, w, b)) ? 200 : 500);
});

app.post("/end", async (req, res) => {
    if (req.body.api != process.env.SERVER_API_KEY) {
        res.sendStatus(401);
        return;
    }
    const { id, pgn, outcome, needNFT, w, b } = req.body;
    let ipfsHash = "";
    if (needNFT && (outcome == 3 || outcome == 4)) ipfsHash = await getNFT(id, pgn, outcome, w, b);

    const endGameSend = async (id, outcome, ipfsHash) => {
        return await contract.methods
            .endGame(id, outcome, ipfsHash)
            .send()
            .then(r => {
                return true;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    };
    if (await endGameSend(id, outcome, ipfsHash)) {
        res.status(200);
        res.send(JSON.stringify({ ipfs: ipfsHash }));
    } else {
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
