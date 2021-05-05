const net = require('net');
const fs = require('fs');
const request = require('request');


const args = process.argv.slice(2);

const pageDownloader = () => {
  request(args[0], (error, response, body) => {
    fs.writeFile(args[1], body, (err) => {
      if(!err) {
        const stats = fs.statSync(args[1]);
        const fileSizeInBytes = stats.size;
        console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${args[1]}`);
      }
    });
  });
};

pageDownloader();