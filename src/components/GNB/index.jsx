import React from "react";
import { Link } from "gatsby";
import "./GNB.css";

function GNB() {
  return (
    <header className="GNB">
      <Link to="/">
        <h2>Atobaum</h2>
      </Link>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default GNB;
