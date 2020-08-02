import React from 'react';
import {connect} from 'react-redux';

const PortfolioStocks = props =>{
    console.log(props)
    return (
        <div>

        </div>
    )

}

const mapStateToProps = reduxState =>reduxState.portfolio

export default connect(mapStateToProps)(PortfolioStocks);