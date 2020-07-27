import React, { useState, useEffect } from 'react';
import StockHeader from './stockComponents/StockHeader';
import Candlestick  from './stockComponents/Candlestick';
import IncomeStatement  from './stockComponents/IncomeStatement';
import CorporateInfo  from './stockComponents/CorporateInfo';
import Filings  from './stockComponents/Filings';
import KeyDataPoints  from './stockComponents/KeyDataPoints';
import BalanceSheet  from './stockComponents/BalanceSheet';
import CorporateNews  from './stockComponents/CorporateNews';

const Stock = props =>{

    return(
        <div>
            <StockHeader />
            <Candlestick />
            <IncomeStatement />
            <CorporateInfo />
            <Filings />
            <KeyDataPoints />
            <BalanceSheet />
            <CorporateNews />
        </div>
    )
}

export default Stock;