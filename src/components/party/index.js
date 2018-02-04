import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentSong: {title:'Viva La Vida',artist:'Coldplay',album:'Viva La Vida',artwork:'./assets/images/test.jpg',trackNum:1},
      played: [],
      queue: [],
      token: props.token
    }
  }

  componentDidMount() {
    this.getQueue()
      //setInterval(()=>this.getQueue(), 5000);

  }

  getQueue = () => {
    const self = this;
    axios.get('https://colinlmacleod1.stdlib.com/get-queue').then((res)=>{
      console.log(res.data)
      self.setState({
        queue:res.data
      })
    })
  }

  playNext = () => {
    this.state.played.push(this.state.currentSong);
    console.log(this.state.played)
    let song =  this.play(this.state.queue[0].title)

    let newQueue = this.state.queue.slice(1)
    this.setState({
      currentSong:song,
      queue: newQueue
    })

  }

  play = (songTitle) => {
    console.log(songTitle)
    return {title:songTitle,artist:'Coldplay',album:'Viva La Vida',artwork:'./assets/images/test.jpg',id:''};
  }

  render() {
    return (
      <div class={style.party}>
        <h1 style={{width:"100vw"}}> Your Party Queue </h1>
        <button onClick={()=>this.playNext()}>Play Next</button>
        <div class={style.wrapper}>
              <div class={style.queueHeader}>Now Playing</div>

        <div class={style.nowPlayingWrapper}>
          <Card className={style.nowPlayingElement}>
            <CardMedia>
              <img src={this.state.currentSong.artwork} alt="" />
            </CardMedia>
            <CardTitle title={this.state.currentSong.title} subtitle={this.state.currentSong.artist}/>
            <CardText style={{padding:'0 16px 16px 5px'}}>
              {this.state.currentSong.album}
            </CardText>
          </Card>
        </div>
      <div class={style.queueHeader} >Up Next</div>
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
