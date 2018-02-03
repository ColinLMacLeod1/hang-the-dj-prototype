import {h, Component} from 'preact'
import axios from 'axios'
import style from './style.less'
//import * as SpotifyWebAPI from 'spotify-web-api-js';

export default class Spotify extends Component {
  constructor(props){
    super(props)
    this.state={
      client_id: 'e00c7cdbb7854aed9f48a2b48cbc85ba',
      auth: '',
      token: props.code,
      token2: props.token,
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
      const self = this;
    axios.post('https://accounts.spotify.com/api/token',{
        headers:{
       //     'Authorization': 'Basic '+btoa('e00c7cdbb7854aed9f48a2b48cbc85ba'+':'+'ba7bc2e1625a494fbd59feea5c4d2055'),
            'Content-Type':'application/x-www-form-urlencoded'
        },
        params: {
            client_id: 'e00c7cdbb7854aed9f48a2b48cbc85ba',
            client_secret: 'ba7bc2e1625a494fbd59feea5c4d2055',
            grant_type: "authorization_code",
            code: self.state.token,
            redirect_uri: self.state.redirect,
        }
    }).then((response)=>(
      console.log(response.data.access_token)
    ))
  }

  playCurrentSong = () => {
      const self = this;
        axios.get('https://api.spotify.com/v1/me/player/play',{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then((response)=>(
          console.log(response.data)
        ))
  }

  render() {
    return (
      <div class={style.spotify}>
        <p> Client Id: {this.state.client_id}</p>
        <p> Auth: {this.state.auth}</p>
        <p> Token: {this.state.token}</p>
        <p> Response: {this.state.response}</p>
        <button onClick={this.getAuth}> Get Auth</button>
        <a href="https://accounts.spotify.com/en/authorize?client_id=e00c7cdbb7854aed9f48a2b48cbc85ba&response_type=code&redirect_uri=http:%2F%2Flocalhost:8081%2Fspotify%2F&scope=user-modify-playback-state">
          <button> Spotify Auth </button>
        </a>
        <button onClick={this.playCurrentSong}>Get Current Song</button>
        <button onClick={this.getToken}>Get token </button>
      </div>
    )
  }
}
