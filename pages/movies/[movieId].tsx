import { NextPage } from "next";
import Image from "next/image";
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

  return (
    <>
      <h1>
        {data.title} ({data.release_date.getUTCFullYear()})
      </h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        width="250"
        height="375"
        alt={data.title}
      />
    </>
  );
};

export default Movie;
