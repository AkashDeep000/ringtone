import ytsr from 'ytsr'

export default async function Search (searchQuery){
  const searchTerm = searchQuery.searchTerm;
  const country = searchQuery.country;
  console.log("YT start")
  const youtubeResult = await ytsr(searchTerm, {
        gl : country,
        
    })
  console.log("YT End")  
 //filter youtubeResult
  const filterArray = await youtubeResult.items.filter(el => {
  const duration = el.duration?.replace(":", "")
  
  if (duration <= 60 && el.type == "video" && 
  el.title.toLowerCase().indexOf("ringtone") !== -1) {
    return true
  }
})
//creating filal result
const finlArray = await filterArray.map(el => {
  const finlArray = {
      id: el.id,
      title: el.title,
      duration: el.duration,
      thumbnails: el.bestThumbnail.url,
  }
    
  return finlArray
})
    //return "☑️☑️☑️ ytsr complete";
const data = {
  originalQuery: youtubeResult.originalQuery,
  correctedQuery: youtubeResult.correctedQuery,
  items: finlArray,
}
console.log("YT data Calculated")
    return data;
  }
  