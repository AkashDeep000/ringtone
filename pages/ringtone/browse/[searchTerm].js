import { useRouter } from 'next/router'
import searchData from '../../../dataFetch/search'

export default function Home({data}) {
  const router = useRouter()
  const { searchTerm } = router.query
 
  return (
    <>
     {data}
    </>
    )
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

// This function gets called at build time
export async function getStaticProps({params}) {
  
  // Call an external API endpoint to get posts
  //const res = await fetch('')
  //const posts = await res.json()
  const { searchTerm } = params;
  const data = await searchData({
    searchTerm : searchTerm
  })
  const dat = JSON.stringify(data);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data : dat
    },
  }
}