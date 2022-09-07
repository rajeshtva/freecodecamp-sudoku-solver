'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  app.route('/api/check')
    .post((req, res) => {
      try {
        let { puzzle, coordinate, value } = req.body;

        if (!puzzle || !coordinate || !value) return res.json({ error: 'Required field(s) missing' });
        if (!/^[0-9.]*$/gm.test(req.body.puzzle)) return res.json({ error: 'Invalid characters in puzzle' })
        if (req.body.puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })

        let row = coordinate[0], col = +coordinate[1];

        row = row.toLowerCase();

        if (coordinate.length != 2 || row < 'a' || row > 'i' || col < 1 || col > 9) {
          return res.json({ error: 'Invalid coordinate' })
        }

        if (isNaN(value) || value < 1 || +value > 9) return res.json({ error: 'Invalid value' })

        const solver = new SudokuSolver();

        solver.generateBoard(req.body.puzzle);

        console.log(solver.board)

        row = row.charCodeAt() - 'a'.charCodeAt();
        col = +col - 1;

        if (solver.board[row][col] == value) return res.json({ valid: true, })

        let rowValidity = false, colValidity = false, regionValidity = false;
        rowValidity = solver.checkRowPlacement(row, col, +value);
        colValidity = solver.checkColPlacement(row, col, +value);
        regionValidity = solver.checkRegionPlacement(row, col, +value);

        if (rowValidity && colValidity && regionValidity) return res.json({ valid: true, });

        const conflict = [];

        if (!rowValidity) conflict.push('row');
        if (!colValidity) conflict.push('column');
        if (!regionValidity) conflict.push('region');

        return res.json({ valid: false, conflict })
      } catch (e) {
        console.log(e);
        return res.json({ error: 'something wrong happened.' })
      }

    });

  app.route('/api/solve')
    .post((req, res) => {

      const solver = new SudokuSolver();

      if (!req.body.puzzle) return res.json({ error: 'Required field missing' })
      if (!/^[0-9.]*$/gm.test(req.body.puzzle)) return res.json({ error: 'Invalid characters in puzzle' })
      if (req.body.puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })

      try {
        solver.generateBoard(req.body.puzzle);

        let solution = solver.solve();
        console.log({ solution, puzzle: req.body.puzzle, completed: solver.completed })
        if (solution.length === 0)
          return res.json({ error: 'Puzzle cannot be solved' })

        return res.json({ solution });
      } catch (error) {
        console.log(error)
        return res.json({ error: 'something worn happened.' })
      }
    });
};
