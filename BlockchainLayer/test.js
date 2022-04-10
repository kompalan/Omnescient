const Web3 = require('web3')

const ethNetwork = 'http://127.0.0.1:7545'

const testAddr = '0xF473CB7A3a9DAbA8265002598e68Dd991A9686a9';

function utf8ToHex(str) {
    return Array.from(str).map(c => 
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
      encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
    ).join('');
}

const sendTransaction = (web3, wallet) => {
    data = utf8ToHex("Hello")
    web3.eth.sendTransaction({
        'from': wallet,
        'to': '0xd8043820F75C0caC80804E44bc2DaE0aF44C229D',
        'value': 0,
        'gas': 30000,
        'data': data
    })
    .on('transactionHash', function(hash){
        console.log(hash);
    });
}


try {
    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
    console.log("Connection Successfull!");
    console.log("Latest Block Number: ");
    web3.eth.getBlockNumber().then(console.log);
    sendTransaction(web3, testAddr);
}
catch(e) {
    console.log("Connection Error!", e);
}



/**
 * Create a endpoint that takes data and publishes to the blockchain [DONE]
 * 
 * 
 * Create a site which allows users to create a claim on the blockchain which references aforementioned 
 * data which is also posted on the blockchain
 * 
 */
