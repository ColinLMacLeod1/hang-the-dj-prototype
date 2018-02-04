const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Middleware
app.use(cors())
app.use(bodyParser.json())


//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));


// app.use('/', publicPath);
//
// app.get('/', function(_,res){ res.sendFile(indexPath) });


//Constants

const port = 3000

// MongoDB Connection
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://root:TzZo9fMonrur@35.193.38.141:27017").then(
  ()=> console.log("Connection Made!"),
  err => console.log(err))


// Server Port
app.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})
