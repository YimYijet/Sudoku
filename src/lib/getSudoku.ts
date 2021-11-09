import { DIFFICULTY, SUDOKU_INDEX } from '@/constants/common'
import { fillNStep, checkValid } from '@/lib/validSudoku'
import { ICoordinate } from '@/types/sudoku'
import { getFill, bitToNum } from '@/utils/utils'

function removeAble(stack: Set<number>, avoidMulti: number[]): number {
    const tempStack = new Set([...stack])
    avoidMulti.forEach(num => tempStack.delete(num))
    const cell = Math.floor(tempStack.size * Math.random())
    return [...tempStack][cell]
}

function checkFill({ y, x }: ICoordinate, sudoku: number[][], fill: number) {
    let filled: number = 0
    for (let i = 0; i < 9; i++) {
        const _y: number = 3 * Math.floor(y / 3) + Math.floor((i + 3) / 3) % 3, _x: number = 3 * Math.floor(x / 3) + (i + 3) % 3
        filled |= sudoku[(y + i) % 9][x] | sudoku[y][(x + i) % 9]
            | sudoku[_y][_x]
    }
    const unfilled: number[] = getFill((filled | fill) ^ 511)
    if (!unfilled.length) return false
    for (const num of unfilled) {
        if (num) {
            sudoku[y][x] = num
            if (checkValid(sudoku)) return true
        }
    }
    return false
}

export default function getSudoku(sudoku: number[][], difficulty: string): number[][] {
    const stack: Set<number> = SUDOKU_INDEX, avoidMulti: number[] = [],
        result: number[][] = JSON.parse(JSON.stringify(sudoku)),
        difficultyMin: number = DIFFICULTY[difficulty]
    let difficultyCode: number = 0
    while (difficultyMin > difficultyCode) {
        const cell: number = removeAble(stack, avoidMulti)
        if (isNaN(Number(cell))) break
        const y: number = Math.floor(cell / 9), x: number = cell % 9
        const copySudoku: number[][] = JSON.parse(JSON.stringify(result))
        copySudoku[y][x] = null
        if (checkFill({ y, x }, copySudoku, result[y][x])) {
            difficultyCode = 0
            avoidMulti.push(cell)
        } else {
            result[y][x] = null
            difficultyCode = fillNStep(JSON.parse(JSON.stringify(result)))
        }
    }
    return bitToNum(result)
}
