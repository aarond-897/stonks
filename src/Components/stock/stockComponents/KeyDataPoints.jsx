import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const DataPointContainer = styled.div`
    background-color: #55606B;
    height: 22vh;
    border: 5px solid grey;
    border-radius: 5%;
    margin-bottom:15%;
    margin-top:2%;
`

export const Title = styled.h3`
    font-size:x-large;
    margin-bottom:5%;
`

export const DataProperty = styled.div`
    color: #F89A29;
    font-size: larger;
    margin-bottom: 3.5%;
    display:flex;
`

export const DataValue = styled.div`
    color: #FFFAFA;
    display:inline-block;
`


const KeyDataPoints = props =>{

        console.log(props)
        let length=props.stockCandles.v.length-1
        let percentDifference= 100 * Math.abs((props.stockCandles.c[length]-props.stockCandles.c[length-1])/ ((props.stockCandles.c[length]+props.stockCandles.c[length-1])/2))
    return(
        <DataPointContainer>
            <Title>Key Data Points</Title>
            <DataProperty>
                Px/Chg 1D: <DataValue>{props.stockCandles.c[length]} / {percentDifference.toFixed(2)}%</DataValue>
            </DataProperty>
            <DataProperty>
                Previous Close: <DataValue>{props.stockCandles.c[length-1]}</DataValue>
            </DataProperty>
            <DataProperty>
                Shares Outstanding: <DataValue>{props.compProfile.shareOutstanding}</DataValue>
            </DataProperty>
            <DataProperty>
                Market Cap:<DataValue>{props.basicFin.metric.marketCapitalization}</DataValue>
            </DataProperty>
            <DataProperty>
                52 Wk High:<DataValue>{props.basicFin.metric["52WeekHigh"]}
                </DataValue>
            </DataProperty>
            <DataProperty>
                52 Wk Low:<DataValue>{props.basicFin.metric["52WeekLow"]}</DataValue>
            </DataProperty>
        </DataPointContainer>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(KeyDataPoints);