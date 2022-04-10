const Web3 = require('web3')
const utils = require('./utils')

const ethNetwork = 'http://127.0.0.1:7545'

const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const sendTransaction = (to, from, data, callback) => {
    web3.eth.sendTransaction({
        'from': from,
        'to': to,
        'value': 0,
        'gas': 30000,
        'data': data
    })
    .on('transactionHash', function(hash){
        callback(hash);
    });
}

const createDecision = (insurer, insurance, decision) => {

}

const gatherInformationForClaim = (insuree, callback) => {
    claimInfo = []
    web3.eth.getBlockNumber().then((currentBlock) => {
        for(var block = currentBlock; block >= 0; block--)
        {
            web3.eth.getBlock(block).then((data) => {
                const transactions = data.transactions;

                transactions.forEach((value, index, array) => {
                    web3.eth.getTransaction(value).then((txn) => {
                        const jsonTXN = JSON.parse(utils.hexToUtf8(txn.input).substring(2))
                        if(jsonTXN.status == 'data' && jsonTXN.wallet == insuree)
                        {
                            if(jsonTXN.status == 'claim')
                            {
                                callback(claimInfo);
                            }
                            else
                            {
                                console.log("Block %d", txn.blockNumber);
                                console.log(jsonTXN);
                            }
                        }
                        else
                        {
                            console.log("Nothing Found")
                        }
                    });
                });
            });
        }
    });
}
module.exports.sendTransaction = sendTransaction;
module.exports.gatherInformationForClaim = gatherInformationForClaim;