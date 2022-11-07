const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

(function  copyDir () {
   fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true}, (err) => {
    fs.mkdir(path.join(__dirname, 'files-copy'),
    { recursive: true },  (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    });
    srcPath = path.join(__dirname, '/files/');
    destPath = path.join(__dirname, '/files-copy/');

    copyFromDir(srcPath, destPath);
    function copyFromDir (src, dest) {
        fs.readdir(path.join(src), { withFileTypes: true }, (err, files) => {
          if (err) throw err;
          files.forEach((item) => {
            srcPath = path.join (src, item.name);
            destPath = path.join (dest, item.name);
            if (!item.isDirectory()) {
              
              copyFile (srcPath, destPath);
            }
            else {              
              fs.mkdir(destPath,
              { recursive: true },  (err) => {
                if (err) {
                  console.log("Error Found:", err);
                }
              });
             copyFromDir(srcPath, destPath);
            }
            
          });
        });
      }}); 

})();

function copyFile (src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.log("Error Found:", err);
    };
  });
}


 


  