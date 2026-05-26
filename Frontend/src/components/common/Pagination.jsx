const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({
        length: totalPages,
      }).map((_, index) => (
        <button
          key={index}
          onClick={() =>
            onPageChange(
              index + 1
            )
          }
          className={`px-4 py-2 rounded ${
            currentPage ===
            index + 1
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;