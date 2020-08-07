import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';
import styled from 'styled-components';
import {Body, Title,Input, ButtonWrapper, LoginRegister, Button} from '../login/Login'

//Style Components


const RegisterSection = styled.div`
    height: 40vh;
    width:30%;
    border: 5px solid grey;
    border-radius: 5%;
    background: #55606B;   
    display:flex;
    flex-direction:column; 
    @media (max-width: 768px) {
        height: 100vh;
        width:100%;
        border-radius:0%;
  }     
`

const Image = styled.img`
    height:12.5vh;
    width:20%;
    border-radius:40%;
    align-self:center;
    margin-bottom:5%;
    @media (max-width: 768px) {
        height: 25vh;
        width:40%;
  }   
`

const RegisterInputs=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

const RegisterInput = styled(Input)`
    height:100%;
    margin-bottom:3%;
`

const Register= props => {
    //Hooks
    let [email, setEmail] = useState(''),
        [username, setUsername]=useState(''),
        [password, setPassword] = useState(''),
        [profilePicture, setProfilePicture] =useState('');

    //Register Action
    const handleRegister=()=>{
        console.log('register pressed')
        axios.post('/auth/register',{email,username,password,profilePicture})
        .then(res=>{
            console.log(res.data)
            console.log(props)
            props.setUser(res.data.username,res.data.profilePicture, res.data.email)
            //TODO change push to home page if set up
            props.history.push('/portfolio')
        })
    }

    return(
        <Body> 
            <RegisterSection>
                <Title>Register</Title>
                <Image src={profilePicture} alt= {`Profile picture of ${username}`}/>
                <RegisterInputs>
                <RegisterInput placeholder='profile picture' value={profilePicture} onChange={e=> setProfilePicture(e.target.value)}/>
                <RegisterInput placeholder='email' value={email} onChange={e => setEmail(e.target.  value)}/>
                <RegisterInput placeholder='username' value={username} onChange={e=> setUsername (e.target.value)}/>
                <RegisterInput placeholder='password' value={password} type='password' onChange={e => setPassword(e.target.value)}/>
                </RegisterInputs>
                <LoginRegister>
                <ButtonWrapper>
                <Button onClick={handleRegister}>Register</Button>
                </ButtonWrapper>
                <ButtonWrapper>
                <Link to='/'>
                <Button>Login</Button>
                </Link>
                </ButtonWrapper>
                </LoginRegister>
                </RegisterSection>
        </Body>
    )
}

export default connect(null,{setUser})(Register);