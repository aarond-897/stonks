import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const BalanceSheet = props =>{
    const mappedBalanceSheet= props.quarterly.data[0].report.bs.map((item,i)=>(
        <div className='item' key={i}>
            <h3 className='item-label'>{item.label}</h3>
            <h3 className='item-value'>{item.value}</h3>
        </div>
    ))
    return(
        <div>
            {mappedBalanceSheet}
        </div>
    )
}

const mapStateToProps = reduxState=>reduxState.stockReducer;

export default connect(mapStateToProps)(BalanceSheet);