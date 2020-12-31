import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import Footer from "../components/Footer/Footer";
import GNB from "../components/GNB";
import "./index.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="ko" />
      </Helmet>
      <GNB />
      <div className="layout__content-container">{children}</div>
      <Footer config={config} />
    </div>
  );
}
