import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const StockHeaderContainer = styled.div`
    height: 4vh;
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    /* background: #161920; */
    margin-bottom:1%;
`

// const HeaderImage = styled.img`
//     height:100%;
// `

const AddStock = styled.div`
    display:flex;
    margin-right:3%;
`

const HeaderProperty = styled.div`
    color: #F89A29;
    @media (max-width: 768px) {
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    margin-top:2.5%;
    margin-left:1%;
    font-size: 10px;
    width:10%;
    height:100%;
    margin-right:2%;
  } 
`

const HeaderValue = styled.div`
    color: #FFFAFA;
    display:inline-block;
    @media (max-width: 768px) {
    margin-top:2.5%;
    margin-left:1%;
    font-size: 10px;
    width:10%;
    height:100%;
  } 
`

const Ticker = styled.h1`
    color: #FFFAFA;
    font-size: 2.4vh;
    margin-left:3%;
    font-family:Arial, Helvetica, sans-serif;
    @media (max-width: 768px) {
    margin-top:2.5%;
    margin-left:1%;
    font-size: medium;
    width:30%;
    height:100%;
  } 
`

const Input = styled.input`
    @media (max-width: 768px) {
    /* margin-top:2.5%; */
    font-size: small;
    width:30%;
    height:100%;
  } 
`

const Button = styled.button`
    @media (max-width: 768px) {
    /* margin-top:2.5%; */
    font-size: xx-small;
    width:75%;
    height:3vh;
  } 
`

const StockHeader = props =>{
    console.log(props)
    console.log(props.compProfile)
    let [quantity, setQuantity] = useState(0)
    let length=props.stockCandles.v.length-1

    const sendStockQty=()=>{
        console.log('sendStockQty working')
        axios.post('/api/stock',{ticker:props.match.params.ticker.toLowerCase()})
            .then((res)=>{
                console.log('put working')
                axios.post('/api/quantity',{ticker:props.match.params.ticker, quantity})
                    .then(()=>{
                        setQuantity(0)
                    })
            })
    }

    return(
        <StockHeaderContainer>
            {/* <HeaderImage src={props.compProfile.logo} alt=""/> */}
            <Ticker>{props.compProfile.ticker}</Ticker>
            <HeaderProperty>
                Volume: <HeaderValue>{props.stockCandles.v[length]}</HeaderValue>
            </HeaderProperty>
            <HeaderProperty>
                Current: <HeaderValue>{props.stockCandles.c[length]}</HeaderValue>
            </HeaderProperty>
            <HeaderProperty>
                Open: <HeaderValue>{props.stockCandles.o[length]}</HeaderValue>
            </HeaderProperty>
            <HeaderProperty>
                High:<HeaderValue>{props.stockCandles.h[length]}</HeaderValue>
                </HeaderProperty>
            <HeaderProperty>
                Low:<HeaderValue>{props.stockCandles.l[length]}</HeaderValue>
            </HeaderProperty>
            <AddStock>
            {/* <HeaderProperty></HeaderProperty> */}
            <Input placeholder='qty' value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <Button onClick={sendStockQty}>Add stock</Button>
            </AddStock>
        </StockHeaderContainer>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(withRouter(StockHeader));