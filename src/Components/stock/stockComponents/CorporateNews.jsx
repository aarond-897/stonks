import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const CorporateNews = props =>{
    const dailyNews = props.companyNews.map((item,i)=>(
        <div className='article'>
            <p>{item.headline}</p>
            <p>{item.summary}</p>
            <p>{item.url}</p>
            <p>Time</p>
        </div>
    ))
    return(
        <div>
            {dailyNews}
        </div>
    )
}

const mapStateToProps = reduxState =>reduxState.stockReducer;

export default connect(mapStateToProps)(CorporateNews);