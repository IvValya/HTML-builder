const fs = require('fs');
const { stdin, stdout, exit } = process;
const path = require('path');
stdout.write("Enter your text\n");
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', chunk => {
    if (chunk.toString().trim() === "exit") {
        goodBay();
    };
    output.write(chunk);
});
process.on('SIGINT', () => {
    goodBay();
});

function goodBay() {
    stdout.write('Good bay');
    exit();
}