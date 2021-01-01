import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer({ config }) {
  const url = config.siteRss;
  const { copyright } = config;
  if (!copyright) {
    return null;
  }
  return (
    <footer className="footer">
      <div className="notice-container">
        <a href="mailto:atobaum@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
        <a href="https://github.com/atobaum">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://twitter.com/atobaum">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <Link to={url}>
          <FontAwesomeIcon icon={faRss} size="2x" />
        </Link>
      </div>
      <h4>{copyright}</h4>
    </footer>
  );
}

export default Footer;
