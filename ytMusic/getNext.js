import axios from "axios";
import context from './context';

export default async function(){
    
console.log("ytM start")
const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/next?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
        ...context.body,
        enablePersistentPlaylistPanel: true,
        isAudioOnly: true,
        params: "mgMDCNgE",
        playerParams: "yQo1apHcE20",
        playlistId: "RDAMVMyQo1apHcE20",
        tunerSettingValue: "AUTOMIX_SETTING_NORMAL",
        videoId: "MJyKN-8UncM",
      },
      {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'origin': 'https://music.youtube.com',
        },
      }
  );
console.log("ytM finished")
const refined = response.data.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer.watchNextTabbedResultsRenderer.tab
const content = refined[0].tabRenderer.content.musicQueueRenderer.content.playlistPanelRenderer.contents.map(el => {
  return {
    title: el.playlistPanelVideoRenderer.title.runs[0].text,
    videoId: el.playlistPanelVideoRenderer.videoId,
    thumbnail: el.playlistPanelVideoRenderer.thumbnail.thumbnails[el.playlistPanelVideoRenderer.thumbnail.thumbnails.length-1].url,
  }
})






  console.log(refined[2].tabRenderer.endpoint.browseEndpoint.browseId)
  return content
}