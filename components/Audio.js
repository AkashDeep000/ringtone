import {useState, useContext, useEffect, useMemo} from "react"
import { useAudio } from "lib/useAudio"
import  { AudioContext }  from 'components/AudioContext'

export default function() {
  const [state, depatch] = useContext(AudioContext)
  
  const audio = typeof Audio !== "undefined" ? useMemo(() => new Audio(),[]) : undefined


  
  useEffect(async () => {
  if (state?.src && state?.isPlay) {
  if (audio) {
    await audio.setAttribute('src',state?.src)
    await audio.play()
    await depatch({
      type:"SET_PLAYING",
      isPlaying:true,
      isEnd:false,
     })
    }
  }
  if (state?.src && !state?.isPlay) {
  if (audio) {
    
    await audio.pause()
    await depatch({
      type:"SET_PLAYING",
      isPlaying:false,
      isEnd:false,
     })
    }
  }
  
  if (audio) {
     // Execute the onLoadedData function after finishing the loading of audio
  //  audio.onloadeddata = (e) => options.onLoadedData?.(e);

    // Execute after the ending of the audio
    audio.addEventListener('ended', (e) => {
      // Execute the onEnded function
    //  options.onEnded?.(e);

      // Play again the audio after the end if loop is true
     // options.loop ?  audio.play() : 
     depatch({
       type:"SET_PLAYING",
       isPlaying:false,
       isEnd:true,
     });
    });

    // Cleanup
    return () => {
    //  !options.loop &&
    audio.removeEventListener('ended', () => depatch({
      type:"SET_PLAYING",
       isPlaying:false,
       isEnd:true,
     })
     );
    };
  }
  
  },[state?.isPlay,state?.src,state?.ref])
  
  return <></>
}