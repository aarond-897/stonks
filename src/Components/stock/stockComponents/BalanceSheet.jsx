import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {MappedContainer, ISDataProperty} from './IncomeStatement'
import { DataValue, Title} from './KeyDataPoints';

const BalanceSheet = props =>{
    const mappedBalanceSheet= props.quarterly.data[0].report.bs.map((item,i)=>(
        <ISDataProperty className='item' key={i}>
            <h3 className='item-label'>{item.label}:</h3>
            <DataValue className='item-value'>{item.value}</DataValue>
        </ISDataProperty>
    ))
    return(
        <MappedContainer>
            <Title>Balance Sheet</Title>
            {mappedBalanceSheet}
        </MappedContainer>
    )
}

const mapStateToProps = reduxState=>reduxState.stockReducer;

export default connect(mapStateToProps)(BalanceSheet);