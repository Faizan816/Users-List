export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
    totalPages > 0 && (
      <nav aria-label="Page navigation" className="pagination-container">
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              tabIndex={currentPage === 1 ? -1 : undefined}
            >
              &laquo;
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              <a className="page-link" href="#">
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    )
  );
}
