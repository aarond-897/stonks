import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {DataProperty, DataValue, DataPointContainer, Title} from './KeyDataPoints';
import {MappedContainer, ISDataProperty} from './IncomeStatement'

const NewsContainer = styled(MappedContainer)`
    /* display:flex; */
    ::-webkit-scrollbar {
  width:0px;
  background:transparent;
}
`

const CorporateNews = props =>{
    const dailyNews = props.companyNews.map((item,i)=>(
        <DataProperty className='article'>
            <p>{item.headline}</p>
            <DataValue>{item.summary}</DataValue>
            <DataValue>{item.url}</DataValue>
        </DataProperty>
    ))
    return(
        <NewsContainer>
            <Title>Daily News</Title>
            {dailyNews}
        </NewsContainer>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(CorporateNews);