const Web3 = require('web3')
const utils = require('./utils')
const ether = require('./ether')

const ethNetwork = 'http://127.0.0.1:7545'

const testAddr = '0xd8043820F75C0caC80804E44bc2DaE0aF44C229D';

var express = require('express');
var app = express();
app.use(express.json());

/**
 * Eshan's endpoint
 */
app.post('/carData', function(req, res) {
    console.log("Request Recieved");
    const stringData = JSON.stringify(req.body);
    console.log(JSON.parse(stringData));
    ether.sendTransaction(req.body.wallet, req.body.wallet, utils.utf8ToHex(JSON.stringify(req.body)), (hash) => {
        res.send(hash);
    });
});

app.post('/fileClaim', function(req, res) {
    res.sendStatus(200);
});

app.post('/reviewClaim', function(req, res) {
    ether.gatherInformationForClaim(req.body.wallet);
    res.sendStatus(200);
});

app.post('/decideClaim', function(req, res) {
    
});

app.get('/', function(req, res) {
    res.send("Hello World\n");
})

var server = app.listen(8081);