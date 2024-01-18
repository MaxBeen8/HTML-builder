const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;
fs.appendFile(
  path.join(__dirname, "02-write-file.txt"),
  "",
  (err) => {
    if (err) throw err;
  },
)
stdout.write("ENTER TEXT:\n");
stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    console.log("GOODBYE");
    process.exit();
  }
  fs.appendFile(
    path.join(__dirname, "02-write-file.txt"),
    data,
    (err) => {
      if (err) throw err;
    },
  )
})

process.on('SIGINT', () => {
  console.log("GOODBYE");
  process.exit();
});