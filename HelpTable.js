const Table = require("cli-table");

class HelpTable {
  constructor(moves) {
    this.moves = moves;
    this.totalMoves = moves.length;
  }

  generate() {
    const table = new Table({
      head: ["", ...this.moves],
    });

    for (let i = 0; i < this.totalMoves; i++) {
      const row = [this.moves[i]];

      for (let j = 0; j < this.totalMoves; j++) {
        if (i === j) {
          row.push("Draw");
        } else if (
          (i > j && i - j <= Math.floor(this.totalMoves / 2)) ||
          (j > i && j - i > Math.floor(this.totalMoves / 2))
        ) {
          row.push("Win");
        } else {
          row.push("Lose");
        }
      }

      table.push(row);
    }

    console.log(table.toString());
  }
}

module.exports = HelpTable;
