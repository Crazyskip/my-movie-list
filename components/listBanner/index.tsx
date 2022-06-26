import Image from "next/image";
import Link from "next/link";
import {
  DetailsContainer,
  ImageContainer,
  ListBannerContainer,
  Title,
} from "./styles";

const ListBanner = ({
  listName,
  profileId,
  listLength,
  posterPath,
}: {
  listName: string;
  profileId: string;
  listLength: number;
  posterPath: string;
}) => {
  return (
    <Link href={`/u/${profileId}/${listName.toLowerCase()}`} passHref>
      <ListBannerContainer>
        <ImageContainer>
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            width="500"
            height="750"
            layout="responsive"
            alt={listName}
          />
        </ImageContainer>
        <DetailsContainer>
          <Title>
            {listName} ({listLength})
          </Title>
        </DetailsContainer>
      </ListBannerContainer>
    </Link>
  );
};

export default ListBanner;
