import { NUM, NUM_MAP, INDEX_CODE } from '@/constants/common'

export function getFill(num: number): number[] {
    const result: number[] = []
    let i = 0
    while (num) {
        if (num & 1) {
            result.push(1 << i)
        }
        num >>= 1
        i++
    }
    return result
}

export function filterNum(filledNum: number): number[] {
    if (!filledNum) {
        return NUM
    } else {
        filledNum ^= 511
        return getFill(filledNum)
    }
}

export function getRandNum(numbers: number[]): number {
    return numbers[Math.floor(numbers.length * Math.random())]
}

export function scanFill(sudoku: number[][]): Record<string, number[]> {
    const cellFill: number[] = [], rowFill: number[] = [], colFill: number[] = []
    for (let i = 0; i < 9; i++) {
        let cellNum: number = 0, rowNum: number = 0, colNum: number = 0
        const subX: number = (i % 3) * 3, subY: number = Math.floor(i / 3) * 3
        for (let j = 0; j < 9; j++) {
            cellNum |= sudoku[subY + Math.floor(j / 3)][subX + j % 3]
            rowNum |= sudoku[i][j]
            colNum |= sudoku[j][i]
        }
        cellFill.push(cellNum)
        rowFill.push(rowNum)
        colFill.push(colNum)
    }
    return { cellFill, rowFill, colFill }
}

export function numToBit(sudoku: number[][]): number[][] {
    const result: number[][] = JSON.parse(JSON.stringify(sudoku))
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (sudoku[y][x]) {
                result[y][x] = NUM_MAP.get(sudoku[y][x])
            }
        }
    }
    return result
}

export function bitToNum(sudoku: number[][]): number[][] {
    const result: number[][] = JSON.parse(JSON.stringify(sudoku))
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (sudoku[y][x]) {
                result[y][x] = sudoku[y][x].toString(2).length
            }
        }
    }
    return result
}

export function rowToPalace(sudoku: number[][]): number[][] {
    const result: number[][] = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const index: number = Math.floor(i / 3) * 3 + Math.floor(j / 3)
            const num: number = sudoku[i][j] ? -sudoku[i][j] : sudoku[i][j]
            if (result[index]) {
                result[index].push(num)
            } else {
                result[index] = [num]
            }
        }
    }
    return result
}

// 获取输入值有几位值位1
export function getBitLen(num: number): number {
    return (num.toString(2).match(/1/g) || '').length
}

// 获取输入值最高位的值 如 130 -> 128
export function getBit(num: number): number {
    return 1 << (num.toString(2).length - 1)
}

export function generateCode(sudoku: number[][]): string {
    return `${JSON.stringify(sudoku).replace(/null/g, '').replace(/\[|\]/g, '')},`
        .replace(/(\w)\,/g, '$1')
        .replace(/\,{1,}/g, (m) => INDEX_CODE[m.length - 1])
}

export function generateSudoku(code: string): number[][] {
    const str: string = code.replace(/[^\d]/g, (m) => `${'0'.repeat(INDEX_CODE.indexOf(m) + 1)}`)
        .split('').join(',').replace(/((\d\,){8}\d)/g, '$1]').replace(/\]\,/g, '],[')
        .replace(/0/g, 'null')
    return JSON.parse(`[[${str}]`)
}
