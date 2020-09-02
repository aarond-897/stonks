import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';
import styled, {keyframes, animation} from 'styled-components';
import img from './skyscraper.jpg';
import cloud from './cloud.png';

//Styled Components

    export const AnimatedBackground = keyframes`
        from {
            opacity:0.0;
        }
        to{
            opacity:0.9;
        }
    `;

    export const AnimatedClouds = keyframes`
    0% {
        background-position:0px;
    }
    100%{
        background-position:5440px;
    }
    `;

    export const Body = styled.div`
        background: url(${img}) no-repeat center center fixed;
        height: 100vh;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        `;

    export const LoginSection = styled.div`
        height: 40vh;
        width:30%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        /* border: 5px solid grey; */
        border-radius: 5%;
        background: linear-gradient(#E9EDF6,#E3E7F0); 
        animation: 3s ${AnimatedBackground};
        opacity:0.9;
        z-index:1;
        @media (max-width: 768px) {
        height: 100vh;
        width:100%;
        border-radius:0%;
  }       
        `;

    export const Title=styled.h2`
        height:20%;
        /* color:Bl; */
        font-size:xxx-large;
        font-family:Times;
        font-weight:bold;
        @media (max-width: 768px) {
            margin-top:5%;
  } 
    `

    export const InputText = styled.p`
        /* color:white; */
        font-size:large;
    `;

    export const Input= styled.input`
       /* background-color:#FF9E29; */
       width:50%;
       height: 4%;
       ::placeholder{
           color:black;
       }
    `;
    
    export const LoginRegister = styled.div`
        display:flex;
        height:30%;
        align-items:flex-end;
        justify-content:space-around;
        width:100%;
    `;

    export const ButtonWrapper = styled.div`
        background-color: #585761;
        color: white;
        height: 3vh;
        width: 30%;
        border-radius: 15%;
        text-align:center;
        @media (max-width: 768px) {
            height:10vh;
        }
        /* vertical-align: middle; */
        /* //TODO change to pointer cursor */
    `;

    export const Button = styled.button`
        background-color: #585761;
        color: white;
        height: 3vh;
        width: 100%;
        border-radius: 15%;
        text-align:center;
        vertical-align: middle;
        cursor:pointer;
        @media (max-width: 768px) {
            height:10vh;
        }
    `;

    export const Cloud=styled.div`
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-image:url(${cloud});
        animation: 100s ${AnimatedClouds} linear infinite;
        background-size:cover;
    `;


const Login = props => {
    //hooks
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');
    console.log(email)

    //Login action
    const handleLogin=()=>{
        console.log('login has been clicked')
        axios.post('/auth/login', {email, password})
        .then(res=>{
            console.log(res.data)
            console.log(props)
            props.setUser(res.data.username,res.data.profile_picture, res.data.email)
            // TODO change push to home page if set up
            props.history.push('/portfolio')
        })
    }
    

    return(
        <Body >
            <Cloud></Cloud>
            <LoginSection>
                <Title>Rainmaker</Title>
                {/* <InputText>Email:</InputText> */}
                <Input placeholder='Email' value={email}  onChange={e => setEmail(e.target.value)}/>
                {/* <InputText>Password:</InputText> */}
                <Input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <LoginRegister>
                <ButtonWrapper>
                    <Button onClick={handleLogin}>Login</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                    <Link to='/register'>
                        <Button>Register</Button>
                    </Link>
                </ButtonWrapper>
                </LoginRegister>
            </LoginSection>
        </Body>
    )
}

export default connect(null,{setUser})(Login);