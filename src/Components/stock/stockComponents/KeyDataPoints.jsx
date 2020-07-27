import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const KeyDataPoints = props =>{

        console.log(props)
        let percentDifference= 100 * Math.abs((props.stockCandles.c[251]-props.stockCandles.c[250])/ ((props.stockCandles.c[251]+props.stockCandles.c[250])/2))
    return(
        <div>
            <p>Px/Chg 1D:{props.stockCandles.c[251]} / {percentDifference}</p>
            <p>Previous Close:{props.stockCandles.c[250]}</p>
            <p>Shares Outstanding{props.compProfile.shareOutstanding}</p>
            <p>Market Cap:{props.basicFin.metric.marketCapitalization}</p>
            <p>52 Wk High:{props.basicFin.metric["52WeekHigh"]}</p>
            <p>52 Wk Low:{props.basicFin.metric["52WeekLow"]}</p>
        </div>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(KeyDataPoints);