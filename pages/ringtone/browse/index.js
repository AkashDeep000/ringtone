import searchData from '../../../dataFetch/search'
import googleSuggest from '../../../dataFetch/googleSuggest'

export default function Home({data}) {
  //console.log(data)
  return (
    <>
     {data}
    </>
    )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  //const res = await fetch('')
  //const posts = await res.json()

 // const data = searchData({
 //   searchTerm : "xyz"
 // })
  const data = await googleSuggest({
    searchTerm : "parinita",
    country: "in"
  })
  console.log(data)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data : "data"
    },
  }
}