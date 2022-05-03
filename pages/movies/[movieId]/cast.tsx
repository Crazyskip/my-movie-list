import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import ContentContainer from "../../../components/contentContainer";
import SmallFilmHeader from "../../../components/smallFilmHeader";
import styled from "styled-components";
import Head from "next/head";

const StyledImage = styled(Image)`
  border-radius: 6px;
`;

const Content = styled.div`
  display: flex;

  & > div {
    width: 50%;
  }
`;

const MemberContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Details = styled.div`
  margin-left: 20px;

  h4 {
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;

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
      <Head>
        <title>{data.title} - Cast & Crew - My Movie List</title>
        <meta
          name="description"
          content="Welcome to MyMovieList. Join the online community and create your movie and tv show list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SmallFilmHeader film={data} type="movie" />
      <ContentContainer>
        <Content>
          <div>
            <h3>Cast ({data.cast.length})</h3>
            {data.cast.map((member: any) => (
              <MemberContainer key={member.id}>
                <StyledImage
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w66_and_h66_face${member.profile_path}`
                      : "/assets/img/profile.jpg"
                  }
                  width="66"
                  height="66"
                  alt={member.name}
                />
                <Details>
                  <h4>{member.name}</h4>
                  <p>{member.character}</p>
                </Details>
              </MemberContainer>
            ))}
          </div>
          <div>
            <h3>Crew ({data.crew.length})</h3>
            {data.crew.map((member: any) => (
              <MemberContainer key={member.id + member.job}>
                <StyledImage
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w66_and_h66_face${member.profile_path}`
                      : "/assets/img/profile.jpg"
                  }
                  width="66"
                  height="66"
                  alt={member.name}
                />
                <Details>
                  <h4>{member.name}</h4>
                  <p>{member.job}</p>
                </Details>
              </MemberContainer>
            ))}
          </div>
        </Content>
      </ContentContainer>
    </>
  );
};

export default Cast;
