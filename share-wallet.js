const BitGoJS = require('bitgo/src/index.js');
const bitgo = new BitGoJS.BitGo({ accessToken: process.env.TEST_ACCESS_TOKEN });
const helper = require('./helpers');

const emailToAdd = 'ENTER EMAIL';
const walletId = 'YOUR WALLET ID';

const data = {
  email: emailToAdd,
  walletPassphrase: process.env.BITGOJS_TEST_PASSWORD,
  permissions: 'admin,spend,view',
  skipKeychain: true
};

bitgo.wallets().get({ id: walletId })
.then(function(){
  return bitgo.wallets().get({ id: walletId })
})
.then(function(wallet){
  return wallet.shareWallet(data);
})
.then(function (result) {
  console.dir(result);
  // Save result in disk for further reference
  helper.saveResult('wallet_share_with_keychains', result);

  return result;
})
.catch(helper.catchHandler);
