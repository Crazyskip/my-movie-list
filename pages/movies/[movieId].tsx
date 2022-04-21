import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import ContentContainer from "../../components/contentContainer";
import FilmHeader from "../../components/filmHeader";

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
          {data.cast.slice(0, 10).map((member: any, index: number) => {
            return (
              <div
                key={member.id}
                style={{
                  border: "1px solid grey",
                  minWidth: "150px",
                  margin: "0 8px",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  width="500"
                  height="720"
                  alt={member.name}
                />
                <div style={{ padding: "0 10px" }}>
                  <h3 style={{ fontSize: "1.1rem", margin: "5px 0" }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: "0.9rem", margin: "5px 0" }}>
                    {member.character}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ContentContainer>
    </>
  );
};

export default Movie;
