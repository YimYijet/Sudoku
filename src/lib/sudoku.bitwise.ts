import { filterNum, getRandNum } from '@/utils/utils'

export default class Sudoku {
    private points: number[][] = []

    constructor() {
        for (let i = 0; i < 9; i++) {
            this.points[i] = []
        }
        this.createNewSudoku()
    }
    public createNewSudoku(): void {
        const stack: number[] = []
        let tmp: number[] = [],
            x = 0, y = 0
        while (y <= 8) {
            const index: number = y * 9 + x
            tmp = filterNum(this.getColNum(x, y) | this.getRowNum(x, y) | this.getPalaceNum(x, y) | stack[index])
            if (tmp.length) {
                this.points[y][x] = getRandNum(tmp)
                if (x + 1 === 9) {
                    y++
                }
                x = (x + 1) % 9
            } else {
                stack[index] = 0
                if (x - 1 === -1) {
                    y--
                }
                x = (x + 8) % 9
                stack[index - 1] |= this.points[y][x]
            }
        }
    }

    public getSudoku(): number[][] {
        return this.points
    }

    private getColNum(x: number, y: number): number {
        let result: number = 0
        for (let i = 0; i < y; i++) {
            result |= this.points[i][x]
        }
        return result
    }

    private getRowNum(x: number, y: number): number {
        let result: number = 0
        for (let i = 0; i < x; i++) {
            result |= this.points[y][i]
        }
        return result
    }

    private getPalaceNum(x: number, y: number): number {
        let result: number = 0
        const subX: number = Math.floor(x / 3) * 3, supX: number = subX + 3, subY: number = Math.floor(y / 3) * 3
        for (let i = subY; i < y; i++) {
            for (let j = subX; j < supX; j++) {
                result |= this.points[i][j]
            }
        }
        for (let i = subX; i < x; i++) {
            result |= this.points[y][i]
        }
        return result
    }

}
