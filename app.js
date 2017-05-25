/*

GUY FIERI'S FEROCIOUS FLAVATOWN FIESTA Simulator
by Andy Smith

Arguments:
    -n  number of simulations to run; default 1,000,000
    -f  number of marbles per cup to fill at start; default 25
    -s  suppress output of simulations until end
    -p  display the progress (also enables "-s")

*/

var argv = require('minimist')(process.argv.slice(2));
const numPlayers = 4;

var winsHouse = 0;
var winsPlayers = 0;
var playerWins = new Array(numPlayers).fill(0);
var ties = 0;
var preFill = argv["f"] === undefined ? 25 : argv["f"];

function rollDie() {    
    return Math.floor(Math.random() * 6) + 1;
}

function playGame() {
    var cups = new Array(3).fill(preFill);
    var players = new Array(numPlayers).fill(0);

    for (i = 0; i < players.length; i++) {
        for (j = 0; j < cups.length; j++) {
            var rand = rollDie();
            if (cups[j] - rand <= 0) rand = cups[j];
            if (j == 0) {
                players[i] += rand * 3;
            } else if (j == 1) {
                players[i] += rand;
            } else {
                players[i] -= rand * 4;
            }
            cups[j] -= rand;
        }
    }

    for (i = players.length - 1; i >= 0; i--) {
        for (j = 0; j < cups.length; j++) {
            var rand = rollDie();
            if (cups[j] - rand <= 0) rand = cups[j];
            if (j == 0) {
                players[i] += rand * 3;
            } else if (j == 1) {
                players[i] += rand;
            } else {
                players[i] -= rand * 4;
            }
            cups[j] -= rand;
        }
    }

    var houseWins = false;
    cups.forEach(function(element) {
        if (element > 0) houseWins = true;
    }, this);

    if (!houseWins) {
        var max = Math.max.apply(Math, players);
        var sorted = players.slice().sort();;
        if (sorted[0] == sorted[1]) {
            ties++;
        } else {
            playerWins[players.indexOf(max)]++;
        }
    }

    return houseWins;
}

var simulations = argv["n"] === undefined ? 1000000 : argv["n"];
var suppress = argv["s"];
var percentCompleted = argv["p"];

if (percentCompleted) {
        pace = require('pace')(simulations);
}

for (k = 0; k < simulations; k++) {
    if (playGame()) {
        winsHouse++;
    } else {
        winsPlayers++;
    }

    if ((winsHouse + winsPlayers) % 100000 == 0 && !suppress && !percentCompleted)
        console.log("H: " + winsHouse + "\t P: " + winsPlayers + "\t " + (100 * winsHouse / (winsPlayers + winsHouse)).toFixed(3) + "%");

     if ((winsHouse + winsPlayers) % 5000 == 0 && percentCompleted) pace.op(winsHouse + winsPlayers);
}

var playerWinningChance = winsPlayers / (winsHouse + winsPlayers);

if (!suppress || percentCompleted) console.log("\n----------------------------------------------");
console.log("Total simulations: " + (winsHouse + winsPlayers).toLocaleString(undefined, { minimumFractionDigits: 0 }) + "\n");
console.log("House: \t" + winsHouse + "\t Players:  " + winsPlayers);
console.log("\t" + (100 * winsHouse / (winsPlayers + winsHouse)).toFixed(3) + "%\t\t   " + (100 * winsPlayers / (winsPlayers + winsHouse)).toFixed(3) + "%");
console.log("\nPlayer wins:");
console.log("P1: " + playerWins[0] + "\t P2: " + playerWins[1] + "\t P3: " + playerWins[2] + "\t P4: " + playerWins[3]);
console.log("%   " + (100 * playerWins[0] / winsPlayers).toFixed(2) + "\t     " + (100 * playerWins[1] / winsPlayers).toFixed(2) + 
    "\t     " + (100 * playerWins[2] / winsPlayers).toFixed(2) + "\t     " + (100 * playerWins[3] / winsPlayers).toFixed(2));
console.log("%EV " + (100 * playerWins[0] / winsPlayers * playerWinningChance).toFixed(2) + "\t     " + (100 * playerWins[1] / winsPlayers * playerWinningChance).toFixed(2) + 
    "\t     " + (100 * playerWins[2] / winsPlayers * playerWinningChance).toFixed(2) + "\t     " + (100 * playerWins[3] / winsPlayers * playerWinningChance).toFixed(2));
if (!suppress || percentCompleted) console.log("----------------------------------------------");