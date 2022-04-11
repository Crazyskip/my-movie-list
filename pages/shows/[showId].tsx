import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Show: NextPage = () => {
  const router = useRouter();
  const { showId } = router.query;

  const { data, error } = useSWR(`/api/shows/${showId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  console.log(data);

  return (
    <>
      <h1>{data.name}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        width="250"
        height="375"
        alt={data.name}
      />
    </>
  );
};

export default Show;
