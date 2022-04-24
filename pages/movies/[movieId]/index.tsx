import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import CastCard from "../../../components/castCard";
import ContentContainer from "../../../components/contentContainer";
import FilmHeader from "../../../components/filmHeader";
import Link from "next/link";
import Review from "../../../components/review";
import styled from "styled-components";

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-width: 150px;
`;

const StyledLinkContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledLink = styled.a`
  font-size: 1.1rem;
  font-weight: 500;

  &:hover {
    color: #7d7d7d;
  }
`;

const Separator = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin: 35px 0;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movie: NextPage = () => {
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
      <FilmHeader film={data} type="movie" />
      <ContentContainer>
        <h3>Top Billed Cast</h3>
        <div
          style={{ display: "flex", overflowX: "scroll", marginBottom: "15px" }}
        >
          {data.cast.slice(0, 10).map((member: any) => {
            return <CastCard key={member.id} member={member}></CastCard>;
          })}
          <ViewMore>
            <Link href={`/movies/${movieId}/cast`} passHref>
              <StyledLinkContainer>
                <h4 style={{ margin: "0 8px 0 0" }}>View More</h4>
                <FontAwesomeIcon icon={faArrowRight} />
              </StyledLinkContainer>
            </Link>
          </ViewMore>
        </div>
        <Link href={`/movies/${movieId}/cast`} passHref>
          <StyledLink>Full Cast &#38; Crew</StyledLink>
        </Link>
        <Separator />
        {data.reviews.length ? (
          <div>
            <h3>Reviews</h3>
            <Review review={data.reviews[0]} />
          </div>
        ) : null}
      </ContentContainer>
    </>
  );
};

export default Movie;
