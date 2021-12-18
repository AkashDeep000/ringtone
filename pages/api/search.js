import extraInfo from '../../dataFetch/extraInfo'
import ytRingtone from '../../dataFetch/ytRingtone'

export default async function handler(req, res) {
  
  const { searchTerm } = req.query;
  const { country } = req.query;
  
  const searchQuery = {
    searchTerm : searchTerm,
    country: country
  }
  
  const ringtoneInfo = ytRingtone(searchQuery)
  const extraInfoData = extraInfo(searchQuery)
  const a = await Promise.all([extraInfoData, ringtoneInfo])
  //console.log(a)
  
  res.status(200).json(a);
}