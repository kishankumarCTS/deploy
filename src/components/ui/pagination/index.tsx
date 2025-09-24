"use client";

import PaginationButton from "./paginationButton";

type props = {
  page: number;
  totalPages: number;
  handleGoToFirstPage: () => void;
  handleGoToLastPage: () => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageChange: (value: number) => void;
  handlePaginationNumbers: () => number[];
};

function Pagination({
  page,
  totalPages,
  handleGoToFirstPage,
  handleGoToLastPage,
  handlePreviousPage,
  handleNextPage,
  handlePageChange,
  handlePaginationNumbers,
}: props) {
  const buttonStyling =
    "py-2.5 px-4 label-large font-medium text-[#535862] hover:text-[#252B37] cursor-pointer disabled:cursor-not-allowed disabled:hover:text-[#535862] disabled:opacity-50";
  return (
    <div className="flex justify-between items-center gap-4">
      <PaginationButton
        variant="previous"
        onClick={handlePreviousPage}
        isDisabled={page === 1}
      >
        Previous
      </PaginationButton>

      <div className="flex items-center gap-2">
        {!handlePaginationNumbers().includes(1) && (
          <button
            className={buttonStyling}
            onClick={handleGoToFirstPage}
            disabled={page === 1}
          >
            1
          </button>
        )}
        {handlePaginationNumbers()?.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`py-2.5 px-4 label-large font-medium ${
              pageNumber === page ? "text-[#252B37]" : "text-[#535862]"
            } hover:text-[#252B37] cursor-pointer`}
          >
            {pageNumber}
          </button>
        ))}
        {!handlePaginationNumbers().includes(totalPages) && (
          <button
            className={buttonStyling}
            onClick={handleGoToLastPage}
            disabled={page === totalPages}
          >
            {totalPages}
          </button>
        )}
      </div>

      <PaginationButton
        variant="next"
        onClick={handleNextPage}
        isDisabled={page === totalPages}
      >
        Next
      </PaginationButton>
    </div>
  );
}

export default Pagination;
