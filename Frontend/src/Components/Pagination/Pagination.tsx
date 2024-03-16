import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <a
            href="#"
            className={
              i === currentPage
                ? "bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              href="#"
              className={
                currentPage === 1
                  ? "bg-blue-500 border border-blue-500 text-white hover:bg-blue-600 ml-0 rounded-l-lg leading-tight py-2 px-3"
                  : "bg-blue border border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-700 ml-0 rounded-l-lg leading-tight py-2 px-3"
              }
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {renderPageNumbers()}
          <li>
            <a
              href="#"
              className={
                currentPage === totalPages
                  ? "bg-blue-500 border border-blue-500 text-white hover:bg-blue-600 rounded-r-lg leading-tight py-2 px-3"
                  : "bg-white border border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-700 rounded-r-lg leading-tight py-2 px-3"
              }
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
