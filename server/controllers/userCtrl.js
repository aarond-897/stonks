const axios = require('axios');
require('dotenv').config();

module.exports={
    addStock:async (req,res)=>{
        const {ticker}=req.body,
                {API_KEY}=process.env,
                db=req.app.get('db')

        var compProfile = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`);
        const {finnhubIndustry, logo, name}= compProfile.data

        const foundStock = await db.user.check_stock({name})
        if(!foundStock[0])
        {
            db.user.add_stock({ticker, industry:finnhubIndustry, logo, name})
            .then(()=>{
                console.log('add stock working')
                return res.sendStatus(200)
            })
            .catch(err=>console.log(err))
        }else{

            return res.sendStatus(200)
        }
    },

    addStockQty:async (req,res)=>{
        console.log('increase stock working')
        const {ticker, quantity}=req.body,
            {user_id}= req.session.user,
            db=req.app.get('db')
        let stock_id = await db.user.get_stock_id({ticker})
            stock_id= stock_id[0].stock_id
        console.log(stock_id)
        const alreadyOwn = await db.user.check_qty({user_id, stock_id})
        console.log(alreadyOwn)
        if(!alreadyOwn[0]){
            db.user.add_qty({user_id, stock_id, quantity})
            .then(()=>{
                return res.sendStatus(200)
            })
        }else{
            db.user.change_qty({user_id, stock_id, quantity})
            .then(()=>{
                return res.sendStatus(200)
            })
        }
        console.log(req.session.user.user_id)

    },
    changeStockQty:async(req,res)=>{
        console.log('change stock qty working')
        console.log(req.session.user)
        const {ticker, quantity} = req.body,
            {user_id} = req.session.user,
            db=req.app.get('db')
        let stock_id = await db.user.get_stock_id({ticker})
        stock_id= stock_id[0].stock_id

        db.user.change_qty({user_id, stock_id, quantity})
        .then(()=>{
            return res.sendStatus(200)
        })
    },
    deleteStock: async(req,res)=>{
        console.log('delete stock working')
        const {ticker}=req.params,
                {user_id}=req.session.user,
                db=req.app.get('db')
        let stock_id = await db.user.get_stock_id({ticker})
        stock_id= stock_id[0].stock_id
        
        db.user.delete_stock({user_id, stock_id})
        .then(()=>{
            return res.sendStatus(200)
        })
    },

    retrievePortfolio:async(req,res)=>{
        const {user_id}=req.session.user,
        {API_KEY}=process.env,
        db=req.app.get('db')
        let portfolio = await db.user.return_stocks({user_id})
        console.log(portfolio)
        for (let i=0; i<portfolio.length; i++){
            let price = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${portfolio[i].ticker.toUpperCase()}&token=${API_KEY}`)
            console.log(price.data.c)
            portfolio[i].price=price.data.c
            console.log(portfolio)
        }
        res.status(200).send(portfolio);
    }
}