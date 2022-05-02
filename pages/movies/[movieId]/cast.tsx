import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import SmallFilmHeader from "../../../components/smallFilmHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Cast: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <SmallFilmHeader film={data} type="movie" />
    </>
  );
};

export default Cast;
