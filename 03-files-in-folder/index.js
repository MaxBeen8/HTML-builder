const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const fsProm = fsPromises.readdir(path.join(__dirname, 'secret-folder'), {
  withFileTypes: true
})

fsProm.then((item) => {
  item.forEach(element => {
    if (!element.isDirectory()) {
      const ext = path.extname(path.join(__dirname, 'secret-folder', element.name))
      const file = path.basename(path.join(__dirname, 'secret-folder',element.name), ext);
      fs.stat(path.join(__dirname, 'secret-folder', element.name), (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${file} - ${ext.replace('.', '')} - ${(stats.size * 0.0009765625).toFixed(3)}kb`);
      })
    }
  });
})