import googleSuggest from './googleSuggest'
import YoutubeMusicApi from 'youtube-music-api'
import ytsr from 'ytsr'

export default async function Search (searchQuery) {

  //fetch main ringtone details from youtube resuls
  const ringtonesInfo = async() => {
    try {
      console.log("under ringtonesInfo")
      
  
      console.log(youtubeResult)
    } catch (e) {
      console.log(e)
    }
    return youtubeResult;
  }
  
//Get Details of search result and Extra info
const extraInfo = async() => {
  try {
    console.log("under extraInfo")
    //get google suggestion
    const googleSuggestRes = await googleSuggest({
       searchTerm: searchQuery.searchTerm,
       country: searchQuery.country,
      })
    const googleSuggestResStr = await JSON.stringify(googleSuggestRes);

    //Cheak if this is a Song
    if (/(song|singer|lyricl|chord|music)/g.test(googleSuggestResStr)) {
       console.log("song")
    //search on YoutubeMusicApi
  
    const api = new YoutubeMusicApi()
    await api.initalize()
    const searchData = await api.search(searchQuery.searchTerm, "video")
  
    console.log(searchData)
  }
  //Cheak if this is a movie or web-series
    else if (/(movie|season)/g.test(googleSuggestResStr)) {
          console.log("movie")
       
      }
  //if !== Song || movie
    else {
     console.log("other")
    }
  } catch (e) {
    console.log(e)
  }
  return googleSuggestResStr;
}  

const a = await Promise.all([ringtonesInfo, extraInfo]);
  return a;
}