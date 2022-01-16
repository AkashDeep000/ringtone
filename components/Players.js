import { useState, useEffect, useRef, useContext, useMemo} from 'react'
import styles from 'styles/Player.module.css'
import  { AudioContext }  from 'components/AudioContext'

function Player ({props}) {
  
  const [state,dispatch] = useContext(AudioContext)
  const ref = useRef()


  function clickHandler(){
  if (state?.ref !== ref.current || !state?.isPlay) {
    dispatch({
     type:"PLAY",
     src:`https://ringtone.vercel.app/api/audio?id=${props.id}`,
     ref:ref.current,
   })
  }else {
    dispatch({
     type:"PAUSE",
   })
  }
  } 
  
  const PlayerState = () => {
     if (state?.ref == ref.current && state?.isPlaying) {
       return (
         <div className={styles.round}>
         <div className={styles.svgPause}></div>
         </div>
         )
     }else if (state?.ref == ref.current && state?.isPlay && !state?.isPlaying && !state?.isEnd) {
     return (
       <div className={styles.spinner}></div>
       )
     } else {
       return (
         <div className={styles.round}>
           <svg xmlns="http://www.w3.org/2000/svg" width="1.8rem" height="1.8rem" className={styles.svgTriangle}><path stroke="none" fill="var(--backgroundMain)" d="M11.035898384862 3.7775681356645a4 4 0 0 1 6.9282032302755 0l10.071796769724 17.444863728671a4 4 0 0 1 -3.4641016151378 6l-20.143593539449 0a4 4 0 0 1 -3.4641016151378 -6"></path></svg>
          
         </div>
         )
     }
  }
  
  
  
  return (
    <>
     <div className={styles.container} ref={ref} onClick={clickHandler}>
     
     <div>
     {PlayerState()}
     </div>
     </div>
    </>
    )
}

export default Player