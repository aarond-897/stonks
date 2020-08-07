import React, { useState, useEffect, Component } from 'react';
import './stock.css'
import StockHeader from './stockComponents/StockHeader';
import Candlestick  from './stockComponents/Candlestick';
import IncomeStatement  from './stockComponents/IncomeStatement';
import CorporateInfo  from './stockComponents/CorporateInfo';
import Filings  from './stockComponents/Filings';
import KeyDataPoints  from './stockComponents/KeyDataPoints';
import BalanceSheet  from './stockComponents/BalanceSheet';
import CorporateNews  from './stockComponents/CorporateNews';
import {setStock} from '../../redux/reducers/stockReducer';
import {connect} from 'react-redux';
import styled from 'styled-components';

const StockContainer=styled.div`
    height:100%;
    background-color:#161920;
`
const InfoContainer = styled.div`
    display:flex;
    @media (max-width: 768px) {
    flex-direction:row;
    flex-wrap:wrap;
  } 
`

const KeyDataAndInfo = styled.div`
    display:flex;
    flex-direction:column;
    width:30%;
    @media (max-width: 768px) {
    width:100%;
    flex-direction:row;
    flex-wrap:wrap;
  } 
`

const Stock = props =>{
    
    console.log(props)

    return(
        <StockContainer>
            {props.compProfile? <>           
            <StockHeader />
             <Candlestick />
             <InfoContainer>
            <KeyDataAndInfo>
                <KeyDataPoints />
                <CorporateInfo />
            </KeyDataAndInfo>
            <IncomeStatement />
            <BalanceSheet />
            <CorporateNews /> 
            </InfoContainer>
            {/* <Filings /> */}
             </>:null}
 
        </StockContainer>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer
export default connect(mapStateToProps)(Stock);


