import React from "react";
import Cbadge from "./Images/CSSbadge.jpeg.png";
import Rbadge from "./Images/Reactbadge.jpeg.png";
import Jbadge from "./Images/Javascriptbadge.jpeg.png";
import "./Slideshow.css";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slidershow middle">
      <h1>What Does LinkedIn Have to Say About My Skills</h1>
      <div className="slides">
        <input
          type="radio"
          name="r"
          id="r1"
          checked={currentSlide === 1}
          onChange={() => setCurrentSlide(1)}
        />
        <input
          type="radio"
          name="r"
          id="r2"
          checked={currentSlide === 2}
          onChange={() => setCurrentSlide(2)}
        />
        <input
          type="radio"
          name="r"
          id="r3"
          checked={currentSlide === 3}
          onChange={() => setCurrentSlide(3)}
        />

        <div className="slide s1">
          <img src={Cbadge} alt="" />
        </div>
        <div className="slide ">
          <img src={Rbadge} alt="" />
        </div>
        <div className="slide ">
          <img src={Jbadge} alt="" />
        </div>
      </div>
      <div className="navigation">
        <label
          htmlFor="r1"
          className="bar"
          onClick={() => setCurrentSlide(1)}
        ></label>
        <label
          htmlFor="r2"
          className="bar"
          onClick={() => setCurrentSlide(2)}
        ></label>
        <label
          htmlFor="r3"
          className="bar"
          onClick={() => setCurrentSlide(3)}
        ></label>
      </div>
      <div className="linkedin-quotes">
        <h2>According to LinkedIn I...</h2>
        <ul className="quotes">
          <li>
            <q>Scored in the top 15% of 1.1M Javascript assessments</q>
          </li>
          <li>
            <q>Scored in the top 15% of 1M CSS assessments</q>
          </li>
          <li>
            <q>Scored in the top 30% of 345K React.js assessments</q>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Slideshow;
