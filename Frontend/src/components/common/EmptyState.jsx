const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="bg-white p-10 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <p className="text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;