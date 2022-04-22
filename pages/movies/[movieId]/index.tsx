import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import CastCard from "../../../components/castCard";
import ContentContainer from "../../../components/contentContainer";
import FilmHeader from "../../../components/filmHeader";
import styled from "styled-components";
import Link from "next/link";

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-width: 150px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Movie: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span>Loading...</span>;

  data.release_date = new Date(data.release_date);

  console.log(data);

  return (
    <>
      <FilmHeader film={data} type="movie" />
      <ContentContainer>
        <h3>Top Billed Cast</h3>
        <div
          style={{ display: "flex", overflowX: "scroll", marginBottom: "20px" }}
        >
          {data.cast.slice(0, 10).map((member: any) => {
            return <CastCard key={member.id} member={member}></CastCard>;
          })}
          <ViewMore>
            <Link href="/" passHref>
              <StyledLink>
                <h4 style={{ margin: "0 8px 0 0" }}>View More</h4>
                <FontAwesomeIcon icon={faArrowRight} />
              </StyledLink>
            </Link>
          </ViewMore>
        </div>
      </ContentContainer>
    </>
  );
};

export default Movie;
