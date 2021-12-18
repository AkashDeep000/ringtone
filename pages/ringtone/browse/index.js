
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
  return {
    props: {
      data : "data"
    },
  }
}