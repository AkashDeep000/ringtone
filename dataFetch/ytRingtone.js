import ytsr from 'ytsr'

export default async function Search (searchQuery){
  const searchTerm = searchQuery.searchTerm;
  const country = searchQuery.country;
  
  const youtubeResult = await ytsr(searchTerm, {
        gl : country
    })
    return "☑️☑️☑️ ytsr complete";
  }
  