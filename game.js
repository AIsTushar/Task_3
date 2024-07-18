const Security = require("./Security");
const Rules = require("./Rules");
const HelpTable = require("./HelpTable");
const readline = require("readline");

class Game {
  constructor(moves) {
    if (moves.length < 3 || moves.length % 2 === 0) {
      throw new Error("Invalid number of moves. Must be an odd number >= 3.");
    }

    this.moves = moves;
    this.rules = new Rules(moves);
    this.key = Security.generateKey();
    this.computerMove =
      this.moves[Math.floor(Math.random() * this.moves.length)];
    this.hmac = Security.calculateHMAC(this.key, this.computerMove);
  }

  displayMenu() {
    console.log(`HMAC: ${this.hmac}`);
    console.log("Available moves:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  play() {
    this.displayMenu();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter your move: ", (input) => {
      if (input === "0") {
        rl.close();
        return;
      } else if (input === "?") {
        new HelpTable(this.moves).generate();
        rl.close();
        return;
      }

      const userMoveIndex = parseInt(input) - 1;
      if (
        isNaN(userMoveIndex) ||
        userMoveIndex < 0 ||
        userMoveIndex >= this.moves.length
      ) {
        console.log("Invalid input. Please try again.");
        rl.close();
        return;
      }

      const userMove = this.moves[userMoveIndex];
      console.log(`Your move: ${userMove}`);
      console.log(`Computer move: ${this.computerMove}`);
      console.log(
        `You ${this.rules.determineOutcome(userMove, this.computerMove)}!`
      );
      console.log(`HMAC key: ${this.key}`);
      rl.close();
    });
  }
}

try {
  const args = process.argv.slice(2);
  const game = new Game(args);
  game.play();
} catch (error) {
  console.error(error.message);
  console.log("Example: node src/game.js rock paper scissors");
}
