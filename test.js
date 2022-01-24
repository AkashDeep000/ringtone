const YoutubeMusicApi = require('youtube-music-api')

const api = new YoutubeMusicApi()

api.getPlaylist("VLPLTw3BBwcLBjG-4fernx2Xt-GHdYMPYAFM").then(result => {
console.log(result)
})