import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./About.css";

function About({ config }) {
  return (
    <div className="about">
      <h1>About Me</h1>
      <div className="user-links">
        <a href="https://github.com/atobaum">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="mailto:atobaum@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
      </div>
    </div>
  );
}

export default About;
