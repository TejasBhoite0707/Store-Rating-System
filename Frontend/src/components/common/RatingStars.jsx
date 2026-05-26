const RatingStars = ({
  rating,
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <span
            key={star}
            className={`text-2xl ${
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        )
      )}
    </div>
  );
};

export default RatingStars;