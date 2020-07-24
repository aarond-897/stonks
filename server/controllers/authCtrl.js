const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res)=>{
        const {username, email, password, profilePicture}=req.body,
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
        req.session.destroy();
        res.sendStatus(200);
    }
}