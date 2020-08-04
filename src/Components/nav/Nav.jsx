import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {clearUser, setUser} from '../../redux/reducers/userReducer';
import {setStock} from '../../redux/reducers/stockReducer';
import { withRouter } from 'react-router-dom';

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
        <div>
            <input placeholder='Ticker search' value={ticker} onChange={e => setTicker(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            <Link to='/portfolio'>
                <p>Portfolio</p>
            </Link>
            <Link to='/'>
                <button onClick={handleClick}>Logout</button>
            </Link>
        </div>
    )
}

const mapStateToProps = reduxState=>reduxState

export default connect(mapStateToProps,{clearUser,setStock, setUser})(withRouter(Nav));