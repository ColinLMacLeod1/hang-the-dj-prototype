import { h, Component } from 'preact';
import { Router } from 'preact-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './header';
import Home from './home';
import Profile from './profile';
import Party from './party';
import Settings from './settings';
import Spotify from './spotify';



export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentDidMount() {
		(function() {var cors_api_host = 'cors-anywhere.herokuapp.com';
		console.log("CORS?")
		var cors_api_url = 'https://' + cors_api_host + '/';
		var slice = [].slice;
		var origin = window.location.protocol + '//' + window.location.host;
		var open = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function() {
				var args = slice.call(arguments);
				var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
				if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
						targetOrigin[1] !== cors_api_host) {
						args[1] = cors_api_url + args[1];
				}
				console.log(args)
				return open.apply(this, args);
		};})()
	}


	render() {
		return (
		  <div id="app">
            <MuiThemeProvider>
              <div>
				<Header/>
				<Router onChange={this.handleRoute}>
				  <Home path="/" />
				  <Profile path="/profile/" user="me" />
				  <Profile path="/profile/:user" />
				  <Party path="/party" />
                  <Settings path="/settings" />
                  <Spotify path="/spotify"/>
				</Router>
              </div>
            </MuiThemeProvider>
		  </div>
		);
	}
}
