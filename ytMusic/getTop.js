import axios from "axios";
import context from './context';

export default async function getTop(){
    
//console.log("ytM start")
const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      
     ...context.body,
    "browseId": "FEmusic_charts",
    
      },
      {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'origin': 'https://music.youtube.com',
        },
      }
  );
console.log("YT m finished")
console.log(response.data.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[1].musicCarouselShelfRenderer.contents[0].musicTwoRowItemRenderer.title)

return response.data.contents
}