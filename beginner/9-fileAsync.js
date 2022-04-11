const { readFile, writeFile } = require('fs')

console.log('Start');
readFile('./content/first.txt', 'utf-8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    const first = result;
    readFile('./content/second.txt', 'utf-8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const second = result;
        writeFile('./content/result.txt', `${first}, ${second}`, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Done');
        });
    })
})
console.log('End');


