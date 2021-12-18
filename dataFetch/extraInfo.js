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

    //Cheak if this is a Song
    if (/(song|singer|lyricl|chord|music)/g.test(googleSuggestResStr)) {
       console.log("song")
    //search on YoutubeMusicApi
  
    const api = new YoutubeMusicApi()
    await api.initalize()
    const searchData = await api.search(searchQuery.searchTerm, "video")
  
    //console.log(searchData)
  }
  //Cheak if this is a movie or web-series
    else if (/(movie|season)/g.test(googleSuggestResStr)) {
          console.log("movie")
       
      }
  //if !== Song || movie
    else {
     console.log("other")
    }
    return googleSuggestRes
  }
  