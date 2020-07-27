import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setUser} from '../../redux/reducers/userReducer';

const Login = props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleLogin=()=>{
        console.log('login has been clicked')
        axios.post('/auth/login', {email, password})
        .then(res=>{
            console.log(res.data)
            console.log(props)
            props.setUser(res.data.username,res.data.profile_picture, res.data.email)
            //TODO change push to home page if set up
            props.history.push('/portfolio')
        })
    }

    return(
        <div>
            <input placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <Link to='/register'>
            <button>Register</button>
            </Link>
        </div>
    )
}

export default connect(null,{setUser})(Login);