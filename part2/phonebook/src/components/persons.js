import React from 'react'

const Persons = ({ personRows }) => {
    return(
    <ul className='numlist'>
    {personRows()}
    </ul>
    )
}

export default Persons