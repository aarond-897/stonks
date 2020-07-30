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
import { withRouter } from 'react-router-dom';

const Stock = props =>{
    
    console.log(props)

    return(
        <div>
            {props.compProfile? <>           
            <StockHeader />
             <Candlestick />
            <IncomeStatement />
            <CorporateInfo />
            <Filings />
            <KeyDataPoints />
            <BalanceSheet />
            <CorporateNews /> 
             </>:null}
 
        </div>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer
export default connect(mapStateToProps)(Stock);


