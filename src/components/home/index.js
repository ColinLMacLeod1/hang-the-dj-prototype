import { h } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';


export default () => {
	return (
		<div class={style.home}>
			<h1>Hang The DJ</h1>
            <p>The number 1 "partysourced" DJ app</p>
            <Link href="/settings">
		      <button class={style.mainbutton}>Create my party now!</button>
            </Link>
		</div>
	);
};
