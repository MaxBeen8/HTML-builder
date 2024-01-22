const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

const fsProm = fsPromises.readdir(path.join(__dirname, 'styles'));
fsProm.then(item => {
  item.forEach(file => {
    if (path.extname(path.join(__dirname, 'styles', file)) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file));
      input.pipe(output);
    }
  })
})

