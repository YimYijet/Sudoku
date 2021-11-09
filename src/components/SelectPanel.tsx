import React, { useState, useEffect } from 'react'
import { useStoreContext } from '@/reducers'
import selectCellAction from '@/actions/selectCellAction'
import sudokuAction from '@/actions/sudokuAction'

const Palace: React.FC = () => {
    const [translate, setTranslate] = useState(['0', '0'])
    const [{ selectCell: { showSelect, selected = [], position = [0, 0] }, sudoku: { sudoku } }, dispatch] = useStoreContext()
    useEffect(() => {
        const x = (position[0] % 3) * 3 + position[1] % 3
        const y = Math.floor(position[0] / 3) * 3 + Math.floor(position[1] / 3)
        setTranslate([`${x * 100}%`, `${y * 100}%`])
    }, [showSelect])

    const selectAtom = (num) => {
        const selectedNum = selected.includes(num)
            ? selected.filter(it => it !== num)
            : [...selected, num]
        dispatch(selectCellAction.setSelectCell({
            showSelect,
            position,
            selected: selectedNum
        }))
    }

    const getAtom = () => {
        const atoms = []
        for (let i = 0; i < 9; i++) {
            atoms.push(<span key={i} onClick={() => selectAtom(i + 1)}
                className={`cell-atom__${i + 1} ${selected.includes(i + 1) && 'cell-atom__selected'}`}>
                {i + 1}
            </span>)
        }
        return atoms
    }

    const cancelSelect = (e) => {
        if (e.target.nodeName === 'DIV') {
            const newSudoku = [...sudoku]
            if (typeof newSudoku[position[0]][position[1]] !== 'number') {
                newSudoku[position[0]][position[1]] = selected
                dispatch(sudokuAction.setSudoku(newSudoku))
            }
            dispatch(selectCellAction.reset())
        }
    }

    return (
        <div className='select-panel-wrapper' style={{
            display: showSelect ? 'initial' : 'none'
        }} onClick={cancelSelect}>
            <div className='select-panel'>
                <div className='select-cell' style={{
                    transform: `translate(${translate[0]}, ${translate[1]})`
                }}>
                    {getAtom()}
                </div>
            </div>
        </div>
    )
}

export default Palace