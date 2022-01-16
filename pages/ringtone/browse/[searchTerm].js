import Header from "components/Header"
import RingMainBlock from "components/RingMainBlock"
import HeadSection from "components/HeadSection"
import { useRouter } from 'next/router';

export default function Browse({data}) {
  
 const { isFallback } = useRouter();
 
 const createTitle = () => {
   if (!isFallback) {
     return `${data[1].correctedQuery.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("Ringtone", "")} Ringtone`
   } else return null
 }
 const title = createTitle()
 
 const page = () => {
   return "Loading..."
 }

  return (
    <>
    <Header/>
    {isFallback ? <h3 style={{}}>Loading...</h3> : 
    
    <div>
    <HeadSection props={{
    title: title,
      }}/>
      <div className="cardGrid">
    {data[1].items.map((data, key) => {
         return <RingMainBlock props={data}/>
    })
    }
    </div>
    </div>
    }
    

    </>
    )
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

// This function gets called at build time
export async function getStaticProps({params}) {
  
  // Call an external API endpoint to get posts
  const { searchTerm } = params;
  const res = await fetch(`https://ringtone.vercel.app/api/search?searchTerm=${searchTerm}`)

  
  const data = await res.json()
console.log(data)
  return {
    props: {data},
  }
}