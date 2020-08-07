import React from 'react';
import {connect} from 'react-redux';
import OwnedStock from './OwnedStock';
import styled from 'styled-components';
import {InfoContainer} from './ProfileInfo'

const OwnedStockContainer = styled(InfoContainer)`
    height:68%;
    flex-direction:column;
    overflow:scroll;
    ::-webkit-scrollbar {
  width:0px;
  background:transparent;
}
`
export const Title=styled.h2`
height:20%;
color:Ivory;
font-size:xx-large;
font-family:Times;
font-weight:bold;
`

const PortfolioStocks = props =>{
    console.log(props)

    const ownedStocks=props.portfolio.map((stock,i)=>(
        <OwnedStock key={i} ticker={stock.ticker} quantity={stock.quantity} total={stock.total} price={stock.price}/>
    ))
    return (
        <OwnedStockContainer>
            <Title>Portfolio</Title>
            {ownedStocks}
        </OwnedStockContainer>
    )

}

const mapStateToProps = reduxState =>reduxState.portfolio

export default connect(mapStateToProps)(PortfolioStocks);


