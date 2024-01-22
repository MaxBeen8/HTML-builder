const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });

  fsPromises
  .readdir(path.join(__dirname, 'files'))
  .then(item => {
    item.forEach(elem => {
      fsPromises.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem));
    });
  });
}
copyDir();
