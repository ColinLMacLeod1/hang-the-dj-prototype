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

mongoose.connect("mongodb://root:RD5f63snrUJc@35.224.232.189:27017").then(
  ()=> console.log("Connection Made!"),
  err => console.log(err))


const data ={
  client_id: 'e00c7cdbb7854aed9f48a2b48cbc85ba',
  auth: '',
  token: '',
  response: 'No response yet',
  redirect: 'http://localhost:8081/spotify/',
  responseType: 'code'
}

axios.get('https://accounts.spotify.com/authorize',{
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  params: {
    client_id: data.client_id,
    response_type: data.responseType,
    redirect_uri: data.redirect
  }
}).then((response)=>(
  console.log(response.data)
))

// Server Port
app.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})
