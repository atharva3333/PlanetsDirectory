

// eslint-disable-next-line react/prop-types
const Pagination = ({ setPage }) => {
  return (
    <div className="text-center mx-auto flex justify-center sm:gap-8 gap-4 w-full bg-white p-2 fixed bottom-0">
      {[...Array(6)].map((_, index) => (
        <button
          key={index + 1}
          className="bg-black p-4 text-white"
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
