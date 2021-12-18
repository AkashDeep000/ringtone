import extraInfo from './extraInfo'
import ytRingtone from './ytRingtone'

export default async function Search (searchQuery){
  const searchTerm = searchQuery.searchTerm;
  const country = searchQuery.country;
  
  const ringtoneInfo = ytRingtone(searchQuery)
  const extraInfoData = extraInfo(searchQuery)
  const a = await Promise.all([extraInfoData, ringtoneInfo])
  console.log(ringtoneInfo)
  return a
}