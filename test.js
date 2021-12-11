// const getNFT = require("./nftGenerator");
const CID = require("cids");
var multihash = require("multihashes");

const pgn = `1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 O-O 8.a4 Bb7
        9.d3 d6 10.Nc3 Na5 11.Ba2 b4 12.Ne2 Rb8 13.Ng3 c5 14.Nd2 Bc8 15.Nc4 Bg4 16.f3 Be6
        17.Nxa5 Qxa5 18.Bc4 Nd7 19.b3 Nb6 20.Rb1 Rbd8 21.Qe2 d5 22.exd5 Nxd5 23.Bd2 f6
        24.f4 Bd6 25.f5 Bf7 26.Qg4 Kh8 27.Re4 Qb6 28.Kh1 Qb7 29.Rbe1 Rfe8 30.Qh4 Bf8
        31.Nf1 Nb6 32.Bxf7 Qxf7 33.Be3 Nd5 34.Bg1 Nc3 35.Rc4 Rd4 36.Bxd4 exd4 37.Rxc3 bxc3
        38.Re4 Bd6 39.h3 Kg8 40.Nh2 Bxh2 41.Kxh2 Qc7+ 42.Kg1 Re5 43.Qf4 Qe7 44.Kf2 Rxe4
        45.dxe4 g5 46.fxg6 hxg6 47.Ke2 f5 48.e5 Qb7 49.Qg5 Qe4+ 50.Kd1 Qc6 51.h4 f4
        52.Qxf4 a5 53.Qg4 Kf7 54.Ke2 Qa6+ 55.Kf2 Qe6 56.Qe4 Qf5+ 57.Qxf5+ gxf5 58.h5 d3
        59.h6 dxc2 60.e6+ Kxe6 61.h7 c1=Q 62.h8=Q Qd2+ 63.Kg3 Qe3+  0-1`;

// const test = async () => {
//     const ipfsHash = await getNFT(pgn, "opopop");
//     console.log(ipfsHash);
//     const cid = new CID(ipfsHash).toV1();
//     console.log(cid.bytes);
// };

// test();

// const cid = new CID("bafyreicozqv4gfjmykghhe4lykn4qvrpazt4hyrj6ter27qbjqrk5uokwe");
// bytes = cid.bytes;
// bytes = bytes.slice(4);
// console.log(bytes);
// let hex = Buffer.from(bytes).toString("hex");
// console.log(hex);
// console.log(multihash.encode(bytes, "cid"));

const cidToBytes32 = ipfsHash => {
    const cid = new CID(ipfsHash);
    const bytes = cid.bytes;
    return "0x" + Buffer.from(bytes.slice(4)).toString("hex");
};

const bytesTocid = bytes => {
    array = Uint8Array.from(Buffer.from(bytes, "hex"));
    array = new Uint8Array([1, 113, 18, 32, ...array]);
    console.log(array);
    const cid = new CID(array);
    return cid.toString();
};

// bytes = cidToBytes32("bafyreicozqv4gfjmykghhe4lykn4qvrpazt4hyrj6ter27qbjqrk5uokwe");
bytes = "70145f84aeae225a908a35679344f7a31b81dd33796024fa0d765aca5db28367";
console.log(bytes);
bytes = bytes.slice(2);
bytesTocid(bytes);
