import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentSong: {name:'Viva La Vida',artist:'Coldplay',album:'Viva La Vida',artwork:'',id:''},
      queue: [{name:'Viva La Vida',artist:'Coldplay',album:'Viva La Vida',artwork:'',id:''},{name:'Paradise',artist:'Coldplay',album:'Paradise',artwork:'',id:''},{name:'Adventure of a Lifetime',artist:'Coldplay',album:'Viva La Vida',artwork:'',id:''}]
    }
  }

  addSong = () => {
    var array = this.state.queue
    array.push({song: "Song", artist: "Artist"})
    this.setState({
      queue: array
    })
  }

  render() {
    return (
      <div class={style.party}>
        <h1 style={{width:"100vw"}}> Your Party Queue </h1>
        <div class={style.wrapper}>
              <div class={style.queueHeader}>Now Playing</div>
  
        <div class={style.nowPlayingWrapper}>
          <Card className={style.nowPlayingElement}> 
            <CardMedia>
              <img src="./assets/images/test.jpg" alt="" />
            </CardMedia>
            <CardTitle title={this.state.currentSong.name} subtitle={this.state.currentSong.artist}/>
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
                title={songObj.name}
                subtitle={songObj.artist}
                avatar="./assets/images/test.jpg"/>
            </Card>
            ))}
          </div> 
          
        </div>
      </div>
    )
  }
}

