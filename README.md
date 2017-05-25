# Guy Fieri's Ferocious Flavatown Fiesta Simulator
## Statistics Project
This is a simulator for Guy Fieri's Ferocious Flavatown Fiesta, a probability game made for our Applied Statistics class.
# Usage
Run it with `node app.js` with optional parameters appended onto the end.
* Use `-n` to limit the number of simulations run by the program. Defaults to 1,000,000.
* Use `-f` to specify the number of marbles filled in each cup at the start. Defaults to 25.
* Use `-s` to suppress the periodic output command and only show the summary at the end.
* Use `-p` to display a progress bar rather than the periodic output. Also enables `-s`.

Examples
* `node app.js -p`
* `node app.js -sf 20 -n 10000`