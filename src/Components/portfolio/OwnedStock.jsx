import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setStocks} from '../../redux/reducers/stocksOwnedReducer';
import styled from 'styled-components';

const OwnedStockContainer = styled.div`
    display:flex;
    height:8vh;
    margin: 2% 2%;
    background-color: #161920;
    justify-content:center;
    align-items:center;
    border-radius:5%;
`
 const PortfolioProperty = styled.div`
    color: #F89A29;
    font-size: large;
    margin-right: 2%;
    display:flex;
    align-items:center;
`

 const PortfolioValue = styled.div`
    color: #FFFAFA;
    display:inline-block;
`

const Input = styled.input`
    height:40%;
    width: 8%;
`

const Button = styled.button`
    border-radius:50%;
    border:1px solid #F89A29;
    margin-right:1%;
    border-radius:5%;
    background-color: #161920;
    color: #FFFAFA;
    &:hover{cursor:pointer};
`

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
        <OwnedStockContainer>
            <PortfolioProperty>Ticker:        <PortfolioValue>   {props.ticker.toUpperCase()}</PortfolioValue></PortfolioProperty>
            <PortfolioProperty>Amt. Owned:    <PortfolioValue>{props.quantity}</PortfolioValue></PortfolioProperty>
            <PortfolioProperty>Price Per Share<PortfolioValue>{props.price}</PortfolioValue></PortfolioProperty>
            <PortfolioProperty>Total Amt.     <PortfolioValue>{props.total}</PortfolioValue></PortfolioProperty>
            <Input placeholder='Qty' value={amount} onChange={e => setAmount(e.target.value)}/>
            <Button value='add' onClick={e=>changeQuantity(e.target.value)}>+</Button>
            <Button value='minus' onClick={e=>changeQuantity(e.target.value)}>-</Button>
            <Button value={props.ticker} onClick={e=>deleteStock(e.target.value)}>Delete</Button>
        </OwnedStockContainer>
    )

}

const mapStateToProps = reduxState =>reduxState

export default connect(mapStateToProps,{setStocks})(OwnedStock);