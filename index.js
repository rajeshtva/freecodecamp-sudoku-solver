const SudokuSolver = require("./controllers/sudoku-solver");

const puzzle = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const answer = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';

const solver = new SudokuSolver();
// solver.generateBoard(puzzle)

let solution = solver.solve(puzzle);

console.log(solution, solution === answer, solver.completed)
