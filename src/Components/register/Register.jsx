import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';

const Register= props => {
    let [email, setEmail] = useState(''),
        [username, setUsername]=useState(''),
        [password, setPassword] = useState(''),
        [profilePicture, setProfilePicture] =useState('');

    const handleRegister=()=>{
        console.log('register pressed')
        axios.post('/auth/register',{email,username,password,profilePicture})
        .then(res=>{
            console.log(res.data)
            console.log(props)
            props.setUser(res.data.username,res.data.profilePicture, res.data.email)
            //change push to home page if set up
            props.history.push('/portfolio')
        })
    }

    return(
        <div> 
            <Link to='/'>
            <button>Login</button>
            </Link>
            <img src={profilePicture} alt= {`Profile picture of ${username}`}/>
            <input placeholder='profile picture' value={profilePicture} onChange={e => setProfilePicture(e.target.value)}/>
            <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
            <input placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default connect(null,{setUser})(Register);