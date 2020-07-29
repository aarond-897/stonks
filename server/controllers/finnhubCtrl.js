const axios = require('axios');
require('dotenv').config();

module.exports={
    getFinInfo: async(req,res)=>{
        const {ticker}=req.params,
              {API_KEY}=process.env,
              db=req.app.get('db'),
              today = new Date().toISOString().split('T')[0],
              oneYear = today.replace(today.substring(0,4),((parseInt(today.substring(0,4))-1).toString())),
              unixToday = Math.round(new Date().getTime()/1000),
              unixOneYear = unixToday - (60*60*24*365);

        // console.log(ticker,API_KEY,today,oneYear, unixToday,unixOneYear)
        try{
            var compProfile = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`);
            // console.log(compProfile)
            
            var companyNews = await axios.get(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${today}&to=${today}&token=${API_KEY}`);
            
            var basicFin= await axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=price&token=${API_KEY}`);
            
            var quarterly = await axios.get(`https://finnhub.io/api/v1/stock/financials-reported?symbol=${ticker}&token=${API_KEY}&freq=quarterly`);

            var yearlyFilings = await axios.get(`https://finnhub.io/api/v1/stock/filings?symbol=${ticker}&from=${oneYear}&to=${today}&token=${API_KEY}`)

            //might have to bring in stockCandles as a csv for candlestick creation
            var stockCandles = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${unixOneYear}&to=${unixToday}&token=${API_KEY}`)
            
            // var quote = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`)
            // console.log(quote)
            
        }
        catch(err){
            console.log(err)
        }
        
        //TODO use backend register methodology when adding to stock table

        //TODO send prevalent information to front end to be stored on redux state
        const apiInfo={compProfile:compProfile.data,companyNews:companyNews.data,basicFin: basicFin.data, quarterly: quarterly.data, yearlyFilings: yearlyFilings.data, stockCandles: stockCandles.data}
        // console.log(companyNews.data)
        req.session.stock=apiInfo
        console.log(req.session)
        res.status(200).send(req.session.stock)

    }
}

// today.toISOString().split('T')[0]