import React from "react";

function About() {
  return (
    <div className="container about-container">
      <h1 className="container__title">
        About{" "}
        <span className="about-container__appTitle">
          Time<span>Line</span>
        </span>
      </h1>

      {/* Info */}
      <p className="about-container__info">
        TimeLine is a tool that anybody and everybody can use to make sure
        they're on track with whatever they need to do. Whether you're a student
        who needs to keep track of your assignments and tests or a manager who
        needs to organize meetings with their employees. TimeLine is made to
        help you accomplish all your goals in life, small or big.
      </p>

      {/* Contact Info */}
      <h2 className="about-container__subTitle">Contact Information</h2>

      <p className="about-container__contact">Created By: Jordan D. Truong</p>

      <p className="about-container__contact">
        Email Address: TimelineStaff1@gmail.com
      </p>
    </div>
  );
}

export default About;
