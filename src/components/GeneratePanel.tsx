import React, { useRef, useState, useEffect } from 'react'
import { DIFFICULTY_MAP } from '@/constants/common'
import sudokuActions from '@/actions/sudokuAction'
import SudokuBitwise from '@/lib/sudoku.bitwise'
import getSudoku from '@/lib/getSudoku'
import { useStoreContext } from '@/reducers'
import { generateCode, generateSudoku, rowToPalace } from '@/utils/utils'

interface IProps {
    setOriginSudoku: (sudoku: number[][]) => void
}

const GeneratePanel: React.FC<IProps> = ({ setOriginSudoku }: IProps) => {
    const [originSudoku] = useState(new SudokuBitwise())
    const [code, setCode] = useState('')
    const [, dispatch] = useStoreContext()
    const difficultyRef = useRef<HTMLSelectElement>()
    const codeRef = useRef<HTMLInputElement>()

    const generateByDifficulty = () => {
        const newSudoku = originSudoku.getSudoku()
        setOriginSudoku(newSudoku)
        const sudoku = getSudoku(newSudoku, difficultyRef.current.value)
        setCode(generateCode(sudoku))
        dispatch(sudokuActions.setSudoku(rowToPalace(sudoku)))
    }

    useEffect(() => {
        generateByDifficulty()
    }, [])

    const generateByCode = () => {
        if (!codeRef.current.value) return
        setCode(codeRef.current.value)
        const sudoku = generateSudoku(codeRef.current.value)
        dispatch(sudokuActions.setSudoku(rowToPalace(sudoku)))
    }

    return (
        <div>
            <div>{code}</div>
            <div>
                <select ref={difficultyRef}>
                    {Object.entries(DIFFICULTY_MAP).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
                </select>
                <button onClick={generateByDifficulty} disabled={!difficultyRef.current || !difficultyRef.current.value}>生成</button>
            </div>
            <div>
                <input ref={codeRef} placeholder='输入code' />
                <button onClick={generateByCode} disabled={!codeRef.current}>生成</button>
            </div>
            <div><b>最难数独code：</b>8j36f7b9a2c5c7g457e1c3c1d68b85c1b9d4b</div>
        </div>
    )
}

export default GeneratePanel