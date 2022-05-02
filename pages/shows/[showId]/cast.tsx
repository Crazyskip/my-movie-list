import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import SmallFilmHeader from "../../../components/smallFilmHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Cast: NextPage = () => {
  const router = useRouter();
  const { showId } = router.query;

  const { data, error } = useSWR(`/api/shows/${showId}`, fetcher);

  if (error || data?.success === false)
    return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.first_air_date);

  console.log(data);

  return (
    <>
      <SmallFilmHeader film={data} type="show" />
    </>
  );
};

export default Cast;
