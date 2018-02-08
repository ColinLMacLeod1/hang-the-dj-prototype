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
