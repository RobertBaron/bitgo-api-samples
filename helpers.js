const fs = require('fs');
const moment = require('moment');

class Helpers {
  constructor(){}

  saveResult(action, data) {
    const dir = `./secret-data/${moment().format('MMMM_DD_YYYY')}/`;
    const filePath = `${dir}${moment().format('h:mm:ss')}_${action}.json`;

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, data);

    console.log(`${action} saved in ${filePath}\n`);
  }

  catchHandler(err){
    console.error(err);
  }
}

module.exports = new Helpers();