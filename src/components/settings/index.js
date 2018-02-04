import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'preact-router';

export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
        banning:'no',
        override:'yes',
        numSongs:5,
        code: props.code,
        token: props.access_token,
        redirect: 'http://localhost:8081/settings/',
        responseType: 'code'
    }
  }

  componentDidMount() {
    this.getToken();
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
            code: self.state.code,
            redirect_uri: self.state.redirect,
        })
    }).then((response)=>(
      console.log(response.data.access_token),
      self.setState({
          token: response.data.access_token
      })
    ))
  }
  
  addSong = () => {
    var array = this.state.queue
    array.push({song: "Song", artist: "Artist"})
    this.setState({
      queue: array
    })
  }

  handleOptionChange=(changeEvent)=> {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    });
  }

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    console.log('You have selected:', this.state.banning, this.state.override, this.state.numSongs);
  }

  render() {
      const self = this;
      var tohref = "/party/?token="+self.state.token;
    return (
      <div class={style.settings}>
        <h1 style={{width:"100vw"}}> Party Settings </h1>
        <br></br>

        <div class={style.supportText}>Default settings have been set for your party. If you would like, you can change them below</div>
        <div class={style.wrapper}>
          <div class={style.formWrapper}>
            <form onSubmit={this.handleFormSubmit}>
                  <label>
                      <div class={style.tooltip}>Banning
                      <span class={style.tooltiptext}>Select 'Yes' if you would like to be able to ban certain users from requesting songs</span>
                      </div>
                  </label>
              <div class={style.inputWrapper}>
                      <input type="radio" name="banning" value="yes"checked={this.state.banning === 'yes'} onChange={this.handleOptionChange}/> <span>Yes</span>
                      <input type="radio" name="banning" value="no" checked={this.state.banning === 'no'} onChange={this.handleOptionChange}/><span>No</span>
               </div>
                  <label>
                      <div class={style.tooltip}>Request limit
                      <span class={style.tooltiptext}>The number of songs a guest can request (in 10 min)</span>
                      </div>
                  </label>
              <div class={style.inputWrapper}>
                      <input type="text" name="numRequests" maxlength="4" size="4" value={this.state.numSongs} onChange={this.handleOptionChange}/>
              </div>
                  <label>
                      <div class={style.tooltip}>Override
                      <span class={style.tooltiptext}>Select 'Yes' if you would like to be able override the queue</span>
                      </div>
                  </label>
                  <div class={style.inputWrapper}>
                      <input type="radio" name="override" value="yes" checked={this.state.override === 'yes'} onChange={this.handleOptionChange}/> <span>Yes</span>
                      <input type="radio" name="override" value="no" checked={this.state.override === 'no'} onChange={this.handleOptionChange}/> <span>No</span>
              </div>
               <Link href={tohref}><button class={style.submit} type="submit">Start My Party!</button></Link>
            </form>
          </div>
        </div>
      </div>

    )
  }
}
