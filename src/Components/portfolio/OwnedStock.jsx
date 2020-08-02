import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';

const OwnedStock = props =>{
    console.log(props)
    let [operator, setOperator] = useState('')
    let [quantity, setQuantity] = useState('')

    const deleteStock = ()=>{
        axios.delete(`/api/quantity/aapl`)
            .then(()=>{
                console.log('working delete front end')
            })
    }
    return (
        <div>
            <p>{props.ticker}</p>
            <p>{props.quantity}</p>
            <input placeholder='qty' value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <button>+</button>
            <button>-</button>
            <button onClick={deleteStock}>Delete</button>
        </div>
    )

}

// const mapStateToProps = reduxState =>reduxState.portfolio

export default OwnedStock;