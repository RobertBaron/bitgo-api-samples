const BitGoJS = require('bitgo/src/index.js');
const bitgo = new BitGoJS.BitGo({ accessToken: process.env.TEST_ACCESS_TOKEN });
const helper = require('./helpers');

// REPLACE THIS WITH YOUR VALUES
const walletId = 'YOUR WALLET ID';
const destinationAddress = 'DESTINATION ADDRESS';

const data = {
  walletPassphrase: process.env.BITGOJS_TEST_PASSWORD,
  address: destinationAddress,
  amount: 0.1 * 1e8 // send 0.1 bitcoins
};

let wallet;
let keychain;
bitgo.wallets().get({ id: walletId })
.then(function(_wallet) {
  console.log("Balance is: " + (_wallet.balance() / 1e8).toFixed(4));
  wallet = _wallet;

  helper.saveResult('wallet_send_tx-wallet', wallet);
  return wallet.getEncryptedUserKeychain({});
})
.then(function(_keychain){
  // Decrypt the user key with a passphrase
  _keychain.xprv = bitgo.decrypt({ password: data.walletPassphrase, input: _keychain.encryptedXprv });
  keychain = _keychain;

  const recipients = {};
  recipients[data.address] = data.amount;

  const params = { recipients: recipients };

  helper.saveResult('wallet_send_tx-keychain', keychain);
  return wallet.createTransaction(params)
})
.then(function(transaction){
  const params = {
    transactionHex: transaction.transactionHex,
    unspents: transaction.unspents,
    keychain: keychain
  };

  helper.saveResult('wallet_send_tx-transaction', transaction);
  return wallet.signTransaction(params);
})
.then(function(transaction){

  helper.saveResult('wallet_send_tx-transaction-signed', transaction);
  return wallet.sendTransaction({tx: transaction.tx});
})
.then(function (result) {
  console.dir(result);
  // Save result in disk for further reference
  helper.saveResult('wallet_send_tx', result);

  return result;
})
.catch(helper.catchHandler);
