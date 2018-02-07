# Hang the Dj
A live party-sourced soundtrack for your party where guests can text in song requests and they will be added automatically to the queue using Stdlib, MessageBird, and the Spotify API

Works as a PWA

The host just needs to visit the page and sign in with spotify and guests can test the displayed number to add songs to the queue. The host can skip and remove songs.

Problems:
* It's currently rate limited so if used frequently is may be inactive for a while
* The compute time for stdlib could run out at any point, the stdlib functions can be run locally to avoid this
* There are no individual rooms right now
* There is no deleting from the db except for manually
Fixes for the last two are coming soon

###### Dev
Just install with `npm install`
and run locally with `npm run dev`

The default dev-server port is `8081` but can be changed in webpack.config.babel.js
