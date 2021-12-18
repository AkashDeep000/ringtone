import { useRouter } from 'next/router'
import { server } from '../../../config';

export default function Home({data}) {
  const router = useRouter()
  const { searchTerm } = router.query
 
  return (
    <>
     {JSON.stringify(data)}
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
  const res = await fetch(`${server}/api/search?searchTerm=${searchTerm}`)
  console.log(res)

  
  const data = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {data},
  }
}