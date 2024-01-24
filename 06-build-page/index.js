const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist/assets');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, (err) => {
  if (err) throw err;
});


fs.writeFile(
  path.join(__dirname, "project-dist", "index.html"),
  "",
  (err) => {
    if (err) throw err;
  }
);

fs.writeFile(
  path.join(__dirname, "project-dist", "style.css"),
  "",
  (err) => {
    if (err) throw err;
  },
);

function copyDir(folder, where) {
  fsPromises
  .readdir(folder, { withFileTypes: true })
  .then(item => {
    item.forEach(file => {
      if (file.isDirectory()) {
        copyDir(path.join(folder, file.name), path.join(where, file.name))
      } else {
        fs.mkdir(where, { recursive: true }, err => {
          if (err) throw err;
        })
        fsPromises.copyFile(path.join(folder, file.name), path.join(where, file.name))
      }
    })
  })
}
copyDir(assets, assetsCopy);

fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist/index.html'), err => {
  if(err) throw err;
});


(async function addHTML() {
  await fsPromises.readFile(path.join(__dirname, 'project-dist/index.html'), 'utf-8')
  .then(async data => {
    await fsPromises.readdir(path.join(__dirname, 'components'), { withFileTypes: true })
    .then(async item => {
      item.forEach(async file => {
        const ext = path.extname(path.join(__dirname, 'components', file.name))
        const name = path.basename(path.join(__dirname, 'components',file.name), ext);
        await fsPromises.readFile(path.join(__dirname, 'components', file.name), 'utf-8')
        .then(async code => {
          if (ext === '.html') {
            data = data.replaceAll(`{{${name}}}`,`\n${code}`);
            await fsPromises.writeFile(path.join(__dirname, "project-dist", "index.html"), data);
          } else {
            throw new Error('Error type file');
          }
        })
      })
    })
  });
})();

const output = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));

const fsProm = fsPromises.readdir(path.join(__dirname, 'styles'));
fsProm.then(item => {
  item.forEach(file => {
    if (path.extname(path.join(__dirname, 'styles', file)) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file));
      input.pipe(output);
    }
  })
})
