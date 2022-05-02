import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import ContentContainer from "../../../components/contentContainer";
import Review from "../../../components/review";
import SmallFilmHeader from "../../../components/smallFilmHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Reviews: NextPage = () => {
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
