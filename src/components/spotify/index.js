import {h, Component} from 'preact'
import axios from 'axios'
import style from './style.less'
const parseQueryString = require('query-string');



export default class Spotify extends Component {
  constructor(props){
    super(props)
    this.state={
      client_id: 'e00c7cdbb7854aed9f48a2b48cbc85ba',
      auth: '',
      token: props.code,
      response: 'No response yet',
      redirect: 'http://localhost:8081/spotify/',
      responseType: 'code'
    }
  }

  componentDidMount() {
    let queryString = this.props.location.search;
    let queryParams = parseQueryString.parse(queryString);
    console.log(queryParams)
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
        redirect_uri: self.state.redirect
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
      </div>
    )
  }
}
