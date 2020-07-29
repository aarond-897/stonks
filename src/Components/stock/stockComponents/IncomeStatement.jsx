import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const IncomeStatement = props =>{
    console.log(props)
        const mappedIncomeStatement= props.quarterly.data[0].report.ic.map((item,i)=>(
            <div className='item' key={i}>
                <h3 className='item-label'>{item.label}</h3>
                <h3 className='item-value'>{item.value}</h3>
            </div>
        ))

    
    console.log(props)

    return(
        <div>
            {mappedIncomeStatement}
            
        </div>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(IncomeStatement);