import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import ProfileInfo from './ProfileInfo';
import axios from 'axios';
import {setStocks} from '../../redux/reducers/stocksOwnedReducer'
import PortfolioStocks from './PortfolioStocks'
import Treemap from './Treemap'
import styled, {keyframes, animation} from 'styled-components';
import {AnimatedBackground} from '../login/Login';

const PortfolioContainer = styled.div`
    display:flex;
    height:100%;
    animation: 5s ${AnimatedBackground}  alternate;
    opacity:1;
    background: linear-gradient(#E9EDF6,#E3E7F0);
    @media (max-width: 1550px) {
        flex-direction:column;
        height: 100%;
        width:100%;
        border-radius:0%;
  }       
`
const InfoAndPortfolio = styled.div`
width:40%;
height:95vh;
    @media (max-width: 1550px) {
        flex-direction:column;
        height: 50%;
        width:100%;
        border-radius:0%;
  }  
`

const NewPortfolioContainer = styled.div`
    height:100vh;
    width:100%;
`

const AnimatedArrow = keyframes`
    from{
        top:0%;
    }
    to{
        top: -8%;
    }
`;

const Arrow = styled.div`
    position:relative;   
    text-align:center;
    margin-top: 15%;
    font-size:75px;
    animation: ${AnimatedArrow} 1s infinite alternate;
`;

const PleaseSearch = styled.h1`
    font-size: 3.5vw;
    font-family: Times;
`

const Portfolio = props =>{
    console.log(props)

    useEffect(()=>{
        console.log('use effect working')
        retrieveStocks()
    },[])

    const retrieveStocks=()=>{
        axios.get('/api/portfolio')
        .then((res)=>{
            console.log('retrieveStocks working')
            console.log(res)
            console.log(props)
            props.setStocks(res.data)
        })
    }
    return(
        <PortfolioContainer>
            {props.portfolio[0]?
            <>
            {console.log(props)}
            <InfoAndPortfolio>
            <ProfileInfo />
            <PortfolioStocks />
            </InfoAndPortfolio>
            <Treemap />
            {/* <button onClick={retrieveStocks}>retrieve stocks</button> */}
            </>
        :<NewPortfolioContainer>
            <Arrow>&#8593;</Arrow>
            <PleaseSearch>Please enter stock ticker using the search bar above</PleaseSearch>
        </NewPortfolioContainer>
        }
        </PortfolioContainer>
    )
}

const mapStateToProps = reduxState =>reduxState.portfolio
export default connect(mapStateToProps,{setStocks})(Portfolio);