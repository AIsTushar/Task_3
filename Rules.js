class Rules {
  constructor(moves) {
    this.moves = moves;
    this.totalMoves = moves.length;
  }

  determineOutcome(userMove, computerMove) {
    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);
    const half = Math.floor(this.totalMoves / 2);

    if (userIndex === computerIndex) {
      return "Draw";
    } else if (
      (userIndex > computerIndex && userIndex - computerIndex <= half) ||
      (computerIndex > userIndex && computerIndex - userIndex > half)
    ) {
      return "Win";
    } else {
      return "Lose";
    }
  }
}

module.exports = Rules;
