import {h, Component} from 'preact'
import axios from 'axios'
import style from './style.less'
import qs from 'qs'
//import * as SpotifyWebAPI from 'spotify-web-api-js';

export default class Spotify extends Component {
  constructor(props){
    super(props)
    this.state={
        //Dave's id: e00c7cdbb7854aed9f48a2b48cbc85ba
      client_id: '833338d91c9a48718c8c12cf886287d7',
      auth: '',
      token: props.code,
      token2: props.acces_token,
      response: 'No response yet',
      redirect: 'http://localhost:8081/spotify/',
      responseType: 'code',
      scopes: ['user-read-playback-state','user-read-private']
    }
  }

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
  //encoded client id ZTAwYzdjZGJiNzg1NGFlZDlmNDhhMmI0OGNiYzg1YmE=
  // client secret : YmE3YmMyZTE2MjVhNDk0ZmJkNTlmZWVhNWM0ZDIwNTUg
  getToken = () => {
      //var temp = 'Authorization=Basic '+btoa('e00c7cdbb7854aed9f48a2b48cbc85ba'+':'+'ba7bc2e1625a494fbd59feea5c4d2055');
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
      this.state.token2 = response.data.access_token
    ))
  }

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

  playSong = () => {
        console.log("Playing song");
        const self = this;
        axios.request('https://api.spotify.com/v1/me/player/play/',{
            method: 'put',
            headers: {
                'Authorization': 'Bearer ' + this.state.token2
            }, params: {
            uris:["spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"]
            }
        }).then((response)=>(
          console.log(response.data)
        ))
  }
  
  getTrack = () => {
      console.log(this.state.token2);
        const self = this;
        var killersID = '3n3Ppam7vgaVa1iaRUc9Lp'
        axios.request('https://api.spotify.com/v1/tracks/'+killersID,{
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.state.token2
            }
        }).then((response)=>(
          console.log(response.data.artists)
        ))
  }
  
  searchTrack = (toSearch) => {
      console.log("Searching for track.");
      const self = this;
      axios.request('https://api.spotify.com/v1/search'),{
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + this.state.token2
        }, params: {
            q: toSearch,
            type: 'track',
            limit: 1
        }
      }
  }
  
  render() {
    return (
      <div class={style.spotify}>
        <p> Client Id: {this.state.client_id}</p>
        <p> Auth: {this.state.auth}</p>
        <p> Token: {this.state.token}</p>
        <p> Response: {this.state.response}</p>
        <button onClick={this.getAuth}> Get Auth</button>
        <a href="https://accounts.spotify.com/en/authorize?client_id=833338d91c9a48718c8c12cf886287d7&response_type=code&redirect_uri=http:%2F%2Flocalhost:8081%2Fspotify%2F&scope=user-modify-playback-state+user-read-private">
          <button> Spotify Auth </button>
        </a>
        <button onClick={this.pauseCurrentSong}>Pause Current Song</button>
        <button onClick={this.playCurrentSong}>Play Current Song</button>
        <button onClick={this.getTrack}>Get the killers</button>
        <button onClick={this.getToken}>Get token </button>
      </div>
    )
  }
}
