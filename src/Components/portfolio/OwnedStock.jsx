import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setStocks} from '../../redux/reducers/stocksOwnedReducer';

const OwnedStock = props =>{
    console.log(props)
    let [amount, setAmount] = useState('')

    
    const changeQuantity=(value)=>{
        console.log('changeqtyworking')
        console.log(value)
        if (value=='minus' && amount>props.quantity){
            alert("can't have negative stock")
        }else{
            axios.put('/api/quantity',{ticker:props.ticker, quantity:amount, operator:value})
            .then(()=>{
                console.log('change qty portfolio retrieve working')
                axios.get('/api/portfolio')
                .then((res)=>{
                    props.setStocks(res.data)
                    setAmount('')
                })
            })
        }
    }

    const deleteStock=(target)=>{
        console.log(target)
        axios.delete(`/api/quantity/${target}`)
            .then(()=>{
                console.log('delete stock working')
                axios.get('/api/portfolio')
                .then((res)=>{
                    props.setStocks(res.data)
                })
            })
    }
    
    return (
        <div>
            <p>{props.ticker.toUpperCase()}</p>
            <p>{props.quantity}</p>
            <p>{props.price}</p>
            <p>{props.total}</p>
            <input placeholder='qty' value={amount} onChange={e => setAmount(e.target.value)}/>
            <button value='add' onClick={e=>changeQuantity(e.target.value)}>+</button>
            <button value='minus' onClick={e=>changeQuantity(e.target.value)}>-</button>
            <button value={props.ticker} onClick={e=>deleteStock(e.target.value)}>Delete</button>
        </div>
    )

}

const mapStateToProps = reduxState =>reduxState

export default connect(mapStateToProps,{setStocks})(OwnedStock);