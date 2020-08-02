import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import ProfileInfo from './ProfileInfo';
import axios from 'axios';

const Portfolio = props =>{
    console.log(props)

    const retrieveStocks=()=>{
        axios.get('/api/portfolio')
        .then(()=>{
            console.log('retrieveStocks working')
        })
    }
    return(
        <div>
            <ProfileInfo />
            <button onClick={retrieveStocks}>retrieve stocks</button>
        </div>
    )
}

const mapStateToProps = reduxState =>reduxState.userReducer
export default connect(mapStateToProps)(Portfolio);