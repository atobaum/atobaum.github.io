import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./listing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Paging({ currentPageNum, pageCount }) {
  const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;

  return (
    <div className="paging-container">
      {!isFirstPage && (
        <Link to={prevPage}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      )}
      {[...Array(pageCount)].map((_val, index) => {
        const pageNum = index + 1;
        return (
          <Link
            key={`listing-page-${pageNum}`}
            to={pageNum === 1 ? "/" : `/${pageNum}/`}
          >
            {pageNum === currentPageNum ? (
              <b>{pageNum}</b>
            ) : (
              <span>{pageNum}</span>
            )}
          </Link>
        );
      })}
      {!isLastPage && (
        <Link to={nextPage}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      )}
    </div>
  );
}

function Listing({ pageContext, data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="listing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={postEdges} />
        </div>
        <Paging
          currentPageNum={pageContext.currentPageNum}
          pageCount={pageContext.pageCount}
        />
      </div>
    </Layout>
  );
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            summary
          }
        }
      }
    }
  }
`;
