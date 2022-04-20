import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import FilmHeader from "../../components/filmHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Show: NextPage = () => {
  const router = useRouter();
  const { showId } = router.query;

  const { data, error } = useSWR(`/api/shows/${showId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.first_air_date);

  console.log(data);

  return (
    <>
      <FilmHeader film={data} type="show" />
    </>
  );
};

export default Show;
