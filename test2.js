require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3(process.env.MORALIS_NODE);
const abi = require("./assets/abi");

const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS, {
    from: account.address,
    gas: 1000000,
});

const t = async id => {
    const r = await contract.methods.getGame(id).call();
    console.log(JSON.stringify(r));
};

t("I9AioYlhgqpZR3jhDGA6QvV5");
