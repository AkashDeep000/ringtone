import {useState, useEffect, useMemo, useRef} from "react";

export const useAudio = (options) => {
  
  const audio = typeof Audio !== "undefined" ? useMemo(() => new Audio(options.src), [options.src]) : undefined
 
   
 
  // Managing the playing state
  const [isPlaying, setIsplaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
console.log("audio") 
  // play function to play the audio
  const play = () => {
    setIsplaying(true)
    if (audio) {
      
    audio
      .play()
      .then(() => setIsLoading(false))
      .then(() => setIsplaying(true))
      .catch((error) => {
        setIsplaying(false);
        console.log(error);
        options.onError?.(error);
      });
    }
  };
  
  // pause the audio
  const pause = () => {
    setIsplaying(false);
    audio.pause();
  };

  // Toggle between play and pause
  const toggle = () => {
    console.log("toggle"+"isPlaying"+isPlaying)
   return isPlaying ? pause() : play()
    
  };

  useEffect(() => {
    if (audio){
      
    // Loop the audio if loop is true, default is false
    audio.loop = options.loop || false;

    // Adjust the volume of the audio, default is 1(max)
    audio.volume = options.volume || 1;

    // Mute the audio if muted is true, default is false
    audio.muted = options.muted || false;

    // Execute the onLoadedData function after finishing the loading of audio
    audio.onloadeddata = (e) => options.onLoadedData?.(e);

    // Execute after the ending of the audio
    audio.addEventListener('ended', (e) => {
      // Execute the onEnded function
      options.onEnded?.(e);

      // Play again the audio after the end if loop is true
      options.loop ? audio.play() : setIsplaying(false);
    });

    // Cleanup
    return () => {
      !options.loop &&
        audio.removeEventListener('ended', () => setIsplaying(false));
    };
  }
  }, [audio, options]);

  // Returning isPlaying, play, pause, toogle
  return { isPlaying, isLoading, play, pause, toggle };
};