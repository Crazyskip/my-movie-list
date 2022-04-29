import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Cast: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/shows/${movieId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  console.log(data);

  return (
    <>
      <h1>{data.name} Cast</h1>
    </>
  );
};

export default Cast;
