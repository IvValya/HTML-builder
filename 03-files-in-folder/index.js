const fs = require('fs');
const path = require('path');
const { stdout } = process;
let pathDirectory = path.join(__dirname, '/secret-folder/');
fs.readdir(pathDirectory, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((item) => {
        if (item.isFile()) {
            let  extname = path.extname(item.name).slice(1);
            let  name = path.basename(item.name, extname).slice(0, -1);
            fs.stat((pathDirectory + item.name), (error, stats) => {
                if (error) {
                  console.log(error);
                };
                stdout.write(name + ' - '+ extname + ' - ' + stats.size +' байт\n');         
            });
            
        }
        
    });
});