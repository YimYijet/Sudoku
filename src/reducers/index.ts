import React, { useContext, useReducer } from 'react'
import { reducer as sudokuReducer, sudokuStore } from '@/reducers/sudokuReducer'
import { reducer as selectCellReducer, selectCellStore } from '@/reducers/selectCellReducer'

const StoreContext = React.createContext([])

export default StoreContext

export const useStoreContext = () => {
    const storeReducer = useContext(StoreContext)
    return storeReducer
}

export const storeReducers = () => {
    return useReducer(({ sudoku, selectCell }, action) => ({
        sudoku: sudokuReducer(sudoku, action),
        selectCell: selectCellReducer(selectCell, action)
    }), {
        sudoku: sudokuStore,
        selectCell: selectCellStore
    })
}
