export enum TYPES {
    RESET = 'RESET_SUDOKU',
    SET_SUDOKU = 'SET_SUDOKU'
}

export default {
    reset: (payload?) => ({ type: TYPES.RESET, payload }),
    setSudoku: (payload) => ({ type: TYPES.SET_SUDOKU, payload })
}