import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header () {
  const [backButton, setBackButton] = useState({
    active : false,
    for: "menu"
  })
  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const inputRef = useRef()
  const router = useRouter()
  const hadleSearchClick = () => {
    if (searchQuery !== "") {
      router.push(`/ringtone/browse/${encodeURIComponent(searchQuery)}`)
    }
  }
  const hadleKeyPress = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur()
      hadleSearchClick()
    }
  }
  
  return (
    <>
    <div className="header"
    style={backButton.active == true && backButton.for == "search" ? {"gridTemplateColumns":"3rem 1fr 3rem"}: {"gridTemplateColumns":"3rem 1fr 1fr 3rem"}}>
    <div className="headerLeftIcon"
    style={backButton.active == true ? {"borderRadius":"50%"}: {"borderRadius":"15%"}}>
    <div className="menuIcon"
    onClick={() => setBackButton({
      active: true,
      for: "menu"
    })}
    style={backButton.active == false ? {"display":"block"}: {"display":"none"}}>
    <div className="menuIconSpan"></div>
    <div className="menuIconSpan"></div>
    <div className="menuIconSpan"></div>
    </div>
    <div className="backIcon"
    onClick={() => {
      if (backButton.active == true && backButton.for == "menu") {
        setBackButton({
          active: false,
          for: "menu"
        })
      }else if (backButton.active == true && backButton.for == "search") {
        setBackButton({
          active: false,
          for: "search"
        })
      }
    }}
    style={backButton.active == true ? {"display":"block"}: {"display":"none"}}>
    <div className="backIconSpan backIconSpanTop"></div>
    <div className="backIconSpan backIconSpanBotton"></div>
    </div>
    </div>
    
    <div className="headerLogo"
    style={backButton.active == true && backButton.for == "search" ? {"display":"none"}: {"display":"block"}}>   
    <Link href="/">
    LOGO
    </Link>
    </div>
    
    <div className="searchBox"
    onClick={() => setBackButton({
      active: true,
      for: "search"
    })}>
    <input ref={inputRef} value={searchQuery} onChange={handleSearchQueryChange} onKeyDown={hadleKeyPress} className="searchBoxInput"></input>

    <svg onClick={hadleSearchClick} xmlns="http://www.w3.org/2000/svg" height="1.8rem" width="1.8rem">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="68%" y2="45%">
      <stop offset="0%" stopColor="var(--main)" stopOpacity="100%" />
      <stop offset="100%" stopColor="var(--mainD)" stopOpacity="100%" />
    </linearGradient>
  </defs>
  <path fill="url(#grad1)" d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.947 9.947 0 006.322-2.264l5.971 5.971a1 1 0 101.414-1.414l-5.97-5.97A9.947 9.947 0 0023 13c0-5.511-4.489-10-10-10zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"/></svg>         

 
  
    </div>
    <div className="likedIcon">♡</div>
    </div>
    </>
    )
}