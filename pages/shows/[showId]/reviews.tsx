import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Reviews: NextPage = () => {
  const router = useRouter();
  const { showId } = router.query;

  const { data, error } = useSWR(`/api/shows/${showId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  console.log(data);

  return (
    <>
      <h1>{data.name} Reviews</h1>
    </>
  );
};

export default Reviews;
