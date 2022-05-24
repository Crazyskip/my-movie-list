import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import ContentContainer from "../../../components/contentContainer";
import Review from "../../../components/review";
import SmallFilmHeader from "../../../components/smallFilmHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Reviews: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error || data?.success === false)
    return <ContentContainer>An error has occurred.</ContentContainer>;
  if (!data) return <ContentContainer>Loading...</ContentContainer>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <Head>
        <title>{data.title} - Reviews - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SmallFilmHeader film={data} type="movie" />
      <ContentContainer>
        {data.reviews.map((review: any) => (
          <div key={review.id}>
            <Review review={review} />
          </div>
        ))}
      </ContentContainer>
    </>
  );
};

export default Reviews;
