const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const User = require ('./models/User');
const jwt = require ('jsonwebtoken');

//Connect DB
mongoose.connect("mongodb+srv://johndoepotato:DpkjvwPwa6ASOD7R@cluster0-1o5j9.mongodb.net/test");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//routes
app.post('/signup', (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(req.body.email)
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            })
        }
        return res.status(200).json ({
            title: 'signup success'
        })
    }) 
})
app.post('/login', (req,res,next) => {
    User.findOne( {email: req.body.email }, (err, user) => {
        if(err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if(!user){
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        //incorrect password
        if(req.body.password, user.password){
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        //IF ALL IS GOOD create a token and send to front-end
            let token = jwt.sign( { userId: user._id}, 'secretkey');
            return res.status(200).json({
                title: 'login success',
                token: token
            })
    })
})

//grabbing user info
app.get('/user', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      User.findOne({ _id: decoded.userId }, (err, user) => {
        // eslint-disable-next-line no-console
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            email: user.email,
            name: user.name
          }
        })
      })
  
    })
  })

app.get('/', (req, res, next) => {
    // eslint-disable-next-line no-console
    res.send("hello");
})



const port = process.env.port || 5000

app.listen(port, (err) => {
    // eslint-disable-next-line no-console
    if(err) return console.log(err);
    // eslint-disable-next-line no-console
    console.log('server running on port '+ port);
})