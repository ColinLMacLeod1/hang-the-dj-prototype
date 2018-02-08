const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const server = require('http').Server(app)
const io =  require('socket.io')(server)
const btoa = require('btoa')
const qs = require('qs')

// Middleware
app.use(cors())
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.use(bodyParser.json())
io.origins('*:*')

// Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

// app.use('/', publicPath);
//
// app.get('/', function(_,res){ res.sendFile(indexPath) });

// Constants
const port = 3000;
const interval = 1000;
const day = 86400000;
var unassignedSongs = [];


// Requests
io.on('connection',(socket)=>{
  console.log('Someone Connected')
  const code = String(Math.floor(Math.random()*4000))
  socket.emit('code',code)
  var setInteravlID = setInterval(()=>{
    console.log("check")
    for(var i=0;i<unassignedSongs.length;i++){
      if(unassignedSongs[i].code==code){
        console.log("Sending ",unassignedSongs[i].title)
        socket.emit('newSong', unassignedSongs[i])
        unassignedSongs.splice(i,1)
      }
    }
  }, interval)
  setTimeout(()=>{
    clearInterval(setInteravlID)
  }, day)
})

app.post('/auth',(req,res)=>{
  console.log("auth")
  axios.request('https://accounts.spotify.com/api/token',{
      method: 'post',
      headers:{
          'Authorization': 'Basic '+btoa('eabef32fc8ef48778d4208844a93701e'+':'+'e2c35a30b57940d3b9f4c9daf3d048b4'),
          'Content-Type':'application/x-www-form-urlencoded'
      }, data: qs.stringify({
          grant_type: "authorization_code",
          code: req.body.code,
          redirect_uri: req.body.redirect
      })
  }).then((response)=>{
    console.log(response.data.access_token)
    res.send(response.data.access_token)
  }).catch((err)=>console.log(err))
})

app.post('/play',(req,res)=>{
  console.log("PLAY")
  var trackNum = req.body.songObj.trackNum-1;
    const self = this;
    axios.request('https://api.spotify.com/v1/me/player/play',{
        method: 'put',
        headers: {
            'Authorization': 'Bearer ' + req.body.token
        }, data:{
            "context_uri": "spotify:album:"+ req.body.songObj.album,
            "offset": { "position" : trackNum }
        }
    }).then((response,req)=>{
      //console.log(response.data)
    })
})

app.post('/songdata',(req,res)=>{
  console.log("DATA")
  console.log(req.body.token)
  var albumID = '';
  var trackNum = '';
  var songObj = {};
  axios.request('https://api.spotify.com/v1/search',{
    method: 'get',
    headers: {
        'Authorization': 'Bearer ' + req.body.token,
    }, params: {
        q: req.body.title+ ' ' + req.body.artist,
        type: 'track',
        limit: 1
    }
  }).then((response)=>{
    console.log(response.data)
    var n = response.data.tracks.items[0].name
    var albumID = response.data.tracks.items[0].album.id
    var tNum = response.data.tracks.items[0].track_number
    var imgURL = response.data.tracks.items[0].album.images[1].url
    var art = response.data.tracks.items[0].artists[0].name
    var length = response.data.tracks.items[0].duration_ms
    var albumName = response.data.tracks.items[0].album.name

    songObj={
        title: n,
        album: albumID,
        trackNum: tNum,
        artwork: imgURL,
        artist: art,
        time: length,
        albumName: albumName
    }
    res.send(JSON.stringify(songObj))
  }).catch(err=>console.log(err))
})

app.post('/newsong',(req,res)=>{
  console.log(req.body.title)
  unassignedSongs.push(req.body)
})

// Server Port
server.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})
