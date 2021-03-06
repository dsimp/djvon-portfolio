import React from "react";
import Djvon from "./Images/IMG_0539.jpeg";
import Slideshow from "./Slideshow";

const Bio = () => {
  return (
    <div className="intro-div">
      <h2>Hi, my name is</h2> <h1>Djvon Simpson.</h1>
      <h2>
        My love for the web is something that existed and has grown over the
        course of my life. From the countless number of video games I've played,
        data I've researched, the convenience of online shopping, the impact it
        has on my life (maybe all lives) is astronomical. So much, that it
        inspired me to learn how to contribute. Now,
      </h2>
      <h1> I'm an engineer!</h1>
      <img id="smile" src={Djvon} alt=""></img>
      <section className="skill-sect">
        <p>
          Based in Chicago, IL. Thanks to Pluralsight, Udemy, Youtube and the
          many resources on Google, I've become profecient in
        </p>
        <ul className="skills">
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>jquery</li>
          <li>React</li>
          <li>Redux</li>
          <li>Nodejs</li>
        </ul>
      </section>
      <Slideshow />
    </div>
  );
};

export default Bio;
