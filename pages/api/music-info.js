import YoutubeMusicApi from 'youtube-music-api'

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
      const relatedSong = await api.getNext(searchData.content[0].playlistId,searchData.content[0]?.playlistId,searchData.content[0]?.paramString)
      console.log(relatedSong)
    }
   
    console.log("YT music end")
}