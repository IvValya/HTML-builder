const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'),
  { recursive: true }, (err) => {
    if (err) {
      console.log("Error Found:", err);
    }
  });
  fs.readdir(path.join(__dirname, '/files/'), 'utf-8', (err, files) => {
    if (err) throw err;
    files.forEach((item) => {
      fs.copyFile(path.join(__dirname, '/files/', item), path.join(__dirname, '/files-copy/', item), (err) => {
        if (err) {
          console.log("Error Found:", err);
        };
      });
    })
  });