require('dotenv').config();

//connect to controllers
const authCtrl = require('./controllers/authCtrl'),
      userCtrl = require('./controllers/userCtrl'),
      finnhubCtrl = require('./controllers/finnhubCtrl');

//server boilerplate
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      nodemailer = require('nodemailer'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET}=process.env,
      port=SERVER_PORT,
      app=express();
app.use(express.json());

//session and cookie creation
app.use(session({
    resave:false,
    saveUninitialized:true,
    secret: SESSION_SECRET,
    cookie:{maxAge:1000*60*60*24*365}
}));

//connect to db
massive({
    connectionString:CONNECTION_STRING,
    ssl:{rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('db connected')
}).catch(err=>console.log(err));

//auth endpoints
app.post('/auth/register',authCtrl.register);
app.post('/auth/login',authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/stock',authCtrl.getStock)
app.get('/auth/user',authCtrl.getUser)

//user endpoints
app.post('/api/stock', userCtrl.addStock)
app.post('/api/quantity', userCtrl.addStockQty)
app.put('/api/quantity', userCtrl.changeStockQty)
app.delete('/api/quantity/:ticker', userCtrl.deleteStock)
app.get('/api/portfolio', userCtrl.retrievePortfolio)

//finnHub endpoint
app.get('/api/ticker/:ticker', finnhubCtrl.getFinInfo)


app.listen(port, ()=>console.log(`Connected on port ${port}`))
