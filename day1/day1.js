const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('./puzzle-input.txt'),
            crlfDelay: Infinity
        });

        let totalIncreases = 0;
        let prevNumber = 0;

        rl.on('line', (line) => {
            let currentNumber = Number(line);

            if (prevNumber == 0) {
                prevNumber = currentNumber;
            } else {
                if (currentNumber > prevNumber) {
                    totalIncreases++;
                }

                prevNumber = currentNumber;
            }

        });

        await events.once(rl, 'close');

      return totalIncreases;
    } catch (err) {
        console.error(err);
    }
}

processLineByLine().then(function(result){
    console.log(result);
})