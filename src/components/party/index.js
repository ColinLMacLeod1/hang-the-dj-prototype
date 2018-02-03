import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'

export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      queue: [{song:"Twist adn Shout", artist:"The Beatles"},
              {song:"My Generation", artist:"The Who"},
              {song:"Start me up", artist:"The Rolling Stones"},
              {song:"Hey There Delilah", artist:"The Plain White Ts"}]
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
        <h1 style={{width:"100vw"}}> Party Page </h1>
        <button onClick={()=>this.addSong()}>Add Song</button>
        <br></br>
        {this.state.queue.map((songObj)=>(
          <div className="song">
            <h4>{songObj.song}</h4>
            <h5>By {songObj.artist}</h5>
          </div>
        ))}
      </div>
    )
  }
}
