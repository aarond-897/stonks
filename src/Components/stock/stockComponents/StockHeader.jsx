import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const StockHeader = props =>{
    console.log(props)
    console.log(props.compProfile)

    return(
        <div>
            {props.compProfile? <><img src={props.compProfile.logo} alt=""/>
            <p>Ticker:{props.compProfile.ticker}</p>
            <p>Volume:{props.stockCandles.v[251]}</p>
            <p>Current:{props.stockCandles.c[251]}</p>
            <p>Open:{props.stockCandles.o[251]}</p>
            <p>High:{props.stockCandles.h[251]}</p>
            <p>Low:{props.stockCandles.l[251]}</p>
            StockHeader</>:null}
        </div>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(StockHeader);