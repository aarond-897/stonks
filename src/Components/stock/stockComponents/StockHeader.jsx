import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const StockHeader = props =>{
    console.log(props)
    console.log(props.compProfile)
    let length=props.stockCandles.v.length-1

    return(
        <div>
            {props.compProfile? <><img src={props.compProfile.logo} alt=""/>
            <p>Ticker:{props.compProfile.ticker}</p>
            <p>Volume:{props.stockCandles.v[length]}</p>
            <p>Current:{props.stockCandles.c[length]}</p>
            <p>Open:{props.stockCandles.o[length]}</p>
            <p>High:{props.stockCandles.h[length]}</p>
            <p>Low:{props.stockCandles.l[length]}</p>
            StockHeader</>:null}
        </div>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(StockHeader);