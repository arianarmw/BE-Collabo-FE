const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const app = express();

dotenv.config({path:'config.env'})
const port = process.env.PORT || 8080

//log req
// app.use(morgan('mini'));

const User = require('./server/database/connect.js'); // User Model

//Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));


//set view engine
app.set("view engine", "ejs");

//Route 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add-user',(req, res)=> {
    res.render('add_user');
})

app.get('/update-user',(req, res)=> {
    res.render('update_user');
})

// Post Route: /register
// app.post('/add-user', function(req, res) {
//     if(req.body.NIM == req.body.confirm){
//       User.register(req.body.NIM, req.body.Name, req.body.email)
//       res.redirect('/')
//     } else {
//       res.redirect('/update-user')
//     }
// })

app.get('/get-data', function(req, res){
    User.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/data/:id', function(req, res){
    User.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

app.patch('/data/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id).then((result) => {
        console.log('Data Successfully Updated!')
    }).catch((err) => {
        console.log(err )
    })
});

app.post('/data/:id', function(req, res){
  User.findByIdAndDelete(req.params.id).then((result) => {
      console.log('Data Successfully Deleted!')
  }).catch((err) => {
      console.log(err)
  })
});

app.listen(port, () => console.log(`This app is listening on port ${port}`));