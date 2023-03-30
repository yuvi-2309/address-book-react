import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./carousel.css";
function NumberCarousel() {
  // Define the numbers to be shown in the carousel
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Define the current number index
  const [currentNumber, setCurrentNumber] = useState(0);

  // Define a function to move to the next number
  const nextNumber = () => {
    setCurrentNumber(
      currentNumber === numbers.length - 1 ? 0 : currentNumber + 1
    );
  };

  // Define a function to move to the previous number
  const prevNumber = () => {
    setCurrentNumber(
      currentNumber === 0 ? numbers.length - 1 : currentNumber - 1
    );
  };

  // Define a function to toggle the display of the number buttons
  //   const toggleNumbers = () => {
  //     setShowNumbers(!showNumbers);
  //   };

  // Define the state variable for showing the number buttons
  const [showNumbers, setShowNumbers] = useState(true);

  return (
    <div className="number-carousel">
      {/* <div className="number">{numbers[currentNumber]}</div> */}

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
