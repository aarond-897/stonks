import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Img = styled.img`
    height:85%;
    border-radius: 50%;
    align-self:center;
    
`

const PortfolioProperty = styled.div`
color: #F89A29;
font-size: large;
margin-right: 2%;
display:flex;
align-items:center;
`

const PortfolioValue = styled.div`
color: #FFFAFA;
display:inline-block;
`


export const InfoContainer = styled.div`
    display:flex;
    background-color: #55606B;
    border: 5px solid grey;
    border-radius: 5%;
    margin:3%;
    height:20vh;
`

const ProfileInfo = props =>{
    console.log(props)
    return (
        <InfoContainer>
            <Img className='profile-pic' src={props.profilePicture} alt=""/>
            <PortfolioProperty>Username:<PortfolioValue>{props.username}</PortfolioValue></PortfolioProperty>
            <PortfolioProperty>Email:   <PortfolioValue>{props.email}</PortfolioValue></PortfolioProperty>   
        </InfoContainer>
    )

}

const mapStateToProps = reduxState =>reduxState.userReducer

export default connect(mapStateToProps)(ProfileInfo);