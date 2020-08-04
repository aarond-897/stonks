import React from 'react';
import {connect} from 'react-redux';
import OwnedStock from './OwnedStock';

const PortfolioStocks = props =>{
    console.log(props)

    const ownedStocks=props.portfolio.map((stock,i)=>(
        <OwnedStock key={i} ticker={stock.ticker} quantity={stock.quantity} total={stock.total} price={stock.price}/>
    ))
    return (
        <div>
            {ownedStocks}
        </div>
    )

}

const mapStateToProps = reduxState =>reduxState.portfolio

export default connect(mapStateToProps)(PortfolioStocks);


