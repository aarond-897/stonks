import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';
import styled from 'styled-components';
import {Body, Title,Input, ButtonWrapper, LoginRegister, Button, LoginSection,Cloud} from '../login/Login'

//Style Components


// const RegisterSection = styled.div`
//     height: 40vh;
//     width:30%;
//     border: 5px solid grey;
//     border-radius: 5%;
//     background: #55606B;   
//     display:flex;
//     flex-direction:column; 
//     @media (max-width: 768px) {
//         height: 100vh;
//         width:100%;
//         border-radius:0%;
//   }     
// `

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
    width:60%;
    margin-top:-3.5%;
`

const RegisterInput = styled(Input)`
    height:100%;
    margin-bottom:3%;
`
const RegisterSection = styled(LoginSection)`
`

const RegisterButtons= styled(LoginRegister)`
    display:flex;
    align-items:center;
`


const Register= props => {
    //Hooks
    let [email, setEmail] = useState(''),
        [username, setUsername]=useState(''),
        [password, setPassword] = useState(''),
        [profilePicture, setProfilePicture] =useState('');
        let sentProfilePicture = profilePicture===''? 'https://legacyogden.com/wp-content/uploads/2015/07/No-Image-Available1.png': profilePicture;

    //Register Action
    const handleRegister=()=>{
        console.log('register pressed')
        
        axios.post('/auth/register',{email,username,password,sentProfilePicture})
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
            <Cloud></Cloud>
            <RegisterSection>
                <Title>Register</Title>
                <Image src={sentProfilePicture} alt= {`Profile picture of ${username}`}/>
                <RegisterInputs>
                <RegisterInput placeholder='profile picture url' value={profilePicture} onChange={e=> setProfilePicture(e.target.value)}/>
                <RegisterInput placeholder='email' value={email} onChange={e => setEmail(e.target.  value)}/>
                <RegisterInput placeholder='username' value={username} onChange={e=> setUsername (e.target.value)}/>
                <RegisterInput placeholder='password' value={password} type='password' onChange={e => setPassword(e.target.value)}/>
                </RegisterInputs>
                <RegisterButtons>
                <ButtonWrapper>
                <Link to='/'>
                <Button>Login</Button>
                </Link>
                </ButtonWrapper>
                <ButtonWrapper>
                <Button onClick={handleRegister}>Register</Button>
                </ButtonWrapper>
                </RegisterButtons>
                </RegisterSection>
        </Body>
    )
}

export default connect(null,{setUser})(Register);