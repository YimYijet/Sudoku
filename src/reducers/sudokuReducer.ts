import { TYPES } from '@/actions/sudokuAction'
import { ICell } from '@/types/sudoku'

interface ISudokuStore {
    sudoku: ICell[][]
}

export const sudokuStore: ISudokuStore = {
    sudoku: [],
}

export function reducer(state, action): ISudokuStore {
    switch (action.type) {
        case TYPES.RESET:
            console.log('hello')
        case TYPES.SET_SUDOKU: {
            state.sudoku = action.payload
            break
        }
    }
    return state
}
