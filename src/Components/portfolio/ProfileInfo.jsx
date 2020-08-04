import React from 'react';
import {connect} from 'react-redux';
import OwnedStock from './OwnedStock';

const ProfileInfo = props =>{
    console.log(props)
    return (
        <div>
            <img className='profile-pic' src={props.profilePicture} alt=""/>
            <h2>Username:{props.username}</h2>
            <h2>Email:{props.email}</h2>   
        </div>
    )

}

const mapStateToProps = reduxState =>reduxState.userReducer

export default connect(mapStateToProps)(ProfileInfo);