import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { map } from 'd3';

const CorporateInfo = props =>{

    //name, finnhub industry, ipo, weburl, phone
    console.log(props)
    return(
        <div>
            <p>Name:{props.compProfile.name}</p>
            <p>Website:{props.compProfile.weburl}</p>
            <p>Phone:{props.compProfile.phone}</p>
            <p>Industry:{props.compProfile.finnhubIndustry}</p>
            <p>IPO:{props.compProfile.ipo}</p>
        </div>
    )
}
const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(CorporateInfo);