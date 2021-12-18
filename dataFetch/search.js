import googleSuggest from './googleSuggest'
import YoutubeMusicApi from 'youtube-music-api'
import ytsr from 'ytsr'

export default async function Search (searchQuery) {

  //fetch main ringtone details from youtube resuls
  const ringtonesInfo = async function() {
    const youtubeResult = await ytsr(searchQuery.searchTerm, {
    gl : searchQuery.country
  })
  
  console.log(youtubeResult)
  }
  
//Get Details of search result and Extra info
const extraInfo = async function() {
  
  //get google suggestion
  const googleSuggestRes = awaitgoogleSuggest({
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
}  

  // promiss to Solve
 return Promise.all([ringtonesInfo,extraInfo])
  return ({a:"b"})
}