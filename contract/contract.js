if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask detected!');
} else {
    alert('Please install MetaMask to use this dApp.');
}

const contractAddress = '0xAbC1234567890dEf1234567890AbCdEf12345678';
const contractABI = [
    {
        "inputs": [{"internalType": "uint256","name": "_value","type": "uint256"}],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getValue",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{"indexed": false,"internalType": "uint256","name": "newValue","type": "uint256"}],
        "name": "ValueUpdated",
        "type": "event"
    }
];


let web3;
let simpleStorage;

async function init() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    simpleStorage = new web3.eth.Contract(contractABI, contractAddress);

    getValue();
}

async function getValue() {
    const value = await simpleStorage.methods.getValue().call();
    document.getElementById('storedValue').innerText = value;
}

async function setValue() {
    const value = document.getElementById('newValue').value;
    const accounts = await web3.eth.getAccounts();

    await simpleStorage.methods.setValue(value).send({ from: accounts[0] });
    getValue();  
}

window.addEventListener('load', init);
