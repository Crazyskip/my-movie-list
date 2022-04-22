import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movie: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <h1>{data.title} Cast</h1>
    </>
  );
};

export default Movie;
