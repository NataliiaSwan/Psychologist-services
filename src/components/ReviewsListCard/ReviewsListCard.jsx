import CardReview from "../../components/CardReview/CardReview.jsx";

const ReviewsListCard = ({ reviews, name, avatar_url }) => {
  return reviews?.map((review, index) => (
    <CardReview
      key={index}
      name={name}
      avatar_url={avatar_url}
      reviewer={review.reviewer}
      comment={review.comment}
      rating={review.rating}
    />
  ));
};

export default ReviewsListCard;
