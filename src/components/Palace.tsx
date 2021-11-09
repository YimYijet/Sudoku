import React from 'react'
import Cell from '@/components/Cell'
import { ICell } from '@/types/sudoku'

interface IProps {
    palace: ICell[]
    palaceIndex: number
}

const Palace: React.FC<IProps> = ({ palace, palaceIndex }: IProps) => {
    return (
        <div className='panel'>
            {palace.map((cell, index) => (
                <Cell cellIndex={index} palaceIndex={palaceIndex} key={index} num={cell} isStatic={typeof cell === 'number' && cell < 0} />
            ))}
        </div>
    )
}

export default Palace