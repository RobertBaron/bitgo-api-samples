const BitGoJS = require('bitgo/src/index.js');
const bitgo = new BitGoJS.BitGo({ accessToken: process.env.TEST_ACCESS_TOKEN });
const helper = require('./helpers');

const data = {
  'passphrase': process.env.BITGOJS_TEST_PASSWORD,
  'label': 'Wallet API',
  'backupXpubProvider': 'keyternal'
};

bitgo.wallets().createWalletWithKeychains(data)
.then(function(result){
  // Print the result
  console.dir(result.wallet.wallet);
  console.log(`User keychain encrypted xPrv: ${result.userKeychain.encryptedXprv}`);
  console.log(`Backup keychain xPub: ${result.backupKeychain.xpub}`);

  // Save result in disk for further reference
  helper.saveResult('wallet_creation_with_keychains', result);

  return result;
})
.catch(helper.catchHandler);
