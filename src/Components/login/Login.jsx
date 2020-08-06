import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';
import styled from 'styled-components';

//Styled Components
    export const Body = styled.div`
        height: 100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background: #161920;
        `;

    const LoginSection = styled.div`
        height: 40vh;
        width:30%;
        border: 5px solid grey;
        border-radius: 5%;
        background: #55606B;        
        `;

    export const Title=styled.h2`
        height:20%;
        color:Ivory;
        font-size:xxx-large;
        font-family:Times;
        font-weight:bold;
    `

    export const InputText = styled.p`
        color:white;
        font-size:large;
    `;

    export const Input= styled.input`
       background-color:#FF9E29;
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
            <LoginSection>
                <Title>Rainmaker</Title>
                <InputText>Email:</InputText>
                <Input placeholder='Email' value={email}  onChange={e => setEmail(e.target.value)}/>
                <InputText>Password:</InputText>
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