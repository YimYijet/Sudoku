import React from 'react'
import SudokuPanel from '@/components/sudoku'
import StoreContext, { storeReducers } from '@/reducers'

import '@/styles/app.sass'

export default function App() {
    const store = storeReducers()
    const [{ sudoku }] = store

    return (
        <div>
            <StoreContext.Provider value={store}>
                <SudokuPanel sudoku={sudoku.sudoku}/>
            </StoreContext.Provider>
        </div>
    )
}
