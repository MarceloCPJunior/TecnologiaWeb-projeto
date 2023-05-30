import sorov from "../baza/sorov";
import Filter from "../components/filter/filter";
import List from "../components/list/list";

export async function getServerSideProps(context){
  const genre = context.query.genre;

  console.log(`https://api.themoviedb.org/3${
    sorov[genre]?.url || sorov.fetchTrending.url
  }`)

  const request = await fetch(
    `https://api.themoviedb.org/3${
      sorov[genre]?.url || sorov.fetchTrending.url
    }`
  ).then((res) => res.json())
  
  const results = request.results || [];

  return {
    props: {
      results: results,
    }
  }
}

export default function Home({ results }) {

  return (
    <>
      <Filter />
      <List results={results} />
    </>
  )
}
