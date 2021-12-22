import YoutubeMusicApi from 'youtube-music-api'
import getNext from '../../ytMusic/getNext'
export default async function handler(req,res){
 // res.send("hello world")
  const { searchTerm } = req.query;
  const { country } = req.query;
   //search on YoutubeMusicApi
    console.log("YT music start")
    const api = new YoutubeMusicApi()
    await api.initalize()
    console.log("YT music initalized")
    const searchData = await api.search(searchTerm, "song")
    console.log(searchData.content[0])
    if (searchData.content[0].playlistId) {
      const relatedSong = await getNext()
      console.log(relatedSong)
    }
   
    console.log("YT music end")
}