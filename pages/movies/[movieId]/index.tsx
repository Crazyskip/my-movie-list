import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import FilmHeader from "../../../components/filmHeader";

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
      <FilmHeader film={data} type="movie" />
    </>
  );
};

export default Movie;
