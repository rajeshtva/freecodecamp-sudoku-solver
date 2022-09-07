class SudokuSolver {
  constructor() {
    this.board = Array(9).fill().map(() => Array(9).fill('.'));
    this.completed = false;
  }

  validate(puzzleString) {
    
  }

  generateBoard(puzzle) {
    let currentIndex = 0;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.board[i][j] = puzzle[currentIndex++];
      }
    }
  }

  checkRowPlacement(row, column, value) {
    for (let j = 0; j < 9; j++) {
      if (j == column) continue;
      if (this.board[row][j] == value) return false;
    }

    return true;
  }

  checkColPlacement(row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (row == i) continue;
      if (this.board[i][column] == value) return false;
    }

    return true;
  }

  checkRegionPlacement(row, column, value) {
    let minI = parseInt(row / 3) * 3;
    let minJ = parseInt(column / 3) * 3;

    let maxI = minI + 2;
    let maxJ = minJ + 2;

    for (let ii = minI; ii <= maxI; ii++) {
      for (let jj = minJ; jj <= maxJ; jj++) {
        if (row === ii && column == jj) continue;

        if (this.board[ii][jj] == value) {
          return false;
        }
      }
    }

    return true;
  }

  getFirstEmptyPosition() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] === '.') {
          return [i, j];
        }
      }
    }

    return [9, 9];
  }

  solveSudoku() {
    let allowedDigits = [];
    let current;

    current = this.getFirstEmptyPosition();

    if (current[0] === 9 && current[1] === 9) {
      this.completed = true;
      return;
    }

    allowedDigits = this.getAllowedDigits(current[0], current[1]);

    if (allowedDigits.length === 0) {
      // throw new Error('sudoku not possible');
      return false;
    };

    for (let k = 0; k < allowedDigits.length; k++) {
      this.board[current[0]][current[1]] = allowedDigits[k];
      this.solveSudoku();

      if (this.completed == true) {
        return true;
      }

      this.board[current[0]][current[1]] = '.';
    }
  }


  getAllowedDigits(i, j) {
    let minI = parseInt(i / 3) * 3;
    let minJ = parseInt(j / 3) * 3;
    let maxI = minI + 2;
    let maxJ = minJ + 2;

    const temp = Array(10).fill(false);

    for (let ii = minI; ii <= maxI; ii++) {
      for (let jj = minJ; jj <= maxJ; jj++) {
        if (this.board[ii][jj] != '.') {
          temp[this.board[ii][jj]] = true;
        }
      }
    }

    for (let jj = 0; jj < 9; jj++) {
      if (this.board[i][jj] != '.') {
        temp[this.board[i][jj]] = true;
      }
    }

    for (let ii = 0; ii < 9; ii++) {
      if (this.board[ii][j] != '.')
        temp[this.board[ii][j]] = true;
    }

    let output = [];
    for (let k = 1; k <= 9; k++) {
      if (temp[k] === false) {
        output.push(k);
      }
    }

    return output;
  }

  solve() {
    this.solveSudoku();

    if (this.completed == false) {
      console.log('something else')
      return '';
    };

    let solution = this.board.flat().join('');

    return solution;
  }
}

module.exports = SudokuSolver;

