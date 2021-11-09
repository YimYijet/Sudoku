import React, { useState, useEffect } from 'react'
import Palace from '@/components/Palace'
import SelectPanel from '@/components/SelectPanel'
import GeneratePanel from '@/components/GeneratePanel'
import { rowToPalace, bitToNum } from '@/utils/utils'
import { ICell } from '@/types/sudoku'

interface IProps {
    sudoku: ICell[][]
}

const Sudoku: React.FC<IProps> = ({ sudoku }: IProps) => {
    const [originSudoku, setOriginSudoku] = useState([])
    const [complete, setComplete] = useState(false)

    const formatSudoku = (sudoku) => {
        return sudoku.map(p => {
            return p.map(c => {
                if (c instanceof Array) {
                    return c.length === 1 ? c[0] : 0
                } else {
                    return Math.abs(c)
                }
            })
        })
    }

    useEffect(() => {
        if (originSudoku.length) {
            const resultSudoku = formatSudoku(sudoku)
            const original = formatSudoku(rowToPalace(bitToNum(originSudoku)))
            if (JSON.stringify(resultSudoku) === JSON.stringify(original)) {
                setComplete(true)
            }
        }
    }, [sudoku])

    return (
        <div className='sudoku-wrapper'>
            <div className={`sudoku ${complete ? 'sudoku__complete' : ''}`}>
                {sudoku.map((palace, index) => (
                    <Palace palaceIndex={index} key={index} palace={palace} />
                ))}
            </div>
            <SelectPanel />
            <GeneratePanel setOriginSudoku={setOriginSudoku} />
        </div>
    )
}

export default Sudoku