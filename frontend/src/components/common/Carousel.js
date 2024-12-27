import React, { useState } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      imgSrc: "https://acedmia-future.netlify.app/static/media/bg.baa1024a4ae092566a75.webp",
      title: "Empowering Education",
      description: "Learn from the best educators, explore new skills, and transform your future today.",
    },
    {
      id: 2,
      imgSrc: "https://acedmia-future.netlify.app/static/media/back.93d3f802b480eeabae07.webp",
      title: "Discover Knowledge",
      description: "Your journey to success starts here with curated courses for every learner.",
    },
    {
      id: 3,
      imgSrc: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Unleash Potential",
      description: "Expand your horizons with flexible and engaging online education.",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  return (
    <div className="carousal">
      <div className="carousal-container">
        <button className="carousal-button prev" onClick={goToPrevious}>
          &#10094;
        </button>
        <div className="carousal-slide">
          <img src={slides[currentIndex].imgSrc} alt={slides[currentIndex].title} />
          <div className="carousal-content">
            <h2>{slides[currentIndex].title}</h2>
            <p>{slides[currentIndex].description}</p>
          </div>
        </div>
        <button className="carousal-button next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
      <div className="carousal-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={currentIndex === index ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;