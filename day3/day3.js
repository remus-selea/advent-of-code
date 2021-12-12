const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function partOne() {
    const matrix = await processLineByLine();

    const { gammas, epsilons } = getCommonBits(matrix);

    const gamma = parseInt(gammas.join(""), 2);
    const epsilon = parseInt(epsilons.join(""), 2);

    return gamma * epsilon;;
}

async function partTwo() {
    const matrix = await processLineByLine();

    let oxygenGenRatings = matrix
    let pos = 0

    while (oxygenGenRatings.length > 1) {
        const { gammas } = getCommonBits(oxygenGenRatings);

        oxygenGenRatings = oxygenGenRatings.filter((array) => gammas[pos] === array[pos]);
        pos++;
    }

    let co2ScrubRatings = matrix;
    pos = 0;

    while (co2ScrubRatings.length > 1) {
        const { epsilons } = getCommonBits(co2ScrubRatings);

        co2ScrubRatings = co2ScrubRatings.filter((array) => epsilons[pos] === array[pos]);
        pos++;
    }

    const oxygenGenRating = parseInt(oxygenGenRatings[0].join(""), 2)
    const co2ScrubberRating = parseInt(co2ScrubRatings[0].join(""), 2);

    return oxygenGenRating * co2ScrubberRating;
}

async function processLineByLine() {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('./puzzle-input.txt'),
            crlfDelay: Infinity
        });

        const matrix = [];

        rl.on('line', (line) => {
            let input = parseInput(line);
            matrix.push(input);
        });

        await events.once(rl, 'close');

        return matrix;
    } catch (err) {
        console.error(err);
    }
}

const parseInput = (rawInput) => {
    return Array.from(rawInput, Number);
}

const getCommonBits = (matrix) => {
    const transposedMatrix = transpose(matrix)
    const gammas = []
    const epsilons = []

    for (const column of transposedMatrix) {

        const onesArray = column.filter((element) => {
            return element === 1;
        })

        const isOneCommon = onesArray.length >= column.length / 2

        gammas.push(isOneCommon ? 1 : 0)
        epsilons.push(isOneCommon ? 0 : 1)
    }

    return { epsilons, gammas }
}

function transpose(matrix) {
    let transposedMatrix = [];

    // the matrix has the same number of columns therefore
    // the length of any of the nested arrays gives us the number of new arrays 
    // we need to build the transposed matrix
    for (let columnIndex = 0; columnIndex < matrix[0].length; columnIndex++) {

        // the Array.prototype.map() function iterates each nested array and returns 
        // a new array containing only the elements at the index of the column
        let newArray = matrix.map(nestedArray => {
            return nestedArray[columnIndex]
        })

        transposedMatrix.push(newArray);
    }

    return transposedMatrix;
}


async function main() {
    console.log(await partOne())
    console.log(await partTwo())
}

main();