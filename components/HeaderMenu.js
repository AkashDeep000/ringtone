import { useRef, useEffect } from 'react'
import styles from 'styles/HeaderMenu.module.css'

export default function HeaderMenu ({props}) {
  const [backButton, setBackButton] = props
 const ref = useRef()
 console.log(backButton) 
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (backButton.for == "menu" && backButton.active && ref.current && !ref.current.contains(e.target)) {
        setBackButton({
          for: "menu",
          active: false
        })
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [backButton.for])
  
  
  const click = () => {
    console.log(backButton)
  }
  return (
    <>
    <div ref={ref} className={styles.container}>
    <div onClick={click} className={styles.header}>Browse By</div>
    <div className={styles.items}>Song</div>
    <div className={styles.items}>Artist / Singer</div>
    <div className={styles.items}>Album / Movie</div>
    <div className={styles.header}>Catagory</div>
    <div className={styles.items}>Bollywood</div>
    <div className={styles.items}>English</div>
    <div className={styles.items}>Hindi</div>
    <div className={styles.items}>Pop</div>
    <div className={styles.items}>iPhone</div>
    <div className={styles.items}>More...</div>
    <hr className={styles.spacer}></hr>
    <div className={styles.single}>About</div>
    <div className={styles.single}>Terms of service</div>
    <div className={styles.single}>Privacy policy</div>
    <div className={styles.single}>DMCA</div>
    </div>
    </>
    )
}