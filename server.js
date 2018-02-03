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

axios.post('https://accounts.spotify.com/api/token',{
    headers:{
   //     'Authorization': 'Basic '+btoa('e00c7cdbb7854aed9f48a2b48cbc85ba'+':'+'ba7bc2e1625a494fbd59feea5c4d2055'),
        'Content-Type':'application/x-www-form-urlencoded'
    },
    params: {
        client_id: 'e00c7cdbb7854aed9f48a2b48cbc85ba',
        client_secret: 'ba7bc2e1625a494fbd59feea5c4d2055',
        grant_type: "authorization_code",
        code: "AQDJQikUEoe8MJXDrknE8lo8osBQ9TqERrP3FRHRFisqoPN6MO1vHZ2SubGnWjmGntbouznODA9QNzPoptdyqwZtwYe4cfepwn17YzyU_5VIkVyHK2c_bOyThjrslPVgqpXmZuxJ-MIhWqgeKI-3MGS8O5tJXf6Djb1FHqvoP9DdL404UAFZZhWMV-Wlooz8BcjiUDKKBLpA9_RUORJZJrPkF5nrgCmuqgm2ySKOu3w",
        redirect_uri: 'http://localhost:8081/spotify/',
    }
}).then((response)=>(
  console.log(response.data.access_token)
)).catch((err)=>console.log(err))

// Server Port
app.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})
