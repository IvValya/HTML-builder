const fs = require ('fs');
const fsPromises = require('fs/promises');
const path = require ('path');


    fs.mkdir(path.join(__dirname, '/project-dist/'),
    { recursive: true },  (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
});
    const input = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    input.on('data', async  chunk  => {
    const index = fs.createWriteStream(path.join(__dirname, '/project-dist/', 'index.html'));
    let curSymb = '';
    let componentName = '';
    let curComp = false;
    for (let char of chunk) {
        if ((char!=='{') && (curComp === false)) {
            index.write(char);
        }
        else {
            if ((curSymb === '{{') && (char!=='}')) {
                componentName += char;
            }
            else if (curSymb === '{{}' && char === '}') {
                try {
                    const data = await fsPromises.readFile(path.join(__dirname, '/components/', componentName + '.html'), { encoding: 'utf8' });
                    index.write(data);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.log(componentName +'.html not found!');
                        index.write('{{'+componentName+'}}');
                      } else {
                        throw err;
                      }
                }
                
                curSymb = '';
                componentName = '';
                curComp = false;       
            }
            else {
                curSymb += char;
                curComp = true;
            }
        }
    }
    });


    fs.readdir(path.join(__dirname, '/styles/'), { withFileTypes: true }, (err, files) => {
        if (err) throw err;    
        const output = fs.createWriteStream(path.join(__dirname, '/project-dist/', 'style.css'));
        
        files.forEach((item) => {
            let data = '';
            const input = fs.createReadStream(path.join(__dirname, '/styles/', item.name), 'utf-8');
            let  extname = path.extname(item.name);       
            if (item.isFile() && extname === '.css') {            
                input.on('data', chunk => data += chunk);
                input.on('end', () => output.write(data));            
                input.on('error', error => console.log('Error', error.message));
            }
        });
    });


  (function  copyDir () {
    fs.rm(path.join(__dirname, '/project-dist/', '/assets/'), { recursive: true, force: true}, (err) => {
     fs.mkdir(path.join(__dirname, '/project-dist/', '/assets/'),
     { recursive: true },  (err) => {
       if (err) {
         console.log("Error Found:", err);
       }
     });
     srcPath = path.join(__dirname, '/assets/');
     destPath = path.join(__dirname, '/project-dist/', '/assets/');
 
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













