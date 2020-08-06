import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {DataProperty, DataValue, DataPointContainer, Title} from './KeyDataPoints';

const MappedIncomeStatementContainer=styled(DataPointContainer)`
    margin-left:2%;
    background-color: #55606B;
    height: 52vh;
    border: 5px solid grey;
    width:35%;
    margin-top:.27%;
    overflow: auto;
`

const ISTitle=styled(Title)`
    margin-bottom:2%;
`

const ISDataProperty=styled(DataProperty)`
    font-size: larger;
    margin-bottom:2.4%;
`

const IncomeStatement = props =>{
    console.log(props)
        const mappedIncomeStatement= props.quarterly.data[0].report.ic.map((item,i)=>(
            <ISDataProperty className='item' key={i}>
                <h3 className='item-label'>{item.label}:</h3>
                <DataValue className='item-value'>{item.value}</DataValue>
            </ISDataProperty>
        ))

    
    console.log(props)

    return(
        <MappedIncomeStatementContainer>
            <ISTitle>Income Statement</ISTitle>
            {mappedIncomeStatement}
            
        </MappedIncomeStatementContainer>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(IncomeStatement);