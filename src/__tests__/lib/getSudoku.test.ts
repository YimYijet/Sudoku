import getSudoku from '../../lib/getSudoku'
import Sudoku from '../../lib/sudoku.bitwise'

describe('Lib', () => {
    let sudoku: Sudoku
    beforeAll(() => {
        sudoku = new Sudoku()
    })
    test('Get Sudoku', () => {
        expect(getSudoku(sudoku.getSudoku(), 'easy')).toBe(Array)
    })
    test('')
})
