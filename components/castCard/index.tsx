import { CardContainer, CardContent, CardImage, CardTitle } from "./styles";

const CastCard = ({ member }: { member: any }) => {
  return (
    <CardContainer>
      <CardImage
        src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
        width="250"
        height="375"
        alt={member.name}
        layout="responsive"
      />
      <CardContent>
        <CardTitle>{member.name}</CardTitle>
        <p>{member.character}</p>
      </CardContent>
    </CardContainer>
  );
};

export default CastCard;
