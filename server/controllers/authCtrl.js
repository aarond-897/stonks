require('dotenv').config();
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

module.exports = {
    register: async(req, res)=>{
        const {username, email, password, profilePicture}=req.body,
                {SITE_EMAIL,EMAIL_PASSWORD}=process.env,
            db=req.app.get('db');
        
        const foundUser = await db.auth.check_user({email});
        console.log(foundUser)
        if(foundUser[0]){
            return res.status(400).send('Email already in use')
        }

        let salt = bcrypt.genSaltSync(10),
            hash=bcrypt.hashSync(password, salt);

        const newUser = await db.auth.register_user({username, email, password:hash, profilePicture});

        console.log(newUser)
        req.session.user=newUser[0];
        console.log(req.session.user)
        res.status(201).send(req.session.user);

        //nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: SITE_EMAIL,
                pass:EMAIL_PASSWORD
            }
        })

        let mailOptions = {
            from: 'finrainmaker@gmail.com',
            to: email,
            subject: 'Thank you for joining Rainmaker!!!',
            text: `Hello ${username},
            Getting started with Rainmaker: Using Rainmaker you will be able to keep track of your portfolio in a manageable way. You will also have the ability to search a stock and view vital information such as news, balance sheets, income statements, daily price metrics, and visualize data over a specified duration, in one easy to access source. I hope you enjoy and if there are any improvements you would like to see made feel free to respond back to finrainmaker@gmail.com`
        }

        transporter.sendMail(mailOptions, (err,data)=>{
            if (err){
                console.log('Error Occurs')
            }else{
                console.log('email sent')
            }
        })
    },

    login: async(req, res)=>{
        const {email, password} = req.body,
            db=req.app.get('db');

        //check for email
        const foundUser = await db.auth.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email not found')
        }

        //check for password
        const authenticated = bcrypt.compareSync(password, foundUser[0].hash);
        if(!authenticated){
            return res.status(401).send('Incorrect Password')
        }

        delete foundUser[0].hash;
        req.session.user = foundUser[0];
        console.log(req.session.user)
        res.status(202).send(req.session.user);
    },

    logout: (req,res)=>{
        console.log('logout')
        req.session.destroy();
        res.sendStatus(200);
    },

    getStock:(req,res)=>{
        console.log(req.session)
        console.log('get stock working')
        res.status(200).send(req.session.stock);
    },

    getUser:(req,res)=>{
        console.log(req.session)
        console.log('get user working')
        res.status(200).send(req.session.user);
    }
}