import React, { useState, useEffect } from 'react'
import { useStoreContext } from '@/reducers'
import selectCellAction from '@/actions/selectCellAction'
import { ICell } from '@/types/sudoku'

interface IProps {
    num?: ICell
    isStatic?: boolean
    cellIndex: number
    palaceIndex: number
}

const Cell: React.FC<IProps> = ({ num, isStatic, palaceIndex, cellIndex }: IProps) => {
    const getNum = () => {
        if (num instanceof Array) {
            return num
        } else if (num) {
            return [Math.abs(num)]
        } else {
            return []
        }
    }
    const [showNum, setShowNum] = useState(getNum())
    const [, dispatch] = useStoreContext()

    useEffect(() => {
        setShowNum(getNum())
    }, [num])

    const selectAtom = () => {
        dispatch(selectCellAction.setSelectCell({
            showSelect: true,
            position: [palaceIndex, cellIndex],
            selected: showNum
        }))
    }

    const getAtom = () => {
        const atoms = []
        for (let i = 0; i < 9; i++) {
            if (showNum.includes(i + 1)) {
                atoms.push(<span key={i} className={`cell-atom__${i + 1}`} >
                    {i + 1}
                </span>)
            } else {
                atoms.push(<span key={i} />)
            }
        }
        return atoms
    }

    return (
        <>
            {isStatic ? (
                <div className='cell cell__simple cell__static'>
                    <span>{showNum[0]}</span>
                </div>
            ) : (
                <div className={`cell ${showNum.length > 1 ? 'cell__multi' : 'cell__simple'} cell__default`} onClick={selectAtom}>
                    {showNum.length > 1 ? getAtom()
                        : <span>{showNum[0]}</span>
                    }
                </div>
            )}
        </>
    )
}

export default Cell
