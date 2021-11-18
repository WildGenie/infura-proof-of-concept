import { ethers } from 'ethers';


const abiExtract = `
[    {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }]
`;

// ENS contract has Transfers happening all the time
const contractAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";

const regularProvider = new ethers.providers.InfuraProvider();
const wsProvider = new ethers.providers.InfuraWebSocketProvider();

const regularContract = new ethers.Contract(contractAddress, abiExtract, regularProvider);
const wsContract = new ethers.Contract(contractAddress, abiExtract, wsProvider);

regularContract.on(regularContract.filters.Transfer(), (from, to, tokenId, event) => {
    console.log(`REGULAR 'on' handler fired ${from} ${to} ${tokenId} @ ${event.blockNumber}`);    
});

wsContract.on(regularContract.filters.Transfer(), (from, to, tokenId, event) => {
    console.log(`WEBSOCKET 'on' handler fired ${from} ${to} ${tokenId} @ ${event.blockNumber}`);    
});;


console.log('listeners instantiated');