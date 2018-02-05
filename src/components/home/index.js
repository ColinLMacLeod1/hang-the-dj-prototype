import { h } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';


export default () => {
	return (
		<div class={style.home}>
			<h1>Hang The DJ</h1>
            <p>The number 1 "partysourced" DJ app</p>
            <a href="https://accounts.spotify.com/en/authorize?client_id=eabef32fc8ef48778d4208844a93701e&response_type=code&redirect_uri=http:%2F%2Flocalhost:8081%2Fsettings%2F&scope=user-modify-playback-state+user-read-private">
		      		<button class={style.mainbutton}>Create my party now!</button>
            </a>
		</div>
	);
};
