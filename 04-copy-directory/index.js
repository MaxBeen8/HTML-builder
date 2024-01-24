const fsPromises = require('fs/promises');
const path = require('path');

async function copyDir() {
  await fsPromises.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
  await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

  await fsPromises
  .readdir(path.join(__dirname, 'files'))
  .then(item => {
    item.forEach(elem => {
      fsPromises.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem));
    });
  });
}
copyDir();
