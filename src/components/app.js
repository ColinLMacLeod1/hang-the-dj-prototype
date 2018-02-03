import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';
import Party from './party';
import Settings from './settings';
import Spotify from './spotify';
<<<<<<< HEAD

=======
>>>>>>> ae7476195823f201cf331fa0b2244d8a2973e83d

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Party path="/party" />
                    <Settings path="/settings" />
<<<<<<< HEAD
                    <Spotify path="/spotify"/>

=======
					<Spotify path="/spotify/" />
>>>>>>> ae7476195823f201cf331fa0b2244d8a2973e83d
				</Router>
			</div>
		);
	}
}
