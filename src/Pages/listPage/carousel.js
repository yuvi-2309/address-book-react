import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./carousel.css"

function NumberCarousel({ numPages, currentPage, onPageChange }) {
  const pages = [...Array(numPages).keys()].map((i) => i + 1);

  const nextNumber = () => {
    onPageChange(currentPage === numPages ? 1 : currentPage + 1);
  };

  const prevNumber = () => {
    onPageChange(currentPage === 1 ? numPages : currentPage - 1);
  };

  return (
    <div className="numberCarousel">
      <div className="numberButtons">
        <FaChevronLeft className="carouselArrow" onClick={prevNumber} />

        <div className="buttonContainer">
          {pages.map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <FaChevronRight className="carouselArrow" onClick={nextNumber} />
      </div>
    </div>
  );
}

export default NumberCarousel;