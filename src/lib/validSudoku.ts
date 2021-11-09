import { getBitLen, getBit, scanFill, bitToNum, getFill } from '@/utils/utils'

function scanSudoku(sudoku: number[][], dropStack): Map<number, number> {
    const result: Map<number, number> = new Map<number, number>(),
        {cellFill, rowFill, colFill}: Record<string, number[]> = scanFill(sudoku)
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (sudoku[y][x]) continue
            result.set(x + y * 9, (cellFill[Math.floor(y / 3) * 3 + Math.floor(x / 3)]
                | rowFill[y] | colFill[x] | dropStack.get(x + y * 9)) ^ 511)
        }
    }
    return result
}

function getLessFill(record: Map<number, number>): number {
    let lessFillKey: number = [...record.keys()][0]
    for (const key of record.keys()) {
        if (!record.get(key)) return key
        if (getBitLen(record.get(lessFillKey)) > getBitLen(record.get(key))) {
            lessFillKey = key
        }
    }
    return lessFillKey
}

export function fillNStep(sudoku: number[][]): number {
    const fillStack: number[] = [],
        dropStack: Map<number, number> = new Map()
    let record: Map<number, number> = scanSudoku(sudoku, dropStack),
        dropNum: number = -1,
        count: number = 0
    while (record.size && count < 362880) {
        if ([...record.values()].includes(0)) {
            if (dropNum >= 0 && dropStack.has(dropNum)) {
                dropStack.delete(dropNum)
            }
            const fillKey: number = fillStack.pop()
            const y: number = Math.floor(fillKey / 9), x: number = fillKey % 9
            const fill: number = sudoku[y][x]
            sudoku[y][x] = null
            dropStack.set(fillKey, fill | dropStack.get(fillKey))
            dropNum = fillKey
        } else {
            const lessFillKey: number = getLessFill(record)
            dropNum = -1
            const fill: number = getBit(record.get(lessFillKey))
            const y: number = Math.floor(lessFillKey / 9), x: number = lessFillKey % 9
            sudoku[y][x] = fill
            fillStack.push(lessFillKey)
        }
        count++
        record = scanSudoku(sudoku, dropStack)
    }
    return count
}

export function resolveSudoku(sudoku: number[][]): number[][] {
    const result: number[][] = JSON.parse(JSON.stringify(sudoku))
    fillNStep(result)
    return bitToNum(result)
}

function recursionMulti(record: Map<number, number>, sudoku: number[][], results: number[][][]): void {
    if (!record.size) {
        const stringifyResults: string[] = results.map(it => JSON.stringify(it))
        if (!stringifyResults.includes(JSON.stringify(sudoku))) {
            results.push(sudoku)
        }
    } else {
        if (![...record.values()].includes(0)) {
            const lessFillKey: number = getLessFill(record)
            const fill: number = record.get(lessFillKey)
            const copySudoku: number[][] = JSON.parse(JSON.stringify(sudoku))
            if (fill) {
                const y: number = Math.floor(lessFillKey / 9), x: number = lessFillKey % 9
                const fills: number[] = getFill(fill)
                for (const i in fills) {
                    if (fills[i]) {
                        copySudoku[y][x] = fills[i]
                        const copyRecord: Map<number, number> = scanSudoku(copySudoku, new Map())
                        recursionMulti(copyRecord, copySudoku, results)
                    }
                }
            }
        }
    }
}

export function resolveMulti(sudoku: number[][]): number[][][] {
    const copySudoku: number[][] = JSON.parse(JSON.stringify(sudoku)), results: number[][][] = []
    const record: Map<number, number> = scanSudoku(copySudoku, new Map())
    recursionMulti(record, copySudoku, results)
    return results.map(s => bitToNum(s))
}

function recursionValid(record: Map<number, number>, sudoku: number[][], results: number[][][]): boolean {
    if (!record.size) {
        return true
    } else {
        if (![...record.values()].includes(0)) {
            const lessFillKey: number = getLessFill(record)
            const fill: number = record.get(lessFillKey)
            const copySudoku = JSON.parse(JSON.stringify(sudoku))
            if (fill) {
                const y: number = Math.floor(lessFillKey / 9), x: number = lessFillKey % 9
                const fills: number[] = getFill(fill)
                for (const num of fills) {
                    if (num) {
                        copySudoku[y][x] = num
                        const copyRecord: Map<number, number> = scanSudoku(copySudoku, new Map())
                        if (recursionValid(copyRecord, copySudoku, results)) return true
                    }
                }
            }
        }
    }
    return false
}

export function checkValid(sudoku: number[][]): boolean {
    const copySudoku = JSON.parse(JSON.stringify(sudoku)), results = []
    const record: Map<number, number> = scanSudoku(copySudoku, new Map())
    return recursionValid(record, copySudoku, results)
}