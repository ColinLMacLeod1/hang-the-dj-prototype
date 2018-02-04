import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import qs from 'qs'


export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentSong: {title:'Viva La Vida',artist:'Coldplay',album:'Viva La Vida',artwork:'./assets/images/test.jpg',trackNum:1},
      played: [],
      queue: [],
      allSongs: [],
      token: props.token,
      ugly: 0

    }
  }

  componentDidMount() {
    this.initialQueue()
    setInterval(()=>this.getQueue(), 1000);

  }

  initialQueue = () =>{
    const self = this;
    axios.get('https://colinlmacleod1.stdlib.com/get-queue').then((res)=>{
      self.setState({
        queue:res.data,
        allSongs:res.data,
      })
    })
  }

  getQueue = () => {
    const self = this;
    var newQueue = self.state.queue
    var newSongs = self.state.allSongs
    axios.get('https://colinlmacleod1.stdlib.com/get-queue').then((res)=>{
      if(self.state.queue.length>0){
        for(var i=0;i<res.data.length;i++){
          var count = 0;
          for(var z=0;z<self.state.allSongs.length;z++){
            if(res.data[i].title==self.state.allSongs[z].title){
                count++
            }
          }
          if(self.state.currentSong.title !== res.data[i].title){
            count++
          }
          if(count == 0){
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
    let newQueue = self.state.queue.slice(1)
    console.log("NewQ : ", newQueue)
    self.setState({
      queue: newQueue
    })
    self.getSongObj(song)

  }

  //takes a song name and returns a song object
  getSongObj = (toSearch) => {
      var albumID = '';
      var trackNum = '';
      var songObj = {};

      const self = this;
      axios.request('https://api.spotify.com/v1/search',{
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + this.state.token,
        }, params: {
            q: toSearch,
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

        console.log(response.data.tracks.items[0]);
        
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
          console.log(response.data)
        })

  }

  render() {
    return (
      <div class={style.party}>
        <h1 style={{width:"100vw"}}> Your Party Queue </h1>
        <div class={style.partyNum}>Your Party Number is: <span>(226) 212-4435</span></div>
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
      <div class={style.queueHeader} >Up Next: <span><button class={style.nextSongBtn} onClick={()=>this.playNext()}>Play Next</button></span></div>
            <div class={style.queueWrapper}>
            {this.state.queue.map((songObj,index)=>(
            <Card className={style.queueElement} key={index}>
              <CardHeader style={{padding:'5px 16px 0px 16px'}}
                title={songObj.title}
                subtitle={songObj.artist}
                avatar={songObj.artwork}/>
            </Card>
            ))}
          </div>
        </div>
      </div>

    )
  }
}
