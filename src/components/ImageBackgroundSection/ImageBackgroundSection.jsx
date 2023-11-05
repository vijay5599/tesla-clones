import './ImageBackgroundSection.css';
import React, { useEffect, useRef, useState } from 'react';
export default function ImageBackgroundSection({
  backgroundImage,
  header,
  description,
  featureItems = [],
}) {
  const bottomSectionRef = useRef();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Adjust the threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      });
    }, options);

    if (bottomSectionRef.current) {
      observer.observe(bottomSectionRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (bottomSectionRef.current) {
        observer.unobserve(bottomSectionRef.current);
      }
    };
  }, []);
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: isAnimated ? 'scroll' : 'fixed', // Use scroll when animated, fixed otherwise
  };
  return (
    <div className="image-background" style={backgroundImageStyle}>
      <div className={`overlay`}>
        <div
          className={`top-section ${isAnimated ? 'animate' : ''}`}
          ref={bottomSectionRef}
        >
          <h2>{header}</h2>
          <p>{description}</p>
        </div>
        <div
          className={`bottom-section ${isAnimated ? 'animate' : ''}`}
          ref={bottomSectionRef}
        >
          {featureItems.length > 0 && (
            <ul className="feature-items">
              {featureItems.map(({ title, description }) => (
                <li key={title}>
                  <h6>{title}</h6>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          )}
          <div>
            <button className="order">Order Now</button>
            <button className="demo">Demo Drive</button>
          </div>
        </div>
      </div>
    </div>
  );
}
