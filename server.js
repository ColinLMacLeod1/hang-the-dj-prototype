const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

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
//mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.uri, {
//   UseMongoClient: true
// }).catch(function(err){
//   console.log(err)
// });
//
//
// mongoose.connection.once('open',function(){
// 	console.log('Connection made');
// }).on('error',function(error){
// 	console.log('Connection error',error);
// });
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
