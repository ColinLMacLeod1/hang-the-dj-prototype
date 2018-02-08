import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import qs from 'qs'
import openSocket from 'socket.io-client'


export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentSong: {title:'Hang the DJ',artist: 'QHacks',albumName:'ft. Stdlib, Preact, MongoDB',artwork:'../../assets/images/dj-logo.jpg',trackNum:1},
      played: [],
      queue: [],
      allSongs: [],
      token: props.token,
      ugly: 0,
      code: 0,
      started: false
    }
  }

  componentDidMount() {
    const self = this;
    const socket = openSocket('https://hang-the-dj-server-pqfesvpbvg.now.sh')
    socket.on('code',code => {
      this.setState({
        code: code
      })
    })
    socket.on('newSong',newSong =>{
      console.log("New song: "+newSong.title)
      var newQueue = this.state.queue.slice();
      newQueue.push(newSong)
      self.setState({
        queue: newQueue
      })
    })


  }

  initialQueue = () =>{
    const self = this;
    axios.get('https://colinlmacleod1.stdlib.com/get-queue').then((res)=>{
      self.setState({
        queue:res.data,
        allSongs:res.data,
      })
    }).catch((err)=>console.log(err))
  }

  getQueue = () => {
    const self = this;
    var newQueue = self.state.queue.slice()
    var newSongs = self.state.allSongs.slice()
    axios.get('https://colinlmacleod1.stdlib.com/get-queue').then((res)=>{
      console.log(res)
      if(res.data.length>0){
        for(var i=0;i<res.data.length;i++){
          var count = 0;
          for(var z=0;z<self.state.allSongs.length;z++){
            if(res.data[i].title==self.state.allSongs[z].title){
                count++
            }
          }
          if(self.state.currentSong.title == res.data[i].title){
            count++
          }
          if (self.state.allSongs.length == 0){
            console.log("NO SONGS QUEUED YET")
            count = 0
          }
          if(count == 0){
            console.log("COUNT 0")
            newQueue.push(res.data[i])
            newSongs.push(res.data[i])
            self.setState({
              queue:newQueue,
              allSongs: newSongs
            })
          }
        }

      }
    })
  }

  playNext = () => {
    const self = this;
    var song = self.state.queue[0].title;
    var artist = self.state.queue[0].artist;
    var time = 0;
    let newQueue = self.state.queue.slice(1)
    if(!this.state.started){
      self.setState({
        started: true
      })
    }
    self.setState({
      queue: newQueue
    })
    axios.post('https://hang-the-dj-server-pqfesvpbvg.now.sh/songdata',{
      title: song,
      artist: artist,
      token: self.state.token
    }).then((response)=>{
      self.setState({
        currentSong: response.data
      })
      axios.post('https://hang-the-dj-server-pqfesvpbvg.now.sh/play',{
          songObj:response.data,
          token: self.state.token
        }).then(()=>{
        setTimeout(()=>{
          time = self.state.currentSong.time-5005;
          console.log(time)
          setTimeout(()=>{
            self.playNext()
          },time)
        }, 5000)
      }).catch(err=>console.log("Play:", err))
    }).catch(err=>console.log("Data:",err))
  }

  //takes a song name and returns a song object
  getSongObj = (toSearch, artist) => {
      var albumID = '';
      var trackNum = '';
      var songObj = {};

      const self = this;
      axios.request('https://api.spotify.com/v1/search',{
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + this.state.token,
        }, params: {
            q: toSearch+ ' ' + artist,
            type: 'track',
            limit: 1
        }
      }).then((response)=>{

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
        self.setState({
          currentSong: songObj
        })
        self.playSong(songObj)

      });

    }

  //plays a specific song based on a song object
  playSong = (songObj) =>  {
      var trackNum = songObj.trackNum-1;
        const self = this;
        axios.request('https://api.spotify.com/v1/me/player/play',{
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + self.state.token
            }, data:{
                "context_uri": "spotify:album:"+songObj.album,
                "offset": { "position" : trackNum }
            }
        }).then((response,req)=>{
          //console.log(response.data)
        })

  }

  removeSong = (index) => {
    console.log("remove ", index)
    var queue = this.state.queue;
    var newSong = this.state.allSongs;
    newSong.push(queue[index]);
    queue.splice(index,1)
    this.setState({
      queue: queue,
      allSongs: newSong
    })
  }

  render() {
    return (
      <div class={style.party}>
        <h1 style={{width:"100vw"}}> Your Party Queue </h1>
        <div class={style.partyNum}>Your Party Number is: <span>(226) 212-4435</span></div>
        <div class={style.partyNum}>Your Party Code is: <span>{this.state.code}</span></div>
        <div class={style.wrapper}>
              <div class={style.queueHeader}>Now Playing: </div>

        <div class={style.nowPlayingWrapper}>
          <Card className={style.nowPlayingElement}>
            <CardMedia>
              <img src={this.state.currentSong.artwork} alt="" />
            </CardMedia>
            <CardTitle title={this.state.currentSong.title} subtitle={this.state.currentSong.artist}/>
            <CardText style={{padding:'0 16px 16px 5px'}}>
              {this.state.currentSong.albumName}
            </CardText>
          </Card>
        </div>
      <div class={style.queueHeader} >Up Next: <span>
                                                  <button class={style.nextSongBtn} onClick={()=>this.playNext()}>{this.state.started ? "Play Next" : "Start"}</button>
                                                  <button class={style.nextSongBtn} onClick={()=>this.getQueue()}>Refresh</button>
                                               </span></div>
            <div class={style.queueWrapper}>
            {this.state.queue.map((songObj,index)=>(
            <Card className={style.queueElement} onClick={()=>{this.removeSong(index)}} key={index}>
              <CardHeader style={{padding:'5px 16px 0px 90px'}}
                title={songObj.title}
                subtitle={songObj.artist}
                />
            </Card>
            ))}
          </div>
        </div>
      </div>

    )
  }
}
