const BitGoJS = require('bitgo/src/index.js');
const bitgo = new BitGoJS.BitGo({ accessToken: process.env.TEST_ACCESS_TOKEN });
const helper = require('./helpers');

const keychains = bitgo.keychains();
const keychain = keychains.create();

// User key
console.log('User key', JSON.stringify(keychain, null, 2));
helper.saveResult('user_key', keychain);
// // Backup key
keychains.createBackup({ provider: 'keyternal'})
.then(function(backupKey){
  console.log('Backup Key: ', JSON.stringify(backupKey, null, 2));
  helper.saveResult('backup_key', keychain);
})
.catch(helper.catchHandler);;

// BitGo Key
keychains.createBitGo({})
.then(function(bitGoKey){
  console.log('BitGo Key: ', JSON.stringify(bitGoKey, null, 2));
  helper.saveResult('bitgo_key', keychain);
})
.catch(helper.catchHandler);
