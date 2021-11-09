export const NUM: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const NUM_MAP: Map<number, number> = ((): Map<number, number> => {
    const result: Map<number, number> = new Map<number, number>()
    for (let i = 0; i < 9; i++) {
        result.set(i + 1, 1 << i)
    }
    return result
})()

export const SUDOKU_INDEX: Set<number> = ((): Set<number> => {
    const result: Set<number> = new Set()
    for (let i = 0; i < 81; i++) {
        result.add(i)
    }
    return result
})()

export const DIFFICULTY: Record<string, number> = {
    easy: 30,
    medium: 60,
    hard: 120,
    insane: 300,
    inhuman: 780
}

export const INDEX_CODE: string[] = ((): string[] => {
    const result: string[] = []
    const aCode = 97
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 20; j++) {
            const str = `${i > 0 ? String.fromCharCode(i + aCode) : ''}${String.fromCharCode(j + aCode)}`
            result.push(str)
        }
    }
    return result
})()

export const DIFFICULTY_MAP: Record<string, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
    insane: '极难',
    inhuman: '地狱'
}