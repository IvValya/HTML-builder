const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, '/styles/'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;    
    const output = fs.createWriteStream(path.join(__dirname, '/project-dist/', 'bundle.css'));
    let data = '';
    files.forEach((item) => {
        const input = fs.createReadStream(path.join(__dirname, '/styles/', item.name), 'utf-8');
        let  extname = path.extname(item.name);       
        if (item.isFile() && extname === '.css') {            
            input.on('data', chunk => data += chunk);
            input.on('end', () => output.write(data));            
            input.on('error', error => console.log('Error', error.message));
        }
    });
})