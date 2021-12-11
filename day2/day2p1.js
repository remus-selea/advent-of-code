const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('./puzzle-input.txt'),
            crlfDelay: Infinity
        });

        let depth = 0;
        let horizontalPoz = 0;

        const wordRegex = /\w+/;
        const numRegex = /\d/;

        rl.on('line', (line) => {

            switch (line.match(wordRegex)[0]){
                case 'forward':
                    let forwardAmount = Number(line.match(numRegex));
                    horizontalPoz += forwardAmount;
                    break
                case 'up':
                    let upAmount = Number(line.match(numRegex));
                    depth -= upAmount;
                    break
                case 'down':
                    let downAmount = Number(line.match(numRegex));
                    depth += downAmount;
                    break
            }
            
        });

        await events.once(rl, 'close');

        return horizontalPoz * depth;
        
    } catch (err) {
        console.error(err);
    }
}


processLineByLine().then(function(result){
    console.log(result);
})