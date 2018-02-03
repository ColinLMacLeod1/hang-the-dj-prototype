import {h, Component} from 'preact';
import style from './style.less';
import axios from 'axios'

export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state={ 
        banning:'no',
        override:'yes',
        numSongs:5
      
    }
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
        console.log(this);
        formSubmitEvent.preventDefault();
        console.log('You have selected:', this.state.banning, this.state.override, this.state.numSongs);
  }
  
  render() {
    return (
      <div class={style.settings}>
        <h1 style={{width:"100vw"}}> Party Settings </h1>
        <br></br>
            
        <p>Please select the following settings for your party!</p>
        
        <form onSubmit={this.handleFormSubmit}>
            <div class="radioButton">
                <label> 
                    Banning
                    <input type="radio" name="banning" value="yes"checked={this.state.banning === 'yes'} onChange={this.handleOptionChange}/> Yes 
                </label>
                <label>
                    <input type="radio" name="banning" value="no" checked={this.state.banning === 'no'} onChange={this.handleOptionChange}/> No
                </label>
                <br></br>
             </div>
            <div>
                <label>
                    Number of song requests
                    <input type="text" name="numRequests" value={this.state.numSongs} onChange={this.handleOptionChange}/>
                </label>
                <br></br>
            </div>
            <div class="radioButton">
                <label> 
                    Override
                    <input type="radio" name="override" value="yes" checked={this.state.override === 'yes'} onChange={this.handleOptionChange}/> Yes 
                </label>
                <label>
                    <input type="radio" name="override" value="no" checked={this.state.override === 'no'} onChange={this.handleOptionChange}/> No
                </label>
                <br></br>
            </div>
             <button type="submit">Start my Party!</button>

        </form>
      </div>
    )
  }
}
