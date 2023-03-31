import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./carousel.css";
function NumberCarousel() {
  // numbers to be shown in the carousel
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [currentNumber, setCurrentNumber] = useState(0);
  const [showNumbers, setShowNumbers] = useState(true);

  // function to move to the next number
  const nextNumber = () => {
    setCurrentNumber(
      currentNumber === numbers.length - 1 ? 0 : currentNumber + 1
    );
  };

  // function to move to the previous number
  const prevNumber = () => {
    setCurrentNumber(
      currentNumber === 0 ? numbers.length - 1 : currentNumber - 1
    );
  };

  return (
    <div className="number-carousel">
      <div className="number-buttons">
        <div style={{ display: "flex", position: "relative" }}>
          <FaChevronLeft className="carousel-arrow" onClick={prevNumber} />
          {showNumbers && (
            <div className="button-container">
              {numbers.map((number, index) => (
                <button
                  key={index}
                  className={currentNumber === index ? "active" : ""}
                  onClick={() => setCurrentNumber(index)}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
          <FaChevronRight className="carousel-arrow" onClick={nextNumber} />
        </div>
      </div>
    </div>
  );
}

export default NumberCarousel;
