import YoutubeMusicApi from 'youtube-music-api'
import googleSuggest from './googleSuggest'

export default async function Search (searchQuery){
  const searchTerm = searchQuery.searchTerm;
  const country = searchQuery.country;
  const googleSuggestRes = await googleSuggest({
       searchTerm: searchTerm,
       country: country,
      })
    const googleSuggestResStr = await JSON.stringify(googleSuggestRes);
console.log(googleSuggestRes)
const extraData = {}
  //Cheak if this is a movie or web-series
   if (/(movie|season)/g.test(googleSuggestResStr)) {
          console.log("movie")
    extraData.type = "movie"
    //search on YoutubeMusicApi
    console.log("YT music start")
    const api = new YoutubeMusicApi()
    await api.initalize()
    console.log("YT music initalized")
    const searchData = await api.search(searchQuery.searchTerm, "album")
    console.log("YT music end")
    if (searchData.content[0].type == "album") {
      //console.log(searchData.content[0])  
      extraData.data = searchData.content[0]
    }else{
      extraData.data = "can not find apropiate album"
      console.log("can not find apropiate album")
      
    }
         
  }
 //Cheak if this is a Song
   else if (/(song|singer|lyricl|chord|music)/g.test(googleSuggestResStr)) {
    extraData.type = "song"
       console.log("song")
    //search on YoutubeMusicApi
    console.log("YT music start")
    const api = new YoutubeMusicApi()
    await api.initalize()
    console.log("YT music initalized")
    const searchData = await api.search(searchQuery.searchTerm, "song")
    console.log("YT music end")
    extraData.data = searchData.content[0]
   // console.log(searchData.content[0]
    
  }
  //if !== Song || movie
    else {
     extraData.type = "other"
     console.log("other")
    }
    console.log(extraData)
    return extraData
  }
  