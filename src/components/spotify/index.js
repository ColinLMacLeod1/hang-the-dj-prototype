import {h, Component} from 'preact'
import axios from 'axios'
import style from './style.less'
import qs from 'qs'

export default class Spotify extends Component {
  constructor(props){
    super(props)
    this.state={
      client_id: '833338d91c9a48718c8c12cf886287d7',
      auth: '',
      token: props.code,
      token2: props.acces_token,
      response: 'No response yet',
      redirect: 'http://localhost:8081/spotify/',
      responseType: 'code',
      scopes: ['user-read-playback-state','user-read-private'],
      queue:[]
    }
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

  //not needed
  getAuth = () => {
    const self = this;
    axios.get('https://accounts.spotify.com/authorize',{
      headers: {
    	  'Access-Control-Allow-Origin': '*',
    	},
      params: {
        client_id: self.state.client_id,
        response_type: self.state.responseType,
        redirect_uri: self.state.redirect,
      }
    }).then((response)=>(
      console.log(response.data)
    ))
  }

  //get access token
  getToken = () => {
      const self = this;
    axios.request('https://accounts.spotify.com/api/token',{
        method: 'post',
        headers:{
            'Authorization': 'Basic '+btoa('833338d91c9a48718c8c12cf886287d7'+':'+'fa46eb34f64b45b6851af41a62b219d1'),
            'Content-Type':'application/x-www-form-urlencoded'
        }, data: qs.stringify({
            grant_type: "authorization_code",
            code: self.state.token,
            redirect_uri: self.state.redirect,
        })
    }).then((response)=>(
      console.log(response.data.access_token),
      self.setState({
          token2: response.data.access_token
      })
    ))
  }

  //pause current song
  pauseCurrentSong = () => {
      console.log(this.state.token2);
      const self = this;
        axios.request('https://api.spotify.com/v1/me/player/pause',{
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + this.state.token2
            }
        }).then((response)=>(
          console.log(response.data)
        ))
  }

  //plays a specific song based on albumID and track number
  playSong = (songObj) => {
      trackNum = trackNum-1;
        const self = this;
        axios.request('https://api.spotify.com/v1/me/player/play',{
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + self.state.token2
            }, data:{
                "context_uri": "spotify:album:"+songObj.albumID,
                "offset": { "position" : songObj.trackNum }         
            }
        }).then((response,req)=>{
          console.log(response.data)
          console.log(trackNum)
        })
  }

  //takes a track name as a string, finds the name and ID
  searchTrack = (toSearch) => {

      var albumID = '';
      var trackNum = '';
      var songObj = {};
      console.log(toSearch);
      console.log(this.state.token2);

      console.log("Searching for track.");
      const self = this;
      axios.request('https://api.spotify.com/v1/search',{
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + this.state.token2,
        }, params: {
            q: toSearch,
            type: 'track',
            limit: 1
        }
      }).then((response)=>{
      
        var n = response.data.tracks.items[0].name
        var albumID = response.data.tracks.items[0].album.id
        var tNum = response.data.tracks.items[0].track_number
        var imgURL = response.data.tracks.items[0].album.images[1]
        var art = response.data.tracks.items[0].artists[0].name
        
        songObj={
            title: n,
            album: albumID,
            trackNum: tNum,
            artwork: imgURL,
            artist: art
        }
        
      });
      
     return songObj;
  }

  render() {
    return (
      <div class={style.spotify}>
        <p> Client Id: {this.state.client_id}</p>
        <p> Auth: {this.state.auth}</p>
        <p> Token: {this.state.token}</p>
        <p> Response: {this.state.response}</p>
        <a href="https://accounts.spotify.com/en/authorize?client_id=833338d91c9a48718c8c12cf886287d7&response_type=code&redirect_uri=http:%2F%2Flocalhost:8081%2Fspotify%2F&scope=user-modify-playback-state+user-read-private">
          <button> Spotify Auth </button>
        </a>
        <button onClick={this.pauseCurrentSong}>Pause Current Song</button>
        <button onClick={() => this.playSong('5g6nzsOxwxdoj6sqAl0NXB')}>Play Song</button>
        <button onClick={this.getTrack}>Get the killers</button>
        <button onClick={this.getToken}>Get token </button>
        <button onClick={() => this.searchTrack('new slang')}>Find the rain.</button>
        <button onClick={this.getQueue}> Get Queue </button>
        <img src={this.state.imgurl} />
      </div>
    )
  }
}
