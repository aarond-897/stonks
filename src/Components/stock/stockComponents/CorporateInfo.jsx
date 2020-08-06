import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {DataProperty, DataValue, DataPointContainer, Title} from './KeyDataPoints';


const CorporateInfo = props =>{

    console.log(props)
    return(
        <DataPointContainer>
            <Title>Corporate Info</Title>
            <DataProperty>
                Name:<DataValue>{props.compProfile.name}</DataValue>
                </DataProperty>
            <DataProperty>
                Website:<DataValue>{props.compProfile.weburl}</DataValue>
            </DataProperty>
            <DataProperty>
                Phone:<DataValue>{props.compProfile.phone}</DataValue>
            </DataProperty>
            <DataProperty>
                Industry:<DataValue>{props.compProfile.finnhubIndustry}</DataValue>
            </DataProperty>
            <DataProperty>
                IPO:<DataValue>{props.compProfile.ipo}</DataValue>
            </DataProperty>
        </DataPointContainer>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(CorporateInfo);