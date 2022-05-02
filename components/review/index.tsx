import Image from "next/image";
import { LinesContainer, ReviewContainer, TitleContainer } from "./styles";

// Returns date in format dd month YYYY
const getDateString = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

// Returns path of image based on format provided
const formatProfilePicture = (imageString: string) => {
  console.log(imageString);
  if (!imageString || imageString === "") {
    return "/assets/img/profile.jpg";
  } else {
    if (imageString.slice(0, 5) === "/http") {
      return imageString.slice(1, imageString.length);
    } else {
      return `https://image.tmdb.org/t/p/w45${imageString}`;
    }
  }
};

const Review = ({ review }: { review: any }) => {
  // Remove html tags from content
  review.content = review.content.replace(/<\/?[^>]+(>|$)/g, "");

  // Limit content length to 500 characters
  const content = {
    lines: review.content.slice(0, 500).split("\n"),
    shortened: review.content.length > 500,
  };

  return (
    <ReviewContainer>
      <a href={`https://www.themoviedb.org/u/${review.author}`}>
        <Image
          style={{ borderRadius: "100%" }}
          src={formatProfilePicture(review.author_details.avatar_path)}
          alt="profile"
          height="50"
          width="50"
          layout="fixed"
        />
      </a>
      <TitleContainer>
        <h3>A review by {review.author}</h3>
        <p>{getDateString(review.created_at)}</p>
      </TitleContainer>
      <LinesContainer>
        {content.lines.map((line: string, index: number) => (
          <p key={index}>
            {line.trim()}
            {content.shortened && index === content.lines.length - 1
              ? "... "
              : null}
            {content.shortened && index === content.lines.length - 1 ? (
              <a href={`https://www.themoviedb.org/review/${review.id}`}>
                read more
              </a>
            ) : null}
          </p>
        ))}
      </LinesContainer>
    </ReviewContainer>
  );
};

export default Review;
