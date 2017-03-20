const BitGoJS = require('bitgo/src/index.js');
const bitgo = new BitGoJS.BitGo({ accessToken: process.env.TEST_ACCESS_TOKEN });
const helper = require('./helpers');

const walletId = 'YOUR WALLET ID';
const destinationAddress = 'DESTINATION ADDRESS';

const data = {
  walletPassphrase: process.env.BITGOJS_TEST_PASSWORD,
  address: destinationAddress,
  amount: 0.1 * 1e8 // send 0.1 bitcoins
};


bitgo.wallets().get({ id: walletId })
.then(function(wallet) {
  console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));
  return wallet.sendCoins(data);
})
.then(function (result) {
  console.dir(result);
  // Save result in disk for further reference
  helper.saveResult('wallet_send_coins', result);

  return result;
})
.catch(helper.catchHandler);
