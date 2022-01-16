import { useState, useRef } from 'react'
import styles from 'styles/RingMainBlock.module.css'
import Player from 'components/Players'
import Link from 'next/link'

export default function RingMainBlock ({props}) {
  
  const [heart, serHeart] = useState(false)
  function heartHendler() {
    heart ? serHeart(false) : serHeart(true)
  }
  
  
  return (
    <>
     <div className={styles.container}>
     <div className={styles.playerTitleInfo}>
     <div className={styles.player} 
      style={{
           backgroundImage: `url(${props.thumbnails})`,
           backgroundSize: "cover",
           padding: "1rem",
           margin: "0 1rem 0 0",
           borderRadius: ".3rem"
         }}>
     <Player props={{
       id: props.id,
     }}/>
     </div>
     
     
     <h3 className={styles.title}>{props.title}</h3>
     <div className={styles.duration}>{props.duration} sec</div>
     <div className={styles.downloads}>1000 downloads</div>
    
     
     </div>
     <div className={styles.tags}>
       <div className={styles.tag}>
        Shreya Ghosal
       </div>
       <div className={styles.tag}>
        New Hindi
       </div>
     </div>
     <div className={styles.option}>
     <svg 
  onClick={heartHendler}
	xmlns="http://www.w3.org/2000/svg"
	width="2rem"
	height="2rem"
	viewbox="0 0 24 24">
	<defs>
      <defs>
    <linearGradient id="activeGradient" x1="0%" y1="0%" x2="90%" y2="0%">
      <stop offset="0%" stopColor="var(--main)" stopOpacity="100%" />
      <stop offset="100%" stopColor="var(--mainLite)" stopOpacity="100%" />
    </linearGradient>
  </defs>
  </defs>
	<path fill={heart ? "url(#activeGradient)" : "var(--backgroundMainD)"} d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"/>
</svg>
     <Link href={`/api/audio?id=${props.id}`}>
          <a className={styles.download}>DOWNLOAD</a>
    </Link>
     </div>
     </div>
    </>
    )
}