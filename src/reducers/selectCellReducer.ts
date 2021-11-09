import { TYPES } from '@/actions/selectCellAction'

interface ISelectCellStore {
    position: [number, number]
    selected: number[],
    showSelect: boolean
}

export const selectCellStore: ISelectCellStore = {
    position: [0, 0],
    selected: [],
    showSelect: false
}

export function reducer(state, action): ISelectCellStore {
    switch (action.type) {
        case TYPES.RESET: {
            state.selected = []
            state.showSelect = false
            break
        }
        case TYPES.SET_SELECT_CELL: {
            state = action.payload
            break
        }
        case TYPES.SHOW_SELECT: {
            state.showSelect = true
            break
        }
    }
    return state
}
