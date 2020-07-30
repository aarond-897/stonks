import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <img src={props.compProfile.logo} alt=""/>
            <p>Ticker:{props.compProfile.ticker}</p>
            <p>Volume:{props.stockCandles.v[length]}</p>
            <p>Current:{props.stockCandles.c[length]}</p>
            <p>Open:{props.stockCandles.o[length]}</p>
            <p>High:{props.stockCandles.h[length]}</p>
            <p>Low:{props.stockCandles.l[length]}</p>
            Add stock
            <input placeholder='qty' value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <button onClick={sendStockQty}>+</button>
        </div>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(withRouter(StockHeader));