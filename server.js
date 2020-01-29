const express = require('express');
const bodyParser = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const User = require ('./models/User');

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
   
    console.log(newUser);
    
})

app.get('/', (req, res, next) => {
    // eslint-disable-next-line no-console
    res.send("hello");
})



const port = process.env.port || 3000

app.listen(port, (err) => {
    // eslint-disable-next-line no-console
    if(err) return console.log(err);
    // eslint-disable-next-line no-console
    console.log('server running on port '+ port);
})