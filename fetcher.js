const net = require('net');
const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const pageDownloader = () => {
  request(args[0], (error, response, body) => {
    if (fs.existsSync(args[1])) {
      rl.question(`Do you want to OVERWRITE the existing file ' ${args[1]} '? (Type 'Y' for yes)`, (answer) => {
        if (answer === 'Y') {
          fs.writeFile(args[1], body, (err) => {
            if(!err) {
              const stats = fs.statSync(args[1]);
              const fileSizeInBytes = stats.size;
              console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${args[1]}`);
              process.exit();
            }
          });
        } else process.exit();
      });

    } else fs.writeFile(args[1], body, (err) => {
      if(!err) {
        const stats = fs.statSync(args[1]);
        const fileSizeInBytes = stats.size;
        console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${args[1]}`);
        process.exit();
      }
    });
  });
};

pageDownloader();