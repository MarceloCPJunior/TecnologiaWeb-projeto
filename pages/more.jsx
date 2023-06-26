import Cast from "../components/cast/cast";
import Section from "../components/section/section";


export default function More({ results, credits }) {

  return (
    <>
      <div>
        <Section key={results.id} result={results} />
        <Cast credits={credits} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const movieId = context.query.movie;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=a81c3cb2e8b78a97806f76f4f60f684b&language=pt-BR`
  ).then((res) => res.json());

  const requestCredit = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a81c3cb2e8b78a97806f76f4f60f684b&language=pt-BR`
  ).then((res) => res.json());

  const results = request || [];
  const credits = requestCredit.cast || [];

  const creditsFilter = credits.filter((credit) => credit.profile_path !== null && credit.profile_path !== undefined)

  return {
    props: {
      results: results,
      credits: creditsFilter,
    },
  };
}