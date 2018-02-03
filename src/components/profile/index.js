import { h, Component } from 'preact';
import style from './style.less';
import axios from 'axios'

export default class Profile extends Component {
	state = {
		count: 0,
		name: 'John',
		imgurl: ''
	};

	// update the current time
	updateTime = () => {
		let time = new Date().toLocaleString();
		this.setState({ time });
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
		this.updateTime();

		// every time we get remounted, increment a counter:
		this.setState({ count: this.state.count+1 });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	APIcall = () => {
		const self = this;
		axios.get('https://api.github.com/users/ColinLMacLeod1').then(function(response) {
			console.log(response.data)
			self.setState({
				name: response.data.name,
				imgurl: response.data.avatar_url
			})
		}).catch(function(err) {
			console.log(err)
		})
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {this.state.name}</h1>
				<p>This is the user profile for a user named {user}.</p>

				<div>Current time: {time}</div>
				<div>Profile route mounted {count} times.</div>
				<button onClick={()=>this.APIcall()}>Server call example</button>
				<img src={this.state.imgurl} />
			</div>
		);
	}
}
