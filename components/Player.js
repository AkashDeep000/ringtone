import { useState, useEffect, useRef, useContext} from 'react'
import styles from 'styles/Player.module.css'
import { useAudio } from "lib/useAudio"
import ActivePlayerContext from 'components/ActivePlayerContext'

export default function Player () {
  const ref = useRef()
  const {activePlayerRef, setActivePlayerRef} = useContext(ActivePlayerContext)
   
  const { isPlaying, play, pause, toggle } = useAudio({
        src: "https://cldup.com/qR72ozoaiQ.mp3",
        loop: true,
    });
  console.log("ref :" + ref.current) 
  console.log("activePlayerRef :" +activePlayerRef?.current)
  if (isPlaying && activePlayerRef !== ref) {
    console.log("paused")
    pause()
  }
  function clickHandler(){
    /*if (isPlaying) {
       pause()
    }else if (!isPlaying){
     // 
      pause()
    }*/
    setActivePlayerRef(ref)
    toggle()
  }
  return (
    <>
     <div className={styles.container}>
     <div className={styles.spinner}></div>
     <div ref={ref} onClick={clickHandler}>{isPlaying ? "Pause":"Play"}</div>
     </div>
    </>
    )
}