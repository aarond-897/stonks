import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser, setUser} from '../../redux/reducers/userReducer';
import {setStock} from '../../redux/reducers/stockReducer';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {Title} from '../login/Login'

//styled components

const NavContainer = styled.div`
width:100%;
height:5vh;
display:flex;
background: #161920;
justify-content:space-between;
`

const SearchContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    align-self:center;
`
const ExitContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:3%;
`

const NavTitle = styled(Title)`
    font-size:xx-large;
    margin-top:0.5%;
    margin-left:3%;
    color: #E3E7F0;
    @media (max-width: 768px) {
    margin-top:2.5%;
    font-size: large;
  } 
`

const Input = styled.input`
    @media (max-width: 768px) {
    margin-top:2.5%;
    font-size: small;
    width:25%;
    height:1.75vh;
  } 
`

const Button = styled.button`
    @media (max-width: 768px) {
    margin-top:2.5%;
    font-size: xx-small;
    width:25%;
    height:2.5vh;
  } 
`

const NavButton = styled(Button)`
    @media (max-width: 768px) {
    width:100%;
  } 
`


const Nav = props =>{
    // console.log(props)
    let [ticker, setTicker] = useState('')

    console.log(props)

    useEffect(()=>{
        console.log('hit use effect')
        axios.get('/auth/stock')
        .then(res=>{
            console.log(res)
            props.setStock(res.data)
        })
        axios.get('/auth/user')
        .then(res=>{
            console.log(res)
            let {user_id, email, profile_picture, username} = res.data
            props.setUser(user_id, username, profile_picture, email)
        })
    },[])

   const handleClick=()=>{
            axios.get('/auth/logout')
            .then(()=>{
                props.clearUser()
        })
    }
    console.log(ticker)
    const handleSearch=()=>{
        axios.get(`/api/ticker/${ticker}`)
        .then(res=>{
            console.log(res.data)
            console.log(props)
            props.setStock(res.data)
            props.history.push(`/stock/${ticker}`);
        })
    }

    return(
        <NavContainer>
            <NavTitle>Rainmaker</NavTitle>
            <SearchContainer>
            <Input placeholder='Ticker' value={ticker} onChange={e => setTicker(e.target.value)}/>
            <Button onClick={handleSearch}>Search</Button>
            </SearchContainer>
            <ExitContainer>
                {/* <ButtonWrapper> */}
            <Link to='/portfolio'>
                <NavButton>Portfolio</NavButton>
            </Link>
            {/* </ButtonWrapper> */}
            {/* <ButtonWrapper> */}
            <Link to='/'>
                <NavButton onClick={handleClick}>Logout</NavButton>
            </Link>
            {/* </ButtonWrapper> */}
            </ExitContainer>
        </NavContainer>
    )
}

const mapStateToProps = reduxState=>reduxState

export default connect(mapStateToProps,{clearUser,setStock, setUser})(withRouter(Nav));