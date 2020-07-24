import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser} from '../../redux/reducers/userReducer'

const Nav = props =>{
    console.log(props)
   const handleClick=()=>{
            axios.get('/auth/logout')
            .then(()=>{
                props.clearUser()
        })
    }

    return(
        <div>
            <input></input>
            <button>Search</button>
            <Link to='/portfolio'>
                <p>Portfolio</p>
            </Link>
            <Link to='/'>
                <button onClick={handleClick}>Logout</button>
            </Link>
        </div>
    )
}

export default connect(null,{clearUser})(Nav);