require('dotenv').config();

//connect to controllers
const authCtrl = require('./controllers/authCtrl'),
      userCtrl = require('./controllers/userCtrl'),
      finnhubCtrl = require('./controllers/finnhubCtrl');

//server boilerplate
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
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

//user endpoints

//finnHub endpoint
app.post('/api/ticker/:ticker', finnhubCtrl.getFinInfo)

app.listen(port, ()=>console.log(`Connected on port ${port}`))
