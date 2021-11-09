export enum TYPES {
    RESET = 'RESET_SELECT_CELL',
    SET_SELECT_CELL = 'SET_SELECT_CELL',
    SHOW_SELECT = 'SHOW_SELECT'
}

export default {
    reset: (payload?) => ({ type: TYPES.RESET, payload }),

    setSelectCell: (payload) => ({ type: TYPES.SET_SELECT_CELL, payload }),

    showSelect: (payload?) => ({ type: TYPES.SHOW_SELECT, payload })
}