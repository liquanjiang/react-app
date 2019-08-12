import * as React from 'react'

export interface Iprops {
    value: number
}

const Counter = ({value}: Iprops) => {
    return <p className={'clicked'}>click: {value} times</p>
}

export default Counter
