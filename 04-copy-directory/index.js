const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const fsProm = fsPromises.readdir(path.join(__dirname, 'files'));

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });

  fsProm.then(item => {
    item.forEach(elem => {
      fsPromises.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem));
    });
  });
}

copyDir();
